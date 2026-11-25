// Gera um ficheiro de áudio por frase do guião, para a gravação poder encaixar cada frase no
// momento certo. Por omissão usa o Piper em português (voz pt_PT, local e gratuita) e o Kokoro em
// inglês (local e gratuito, pacote kokoro-js); com "motorVoz": "azure" usa o Azure AI Speech
// (variáveis AZURE_SPEECH_KEY e AZURE_SPEECH_REGION). Num guião com várias línguas, cada corrida
// narra uma: --lingua en (ou LINGUA=en); sem ela, a primeira de "linguas".
//
//   node narrar.mjs                              narra o que falta ou mudou; o resto fica como está
//   node narrar.mjs --tudo                       narra tudo outra vez
//   node narrar.mjs --lista                      lista as frases, numeradas como na folha de escuta
//   node narrar.mjs --frase 9                    gera tomadas novas só para a frase 9 (ou 05-resultados/1)
//   node narrar.mjs --frase 9 --tomada 3         fica com a tomada 3 da frase 9, sem gerar nada
//   node narrar.mjs --ensinar "CSV=cê ésse vê"   aprende uma pronúncia e refaz as frases que a usam
//   node narrar.mjs --vozes                      diz a primeira frase com cada voz gratuita, para escolher de ouvido
//   node narrar.mjs --lacuna 9 fim-cortado       guarda uma lacuna da frase 9 em voz.json e refaz o que ela toca
//   node narrar.mjs --lacuna 9 estrangeirismo "Commons=cómons"
//
// Cada frase passa por cinco cuidados, porque uma voz sintética crua nota-se:
// 1. Pronúncia: siglas, endereços e termos estrangeiros dizem-se pelos dicionários de pronúncias
//    (as legendas ficam com o texto original); o que parecer estrangeirismo sem pronúncia dá aviso.
// 2. Várias tomadas (só Piper, que não é determinista): gera-se a frase várias vezes e fica a
//    tomada sem ruído no arranque, com o fim menos cortado e com a duração mais próxima da mediana.
//    As tomadas ficam em audio/tomadas/, para o ouvido de uma pessoa poder escolher outra.
// 3. Limpeza: corta-se o que vem antes da fala, entra-se e sai-se com um desvanecer curto, já no
//    silêncio (só um fim que o modelo cortou leva 20 ms de descida), e nivela-se o volume.
// 4. Ritmo da fala pelo formato: um teaser fala depressa, uma demonstração ou explicação não.
// 5. Ouvido: um reconhecimento de fala local (Whisper) transcreve cada tomada, e a escolha prefere a
//    que diz todas as palavras do texto; as frases a que ainda faltam palavras aparecem no fim.
//
// Com "motorVoz": "gravada", a voz é a de uma pessoa: as frases gravam-se antes com gravar-voz.mjs (em
// audio/gravada/) e este script só as limpa, nivela e confere, uma tomada por frase, sem pronúncias.
//
// Correções, da mais geral para a mais específica (a última ganha): pronuncias.json ao lado
// deste script (o da skill), ~/.start-project-with-trust/voz.json (as pronúncias que esta pessoa
// ensinou e as lacunas que apontou; o pronuncias.json pessoal antigo continua a ser lido) e
// "pronuncias" no guiao.json (só deste vídeo).
// Caminhos do Piper em PIPER_EXE, PIPER_MODELO e PIPER_ESPEAK; sem eles, usa ferramentas/piper/ na raiz do projeto.
import { execFileSync, execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { pasta, lerJson, escreverJson, lerWav, cabecalhoWav, dividirFrases, lerGuiao, lingua, naLingua, principal } from './comum.mjs';

const args = process.argv.slice(2);
const valor = (nome) => { const i = args.indexOf(nome); return i >= 0 ? args[i + 1] ?? null : null; };
const valores = (nome) => args.flatMap((a, i) => (a === nome && args[i + 1] ? [args[i + 1]] : []));
const falhar = (mensagem) => { console.error(mensagem); process.exit(1); };

const guiao = lerGuiao();
const emPortugues = lingua.startsWith('pt');
const MOTORES = ['piper', 'azure', 'kokoro', 'gravada'];
const motor = guiao.motorVoz ?? (emPortugues ? 'piper' : 'kokoro');
if (!MOTORES.includes(motor)) falhar(`Motor de voz desconhecido: ${motor}. Usa ${MOTORES.map((m) => `"${m}"`).join(', ')}.`);
if (motor === 'kokoro' && emPortugues) falhar('O Kokoro só tem português do Brasil. Em português de Portugal usa "piper" ou "azure".');
// Duração dos fonemas por formato. A voz portuguesa do Piper fala mais depressa do que as outras: a 1,08
// dizia cerca de 6,3 grupos de vogais por segundo, contra 4,2 do Kokoro em inglês, e numa demonstração
// ouvia-se apressada (teste de 2026-11-25). Por isso abranda mais. O Piper não abranda na proporção do
// valor, porque cada fonema curto arredonda para tramas de 11,6 ms: face a 1,08, o 1,2 deu 5% mais tempo,
// o 1,3 deu 11% e o 1,45 deu 21%. A 1,45 a primeira sílaba passou a perder-se mais («Cada» em 7 tomadas
// de 8, «Aqui» em 6 de 8; a 1,2 saíam bem), por isso a fala fica em 1,3 e o resto vem das pausas do estúdio.
const FALA = motor === 'piper' && emPortugues
  ? { teaser: 1.2, demonstracao: 1.3, explicacao: 1.4 }
  : { teaser: 1.0, demonstracao: 1.08, explicacao: 1.12 };
const opcoes = { length_scale: FALA[guiao.formato] ?? FALA.demonstracao, noise_w: 0.6, noise_scale: 0.667, tomadas: 4, ...guiao.vozOpcoes };
const nTomadas = motor === 'piper' ? Math.max(1, opcoes.tomadas) : 1;
const VOZ_POR_OMISSAO = { piper: emPortugues ? 'pt_PT-tugao-medium' : 'en_GB-cori-high', azure: emPortugues ? 'pt-PT-RaquelNeural' : 'en-GB-SoniaNeural', kokoro: 'af_heart' };
const vozAtual = guiao.voz ?? VOZ_POR_OMISSAO[motor];
const AUDIO = naLingua('audio');
const SUFIXO = principal ? '' : ` --lingua ${lingua}`; // para os comandos que o script sugere

// --- 1. Pronúncia ---------------------------------------------------------------------------
const DIC_SKILL = join(pasta, 'pronuncias.json');
const DIC_PESSOAL = join(homedir(), '.start-project-with-trust', 'pronuncias.json'); // o formato antigo, só lido
const VOZ_PESSOAL = join(homedir(), '.start-project-with-trust', 'voz.json');
const lerDicionario = (f) => (existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {});
const vozPessoal = { pronuncias: {}, lacunas: [], ...lerDicionario(VOZ_PESSOAL) };
function guardarVoz() {
  const pronuncias = Object.fromEntries(Object.entries(vozPessoal.pronuncias).sort(([a], [b]) => a.localeCompare(b, 'pt')));
  mkdirSync(dirname(VOZ_PESSOAL), { recursive: true });
  writeFileSync(VOZ_PESSOAL, JSON.stringify({ ...vozPessoal, pronuncias }, null, 2) + '\n');
}
const separar = (par, opcao) => {
  const corte = par.indexOf('=');
  if (corte < 1 || corte === par.length - 1) falhar(`${opcao} espera "termo=como se diz" e recebeu «${par}».`);
  return [par.slice(0, corte).trim(), par.slice(corte + 1).trim()];
};
// As pronúncias pessoais de português ficam em "pronuncias" (como sempre); as das outras línguas em
// "pronunciasPorLingua", para «INE=iné» não ir parar a uma narração em inglês.
const pessoaisDaLingua = () => (emPortugues ? vozPessoal.pronuncias : ((vozPessoal.pronunciasPorLingua ??= {})[lingua] ??= {}));
const ensinadas = valores('--ensinar').map((par) => separar(par, '--ensinar'));
if (ensinadas.length) {
  for (const [termo, dito] of ensinadas) pessoaisDaLingua()[termo] = dito;
  guardarVoz();
  console.log(`Aprendi que ${ensinadas.map(([t, d]) => `«${t}» se diz «${d}»`).join(', ')}. Ficou em ${VOZ_PESSOAL}`);
}

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
  if (!emPortugues) {
    // Em inglês: «dados.gov.pt» diz-se «dados dot gov dot P T». Os avisos de estrangeirismo são só do português.
    dito = dito.replace(/(?<![\p{L}\p{N}@])((?:[a-z0-9-]+\.)+[a-z]{2,})(?![\p{L}\p{N}])/giu, (endereco) =>
      endereco.split('.').map((parte, i, todas) => (i === todas.length - 1 && parte.length === 2 ? parte.toUpperCase().split('').join(' ') : parte)).join(' dot '));
    return { dito, avisos };
  }
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
    todas.push({ numero: todas.length + 1, passo: passo.id, n, chave: `${passo.id}-${n + 1}`, texto });
  }
}
function encontrar(ref) {
  const r = String(ref).trim();
  const f = /^\d+$/.test(r) ? todas[Number(r) - 1] : todas.find((x) => x.chave === r.replace('/', '-'));
  if (!f) falhar(`Não encontrei a frase «${ref}». Usa o número da folha de escuta ou "passo/frase", por exemplo ${todas[0].passo}/1.`);
  return f;
}
// --- Lacunas que esta pessoa apontou (voz.json) ---------------------------------------------
// Cada defeito ouvido fica como regra para os vídeos seguintes: "diz" muda o que a voz diz e
// "tomadas" dá mais tomadas às frases onde ele aparece. Sem "voz", vale para todas as vozes;
// sem "termo", para todas as frases.
const TIPOS = ['pronuncia', 'estrangeirismo', 'palavra-comida', 'entoacao', 'fim-cortado', 'ruido'];
const ultimaPalavra = (t) => (t.match(/[\p{L}\p{N}'-]+/gu) ?? []).at(-1) ?? '';
const iLacuna = args.indexOf('--lacuna');
if (iLacuna >= 0) {
  const f = encontrar(args[iLacuna + 1] ?? '');
  const tipo = args[iLacuna + 2];
  if (!TIPOS.includes(tipo)) falhar(`--lacuna espera a frase e o tipo (${TIPOS.join(', ')}), por exemplo: node narrar.mjs --lacuna 9 fim-cortado`);
  const extra = args[iLacuna + 3]?.startsWith('--') ? undefined : args[iLacuna + 3];
  const [termo, diz] = extra?.includes('=') ? separar(extra, '--lacuna') : [extra ?? (tipo === 'fim-cortado' ? ultimaPalavra(f.texto) : undefined), undefined];
  if (['pronuncia', 'estrangeirismo', 'entoacao'].includes(tipo) && !diz) falhar(`Uma lacuna de ${tipo} diz como se corrige: node narrar.mjs --lacuna ${f.numero} ${tipo} "termo=como se diz"`);
  if (tipo === 'palavra-comida' && !termo) falhar(`Diz que palavra foi comida: node narrar.mjs --lacuna ${f.numero} palavra-comida palavra`);
  if (termo && !fronteira(termo).test(f.texto)) falhar(`A frase ${f.numero} não tem «${termo}»: «${f.texto}»`);
  const semVoz = ['pronuncia', 'estrangeirismo'].includes(tipo);
  const lacuna = {
    tipo,
    voz: semVoz ? undefined : vozAtual,
    lingua: semVoz && !emPortugues ? lingua : undefined,
    termo,
    ...(diz ? { diz } : { tomadas: 8 }),
    visto: `${guiao.nome ?? 'vídeo'}, frase ${f.numero}, ${new Date().toISOString().slice(0, 10)}`,
  };
  vozPessoal.lacunas = [...vozPessoal.lacunas.filter((l) => !(l.tipo === tipo && l.voz === lacuna.voz && l.termo === termo)), lacuna];
  guardarVoz();
  console.log(`Guardei a lacuna (${tipo}${termo ? `, «${termo}»` : ''}${diz ? `, dito «${diz}»` : ', mais tomadas'}${lacuna.voz ? `, voz ${lacuna.voz}` : ''}) em ${VOZ_PESSOAL}. Vale para este vídeo e para os seguintes.`);
}
// Uma lacuna sem voz (pronúncia, estrangeirismo) é da língua em que foi apontada; as antigas, sem língua, são do português.
const lacunas = vozPessoal.lacunas.filter((l) => (l.voz ? l.voz === vozAtual : (l.lingua ?? 'pt') === lingua));
const aplicaSe = (l, f) => !l.termo || (l.tipo === 'fim-cortado' ? ultimaPalavra(f.texto).toLowerCase() === l.termo.toLowerCase() : fronteira(l.termo).test(f.texto));
const PRONUNCIAS = {
  ...(emPortugues ? { ...lerDicionario(DIC_SKILL), ...lerDicionario(DIC_PESSOAL) } : {}),
  ...pessoaisDaLingua(),
  ...Object.fromEntries(lacunas.filter((l) => l.diz).map((l) => [l.termo, l.diz])),
  ...guiao.pronuncias,
};
for (const f of todas) {
  Object.assign(f, motor === 'gravada' ? { dito: f.texto, avisos: [] } : comoSeDiz(f.texto));
  f.tomadas = motor === 'piper' ? Math.max(nTomadas, ...lacunas.filter((l) => l.tomadas && aplicaSe(l, f)).map((l) => l.tomadas)) : 1;
}

// Uma frase só se refaz quando muda aquilo que a voz diz ou a maneira de o dizer, e também quando uma
// lacuna lhe pede mais tomadas. Sem lacunas, a assinatura fica a de sempre e nada se refaz.
const reforco = new Map(todas.filter((f) => f.tomadas > nTomadas).map((f) => [f.dito, f.tomadas]));
// Numa voz gravada, a assinatura é a do ficheiro: gravar a frase outra vez obriga a tratá-la de novo.
const gravacaoDe = (f) => join(pasta, AUDIO, 'gravada', `${f.chave}.wav`);
const carimbo = (f) => (existsSync(gravacaoDe(f)) ? `${statSync(gravacaoDe(f)).size}:${statSync(gravacaoDe(f)).mtimeMs}` : 'sem gravação');
const assinar = (f) => createHash('sha1').update((motor === 'gravada' ? [f.dito, motor, carimbo(f)] : [f.dito, motor, guiao.voz ?? '', opcoes.length_scale, opcoes.noise_w, opcoes.noise_scale, ...(reforco.has(f.dito) ? [reforco.get(f.dito)] : [])]).join('|')).digest('hex').slice(0, 12);

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
  // Onde se corta: mais longe do que a fala forte, enquanto houver som acima de −50 dB colado a ela.
  // As vogais finais átonas e os «s» do português ficam muitas vezes abaixo de −37 dB, e cortar ali come-os.
  let iniCorte = ini; while (iniCorte > 0 && rel[iniCorte - 1] > -50) iniCorte--;
  let fimCorte = fim; while (fimCorte < rel.length - 1 && rel[fimCorte + 1] > -50) fimCorte++;
  return { n, env, rel, ini, fim, iniCorte, fimCorte, ruidoAntes, nivelFim, cauda, abrupto: cauda < 40 && nivelFim > -32, fala: (fim - ini + 1) * 0.005 };
}

const ALVO_RMS = 0.1 * 32768; // -20 dBFS na fala
const ALVO_PICO = 0.84 * 32767; // -1,5 dBFS
function limpar(s, taxa, a) {
  // Os desvaneceres ficam nas margens, fora da fala: antes cortava-se 10 ms depois do fim forte e o
  // desvanecer de 30 ms (90 ms num fim cortado) comia o fim das palavras.
  const antesDaFala = Math.round(taxa * 0.015), depoisDaFala = Math.round(taxa * 0.04);
  const de = Math.max(0, a.iniCorte * a.n - antesDaFala);
  const ate = Math.min(s.length, (a.fimCorte + 1) * a.n + depoisDaFala);
  const f = Float64Array.from(s.subarray(de, ate));
  const nEntrada = Math.min(f.length, Math.round(taxa * 0.012));
  for (let i = 0; i < nEntrada; i++) f[i] *= 0.5 * (1 - Math.cos((Math.PI * i) / nEntrada));
  // Quando o modelo corta a última vogal, o desvanecer começa 20 ms antes do corte e dá-lhe uma descida curta
  // (60 ms); nos outros casos fica todo no silêncio a seguir à fala.
  const nSaida = Math.min(f.length, Math.round(taxa * (a.abrupto ? 0.06 : 0.04)));
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
mkdirSync(join(pasta, AUDIO), { recursive: true });

// O Piper 2023.11 em Windows não lê caminhos com acentos. Converte para o nome curto 8.3, que só tem ASCII.
function caminhoAscii(caminho) {
  if (process.platform !== 'win32' || /^[\x00-\x7F]*$/.test(caminho)) return caminho;
  return execSync(`cmd /c for %I in ("${caminho}") do @echo %~sI`, { encoding: 'utf8' }).trim();
}

const pipers = {}; // um por voz: o --vozes usa a do Piper mesmo quando o guião narra com outra
// PIPER_MODELO só vale para a voz com o mesmo nome; as outras vozes procuram-se em ferramentas/piper/.
function caminhosPiper(voz) {
  const exe = process.env.PIPER_EXE ?? resolve(pasta, '../../ferramentas/piper/piper/piper.exe');
  const doAmbiente = process.env.PIPER_MODELO;
  const modelo = doAmbiente && basename(doAmbiente).startsWith(voz) ? doAmbiente : resolve(pasta, `../../ferramentas/piper/${voz}.onnx`);
  const espeak = process.env.PIPER_ESPEAK ?? join(dirname(exe), 'espeak-ng-data');
  return { exe, modelo, espeak };
}
function prepararPiper(voz) {
  const { exe, modelo, espeak } = caminhosPiper(voz);
  for (const f of [exe, modelo, espeak]) if (!existsSync(f)) falhar(`Não encontrei ${f}. Define PIPER_EXE, PIPER_MODELO e PIPER_ESPEAK.`);
  // O nome curto esconde a extensão .onnx, por isso o ficheiro de configuração vai explícito.
  // Sem silêncio no fim: vê-se assim se o modelo deixou a frase acabar ou a cortou.
  return {
    exe: caminhoAscii(exe), pastaAudio: caminhoAscii(join(pasta, AUDIO)),
    args: ['--model', caminhoAscii(modelo), '--config', caminhoAscii(`${modelo}.json`), '--espeak_data', caminhoAscii(espeak), '--sentence_silence', '0',
      '--length_scale', String(opcoes.length_scale), '--noise_w', String(opcoes.noise_w), '--noise_scale', String(opcoes.noise_scale)],
  };
}
function tomadaPiper(dito, nome, voz = vozAtual) {
  const piper = (pipers[voz] ??= prepararPiper(voz));
  execFileSync(piper.exe, [...piper.args, '--output_file', join(piper.pastaAudio, nome)], { input: dito + '\n', stdio: ['pipe', 'ignore', 'inherit'] });
  return lerWav(join(pasta, AUDIO, nome));
}

// Azure AI Speech, API REST de texto para voz. A chave só vem do ambiente.
async function tomadaAzure(dito, nome, voz = vozAtual) {
  const chave = process.env.AZURE_SPEECH_KEY, regiao = process.env.AZURE_SPEECH_REGION;
  if (!chave || !regiao) falhar('Faltam as variáveis de ambiente AZURE_SPEECH_KEY e AZURE_SPEECH_REGION.');
  const xml = dito.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const idioma = voz.split('-').slice(0, 2).join('-'); // pt-PT-RaquelNeural → pt-PT
  const r = await fetch(`https://${regiao}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: { 'Ocp-Apim-Subscription-Key': chave, 'Content-Type': 'application/ssml+xml', 'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm', 'User-Agent': 'gravacao-video' },
    body: `<speak version='1.0' xml:lang='${idioma}'><voice name='${voz}'>${xml}</voice></speak>`,
  });
  if (!r.ok) throw new Error(`O Azure respondeu ${r.status}: ${(await r.text()).slice(0, 300)}`);
  writeFileSync(join(pasta, AUDIO, nome), Buffer.from(await r.arrayBuffer()));
  return lerWav(join(pasta, AUDIO, nome));
}

// Kokoro-82M (Apache-2.0), local, pelo pacote kokoro-js. Só inglês e outras línguas sem pt-PT.
// Na primeira vez descarrega o modelo do Hugging Face (q8, cerca de 90 MB); depois corre sem rede, em CPU.
let kokoro = null;
async function tomadaKokoro(dito, nome, voz = vozAtual) {
  if (!kokoro) {
    let KokoroTTS;
    try { ({ KokoroTTS } = await import('kokoro-js')); } catch { falhar('Falta o pacote kokoro-js no projeto: npm i kokoro-js (licença Apache-2.0).'); }
    kokoro = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'q8', device: 'cpu' });
  }
  // Ritmo pelo formato: uma demonstração fala 8% mais devagar.
  const r = await kokoro.generate(dito, { voice: voz, speed: Number((1 / opcoes.length_scale).toFixed(3)) });
  const s = new Int16Array(r.audio.length);
  for (let i = 0; i < s.length; i++) s[i] = Math.max(-32768, Math.min(32767, Math.round(r.audio[i] * 32767)));
  gravarWav(join(pasta, AUDIO, nome), s, r.sampling_rate);
  return lerWav(join(pasta, AUDIO, nome));
}
const tomada = (m, dito, nome, voz) => (m === 'piper' ? Promise.resolve(tomadaPiper(dito, nome, voz)) : m === 'azure' ? tomadaAzure(dito, nome, voz) : tomadaKokoro(dito, nome, voz));

// --- Ouvir as tomadas -----------------------------------------------------------------------
// Um modelo de reconhecimento de fala local (Whisper, pesos com licença MIT, pelo pacote
// @huggingface/transformers) transcreve cada tomada, e conta-se quantas palavras do texto lá estão.
// Apanha as palavras comidas a meio da frase, que a duração e o envelope não mostram. Sem o pacote,
// ou com "vozOpcoes": { "ouvir": false }, o script segue sem esta verificação e diz que a saltou.
let reconhecedor;
async function prepararOuvido() {
  if (reconhecedor !== undefined) return reconhecedor;
  if (opcoes.ouvir === false) return (reconhecedor = null);
  try {
    const { pipeline } = await import('@huggingface/transformers');
    reconhecedor = await pipeline('automatic-speech-recognition', opcoes.modeloOuvido ?? 'onnx-community/whisper-small', { dtype: 'q8', device: 'cpu' });
  } catch (erro) {
    const falta = erro?.code === 'ERR_MODULE_NOT_FOUND';
    console.warn(`Aviso: sem verificação das palavras ditas (${falta ? 'falta o pacote: npm i @huggingface/transformers, licença Apache-2.0' : String(erro?.message ?? erro).split('\n')[0]}).`);
    reconhecedor = null;
  }
  return reconhecedor;
}
const LINGUA_WHISPER = { pt: 'portuguese', en: 'english', es: 'spanish', fr: 'french' };
function para16k(s, taxa) {
  const n = Math.floor((s.length * 16000) / taxa);
  const f = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i * taxa) / 16000, j = Math.floor(x), p = x - j;
    f[i] = ((s[j] ?? 0) * (1 - p) + (s[j + 1] ?? 0) * p) / 32768;
  }
  return f;
}
const palavrasDe = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
// 1 menos a distância de edição em palavras, a dividir pelas palavras esperadas: 1 é tudo dito.
function semelhanca(esperado, ouvido) {
  const a = palavrasDe(esperado), b = palavrasDe(ouvido);
  if (!a.length) return 1;
  let antes = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const agora = [i];
    for (let j = 1; j <= b.length; j++) agora[j] = Math.min(antes[j] + 1, agora[j - 1] + 1, antes[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    antes = agora;
  }
  return Math.max(0, 1 - antes[b.length] / a.length);
}
// Compara com o texto do guião e com o que a voz diz (números e endereços escrevem-se de maneiras diferentes).
async function ouvir(f, limpo, taxa) {
  const r = await prepararOuvido();
  if (!r) return {};
  let saida;
  try {
    saida = await r(para16k(limpo, taxa), { language: LINGUA_WHISPER[lingua.slice(0, 2)], task: 'transcribe' });
  } catch (erro) {
    console.warn(`Aviso: o reconhecimento de fala falhou (${String(erro?.message ?? erro).split('\n')[0]}); sigo sem ele.`);
    reconhecedor = null;
    return {};
  }
  const ouvido = String(saida?.text ?? '').trim();
  // A primeira palavra pesa mais: o Piper arranca a frase sem rampa e, em cerca de metade das tomadas, o «b»
  // de «Basta» ou o «v» de «Vemos» saem fracos, e quem ouve diz que a frase vem cortada no início.
  const primeiraOuvida = palavrasDe(ouvido)[0];
  const primeira = [f.texto, f.dito].some((t) => palavrasDe(t)[0] === primeiraOuvida);
  return { ouvido, primeira, semelhanca: Number(Math.max(semelhanca(f.texto, ouvido), semelhanca(f.dito, ouvido)).toFixed(2)) };
}

// --- Tomadas --------------------------------------------------------------------------------
const pastaTomadas = (f) => join(pasta, AUDIO, 'tomadas', f.chave);
const entrada = (f, t, total) => ({
  texto: f.texto, dito: f.dito === f.texto ? undefined : f.dito, ficheiro: `${f.chave}.wav`, segundos: t.segundos, taxa: t.taxa, canais: 1,
  tomada: t.k, tomadas: total, fimCortado: t.fimCortado || undefined, ruidoRetirado: t.ruidoRetirado || undefined,
  ouvido: t.ouvido, semelhanca: t.semelhanca, primeiraPorOuvir: t.primeira === false || undefined, assinatura: assinar(f),
});

// Gera as tomadas de uma frase, limpa-as, ouve-as, guarda-as todas e fica com a que tem menos defeitos:
// primeiro as palavras que faltam, depois o fim cortado e o ruído, e por fim a duração mais próxima da
// mediana (uma tomada curta engoliu sílabas).
async function gerar(f) {
  rmSync(pastaTomadas(f), { recursive: true, force: true });
  mkdirSync(pastaTomadas(f), { recursive: true });
  const tomadas = [];
  // Se nenhuma das primeiras tomadas do Piper diz o texto todo, ou nenhuma diz a primeira palavra, vêm mais 4
  // (só uma vez): ele não é determinista, e a mesma frase pode sair inteira à quinta ou à sexta.
  const melhorSemelhanca = () => Math.max(...tomadas.map((t) => t.semelhanca ?? 1));
  const semPrimeira = () => tomadas.every((t) => t.primeira === false);
  for (let k = 1; k <= f.tomadas || (motor === 'piper' && k <= f.tomadas + 4 && (melhorSemelhanca() < 0.85 || semPrimeira())); k++) {
    const tomadaCrua = '_tomada.wav';
    const wav = motor === 'gravada' ? lerWav(gravacaoDe(f)) : await tomada(motor, f.dito, tomadaCrua);
    if (wav.canais !== 1) throw new Error(`Esperava áudio mono em ${f.chave}`);
    const s = amostras(wav);
    const a = analisar(s, wav.taxa);
    const limpo = limpar(s, wav.taxa, a);
    gravarWav(join(pastaTomadas(f), `${k}.wav`), limpo, wav.taxa);
    rmSync(join(pasta, AUDIO, tomadaCrua), { force: true });
    const { ouvido, primeira, semelhanca: sem } = await ouvir(f, limpo, wav.taxa);
    tomadas.push({ k, taxa: wav.taxa, segundos: Number((limpo.length / wav.taxa).toFixed(3)), fala: a.fala, fimCortado: a.abrupto, ruidoRetirado: a.ruidoAntes > -45, ouvido, primeira, semelhanca: sem });
  }
  const ordenadas = tomadas.map((t) => t.fala).sort((x, y) => x - y);
  const mediana = ordenadas[Math.floor(ordenadas.length / 2)];
  // Cada palavra em falta pesa mais do que um fim cortado: 10% de palavras a menos valem 1,5 defeitos. A
  // primeira palavra mal ouvida vale 3, por cima disso: é a que dá a sensação de frase cortada.
  const defeitos = (t) => (t.semelhanca === undefined ? 0 : (1 - t.semelhanca) * 15) + (t.primeira === false ? 3 : 0) + (t.fimCortado ? 2 : 0) + (t.ruidoRetirado ? 1 : 0) + (Math.abs(t.fala - mediana) / mediana) * 4;
  const melhor = tomadas.reduce((m, t) => (defeitos(t) < defeitos(m) ? t : m));
  escreverJson(`${AUDIO}/tomadas/${f.chave}/tomadas.json`, { assinatura: assinar(f), dito: f.dito, escolhida: melhor.k, tomadas });
  copyFileSync(join(pastaTomadas(f), `${melhor.k}.wav`), join(pasta, AUDIO, `${f.chave}.wav`));
  return entrada(f, melhor, tomadas.length);
}

// Fica com uma tomada já guardada, escolhida de ouvido.
function escolher(f, k) {
  const indice = `${AUDIO}/tomadas/${f.chave}/tomadas.json`;
  if (!existsSync(join(pasta, indice))) falhar(`A frase ${f.numero} (${f.chave}) não tem tomadas guardadas. Gera-as com: node narrar.mjs --frase ${f.numero}`);
  const guardadas = lerJson(indice);
  const t = guardadas.tomadas.find((x) => x.k === k);
  if (!t) falhar(`A frase ${f.numero} tem as tomadas 1 a ${guardadas.tomadas.length}; pediste a ${k}.`);
  if (guardadas.assinatura !== assinar(f)) falhar(`As tomadas guardadas da frase ${f.numero} são de outro texto ou de outra voz. Gera-as de novo com: node narrar.mjs --frase ${f.numero}`);
  copyFileSync(join(pastaTomadas(f), `${k}.wav`), join(pasta, AUDIO, `${f.chave}.wav`));
  escreverJson(indice, { ...guardadas, escolhida: k });
  return entrada(f, t, guardadas.tomadas.length);
}

// A frase nova cabe no tempo que a gravação lhe deu? Se não couber, é preciso gravar outra vez.
function espacoGravado(f) {
  if (!existsSync(join(pasta, naLingua('gravacao/tempos.json')))) return null;
  const tempos = lerJson(naLingua('gravacao/tempos.json'));
  const linha = tempos.passos.flatMap((p) => p.frases.map((x) => ({ chave: `${p.id}-${x.n + 1}`, em: x.em })));
  const i = linha.findIndex((x) => x.chave === f.chave);
  if (i < 0) return null;
  const fim = linha[i + 1]?.em ?? tempos.fechoEm;
  let espaco = fim - linha[i].em;
  for (const x of tempos.esperas ?? []) { const a = Math.max(x.de, linha[i].em), b = Math.min(x.ate, fim); if (b > a) espaco -= b - a; }
  return espaco / 1000;
}

// --- Narrar ---------------------------------------------------------------------------------
const anteriores = existsSync(join(pasta, AUDIO, 'duracoes.json')) ? lerJson(`${AUDIO}/duracoes.json`) : {};
const antes = (f) => anteriores[f.passo]?.frases?.[f.n];

if (args.includes('--lista')) {
  for (const f of todas) {
    const a = antes(f);
    console.log(`${String(f.numero).padStart(3)}  ${f.passo}/${f.n + 1}  ${a?.tomada ? `tomada ${a.tomada} de ${a.tomadas}` : 'por narrar'}  «${f.texto}»${f.dito === f.texto ? '' : `\n     dito como: «${f.dito}»`}`);
  }
  process.exit(0);
}

// Vozes gratuitas que os motores deste script sabem usar, por língua. Uma voz nova só entra aqui
// depois de a entrada de voz confirmar a língua e a licença (passo 3 da skill). Em inglês ficam de
// fora as vozes do Piper com dataset não comercial (semaine) ou sem licença no cartão (alan, jenny_dioco).
const VOZES_GRATUITAS = emPortugues ? [
  { motor: 'piper', voz: 'pt_PT-tugao-medium' },
  { motor: 'azure', voz: 'pt-PT-RaquelNeural' },
  { motor: 'azure', voz: 'pt-PT-DuarteNeural' },
  { motor: 'azure', voz: 'pt-PT-FernandaNeural' },
] : [
  { motor: 'kokoro', voz: 'af_heart' },
  { motor: 'kokoro', voz: 'af_bella' },
  { motor: 'kokoro', voz: 'bf_emma' },
  { motor: 'kokoro', voz: 'bm_george' },
  { motor: 'kokoro', voz: 'bm_fable' },
  { motor: 'piper', voz: 'en_GB-cori-high' },
  { motor: 'azure', voz: 'en-GB-SoniaNeural' },
  { motor: 'azure', voz: 'en-GB-RyanNeural' },
];
if (args.includes('--vozes')) {
  const f = todas[0];
  mkdirSync(join(pasta, AUDIO, 'vozes'), { recursive: true });
  console.log(`Frase de teste: «${f.texto}»`);
  for (const { motor: m, voz } of VOZES_GRATUITAS) {
    if (m === 'azure' && !(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION)) { console.log(`  ${voz}: saltada, faltam AZURE_SPEECH_KEY e AZURE_SPEECH_REGION`); continue; }
    if (m === 'piper' && !existsSync(caminhosPiper(voz).modelo)) { console.log(`  ${voz}: saltada, falta o modelo em ${caminhosPiper(voz).modelo}`); continue; }
    const nome = join('vozes', `${voz}.wav`);
    const wav = await tomada(m, f.dito, nome, voz);
    const s = amostras(wav);
    gravarWav(join(pasta, AUDIO, nome), limpar(s, wav.taxa, analisar(s, wav.taxa)), wav.taxa);
    console.log(`  ${voz} (${m}): ${AUDIO}/vozes/${voz}.wav`);
  }
  console.log(`\nOuve cada uma e põe a escolhida em "motorVoz" e "voz" no guiao.json (com várias línguas, por língua: { "pt": ..., "en": ... }); depois corre node narrar.mjs${SUFIXO}.`);
  process.exit(0);
}

const alvo = valor('--frase') ? encontrar(valor('--frase')) : null;
const tomadaPedida = valor('--tomada');
if (tomadaPedida && !alvo) falhar('--tomada precisa de --frase: node narrar.mjs --frase 9 --tomada 3');
const tudo = args.includes('--tudo');
if (motor === 'gravada') {
  const faltam = todas.filter((f) => !existsSync(gravacaoDe(f)));
  if (faltam.length) falhar(`Faltam gravar ${faltam.length} de ${todas.length} frases (${faltam.map((f) => f.numero).join(', ')}). Grava-as com: node gravar-voz.mjs${SUFIXO}`);
}

const frasesDe = {};
const mexidas = [];
let mantidas = 0;
for (const f of todas) {
  const a = antes(f);
  const existe = Boolean(a?.ficheiro) && existsSync(join(pasta, AUDIO, a.ficheiro));
  let e;
  if (alvo === f && tomadaPedida) { e = escolher(f, Number(tomadaPedida)); mexidas.push({ f, e }); }
  else if (alvo ? alvo === f || !existe : tudo || !existe || a.assinatura !== assinar(f)) { e = await gerar(f); mexidas.push({ f, e }); }
  else { e = a; mantidas++; }
  (frasesDe[f.passo] ??= []).push(e);
}

const duracoes = {};
for (const passo of guiao.passos) {
  const frases = frasesDe[passo.id] ?? [];
  duracoes[passo.id] = { segundos: Number(frases.reduce((s, x) => s + x.segundos, 0).toFixed(3)), caracteres: passo.narracao.length, frases };
}
escreverJson(`${AUDIO}/duracoes.json`, duracoes);

const todasAsFrases = Object.values(duracoes).flatMap((d) => d.frases);
const total = todasAsFrases.reduce((s, x) => s + x.segundos, 0);
console.log(`\nNarração: ${total.toFixed(1)} s, ${todas.length} frases, motor ${motor}${motor === 'piper' ? `, fala a ${opcoes.length_scale}x` : ''}. Refeitas ou trocadas agora: ${mexidas.length}; mantidas: ${mantidas}.`);
for (const { f, e } of mexidas) {
  const espaco = espacoGravado(f);
  const cabe = espaco === null ? '' : e.segundos + 0.15 <= espaco ? `; cabe nos ${espaco.toFixed(1)} s gravados` : `; NÃO cabe nos ${espaco.toFixed(1)} s gravados`;
  console.log(`  ${String(f.numero).padStart(3)}  ${f.passo}/${f.n + 1}  tomada ${e.tomada} de ${e.tomadas}, ${e.segundos.toFixed(2)} s${e.fimCortado ? ', fim cortado pelo modelo' : ''}${e.ruidoRetirado ? ', ruído retirado' : ''}${cabe}`);
}
if (lacunas.length) console.log(`Lacunas do voz.json para esta voz: ${lacunas.length}; tocam ${todas.filter((f) => lacunas.some((l) => aplicaSe(l, f))).length} de ${todas.length} frases.`);
console.log(`Fins que o modelo cortou e levaram desvanecer longo: ${todasAsFrases.filter((x) => x.fimCortado).length} de ${todas.length}. Ruído retirado antes da fala: ${todasAsFrases.filter((x) => x.ruidoRetirado).length} de ${todas.length}.`);
// Palavras: o que o reconhecimento de fala ouviu na tomada escolhida, quando lhe faltam palavras do texto.
const ouvidas = todas.map((f) => ({ f, e: frasesDe[f.passo]?.[f.n] })).filter(({ e }) => e?.semelhanca !== undefined);
if (ouvidas.length) {
  const faltas = ouvidas.filter(({ e }) => e.semelhanca < 0.9);
  console.log(`Palavras ouvidas pelo reconhecimento de fala: ${ouvidas.length - faltas.length} de ${ouvidas.length} frases com o texto todo.`);
  for (const { f, e } of faltas) console.log(`  frase ${f.numero} (${f.passo}/${f.n + 1}), ${Math.round(e.semelhanca * 100)}%: ouvido «${e.ouvido}». Confirma de ouvido; se faltar mesmo uma palavra: node narrar.mjs${SUFIXO} --lacuna ${f.numero} palavra-comida <palavra>`);
  const semPrimeira = ouvidas.filter(({ e }) => e.primeiraPorOuvir);
  console.log(`Primeira palavra ouvida: ${ouvidas.length - semPrimeira.length} de ${ouvidas.length} frases.${semPrimeira.length ? ` Sem ela na tomada escolhida: ${semPrimeira.map(({ f }) => f.numero).join(', ')}; ouve o arranque destas frases.` : ''}`);
} else if (mexidas.length) console.log('Palavras: não verificadas (sem reconhecimento de fala nesta corrida).');
const avisos = todas.flatMap((f) => f.avisos.map((a) => `frase ${f.numero} (${f.passo}/${f.n + 1}): ${a}`));
if (avisos.length) {
  console.log('\nPronúncia a rever (reescreve em português, ou ensina com --ensinar "termo=como se diz"):');
  for (const a of avisos) console.log(`  ${a}`);
}
if (mexidas.length && existsSync(join(pasta, naLingua('gravacao/tempos.json')))) {
  const naoCabe = mexidas.some(({ f, e }) => { const s = espacoGravado(f); return s !== null && e.segundos + 0.15 > s; });
  console.log(naoCabe ? `\nHá frases que não cabem no tempo gravado: corre node gravar.mjs${SUFIXO} e depois node montar.mjs${SUFIXO}.` : `\nTudo cabe no tempo gravado: basta node montar.mjs${SUFIXO}.`);
}
