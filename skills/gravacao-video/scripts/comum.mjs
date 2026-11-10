// Funções partilhadas pelos scripts de gravação, narração e montagem.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const pasta = dirname(fileURLToPath(import.meta.url));

export function lerJson(nome) {
  return JSON.parse(readFileSync(join(pasta, nome), 'utf8'));
}

export function escreverJson(nome, dados) {
  mkdirSync(dirname(join(pasta, nome)), { recursive: true });
  writeFileSync(join(pasta, nome), JSON.stringify(dados, null, 2) + '\n');
}

// Divide a narração de um passo em frases: por «|» se o guião o usar, senão pela pontuação final.
export function dividirFrases(texto) {
  const partes = texto.includes('|') ? texto.split('|') : texto.split(/(?<=[.!?…])\s+/);
  return partes.map((s) => s.trim()).filter(Boolean);
}

// WAV PCM 16 bits. Devolve a taxa, os canais e os bytes de amostras.
export function lerWav(caminho) {
  const b = readFileSync(caminho);
  if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WAVE') {
    throw new Error(`Não é um WAV: ${caminho}`);
  }
  let pos = 12;
  let taxa = 0, canais = 0, bits = 0, dados = null;
  while (pos + 8 <= b.length) {
    const id = b.toString('ascii', pos, pos + 4);
    const tamanho = b.readUInt32LE(pos + 4);
    const inicio = pos + 8;
    if (id === 'fmt ') {
      canais = b.readUInt16LE(inicio + 2);
      taxa = b.readUInt32LE(inicio + 4);
      bits = b.readUInt16LE(inicio + 14);
    } else if (id === 'data') {
      dados = b.subarray(inicio, Math.min(inicio + tamanho, b.length));
    }
    pos = inicio + tamanho + (tamanho % 2);
  }
  if (!dados) throw new Error(`WAV sem bloco data: ${caminho}`);
  if (bits !== 16) throw new Error(`Esperava 16 bits, veio ${bits}: ${caminho}`);
  const segundos = dados.length / (taxa * canais * 2);
  return { taxa, canais, dados, segundos };
}

export function cabecalhoWav(taxa, canais, bytesDados) {
  const h = Buffer.alloc(44);
  h.write('RIFF', 0, 'ascii');
  h.writeUInt32LE(36 + bytesDados, 4);
  h.write('WAVE', 8, 'ascii');
  h.write('fmt ', 12, 'ascii');
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20);
  h.writeUInt16LE(canais, 22);
  h.writeUInt32LE(taxa, 24);
  h.writeUInt32LE(taxa * canais * 2, 28);
  h.writeUInt16LE(canais * 2, 32);
  h.writeUInt16LE(16, 34);
  h.write('data', 36, 'ascii');
  h.writeUInt32LE(bytesDados, 40);
  return h;
}
