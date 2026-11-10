// Gera um ficheiro de áudio por passo do guião com o Piper (voz pt_PT).
// Caminhos do Piper em PIPER_EXE, PIPER_MODELO e PIPER_ESPEAK; sem eles, usa ferramentas/piper/ na raiz do projeto.
import { execFileSync, execSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pasta, lerJson, escreverJson, lerWav } from './comum.mjs';

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
  const saida = join(pasta, 'audio', `${passo.id}.wav`);
  // O nome curto esconde a extensão .onnx, por isso o ficheiro de configuração vai explícito.
  const args = ['--model', caminhoAscii(modelo), '--config', caminhoAscii(`${modelo}.json`), '--espeak_data', caminhoAscii(espeak), '--output_file', join(pastaAudio, `${passo.id}.wav`), '--sentence_silence', '0.25'];
  execFileSync(caminhoAscii(piper), args, {
    input: passo.narracao + '\n',
    stdio: ['pipe', 'ignore', 'inherit'],
  });
  const { segundos, taxa, canais } = lerWav(saida);
  duracoes[passo.id] = { segundos: Number(segundos.toFixed(3)), taxa, canais, caracteres: passo.narracao.length };
  console.log(`${passo.id}: ${segundos.toFixed(2)} s, ${passo.narracao.length} caracteres`);
}

escreverJson('audio/duracoes.json', duracoes);
const total = Object.values(duracoes).reduce((s, d) => s + d.segundos, 0);
console.log(`Total de narração: ${total.toFixed(1)} s`);
