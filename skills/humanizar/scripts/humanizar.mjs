#!/usr/bin/env node
// Verificador de marcas de escrita e de construção de IA. Sem dependências.
// Uso: node humanizar.mjs <caminho...> [--json] [--commits N] [--incluir-conhecimento] [--permitir-emojis]
//      node humanizar.mjs --hook        (hook PostToolUse do Claude Code: lê o evento no stdin)
// Sai com 0 se não há achados e com 1 se há. Nunca altera ficheiros: a correção é decidida pelo utilizador.
// Cada achado diz onde está, o que é e o que uma pessoa faria no lugar.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, basename, resolve, relative } from 'node:path';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const valorDe = (f, d) => { const i = args.indexOf(f); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
const caminhos = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--commits');

const PROSA = new Set(['.md', '.mdx', '.txt', '.rst', '.adoc']);
const CODIGO = new Set(['.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.py', '.java', '.cs', '.go', '.rb', '.php', '.kt', '.swift', '.rs', '.sql', '.sh', '.ps1', '.vue', '.svelte']);
const INTERFACE = new Set(['.html', '.htm', '.vue', '.svelte', '.tsx', '.jsx', '.css', '.scss', '.less']);
const IGNORAR_PASTAS = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage', 'vendor', 'target', 'bin', 'obj', '.venv', '__pycache__']);
const EMOJI = /\p{Extended_Pictographic}/u;
const TESTE = /(^|[\\/])(test|tests|spec|specs|__tests__|fixtures|mocks?)([\\/]|$)|\.(test|spec)\.\w+$/i;

function listar(caminho) {
  const st = statSync(caminho);
  if (st.isFile()) return [caminho];
  const out = [];
  for (const nome of readdirSync(caminho)) {
    if (IGNORAR_PASTAS.has(nome)) continue;
    if (nome === 'knowledge' && !flag('--incluir-conhecimento')) continue;
    const p = join(caminho, nome);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...listar(p));
    else if (s.size < 2_000_000 && !/\.min\.(js|css)$/.test(nome) && !/lock\.(json|yaml)$|\.lock$/.test(nome)) out.push(p);
  }
  return out;
}

const achados = [];
const achado = (ficheiro, linha, id, categoria, gravidade, excerto, sugestao) => achados.push({ ficheiro, linha, id, categoria, gravidade, excerto: excerto.trim().slice(0, 110), sugestao });

// Para as verificações de prosa, tira-se o que não é texto do autor: código, URLs e citações entre «».
const limparProsa = (l) => l.replace(/<!--.*?-->/g, ' ').replace(/<!--|-->/g, ' ').replace(/`[^`]*`/g, ' ').replace(/https?:\/\/\S+/g, ' ').replace(/«[^»]*»/g, ' ').replace(/!\[[^\]]*\]\([^)]*\)/g, ' ');
const ehPortugues = (t) => /\b(não|também|utilizador|ficheiro|ação|opção|então|já|são)\b/i.test(t);

const BROCHURA_PT = /\b(crucial|fundamental|poderos[oa]s?|intuitiv[oa]s?|de ponta|potenciar|elevar|desbloquear|mergulhar|jornada|ecossistema|panorama|no mundo atual|em constante evolução|robust[oa]s?|sem complicações|revolucion\w+|inovador[ae]?s?|transformador[ae]?s?|impulsionar|alavancar|experiência fluida|sem esforço)\b/i;
const BROCHURA_EN = /\b(seamless(ly)?|robust|leverage|delve|unlock|elevate|journey|ecosystem|landscape|in today'?s (fast-paced )?world|cutting-edge|game-?changer|it'?s (important|worth) (to note|noting)|in summary|dive into|comprehensive|streamline|empower|harness|unleash|effortless(ly)?|best-in-class|state-of-the-art)\b/i;
const FORMULAS = /\b(é importante notar|em suma|vale a pena (referir|notar|mencionar)|de forma geral|em termos gerais|é de salientar|como (podemos|se pode) ver|dito isto|posto isto|não só [^.;\n]{1,40} mas também)\b/i;
const ASSISTENTE = /(^|\s)(Claro!|Ótima pergunta|Excelente pergunta|Se precisares de (mais )?alguma coisa|Espero que (isto )?ajude|Fico (à disposição|disponível)|Não hesites|Great question|Certainly!|I hope this helps|Feel free to|Let me know if)/i;
const NAO_E_X = /\b(não (é|são|se trata de) [^.;:\n]{2,50}, (é|são|trata-se de) |(isn'?t|is not|aren'?t) [^.;\n]{2,50}, (it'?s|it is|they'?re) )/i;
const RETORICA = /(^|[.!]\s+)[A-ZÁÉÍÓÚÂÊÔÃÕ][^.?!\n]{0,30}\?\s+[A-ZÁÉÍÓÚÂÊÔÃÕ]/;
const RESSALVAS = /\b(pode potencialmente|de certa forma|em certa medida|talvez possa|might possibly|to some extent|arguably)\b/i;
const PT_BR = /\b(você|vocês|tela|telas|arquivo|arquivos|usuário|usuária|usuários|gerenciar|gerenciamento|deletar|acessar|celular|cadastro|cadastrar|logar)\b/i;
const COPIA_GENERICA = /\b(Get Started|Learn More|Your Company|Acme( Inc| Corp)?|Welcome to|Comece agora|Saiba mais|Bem-vindo ao)\b/;
const PLACEHOLDER = /\b(lorem ipsum|john doe|jane doe|123 Main St|exemplo@exemplo|foo@bar\.com|000-000-0000)\b/i;
const COMENTARIO_NARRATIVO = /(\/\/|#|--)\s*(Define|Cria|Criar|Inicializa|Inicializar|Importa|Importar|Retorna|Retornar|Devolve|Chama|Chamar|Declara|Atribui|Incrementa|Percorre|Itera|Verifica se|Set|Sets|Get|Gets|Create|Creates|Initialize|Initializes|Import|Imports|Return|Returns|Call|Calls|Loop|Loops|Iterate|Iterates|Check if|Checks if|Declare|Increment)\b/;
const NOMES_GENERICOS = /\b(handleStuff|doSomething|doStuff|myVar|myFunction|foo|bar|baz|qux|temp\d*|tmp\d+|data\d|result\d|test123)\b/;
const LOG_FESTIVO = /(console\.\w+|print|logger?\.\w+|Console\.WriteLine|System\.out\.print\w*)\s*\([^)\n]*(\p{Extended_Pictographic}|Done!|Success!|Sucesso!|Concluído!)/u;
const CAIXA_ASCII = /^\s*(\/\/|#|\*|--|;)\s*[-=*_~#]{8,}\s*$|[┌┐└┘├┤│─═╔╗╚╝║]|^\s*\+[-+]{4,}\+\s*$/;
const PALETA = /#(6366f1|8b5cf6|a855f7|7c3aed|4f46e5|c084fc)\b|from-(purple|indigo|violet|fuchsia)-\d+|to-(pink|purple|fuchsia)-\d+|linear-gradient\([^)]*(purple|indigo|violet)/i;
const CENTRADO = /text-center|items-center|justify-center|mx-auto|text-align:\s*center|justify-content:\s*center|align-items:\s*center/g;
const CARTAO = /rounded-(xl|2xl|3xl)[^"'\n]*shadow|shadow-(lg|xl|2xl)[^"'\n]*rounded/g;
const HERO = /text-(4|5|6|7)xl[^"'\n]*font-(bold|extrabold)|font-(bold|extrabold)[^"'\n]*text-(4|5|6|7)xl/;
const ICONE_EMOJI = />\s*\p{Extended_Pictographic}/u;

function verificarFicheiro(ficheiro) {
  let texto;
  try { texto = readFileSync(ficheiro, 'utf8'); } catch { return; }
  if (/\u0000/.test(texto.slice(0, 1000))) return;
  const ext = extname(ficheiro).toLowerCase();
  const prosa = PROSA.has(ext);
  const codigo = CODIGO.has(ext);
  const interfaceWeb = INTERFACE.has(ext);
  const teste = TESTE.test(ficheiro);
  const pt = ehPortugues(texto);
  const linhas = texto.split(/\r?\n/);
  const nome = basename(ficheiro);

  let emCodigo = false;
  let seguidasBold = 0;
  let seguidasAlinhadas = 0;
  for (let i = 0; i < linhas.length; i++) {
    const bruto = linhas[i];
    const n = i + 1;
    if (prosa && /^\s*(```|~~~)/.test(bruto)) { emCodigo = !emCodigo; continue; }
    if (prosa && emCodigo) continue;
    const l = prosa ? limparProsa(bruto) : bruto;

    // Pontuação e símbolos (todos os meios)
    if (/\s[—–]\s|\w—\w/.test(l) && !/^\s*\|/.test(l)) {
      if (prosa && /^#{1,6}\s/.test(bruto)) achado(ficheiro, n, 'travessao-titulo', 'Pontuação', 'media', bruto, 'Título com travessão e subtítulo: um título só, ou dois pontos quando há mesmo um identificador.');
      else achado(ficheiro, n, 'travessao', 'Pontuação', 'alta', bruto, 'Liga as frases com vírgula, ponto, dois pontos ou parênteses.');
    }
    if (/[·•▪◦★✦]/.test(l)) achado(ficheiro, n, 'separador', 'Pontuação', 'alta', bruto, 'Separa com vírgula, barra ou quebra de linha; sem símbolos decorativos.');
    if (/[→⇒✓✔✗✨🚀⭐💡⚡]/u.test(l)) achado(ficheiro, n, 'simbolos', 'Pontuação', prosa ? 'media' : 'alta', bruto, 'Escreve a palavra («para», «feito», «falhou») ou usa um ícone do sistema de ícones do projeto.');
    else if (!flag('--permitir-emojis') && EMOJI.test(l)) achado(ficheiro, n, 'emoji', 'Pontuação', prosa ? 'media' : 'alta', bruto, 'Sem emojis em interfaces, logs, comentários e commits, salvo se o design do cliente os pedir.');

    if (prosa || (interfaceWeb && !codigo) || ext === '.html') {
      if (/(\.\.\.|…)\s*$/.test(l.trim()) && !/^\s*[-*]\s/.test(l)) achado(ficheiro, n, 'reticencias', 'Pontuação', 'media', bruto, 'Termina a frase com ponto; sem suspense.');
      if (prosa && /(^|[^!\[=])!(?![=\[(])/.test(l) && !/!important|!=/.test(l) && !/^\s*>\s*\*\*/.test(l)) achado(ficheiro, n, 'exclamacao', 'Pontuação', 'media', bruto, 'Em texto técnico, ponto final.');
    }

    // Fórmulas, brochura e aberturas de assistente (prosa, interface e commits)
    if (prosa || interfaceWeb) {
      const brochura = l.match(BROCHURA_PT) || l.match(BROCHURA_EN);
      if (brochura) achado(ficheiro, n, 'brochura', 'Fórmulas', 'media', bruto, `«${brochura[0]}» é palavra de brochura: diz o facto concreto ou corta.`);
      const formula = l.match(FORMULAS);
      if (formula) achado(ficheiro, n, 'formula', 'Fórmulas', 'alta', bruto, `«${formula[0]}» é fórmula feita: vai direto ao que queres dizer.`);
      const assistente = l.match(ASSISTENTE);
      if (assistente) achado(ficheiro, n, 'assistente', 'Fórmulas', 'alta', bruto, 'Sem aberturas nem fechos de assistente.');
      const naoE = l.match(NAO_E_X);
      if (naoE) achado(ficheiro, n, 'nao-e-x', 'Fórmulas', 'alta', bruto, 'Construção «não é X, é Y»: afirma só o que é.');
      if (prosa && RETORICA.test(l)) achado(ficheiro, n, 'retorica', 'Fórmulas', 'media', bruto, 'Pergunta retórica seguida da resposta: escreve a afirmação.');
      const ressalva = l.match(RESSALVAS);
      if (ressalva) achado(ficheiro, n, 'ressalvas', 'Fórmulas', 'media', bruto, `«${ressalva[0]}»: ou é, ou não é; se há incerteza, diz qual.`);
    }

    // Estrutura (prosa)
    if (prosa) {
      const titulo = l.match(/^#{1,6}\s+(.+?)\s*$/);
      if (titulo) {
        const palavras = titulo[1].replace(/[`*_\[\]()]/g, '').split(/\s+/).filter((p) => p.length > 3 && !/^(de|da|do|das|dos|e|a|o|em|com|para|por|the|and|of|to|for|in|on|with)$/i.test(p));
        const maiusculas = palavras.filter((p) => /^[A-ZÁÉÍÓÚÂÊÔÃÕ]/.test(p)).length;
        if (pt && palavras.length >= 3 && maiusculas / palavras.length >= 0.8 && titulo[1] !== titulo[1].toUpperCase()) achado(ficheiro, n, 'titulo-maiusculas', 'Estrutura', 'media', bruto, 'Título com maiúscula só na primeira palavra e nos nomes próprios.');
        if (/^[^:]{2,60}:\s+\S/.test(titulo[1])) achado(ficheiro, n, 'titulo-subtitulo', 'Estrutura', 'media', bruto, 'Título com dois pontos e subtítulo: escolhe um título só.');
      }
      if (/^\s*[-*]\s+\*\*[^*]{1,40}(:\*\*|\*\*:)\s/.test(bruto) && !/_por definir_/.test(bruto)) { seguidasBold++; if (seguidasBold === 3) achado(ficheiro, n - 2, 'lista-termo', 'Estrutura', 'media', linhas[i - 2], 'Lista com todos os itens em «**Termo:** explicação»: frases normais chegam.'); }
      else seguidasBold = 0;
      if ((bruto.match(/\*\*[^*]+\*\*/g) || []).length >= 4) achado(ficheiro, n, 'negrito', 'Estrutura', 'media', bruto, 'Negrito só onde ajuda a ler; aqui há quatro ou mais num só parágrafo.');
    }

    // Língua
    if ((prosa || interfaceWeb) && pt) {
      const br = l.match(PT_BR);
      if (br) achado(ficheiro, n, 'pt-br', 'Língua', 'media', bruto, `«${br[0]}» é português do Brasil; em português de Portugal, a palavra é outra (ficheiro, utilizador, ecrã, apagar, aceder, gerir).`);
    }

    // Código
    if (codigo) {
      if (COMENTARIO_NARRATIVO.test(bruto) && bruto.trim().length < 80) {
        const proxima = linhas.slice(i + 1).find((x) => x.trim()) || '';
        if (!/^\s*(\/\/|#|\*|--|\/\*)/.test(proxima)) achado(ficheiro, n, 'comentario-narrativo', 'Código', 'media', bruto, 'Comentário que narra a linha seguinte: apaga, ou explica o porquê.');
      }
      if (!teste && NOMES_GENERICOS.test(bruto)) achado(ficheiro, n, 'nome-generico', 'Código', 'media', bruto, 'Nome que não diz o que a coisa é: dá-lhe o nome do domínio.');
      if (LOG_FESTIVO.test(bruto)) achado(ficheiro, n, 'log-festivo', 'Código', 'alta', bruto, 'Log com emoji ou «Done!»: regista o facto, em texto simples.');
      if (CAIXA_ASCII.test(bruto)) achado(ficheiro, n, 'caixa-ascii', 'Código', 'alta', bruto, 'Separadores e caixas em ASCII: deixa a formatação ao formatter e aos títulos de secção.');
      if (/^\s*\S[^\n]*?\S {3,}[=:]\s*\S/.test(bruto) && !/^\s*(\/\/|#|\*)/.test(bruto)) { seguidasAlinhadas++; if (seguidasAlinhadas === 3) achado(ficheiro, n - 2, 'alinhado-a-mao', 'Código', 'media', linhas[i - 2], 'Alinhamento à mão com espaços: deixa ao formatter do projeto.'); }
      else seguidasAlinhadas = 0;
    }

    // Interface
    if (interfaceWeb) {
      if (PALETA.test(bruto)) achado(ficheiro, n, 'paleta-por-omissao', 'Interface', 'media', bruto, 'Roxo, índigo ou violeta com gradiente é a paleta por omissão das ferramentas: usa a paleta do cliente.');
      if (HERO.test(bruto)) achado(ficheiro, n, 'hero-generico', 'Interface', 'media', bruto, 'Título gigante em negrito: o tamanho do título segue a hierarquia do conteúdo, não o modelo de página inicial.');
      if (ICONE_EMOJI.test(bruto)) achado(ficheiro, n, 'icone-emoji', 'Interface', 'alta', bruto, 'Emoji como ícone: usa um só conjunto de ícones.');
      const copia = bruto.match(COPIA_GENERICA);
      if (copia) achado(ficheiro, n, 'copia-generica', 'Interface', 'media', bruto, `«${copia[0]}» é texto genérico: escreve o verbo da ação concreta, na língua do projeto.`);
    }

    // Dados de exemplo (todos os ficheiros fora de testes)
    if (!teste) {
      const ph = (prosa ? l : bruto).match(PLACEHOLDER);
      if (ph) achado(ficheiro, n, 'placeholder', 'Dados', 'alta', bruto, `«${ph[0]}» é texto de exemplo: usa dados reais ou dados de teste com nomes plausíveis do domínio.`);
    }
  }

  // Verificações ao ficheiro inteiro
  if ((prosa || interfaceWeb) && /«/.test(texto) && /[“”]/.test(texto)) achado(ficheiro, 1, 'aspas-mistas', 'Língua', 'media', `${nome}: «» e “” no mesmo ficheiro`, 'Uma só convenção de aspas no projeto.');
  if (codigo) {
    const funcs = texto.match(/^\s*(export\s+)?(async\s+)?function\s+\w+|^\s*def\s+\w+|^\s*(public|private|protected)\s+[\w<>\[\],\s]+\s+\w+\s*\(/gm) || [];
    const comDoc = (texto.match(/(\*\/|"""|'''|\/\/\/[^\n]*)\s*\n\s*(export\s+)?(async\s+)?(function\s+\w+|def\s+\w+|(public|private|protected)\s)/g) || []).length;
    if (funcs.length >= 5 && comDoc / funcs.length >= 0.8) achado(ficheiro, 1, 'doc-em-todas', 'Código', 'media', `${nome}: ${comDoc} de ${funcs.length} funções com comentário de cabeçalho`, 'Comentário de cabeçalho só onde acrescenta algo que o nome e a assinatura não dizem.');
    const relanca = texto.match(/catch\s*\((\w+)\)\s*\{\s*(console\.\w+|logger?\.\w+|log\.\w+)\([^;]*\);\s*throw\s+\1\s*;?\s*\}/) || texto.match(/except[^\n]*as\s+(\w+):\s*\n\s*(logger|logging|log)\.\w+\([^\n]*\)\s*\n\s*raise(\s+\1)?\s*(\n|$)/) || texto.match(/catch\s*\(\s*\w+\s+(\w+)\s*\)\s*\{\s*(_?logger|log|Console|System\.out)\.\w+\([^;]*\);\s*throw(\s+\1)?\s*;\s*\}/);
    if (relanca) { const n = texto.slice(0, relanca.index).split('\n').length; achado(ficheiro, n, 'catch-relanca', 'Código', 'alta', relanca[0].split('\n')[0], 'try/catch que só regista e relança: deixa o erro subir, ou trata-o de facto.'); }
  }
  if (interfaceWeb) {
    const centrados = (texto.match(CENTRADO) || []).length;
    if (centrados >= 8 && centrados / linhas.length >= 0.04) achado(ficheiro, 1, 'tudo-centrado', 'Interface', 'media', `${nome}: ${centrados} elementos centrados em ${linhas.length} linhas`, 'Quase tudo centrado é a marca de quem não decidiu o alinhamento. Alinha a uma grelha e ao conteúdo: uma coluna dominante, larguras que seguem o texto, elementos relacionados alinhados entre si.');
    const cartoes = (texto.match(CARTAO) || []).length;
    if (cartoes >= 5) achado(ficheiro, 1, 'cartoes-iguais', 'Interface', 'media', `${nome}: ${cartoes} cartões com sombra e cantos arredondados`, 'Grelha de cartões todos iguais: dá a cada bloco o tamanho e o peso que o conteúdo pede; sombra e cantos só onde separam de facto.');
  }
}

function verificarCommits(n) {
  let saida;
  try { saida = execFileSync('git', ['log', `-n${n}`, '--format=%h%x1f%s%x1f%b%x1e'], { encoding: 'utf8' }); } catch { return; }
  const commits = saida.split('\x1e').map((c) => c.trim()).filter(Boolean).map((c) => { const [hash, assunto, corpo = ''] = c.split('\x1f'); return { hash, assunto, corpo }; });
  let convencionais = 0;
  for (const c of commits) {
    if (/^(feat|fix|chore|docs|refactor|test|build|ci|perf|style)(\(.+\))?!?:/.test(c.assunto)) convencionais++;
    if (c.assunto.length > 72) achado('git', c.hash, 'commit-longo', 'Commits', 'media', c.assunto, 'Assunto do commit até 72 caracteres; o detalhe vai no corpo.');
    if (EMOJI.test(c.assunto + c.corpo)) achado('git', c.hash, 'commit-emoji', 'Commits', 'alta', c.assunto, 'Sem emojis nas mensagens de commit.');
    const itens = (c.corpo.match(/^\s*[-*]\s/gm) || []).length;
    if (itens >= 5) achado('git', c.hash, 'commit-lista', 'Commits', 'media', `${c.assunto} (${itens} itens no corpo)`, 'Corpo do commit em duas ou três frases sobre o sentido da mudança; a lista das alterações já está no diff.');
    const brochura = (c.assunto + ' ' + c.corpo).match(BROCHURA_PT) || (c.assunto + ' ' + c.corpo).match(BROCHURA_EN);
    if (brochura) achado('git', c.hash, 'commit-brochura', 'Commits', 'media', c.assunto, `«${brochura[0]}» num commit: diz o que mudou.`);
  }
  const racio = commits.length ? convencionais / commits.length : 0;
  if (commits.length >= 5 && racio > 0.2 && racio < 0.8) achado('git', '', 'commit-estilo-misto', 'Commits', 'media', `${convencionais} de ${commits.length} commits em estilo convencional`, 'Um só estilo de mensagem no repositório, o que lá estava antes.');
}

// Modo hook: lê o evento PostToolUse do Claude Code e verifica só o ficheiro escrito.
if (flag('--hook')) {
  let evento;
  try { evento = JSON.parse(readFileSync(0, 'utf8')); } catch { process.exit(0); }
  const ficheiro = String(evento?.tool_input?.file_path || '');
  if (!['Write', 'Edit', 'MultiEdit'].includes(evento?.tool_name) || !ficheiro || !existsSync(ficheiro)) process.exit(0);
  if (/([\\/])(knowledge|\.claude)([\\/])/.test(ficheiro)) process.exit(0);
  verificarFicheiro(ficheiro);
  if (achados.length) {
    process.stderr.write(`[humanizar] ${achados.length} marca(s) de escrita de IA em ${basename(ficheiro)}:\n` +
      achados.slice(0, 15).map((a) => `  - linha ${a.linha} [${a.id}] ${a.excerto}\n      ${a.sugestao}`).join('\n') +
      (achados.length > 15 ? `\n  (mais ${achados.length - 15})` : '') +
      `\nNão corrijas sem autorização: mostra os achados ao utilizador, por categoria, e pergunta o que corrigir.\n`);
    process.exit(2);
  }
  process.exit(0);
}

if (!caminhos.length && !args.includes('--commits')) {
  console.error('Uso: node humanizar.mjs <caminho...> [--json] [--commits N] [--incluir-conhecimento] [--permitir-emojis]');
  process.exit(2);
}
const ficheiros = caminhos.flatMap((c) => (existsSync(c) ? listar(resolve(c)) : (console.error(`Não existe: ${c}`), [])));
for (const f of ficheiros) verificarFicheiro(f);
if (args.includes('--commits')) verificarCommits(Number(valorDe('--commits', '20')) || 20);

if (flag('--json')) {
  const porCategoria = {};
  for (const a of achados) porCategoria[a.categoria] = (porCategoria[a.categoria] || 0) + 1;
  console.log(JSON.stringify({ ficheiros: ficheiros.length, achados, resumo: porCategoria }, null, 2));
  process.exit(achados.length ? 1 : 0);
}

if (!achados.length) { console.log(`✓ Sem marcas de escrita de IA em ${ficheiros.length} ficheiro(s).`); process.exit(0); }
const ordem = ['Pontuação', 'Fórmulas', 'Estrutura', 'Língua', 'Código', 'Interface', 'Dados', 'Commits'];
const ficheirosComAchados = new Set(achados.map((a) => a.ficheiro)).size;
console.log(`✗ ${achados.length} achado(s) em ${ficheirosComAchados} ficheiro(s). Nada foi alterado: decide por categoria o que corrigir.\n`);
for (const cat of ordem) {
  const lista = achados.filter((a) => a.categoria === cat);
  if (!lista.length) continue;
  console.log(`${cat} (${lista.length})`);
  for (const a of lista.slice(0, 40)) {
    const rel = a.ficheiro === 'git' ? '' : relative(process.cwd(), a.ficheiro);
    const onde = a.ficheiro === 'git' ? `commit ${a.linha}` : `${rel && !rel.startsWith('..') ? rel : a.ficheiro}:${a.linha}`;
    console.log(`  ${onde}  [${a.id}, ${a.gravidade}]  ${a.excerto}`);
    console.log(`      Uma pessoa: ${a.sugestao}`);
  }
  if (lista.length > 40) console.log(`  (mais ${lista.length - 40} nesta categoria)`);
  console.log('');
}
process.exit(1);
