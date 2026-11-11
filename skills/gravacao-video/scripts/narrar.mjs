// Gera um ficheiro de áudio por frase do guião, para a gravação poder encaixar cada frase no
// momento certo. Por omissão usa o Piper (voz pt_PT, local e gratuita); com "motorVoz": "azure"
// usa o Azure AI Speech (variáveis AZURE_SPEECH_KEY e AZURE_SPEECH_REGION).
//
//   node narrar.mjs                              narra o que falta ou mudou; o resto fica como está
//   node narrar.mjs --tudo                       narra tudo outra vez
//   node narrar.mjs --lista                      lista as frases, numeradas como na folha de escuta
//   node narrar.mjs --frase 9                    gera tomadas novas só para a frase 9 (ou 05-resultados/1)
//   node narrar.mjs --frase 9 --tomada 3         fica com a tomada 3 da frase 9, sem gerar nada
//   node narrar.mjs --ensinar "CSV=cê ésse vê"   aprende uma pronúncia e refaz as frases que a usam
//
// Cada frase passa por quatro cuidados, porque uma voz sintética crua nota-se:
// 1. Pronúncia: siglas, endereços e termos estrangeiros dizem-se pelos dicionários de pronúncias
//    (as legendas ficam com o texto original); o que parecer estrangeirismo sem pronúncia dá aviso.
// 2. Várias tomadas (só Piper, que não é determinista): gera-se a frase várias vezes e fica a
//    tomada sem ruído no arranque, com o fim menos cortado e com a duração mais próxima da mediana.
//    As tomadas ficam em audio/tomadas/, para o ouvido de uma pessoa poder escolher outra.
// 3. Limpeza: corta-se o que vem antes da fala, entra-se e sai-se com um desvanecer curto (mais
//    longo quando o modelo cortou a última vogal) e nivela-se o volume.
// 4. Ritmo da fala pelo formato: um teaser fala depressa, uma demonstração ou explicação não.
//
// Dicionários, do mais geral para o mais específico (o último ganha): pronuncias.json ao lado
// deste script (o da skill), ~/.start-project-with-trust/pronuncias.json (o que esta pessoa
// ensinou) e "pronuncias" no guiao.json (só deste vídeo).
// Caminhos do Piper em PIPER_EXE, PIPER_MODELO e PIPER_ESPEAK; sem eles, usa ferramentas/piper/ na raiz do projeto.
import { execFileSync, execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { pasta, lerJson, escreverJson, lerWav, cabecalhoWav, dividirFrases } from './comum.mjs';

const args = process.argv.slice(2);
const valor = (nome) => { const i = args.indexOf(nome); return i >= 0 ? args[i + 1] ?? null : null; };
const valores = (nome) => args.flatMap((a, i) => (a === nome && args[i + 1] ? [args[i + 1]] : []));
const falhar = (mensagem) => { console.error(mensagem); process.exit(1); };

const guiao = lerJson('guiao.json');
const motor = guiao.motorVoz ?? 'piper';
if (motor !== 'piper' && motor !== 'azure') falhar(`Motor de voz desconhecido: ${motor}. Usa "piper" ou "azure".`);
const FALA = { teaser: 1.0, demonstracao: 1.08, explicacao: 1.12 }; // duração dos fonemas no Piper
const opcoes = { length_scale: FALA[guiao.formato] ?? FALA.demonstracao, noise_w: 0.6, noise_scale: 0.667, tomadas: 4, ...guiao.vozOpcoes };
const nTomadas = motor === 'piper' ? Math.max(1, opcoes.tomadas) : 1;

// --- 1. Pronúncia ---------------------------------------------------------------------------
const DIC_SKILL = join(pasta, 'pronuncias.json');
const DIC_PESSOAL = join(homedir(), '.start-project-with-trust', 'pronuncias.json');
const lerDicionario = (f) => (existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {});
const pessoal = lerDicionario(DIC_PESSOAL);
const ensinadas = valores('--ensinar').map((par) => {
  const corte = par.indexOf('=');
  if (corte < 1 || corte === par.length - 1) falhar(`--ensinar espera "termo=como se diz" e recebeu «${par}».`);
  return [par.slice(0, corte).trim(), par.slice(corte + 1).trim()];
});
if (ensinadas.length) {
  for (const [termo, dito] of ensinadas) pessoal[termo] = dito;
  mkdirSync(dirname(DIC_PESSOAL), { recursive: true });
  writeFileSync(DIC_PESSOAL, JSON.stringify(Object.fromEntries(Object.entries(pessoal).sort(([a], [b]) => a.localeCompare(b, 'pt'))), null, 2) + '\n');
  console.log(`Aprendi ${ensinadas.map(([t, d]) => `«${t}» → «${d}»`).join(', ')} em ${DIC_PESSOAL}`);
}
const PRONUNCIAS = { ...lerDicionario(DIC_SKILL), ...pessoal, ...guiao.pronuncias };

const LETRAS = { a: 'á', b: 'bê', c: 'cê', d: 'dê', e: 'é', f: 'éfe', g: 'gê', h: 'agá', i: 'i', j: 'jota', k: 'capa', l: 'éle', m: 'éme', n: 'éne', o: 'ó', p: 'pê', q: 'quê', r: 'érre', s: 'ésse', t: 'tê', u: 'u', v: 'vê', w: 'dâblio', x: 'xis', y: 'ípsilon', z: 'zê' };
const soletrar = (t) => [...t.toLowerCase()].map((c) => LETRAS[c] ?? c).join(' ');
const SUSPEITAS = new Set(['online', 'offline', 'site', 'sites', 'website', 'email', 'e-mail', 'link', 'links', 'login', 'logout', 'download', 'downloads', 'upload', 'software', 'hardware', 'web', 'dashboard', 'feedback', 'open', 'creative', 'commons', 'stories', 'story', 'cloud', 'backup', 'design', 'layout', 'post', 'chat', 'bot', 'app', 'apps', 'smartphone', 'tablet', 'streaming', 'marketing', 'performance', 'deploy', 'release', 'bug', 'token', 'cookie', 'cookies', 'browser', 'desktop', 'mobile', 'plugin', 'template', 'workflow', 'pipeline', 'ranking', 'input', 'output', 'default', 'standard', 'premium', 'newsletter', 'podcast', 'startup', 'hub', 'tag', 'tags', 'like', 'likes', 'ok', 'ticket', 'check', 'checkout', 'scroll', 'zoom', 'click', 'teaser', 'demo', 'business', 'insight', 'insights', 'report', 'reports', 'frontend', 'backend', 'server', 'host', 'home', 'homepage', 'search', 'share', 'status', 'update', 'upgrade', 'user', 'users', 'view', 'views', 'widget', 'wifi', 'wi-fi']);
// Uma sigla só casa em maiúsculas («IA» não é o verbo «ia»); as outras entradas casam em qualquer caixa.
const fronteira = (chave) => new RegExp(`(?<![\\p{L}\\p{N}])${chave.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}\\p{N}])`, /\p{Ll}/u.test(chave) ? 'giu' : 'gu');

// Só o que vai para a voz muda; as legendas ficam com o texto original do guião.
function comoSeDiz(texto) {
  let dito = texto;
  const avisos = [];
  for (const chave of Object.keys(PRONUNCIAS).sort((a, b) => b.length - a.length)) dito = dito.replace(fronteira(chave), PRONUNCIAS[chave]);
  // Endereços: «dados.gov.pt» diz-se «dados ponto gov ponto pê tê».
  dito = dito.replace(/(?<![\p{L}\p{N}@])((?:[a-z0-9-]+\.)+[a-z]{2,})(?![\p{L}\p{N}])/giu, (endereco) =>
    endereco.split('.').map((parte, i, todas) => (i === todas.length - 1 && parte.length === 2 ? soletrar(parte) : parte)).join(' ponto '));
  for (const palavra of dito.match(/[\p{L}][\p{L}\p{N}'-]*/gu) ?? []) {
    const p = palavra.toLowerCase();
    if (/^\p{Lu}{2,}s?$/u.test(palavra)) avisos.push(`«${palavra}» é uma sigla sem pronúncia`);
    else if (SUSPEITAS.has(p) || /[kwy]|th|sh|ck|tion$|ing$/.test(p)) avisos.push(`«${palavra}» parece um estrangeirismo`);
  }
  return { dito, avisos };
}

// As frases do guião, numeradas pela ordem em que se ouvem (a mesma da folha de escuta).
const todas = [];
for (const passo of guiao.passos) {
  for (const [n, texto] of dividirFrases(passo.narracao).entries()) {
    todas.push({ numero: todas.length + 1, passo: passo.id, n, chave: `${passo.id}-${n + 1}`, texto, ...comoSeDiz(texto) });
  }
}
function encontrar(ref) {
  const r = String(ref).trim();
  const f = /^\d+$/.test(r) ? todas[Number(r) - 1] : todas.find((x) => x.chave === r.replace('/', '-'));
  if (!f) falhar(`Não encontrei a frase «${ref}». Usa o número da folha de escuta ou "passo/frase", por exemplo ${todas[0].passo}/1.`);
  return f;
}
// Uma frase só se refaz quando muda aquilo que a voz diz ou a maneira de o dizer.
const assinar = (dito) => createHash('sha1').update([dito, motor, guiao.voz ?? '', opcoes.length_scale, opcoes.noise_w, opcoes.noise_scale].join('|')).digest('hex').slice(0, 12);

// --- 2 e 3. Analisar e limpar ---------------------------------------------------------------
// Envelope em janelas de 5 ms, em dB relativos à janela mais forte.
function analisar(s, taxa) {
  const n = Math.round(taxa * 0.005);
  const env = [];
  for (let i = 0; i + n <= s.length; i += n) { let q = 0; for (let k = i; k < i + n; k++) q += s[k] * s[k]; env.push(Math.sqrt(q / n)); }
  const pico = Math.max(1, ...env);
  const rel = env.map((x) => (x <= 0 ? -99 : 20 * Math.log10(x / pico)));
  // A fala começa na primeira janela forte, recuando enquanto houver som contínuo (um «v» ou um «s» fracos).
  let ini = Math.max(0, rel.findIndex((x) => x >= -20));
  while (ini > 0 && rel[ini - 1] > -37) ini--;
  let fim = rel.length - 1;
  while (fim > ini && rel[fim] <= -37) fim--;
  const ruidoAntes = Math.max(-99, ...rel.slice(0, ini)); // rajada solta antes da fala
  const nivelFim = Math.max(...rel.slice(Math.max(ini, fim - 5), fim + 1)); // os últimos 30 ms de fala
  const cauda = (rel.length - 1 - fim) * 5; // silêncio que o próprio modelo deixou depois da fala
  return { n, env, rel, ini, fim, ruidoAntes, nivelFim, cauda, abrupto: cauda < 40 && nivelFim > -32, fala: (fim - ini + 1) * 0.005 };
}

const ALVO_RMS = 0.1 * 32768; // -20 dBFS na fala
const ALVO_PICO = 0.84 * 32767; // -1,5 dBFS
function limpar(s, taxa, a) {
  const margem = Math.round(taxa * 0.01);
  const de = Math.max(0, a.ini * a.n - margem);
  const ate = Math.min(s.length, (a.fim + 1) * a.n + margem);
  const f = Float64Array.from(s.subarray(de, ate));
  const nEntrada = Math.min(f.length, Math.round(taxa * 0.01));
  for (let i = 0; i < nEntrada; i++) f[i] *= 0.5 * (1 - Math.cos((Math.PI * i) / nEntrada));
  // Quando o modelo corta a última vogal, um desvanecer de 90 ms devolve-lhe a descida; senão bastam 30 ms.
  const nSaida = Math.min(f.length, Math.round(taxa * (a.abrupto ? 0.09 : 0.03)));
  for (let i = 0; i < nSaida; i++) f[f.length - 1 - i] *= 0.5 * (1 - Math.cos((Math.PI * i) / nSaida));
  let q = 0, k = 0, pico = 1;
  for (let j = a.ini; j <= a.fim; j++) if (a.rel[j] > -25) { q += a.env[j] * a.env[j]; k++; }
  for (const x of f) if (Math.abs(x) > pico) pico = Math.abs(x);
  const ganho = Math.min(ALVO_RMS / Math.sqrt(q / Math.max(1, k)), ALVO_PICO / pico);
  const antes = Math.round(taxa * 0.03), depois = Math.round(taxa * 0.08);
  const saida = new Int16Array(antes + f.length + depois);
  for (let i = 0; i < f.length; i++) saida[antes + i] = Math.round(f[i] * ganho);
  return saida;
}
const amostras = (wav) => new Int16Array(wav.dados.buffer.slice(wav.dados.byteOffset, wav.dados.byteOffset + wav.dados.length - (wav.dados.length % 2)));
function gravarWav(caminho, s, taxa) {
  const dados = Buffer.from(s.buffer, s.byteOffset, s.byteLength);
  writeFileSync(caminho, Buffer.concat([cabecalhoWav(taxa, 1, dados.length), dados]));
}

// --- Motores --------------------------------------------------------------------------------
mkdirSync(join(pasta, 'audio'), { recursive: true });

// O Piper 2023.11 em Windows não lê caminhos com acentos. Converte para o nome curto 8.3, que só tem ASCII.
function caminhoAscii(caminho) {
  if (process.platform !== 'win32' || /^[\x00-\x7F]*$/.test(caminho)) return caminho;
  return execSync(`cmd /c for %I in ("${caminho}") do @echo %~sI`, { encoding: 'utf8' }).trim();
}

let piper = null;
function prepararPiper() {
  const voz = guiao.voz ?? 'pt_PT-tugao-medium';
  const exe = process.env.PIPER_EXE ?? resolve(pasta, '../../ferramentas/piper/piper/piper.exe');
  const modelo = process.env.PIPER_MODELO ?? resolve(pasta, `../../ferramentas/piper/${voz}.onnx`);
  const espeak = process.env.PIPER_ESPEAK ?? join(dirname(exe), 'espeak-ng-data');
  for (const f of [exe, modelo, espeak]) if (!existsSync(f)) falhar(`Não encontrei ${f}. Define PIPER_EXE, PIPER_MODELO e PIPER_ESPEAK.`);
  // O nome curto esconde a extensão .onnx, por isso o ficheiro de configuração vai explícito.
  // Sem silêncio no fim: vê-se assim se o modelo deixou a frase acabar ou a cortou.
  piper = {
    exe: caminhoAscii(exe), pastaAudio: caminhoAscii(join(pasta, 'audio')),
    args: ['--model', caminhoAscii(modelo), '--config', caminhoAscii(`${modelo}.json`), '--espeak_data', caminhoAscii(espeak), '--sentence_silence', '0',
      '--length_scale', String(opcoes.length_scale), '--noise_w', String(opcoes.noise_w), '--noise_scale', String(opcoes.noise_scale)],
  };
}
function tomadaPiper(dito, nome) {
  if (!piper) prepararPiper();
  execFileSync(piper.exe, [...piper.args, '--output_file', join(piper.pastaAudio, nome)], { input: dito + '\n', stdio: ['pipe', 'ignore', 'inherit'] });
  return lerWav(join(pasta, 'audio', nome));
}

// Azure AI Speech, API REST de texto para voz. A chave só vem do ambiente.
async function tomadaAzure(dito, nome) {
  const chave = process.env.AZURE_SPEECH_KEY, regiao = process.env.AZURE_SPEECH_REGION;
  if (!chave || !regiao) falhar('Faltam as variáveis de ambiente AZURE_SPEECH_KEY e AZURE_SPEECH_REGION.');
  const voz = guiao.voz ?? 'pt-PT-RaquelNeural';
  const xml = dito.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const r = await fetch(`https://${regiao}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: { 'Ocp-Apim-Subscription-Key': chave, 'Content-Type': 'application/ssml+xml', 'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm', 'User-Agent': 'gravacao-video' },
    body: `<speak version='1.0' xml:lang='pt-PT'><voice name='${voz}'>${xml}</voice></speak>`,
  });
  if (!r.ok) throw new Error(`O Azure respondeu ${r.status}: ${(await r.text()).slice(0, 300)}`);
  writeFileSync(join(pasta, 'audio', nome), Buffer.from(await r.arrayBuffer()));
  return lerWav(join(pasta, 'audio', nome));
}

// --- Tomadas --------------------------------------------------------------------------------
const pastaTomadas = (f) => join(pasta, 'audio', 'tomadas', f.chave);
const entrada = (f, t, total) => ({
  texto: f.texto, dito: f.dito === f.texto ? undefined : f.dito, ficheiro: `${f.chave}.wav`, segundos: t.segundos, taxa: t.taxa, canais: 1,
  tomada: t.k, tomadas: total, fimCortado: t.fimCortado || undefined, ruidoRetirado: t.ruidoRetirado || undefined, assinatura: assinar(f.dito),
});

// Gera as tomadas de uma frase, limpa-as, guarda-as todas e fica com a que tem menos defeitos;
// em caso de empate, a de duração mais próxima da mediana (uma tomada curta engoliu sílabas).
async function gerar(f) {
  rmSync(pastaTomadas(f), { recursive: true, force: true });
  mkdirSync(pastaTomadas(f), { recursive: true });
  const tomadas = [];
  for (let k = 1; k <= nTomadas; k++) {
    const tomadaCrua = '_tomada.wav';
    const wav = motor === 'piper' ? tomadaPiper(f.dito, tomadaCrua) : await tomadaAzure(f.dito, tomadaCrua);
    if (wav.canais !== 1) throw new Error(`Esperava áudio mono em ${f.chave}`);
    const s = amostras(wav);
    const a = analisar(s, wav.taxa);
    const limpo = limpar(s, wav.taxa, a);
    gravarWav(join(pastaTomadas(f), `${k}.wav`), limpo, wav.taxa);
    rmSync(join(pasta, 'audio', tomadaCrua), { force: true });
    tomadas.push({ k, taxa: wav.taxa, segundos: Number((limpo.length / wav.taxa).toFixed(3)), fala: a.fala, fimCortado: a.abrupto, ruidoRetirado: a.ruidoAntes > -45 });
  }
  const ordenadas = tomadas.map((t) => t.fala).sort((x, y) => x - y);
  const mediana = ordenadas[Math.floor(ordenadas.length / 2)];
  const defeitos = (t) => (t.fimCortado ? 2 : 0) + (t.ruidoRetirado ? 1 : 0) + (Math.abs(t.fala - mediana) / mediana) * 4;
  const melhor = tomadas.reduce((m, t) => (defeitos(t) < defeitos(m) ? t : m));
  escreverJson(`audio/tomadas/${f.chave}/tomadas.json`, { assinatura: assinar(f.dito), dito: f.dito, escolhida: melhor.k, tomadas });
  copyFileSync(join(pastaTomadas(f), `${melhor.k}.wav`), join(pasta, 'audio', `${f.chave}.wav`));
  return entrada(f, melhor, tomadas.length);
}

// Fica com uma tomada já guardada, escolhida de ouvido.
function escolher(f, k) {
  const indice = `audio/tomadas/${f.chave}/tomadas.json`;
  if (!existsSync(join(pasta, indice))) falhar(`A frase ${f.numero} (${f.chave}) não tem tomadas guardadas. Gera-as com: node narrar.mjs --frase ${f.numero}`);
  const guardadas = lerJson(indice);
  const t = guardadas.tomadas.find((x) => x.k === k);
  if (!t) falhar(`A frase ${f.numero} tem as tomadas 1 a ${guardadas.tomadas.length}; pediste a ${k}.`);
  if (guardadas.assinatura !== assinar(f.dito)) falhar(`As tomadas guardadas da frase ${f.numero} são de outro texto ou de outra voz. Gera-as de novo com: node narrar.mjs --frase ${f.numero}`);
  copyFileSync(join(pastaTomadas(f), `${k}.wav`), join(pasta, 'audio', `${f.chave}.wav`));
  escreverJson(indice, { ...guardadas, escolhida: k });
  return entrada(f, t, guardadas.tomadas.length);
}

// A frase nova cabe no tempo que a gravação lhe deu? Se não couber, é preciso gravar outra vez.
function espacoGravado(f) {
  if (!existsSync(join(pasta, 'gravacao/tempos.json'))) return null;
  const tempos = lerJson('gravacao/tempos.json');
  const linha = tempos.passos.flatMap((p) => p.frases.map((x) => ({ chave: `${p.id}-${x.n + 1}`, em: x.em })));
  const i = linha.findIndex((x) => x.chave === f.chave);
  if (i < 0) return null;
  const fim = linha[i + 1]?.em ?? tempos.fechoEm;
  let espaco = fim - linha[i].em;
  for (const x of tempos.esperas ?? []) { const a = Math.max(x.de, linha[i].em), b = Math.min(x.ate, fim); if (b > a) espaco -= b - a; }
  return espaco / 1000;
}

// --- Narrar ---------------------------------------------------------------------------------
const anteriores = existsSync(join(pasta, 'audio/duracoes.json')) ? lerJson('audio/duracoes.json') : {};
const antes = (f) => anteriores[f.passo]?.frases?.[f.n];

if (args.includes('--lista')) {
  for (const f of todas) {
    const a = antes(f);
    console.log(`${String(f.numero).padStart(3)}  ${f.passo}/${f.n + 1}  ${a?.tomada ? `tomada ${a.tomada} de ${a.tomadas}` : 'por narrar'}  «${f.texto}»${f.dito === f.texto ? '' : `\n     dito como: «${f.dito}»`}`);
  }
  process.exit(0);
}

const alvo = valor('--frase') ? encontrar(valor('--frase')) : null;
const tomadaPedida = valor('--tomada');
if (tomadaPedida && !alvo) falhar('--tomada precisa de --frase: node narrar.mjs --frase 9 --tomada 3');
const tudo = args.includes('--tudo');

const frasesDe = {};
const mexidas = [];
let mantidas = 0;
for (const f of todas) {
  const a = antes(f);
  const existe = Boolean(a?.ficheiro) && existsSync(join(pasta, 'audio', a.ficheiro));
  let e;
  if (alvo === f && tomadaPedida) { e = escolher(f, Number(tomadaPedida)); mexidas.push({ f, e }); }
  else if (alvo ? alvo === f || !existe : tudo || !existe || a.assinatura !== assinar(f.dito)) { e = await gerar(f); mexidas.push({ f, e }); }
  else { e = a; mantidas++; }
  (frasesDe[f.passo] ??= []).push(e);
}

const duracoes = {};
for (const passo of guiao.passos) {
  const frases = frasesDe[passo.id] ?? [];
  duracoes[passo.id] = { segundos: Number(frases.reduce((s, x) => s + x.segundos, 0).toFixed(3)), caracteres: passo.narracao.length, frases };
}
escreverJson('audio/duracoes.json', duracoes);

const todasAsFrases = Object.values(duracoes).flatMap((d) => d.frases);
const total = todasAsFrases.reduce((s, x) => s + x.segundos, 0);
console.log(`\nNarração: ${total.toFixed(1)} s, ${todas.length} frases, motor ${motor}${motor === 'piper' ? `, fala a ${opcoes.length_scale}x` : ''}. Refeitas ou trocadas agora: ${mexidas.length}; mantidas: ${mantidas}.`);
for (const { f, e } of mexidas) {
  const espaco = espacoGravado(f);
  const cabe = espaco === null ? '' : e.segundos + 0.15 <= espaco ? `; cabe nos ${espaco.toFixed(1)} s gravados` : `; NÃO cabe nos ${espaco.toFixed(1)} s gravados`;
  console.log(`  ${String(f.numero).padStart(3)}  ${f.passo}/${f.n + 1}  tomada ${e.tomada} de ${e.tomadas}, ${e.segundos.toFixed(2)} s${e.fimCortado ? ', fim cortado pelo modelo' : ''}${e.ruidoRetirado ? ', ruído retirado' : ''}${cabe}`);
}
console.log(`Fins que o modelo cortou e levaram desvanecer longo: ${todasAsFrases.filter((x) => x.fimCortado).length} de ${todas.length}. Ruído retirado antes da fala: ${todasAsFrases.filter((x) => x.ruidoRetirado).length} de ${todas.length}.`);
const avisos = todas.flatMap((f) => f.avisos.map((a) => `frase ${f.numero} (${f.passo}/${f.n + 1}): ${a}`));
if (avisos.length) {
  console.log('\nPronúncia a rever (reescreve em português, ou ensina com --ensinar "termo=como se diz"):');
  for (const a of avisos) console.log(`  ${a}`);
}
if (mexidas.length && existsSync(join(pasta, 'gravacao/tempos.json'))) {
  const naoCabe = mexidas.some(({ f, e }) => { const s = espacoGravado(f); return s !== null && e.segundos + 0.15 > s; });
  console.log(naoCabe ? '\nHá frases que não cabem no tempo gravado: corre node gravar.mjs e depois node montar.mjs.' : '\nTudo cabe no tempo gravado: basta node montar.mjs.');
}
