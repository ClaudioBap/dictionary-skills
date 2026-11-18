// Zip e partes OOXML (Word, Excel, PowerPoint) sem dependências: o que os scripts de documentação precisam.
import { deflateRawSync, inflateRawSync } from 'node:zlib';
import { posix } from 'node:path';

const TABELA_CRC = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  TABELA_CRC[n] = c >>> 0;
}

export function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = TABELA_CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function dataDos(d) {
  return {
    hora: (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1),
    dia: ((Math.max(1980, d.getFullYear()) - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate(),
  };
}

/**
 * Escreve um zip. As imagens já vêm comprimidas: com `comprimir: false` ficam guardadas tal como estão.
 * @param {{ nome: string, dados: Buffer|string, comprimir?: boolean }[]} entradas
 * @returns {Buffer}
 */
export function escreverZip(entradas, data = new Date()) {
  const { hora, dia } = dataDos(data);
  const partes = [], centrais = [];
  let pos = 0;
  for (const e of entradas) {
    const nome = Buffer.from(e.nome, 'utf8');
    const dados = Buffer.isBuffer(e.dados) ? e.dados : Buffer.from(e.dados, 'utf8');
    const metodo = e.comprimir === false ? 0 : 8;
    const corpo = metodo ? deflateRawSync(dados) : dados;
    const crc = crc32(dados);
    const flags = /[^\x20-\x7e]/.test(e.nome) ? 0x0800 : 0; // nome em UTF-8

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(flags, 6);
    local.writeUInt16LE(metodo, 8);
    local.writeUInt16LE(hora, 10);
    local.writeUInt16LE(dia, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(corpo.length, 18);
    local.writeUInt32LE(dados.length, 22);
    local.writeUInt16LE(nome.length, 26);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(flags, 8);
    central.writeUInt16LE(metodo, 10);
    central.writeUInt16LE(hora, 12);
    central.writeUInt16LE(dia, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(corpo.length, 20);
    central.writeUInt32LE(dados.length, 24);
    central.writeUInt16LE(nome.length, 28);
    central.writeUInt32LE(pos, 42);

    partes.push(local, nome, corpo);
    centrais.push(central, nome);
    pos += 30 + nome.length + corpo.length;
  }
  const diretorio = Buffer.concat(centrais);
  const fim = Buffer.alloc(22);
  fim.writeUInt32LE(0x06054b50, 0);
  fim.writeUInt16LE(entradas.length, 8);
  fim.writeUInt16LE(entradas.length, 10);
  fim.writeUInt32LE(diretorio.length, 12);
  fim.writeUInt32LE(pos, 16);
  return Buffer.concat([...partes, diretorio, fim]);
}

/**
 * Lê um zip pelo diretório central. Aceita entradas comprimidas (deflate) e guardadas; confirma o CRC de cada uma.
 * @returns {Map<string, Buffer>} nome da entrada -> conteúdo
 */
export function lerZip(buf) {
  let fim = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 22 - 0xffff); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { fim = i; break; }
  }
  if (fim < 0) throw new Error('não é um zip (falta o fim do diretório central)');
  const total = buf.readUInt16LE(fim + 10);
  let p = buf.readUInt32LE(fim + 16);
  const entradas = new Map();
  for (let n = 0; n < total; n++) {
    if (p + 46 > buf.length || buf.readUInt32LE(p) !== 0x02014b50) throw new Error('diretório central corrompido');
    const flags = buf.readUInt16LE(p + 8);
    const metodo = buf.readUInt16LE(p + 10);
    const crc = buf.readUInt32LE(p + 16);
    const tamanhoComprimido = buf.readUInt32LE(p + 20);
    const tamanho = buf.readUInt32LE(p + 24);
    const nNome = buf.readUInt16LE(p + 28), nExtra = buf.readUInt16LE(p + 30), nComentario = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const nome = buf.toString(flags & 0x0800 ? 'utf8' : 'latin1', p + 46, p + 46 + nNome);
    p += 46 + nNome + nExtra + nComentario;

    if (local + 30 > buf.length || buf.readUInt32LE(local) !== 0x04034b50) throw new Error(`cabeçalho local corrompido: ${nome}`);
    // O cabeçalho local pode ter um campo extra diferente do central: vale o dele.
    const inicio = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const corpo = buf.subarray(inicio, inicio + tamanhoComprimido);
    let dados;
    if (metodo === 0) dados = Buffer.from(corpo);
    else if (metodo === 8) dados = inflateRawSync(corpo);
    else throw new Error(`método de compressão ${metodo} não suportado: ${nome}`);
    if (dados.length !== tamanho || crc32(dados) !== crc) throw new Error(`conteúdo corrompido (CRC ou tamanho): ${nome}`);
    if (!nome.endsWith('/')) entradas.set(nome, dados);
  }
  return entradas;
}

const ENTIDADES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };

// Escapa texto e atributos. Tira os caracteres de controlo que o XML 1.0 não aceita.
export const esc = (s) => String(s ?? '')
  .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f￾￿]/g, '')
  .replace(/[&<>"]/g, (c) => ENTIDADES[c]);

export const desesc = (s) => String(s ?? '').replace(/&(amp|lt|gt|quot|apos|#\d+|#x[\da-fA-F]+);/g, (_, e) => {
  if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
  return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }[e];
});

// Atributos de uma etiqueta: 'a="1" b:c="2"' -> { a: '1', 'b:c': '2' }
export function atributos(texto) {
  const out = {};
  for (const m of String(texto).matchAll(/([\w.:-]+)\s*=\s*("([^"]*)"|'([^']*)')/g)) out[m[1]] = desesc(m[3] ?? m[4]);
  return out;
}

export const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';

const BASE_REL = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/';
export const REL = {
  documento: BASE_REL + 'officeDocument',
  estilos: BASE_REL + 'styles',
  definicoes: BASE_REL + 'settings',
  numeracao: BASE_REL + 'numbering',
  cabecalho: BASE_REL + 'header',
  rodape: BASE_REL + 'footer',
  imagem: BASE_REL + 'image',
  ligacao: BASE_REL + 'hyperlink',
  folha: BASE_REL + 'worksheet',
  textos: BASE_REL + 'sharedStrings',
};

/**
 * @param {Record<string,string>} predefinidos  extensão -> tipo
 * @param {Record<string,string>} partes        '/caminho/da/parte.xml' -> tipo
 */
export function tiposDeConteudo(predefinidos, partes) {
  return XML + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
    + Object.entries(predefinidos).map(([ext, tipo]) => `<Default Extension="${esc(ext)}" ContentType="${esc(tipo)}"/>`).join('')
    + Object.entries(partes).map(([parte, tipo]) => `<Override PartName="${esc(parte)}" ContentType="${esc(tipo)}"/>`).join('')
    + '</Types>';
}

/** @param {{ id: string, tipo: string, alvo: string, externo?: boolean }[]} lista */
export function relacoes(lista) {
  return XML + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
    + lista.map((r) => `<Relationship Id="${esc(r.id)}" Type="${esc(r.tipo)}" Target="${esc(r.alvo)}"${r.externo ? ' TargetMode="External"' : ''}/>`).join('')
    + '</Relationships>';
}

// Caminho das relações de uma parte: word/document.xml -> word/_rels/document.xml.rels
export function caminhoDasRelacoes(parte) {
  const i = parte.lastIndexOf('/');
  return i < 0 ? `_rels/${parte}.rels` : `${parte.slice(0, i)}/_rels/${parte.slice(i + 1)}.rels`;
}

/**
 * Relações de uma parte já lida, com o alvo interno resolvido para o nome da entrada no zip.
 * @returns {{ id: string, tipo: string, alvo: string, externo: boolean, parte: string|null }[]}
 */
export function lerRelacoes(zip, parte) {
  const rels = zip.get(caminhoDasRelacoes(parte));
  if (!rels) return [];
  const pasta = parte.includes('/') ? parte.slice(0, parte.lastIndexOf('/')) : '';
  const out = [];
  for (const m of rels.toString('utf8').matchAll(/<Relationship\b([^>]*?)\/?>/g)) {
    const a = atributos(m[1]);
    const externo = a.TargetMode === 'External';
    let alvoParte = null;
    if (!externo && a.Target) {
      alvoParte = a.Target.startsWith('/') ? a.Target.slice(1) : posix.normalize(posix.join(pasta, a.Target));
    }
    out.push({ id: a.Id, tipo: a.Type, alvo: a.Target, externo, parte: alvoParte });
  }
  return out;
}

/**
 * Verificação simples de XML bem formado: etiquetas abrem e fecham pela ordem, há uma só raiz,
 * os atributos estão entre aspas e os & são entidades.
 * @returns {string|null} a primeira falha, ou null
 */
export function erroDeXml(xml) {
  const re = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<\?[\s\S]*?\?>|<!DOCTYPE[^>]*>|<(\/?)([A-Za-z_][\w.:-]*)((?:\s+[A-Za-z_][\w.:-]*\s*=\s*(?:"[^"<]*"|'[^'<]*'))*)\s*(\/?)>|<|&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[\da-fA-F]+);)/g;
  const pilha = [];
  let raizes = 0;
  const linha = (i) => xml.slice(0, i).split('\n').length;
  for (const m of xml.matchAll(re)) {
    if (m[0] === '<') return `«<» sem etiqueta válida na linha ${linha(m.index)}`;
    if (m[0][0] === '&') return `«&» que não é entidade na linha ${linha(m.index)}`;
    if (!m[2]) continue;
    const [, fecho, nome, , vazia] = m;
    if (fecho) {
      const aberta = pilha.pop();
      if (aberta !== nome) return `</${nome}> fecha ${aberta ? `<${aberta}>` : 'nada'} na linha ${linha(m.index)}`;
    } else {
      if (!pilha.length) raizes++;
      if (!vazia) pilha.push(nome);
    }
  }
  if (pilha.length) return `<${pilha.at(-1)}> por fechar`;
  if (raizes !== 1) return raizes ? `${raizes} elementos na raiz` : 'sem elemento raiz';
  return null;
}
