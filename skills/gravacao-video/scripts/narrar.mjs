// Gera um ficheiro de áudio por frase do guião com o Piper (voz pt_PT), para a gravação poder
// encaixar cada frase no momento certo.
// Caminhos do Piper em PIPER_EXE, PIPER_MODELO e PIPER_ESPEAK; sem eles, usa ferramentas/piper/ na raiz do projeto.
import { execFileSync, execSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pasta, lerJson, escreverJson, lerWav, dividirFrases } from './comum.mjs';

const guiao = lerJson('guiao.json');
const voz = guiao.voz ?? 'pt_PT-tugao-medium';
const piper = process.env.PIPER_EXE ?? resolve(pasta, '../../ferramentas/piper/piper/piper.exe');
const modelo = process.env.PIPER_MODELO ?? resolve(pasta, `../../ferramentas/piper/${voz}.onnx`);
const espeak = process.env.PIPER_ESPEAK ?? join(dirname(piper), 'espeak-ng-data');

for (const f of [piper, modelo, espeak]) {
  if (!existsSync(f)) {
    console.error(`Não encontrei ${f}. Define PIPER_EXE, PIPER_MODELO e PIPER_ESPEAK.`);
    process.exit(1);
  }
}

// O Piper 2023.11 em Windows não lê caminhos com acentos. Converte para o nome curto 8.3, que só tem ASCII.
function caminhoAscii(caminho) {
  if (process.platform !== 'win32' || /^[\x00-\x7F]*$/.test(caminho)) return caminho;
  return execSync(`cmd /c for %I in ("${caminho}") do @echo %~sI`, { encoding: 'utf8' }).trim();
}

mkdirSync(join(pasta, 'audio'), { recursive: true });
const pastaAudio = caminhoAscii(join(pasta, 'audio'));

const duracoes = {};
for (const passo of guiao.passos) {
  const frases = [];
  for (const [n, texto] of dividirFrases(passo.narracao).entries()) {
    const ficheiro = `${passo.id}-${n + 1}.wav`;
    // O nome curto esconde a extensão .onnx, por isso o ficheiro de configuração vai explícito.
    // O silêncio no fim de cada frase fica curto: a pausa entre frases é a gravação que a decide.
    const args = ['--model', caminhoAscii(modelo), '--config', caminhoAscii(`${modelo}.json`), '--espeak_data', caminhoAscii(espeak), '--output_file', join(pastaAudio, ficheiro), '--sentence_silence', '0.1'];
    execFileSync(caminhoAscii(piper), args, {
      input: texto + '\n',
      stdio: ['pipe', 'ignore', 'inherit'],
    });
    const { segundos, taxa, canais } = lerWav(join(pasta, 'audio', ficheiro));
    frases.push({ texto, ficheiro, segundos: Number(segundos.toFixed(3)), taxa, canais });
  }
  const segundos = frases.reduce((s, f) => s + f.segundos, 0);
  duracoes[passo.id] = { segundos: Number(segundos.toFixed(3)), caracteres: passo.narracao.length, frases };
  console.log(`${passo.id}: ${segundos.toFixed(2)} s em ${frases.length} frase(s), ${passo.narracao.length} caracteres`);
}

escreverJson('audio/duracoes.json', duracoes);
const total = Object.values(duracoes).reduce((s, d) => s + d.segundos, 0);
console.log(`Total de narração: ${total.toFixed(1)} s`);
