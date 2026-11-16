#!/usr/bin/env node
// Regista (ou remove) no Agendador de Tarefas do Windows a tarefa que corre o retomar.mjs de 15 em 15 minutos
// e ao iniciar sessão. Só o Windows foi provado; noutros sistemas o script diz como fazer com o cron ou o launchd.
// Uso:
//   node agendar-retoma.mjs <pasta da orquestração> <pasta onde as sessões abrem> [--modelo opus] [--nome "<nome>"] [--substituir]
//   node agendar-retoma.mjs --remover (<pasta da orquestração> | --nome "<nome>")
// Nome por omissão: «Claude - retomar <nome da pasta da orquestração>».

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const aqui = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const COM_VALOR = new Set(["--modelo", "--nome"]);
const opcao = (nome) => {
  const i = args.indexOf(nome);
  return i >= 0 ? args[i + 1] : undefined;
};
const posicionais = args.filter((a, i) => !a.startsWith("--") && !COM_VALOR.has(args[i - 1]));
const remover = args.includes("--remover");
const pasta = posicionais[0] ? resolve(posicionais[0]) : undefined;
const raiz = posicionais[1] ? resolve(posicionais[1]) : undefined;
const modelo = opcao("--modelo") ?? "opus";
const nome = opcao("--nome") ?? (pasta ? `Claude - retomar ${basename(pasta)}` : undefined);

function sair(texto, codigo = 2) {
  console.error(texto);
  process.exit(codigo);
}

if (!nome || (!remover && (!pasta || !raiz))) {
  sair(
    "Uso: node agendar-retoma.mjs <pasta da orquestração> <pasta onde as sessões abrem> [--modelo opus] [--nome \"<nome>\"] [--substituir]\n" +
      "     node agendar-retoma.mjs --remover (<pasta da orquestração> | --nome \"<nome>\")",
  );
}

const retomar = join(aqui, "retomar.mjs");

if (process.platform !== "win32") {
  sair(
    `Não registei nada: este script só regista a tarefa no Windows, o único sistema onde a retoma foi provada.\n` +
      `Em Linux ou macOS, põe o retomar.mjs a correr de 15 em 15 minutos com o cron (crontab -e):\n` +
      `  */15 * * * * "${process.execPath}" "${retomar}" "${pasta ?? "<pasta>"}" "${raiz ?? "<sessões>"}" --modelo ${modelo}\n` +
      `No macOS também serve um LaunchAgent em ~/Library/LaunchAgents com StartInterval 900 e RunAtLoad true.`,
    1,
  );
}

const schtasks = (...a) => execFileSync("schtasks", a, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
function existe() {
  try {
    schtasks("/Query", "/TN", nome);
    return true;
  } catch {
    return false;
  }
}

if (remover) {
  if (!existe()) sair(`Não há nenhuma tarefa «${nome}».`, 1);
  schtasks("/Delete", "/TN", nome, "/F");
  console.log(`Tarefa «${nome}» removida.`);
  process.exit(0);
}

if (!existsSync(join(pasta, "estado.json"))) sair(`Falta ${join(pasta, "estado.json")} (modelo em modelos/estado.json).`);
if (!existsSync(join(pasta, "retoma-permissoes.json"))) {
  sair(`Falta ${join(pasta, "retoma-permissoes.json")} (modelo em modelos/retoma-permissoes.json).`);
}
if (existe() && !args.includes("--substituir")) {
  sair(`Já existe uma tarefa «${nome}». Usa outro --nome, ou --substituir se é mesmo para a trocar.`, 1);
}

// SID do utilizador atual: a tarefa corre só com a sessão dele iniciada, sem guardar a palavra-passe.
const sid = (execFileSync("whoami", ["/user", "/fo", "csv", "/nh"], { encoding: "utf8" }).match(/S-1-[\d-]+/) ?? [])[0];
if (!sid) sair("Não consegui ler o SID do utilizador com «whoami /user».");

const xml = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const aspas = (t) => `"${t}"`;
const argumentos = [join(aqui, "retomar.vbs"), process.execPath, pasta, raiz].map(aspas).join(" ") + ` --modelo ${modelo}`;
const primeira = new Date(Date.now() + 15 * 60000);
const local = new Date(primeira.getTime() - primeira.getTimezoneOffset() * 60000).toISOString().slice(0, 19);

const definicao = `<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <RegistrationInfo>
    <Description>${xml(`Retoma a orquestração em ${pasta} (orchestrate-sessions, modo contínuo).`)}</Description>
  </RegistrationInfo>
  <Triggers>
    <TimeTrigger>
      <Repetition>
        <Interval>PT15M</Interval>
        <StopAtDurationEnd>false</StopAtDurationEnd>
      </Repetition>
      <StartBoundary>${local}</StartBoundary>
      <Enabled>true</Enabled>
    </TimeTrigger>
    <LogonTrigger>
      <Enabled>true</Enabled>
      <UserId>${sid}</UserId>
    </LogonTrigger>
  </Triggers>
  <Principals>
    <Principal id="Author">
      <UserId>${sid}</UserId>
      <LogonType>InteractiveToken</LogonType>
      <RunLevel>LeastPrivilege</RunLevel>
    </Principal>
  </Principals>
  <Settings>
    <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
    <DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>
    <StopIfGoingOnBatteries>false</StopIfGoingOnBatteries>
    <StartWhenAvailable>true</StartWhenAvailable>
    <RunOnlyIfNetworkAvailable>false</RunOnlyIfNetworkAvailable>
    <AllowStartOnDemand>true</AllowStartOnDemand>
    <Enabled>true</Enabled>
    <Hidden>false</Hidden>
    <WakeToRun>false</WakeToRun>
    <ExecutionTimeLimit>PT5M</ExecutionTimeLimit>
  </Settings>
  <Actions Context="Author">
    <Exec>
      <Command>wscript.exe</Command>
      <Arguments>${xml(argumentos)}</Arguments>
    </Exec>
  </Actions>
</Task>
`;

// O schtasks lê o XML em UTF-16 com BOM; assim os caminhos com acentos passam intactos.
const temp = mkdtempSync(join(tmpdir(), "agendar-retoma-"));
try {
  const ficheiro = join(temp, "tarefa.xml");
  writeFileSync(ficheiro, Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(definicao, "utf16le")]));
  schtasks("/Create", "/TN", nome, "/XML", ficheiro, "/F");
} finally {
  rmSync(temp, { recursive: true, force: true });
}

console.log(`Tarefa «${nome}» registada: de 15 em 15 minutos a partir das ${local.slice(11, 16)} e ao iniciar sessão.`);
console.log(`Confirmar: Get-ScheduledTask -TaskName "${nome}" | Get-ScheduledTaskInfo`);
console.log(`Registo das retomas: ${join(pasta, "retoma.log")}`);
console.log(`Remover: node "${join(aqui, "agendar-retoma.mjs")}" --remover --nome "${nome}"`);
