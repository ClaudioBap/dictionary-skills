import { chaveModelo, ID_FORNECEDOR, validarModeloManual } from "./inventario.mjs";

const PAPEIS = [
  { id: "planeador", nome: "Planeia" },
  { id: "executor", nome: "Executa" },
  { id: "verificador", nome: "Verifica" },
];
const ACESSOS = { subscricao: "subscrição", api: "chave de API", local: "modelo local" };
// Um modelo e vários: «sonnet, disponível», «sonnet e haiku, disponíveis».
const ESTADOS = {
  disponivel: ["disponível", "disponíveis"],
  indisponivel: ["indisponível", "indisponíveis"],
  "por-verificar": ["por verificar", "por verificar"],
};
const FORNECEDORES = { claude: "Claude", codex: "Codex", ollama: "Ollama", vibe: "Vibe", local: "Local" };
const POLITICA = "A política de dados do projeto ainda não permite usar este fornecedor.";

const nomeDoFornecedor = (id) => FORNECEDORES[id] ?? id.charAt(0).toUpperCase() + id.slice(1);
const juntar = (nomes) => (nomes.length < 2 ? nomes.join("") : `${nomes.slice(0, -1).join(", ")} e ${nomes.at(-1)}`);
const comPonto = (texto) => (/[.!?]$/.test(texto) ? texto : `${texto}.`);

function mostrarModelo(modelo, permitidos) {
  const politica = !permitidos.has(modelo.fornecedor);
  const impedimento = politica
    ? POLITICA
    : modelo.estado !== "disponivel" || !modelo.modelo
      ? modelo.motivo ?? "Confirma o modelo e a disponibilidade da ligação."
      : null;
  const modos = ["manual", "delegar"].filter((modo) => modelo.capacidades.includes(modo));
  const papeis = impedimento || !modos.length
    ? []
    : PAPEIS.filter((papel) => modelo.capacidades.includes(papel.id));
  const fornecedor = nomeDoFornecedor(modelo.fornecedor);
  // «Ollama deste PC» já diz o fornecedor; «Principal» não.
  const ligacao = modelo.ligacao.startsWith(fornecedor) ? modelo.ligacao : `${fornecedor}, ${modelo.ligacao}`;
  const origem = `${ligacao} (${ACESSOS[modelo.acesso]})`;
  const detalhe = [...new Set([modelo.motivo, impedimento].filter(Boolean).map(comPonto))];
  return {
    id: chaveModelo(modelo),
    ...modelo,
    origem,
    detalhe,
    linha: descrever(origem, modelo.modelo ? [modelo.modelo] : [], modelo.estado, detalhe),
    papeis,
    modos: papeis.length ? modos.map((modo) => modo === "delegar" ? "delegada" : modo) : [],
  };
}

function descrever(origem, nomes, estado, detalhe) {
  const [um, varios] = ESTADOS[estado];
  const corpo = nomes.length
    ? `${juntar(nomes)}, ${nomes.length > 1 ? varios : um}`
    : estado === "por-verificar" ? "modelos por verificar" : um;
  return [`${origem}: ${corpo}.`, ...detalhe].join(" ");
}

/** Uma linha por ligação e estado, com os modelos dela: cada dado aparece uma vez. */
function linhasDosModelos(modelos) {
  const grupos = new Map();
  for (const m of modelos) {
    const chave = JSON.stringify([m.fornecedor, m.conta, m.acesso, m.estado, m.detalhe]);
    if (!grupos.has(chave)) grupos.set(chave, { ...m, nomes: [] });
    if (m.modelo) grupos.get(chave).nomes.push(m.modelo);
  }
  return [...grupos.values()].map((g) => `- ${descrever(g.origem, g.nomes, g.estado, g.detalhe)}`);
}

export function perguntasDoInventario(inventario, { permitidos = [], nivel = null, perguntaAutonomia = [] } = {}) {
  const autorizados = new Set(permitidos);
  const modelos = inventario.modelos.map((modelo) => mostrarModelo(modelo, autorizados));
  const elegiveis = modelos.filter((modelo) => modelo.papeis.length);
  const { nome, motivo, estado } = inventario.portal;
  const fonte = inventario.origem === "ligacoes"
    ? `Ligações${nome ? `, na máquina ${nome},` : ""}`
    : "a configuração deste PC";
  const linhas = modelos.length
    ? [`Consultei ${fonte} e encontrei estes modelos:`, ...linhasDosModelos(modelos)]
    : [`Não encontrei modelos em ${fonte}. Verifica a configuração e volta a carregar a lista.`];
  // A linha seguinte já diz que a lista vem deste PC; aqui fica só porquê e o que fazer.
  const avisoPortal = estado === "indisponivel"
    ? [[motivo ? `Não consegui usar Ligações. ${comPonto(motivo)}` : "O portal está indisponível.",
        "Podes verificar a ligação e atualizar a lista."].join(" ")]
    : [];
  const modos = new Set(elegiveis.flatMap((modelo) => modelo.modos));
  const opcoesPapeis = [{ id: "personalizar", nome: "Escolher papéis por modelo", acoes: "Também podes deixar de fora os modelos que não queres usar." }];
  const planeadores = elegiveis.filter(({ papeis }) => papeis.some(({ id }) => id === "planeador"));
  const executores = elegiveis.filter(({ papeis }) => papeis.some(({ id }) => id === "executor"));
  if (planeadores.some((planeador) => executores.some((executor) => executor.id !== planeador.id)))
    opcoesPapeis.unshift({ id: "separar", nome: "Um planeia e outro executa", acoes: "Escolhe e confirma o modelo para cada papel." });
  if (planeadores.length > 1 && executores.length)
    opcoesPapeis.splice(-1, 0, { id: "planear-em-conjunto", nome: "Dois planeiam", acoes: "Escolhe os modelos que planeiam e quem executa o plano conjunto." });
  return {
    ...inventario,
    modelos,
    autonomia: nivel,
    perguntas: [
      {
        id: "confirmar_modelos",
        pergunta: "Tens aqui todos os modelos que queres usar neste trabalho?",
        mensagem: [
          ...avisoPortal,
          ...linhas,
          "Depois de confirmares os modelos, vou preparar um plano para a tua aprovação. O plano mostra quem planeia, executa e verifica, e como é aberta cada sessão.",
        ].join("\n"),
      },
      ...perguntaAutonomia,
      ...(elegiveis.length ? [{
        id: "papeis_modelos",
        pergunta: "Que papel terá cada modelo neste trabalho?",
        modelos: elegiveis.map(({ id, papeis, modos }) => ({ id, papeis, modos })),
        opcoes: opcoesPapeis,
      }, {
        id: "abertura_sessoes",
        pergunta: "Quem abre e conduz as sessões?",
        opcoes: [
          ...(modos.has("manual") ? [{ id: "manual", nome: "Manual", acoes: "Abres ou escolhes uma sessão, recebes o briefing e entregas o resultado." }] : []),
          ...(modos.has("delegada") ? [{ id: "delegada", nome: "Delegada", acoes: "Ao aprovares o plano, o agente abre as sessões compatíveis quando estiverem prontas." }] : []),
          ...(modos.has("manual") && modos.has("delegada")
            ? [{ id: "mista", nome: "Mista", acoes: "Escolhes o modo de abertura para cada sessão." }] : []),
        ],
      }] : []),
    ],
  };
}

export function opcoesDoInventario(args) {
  const opcoes = { permitidos: [], manuais: [] };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--local") opcoes.soLocal = true;
    else if (arg === "--agente" && args[i + 1]) opcoes.caminho = args[++i];
    else if (arg === "--permitir" && args[i + 1]) {
      const permitidos = args[++i].split(",");
      if (!permitidos.every((id) => ID_FORNECEDOR.test(id))) throw new Error("Identificador de fornecedor inválido.");
      opcoes.permitidos.push(...permitidos);
    } else if (arg === "--modelo-manual" && args.length >= i + 5) {
      const modelo = validarModeloManual(...args.slice(i + 1, i + 5));
      if (!modelo) throw new Error("Usa --modelo-manual <fornecedor> <conta> <subscricao|api|local> <modelo>.");
      opcoes.manuais.push(modelo);
      i += 4;
    } else throw new Error("Opção de inventário inválida ou incompleta.");
  }
  return opcoes;
}
