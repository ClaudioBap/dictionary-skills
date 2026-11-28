import { pathToFileURL } from "node:url";
import { lerContas, PRINCIPAL } from "./fornecedores.mjs";
import { obterInventario } from "./inventario.mjs";
import { opcoesDoInventario, perguntasDoInventario as perguntasBase } from "./perguntas-inventario.mjs";

export const NIVEIS = [
  { nome: "Só executar o aprovado", acoes: "Executa as tarefas aprovadas. Uma dúvida pára a tarefa.", pergunta: "Pede decisão antes de tudo o que está fora do plano, incluindo commit e push." },
  { nome: "Executar e registar", acoes: "Executa, faz commits no ramo de trabalho e regista o que precisa de decisão.", pergunta: "Agrupa as decisões para o fim do trabalho possível." },
  { nome: "Decidir o pequeno", acoes: "Também toma pequenas decisões dentro do plano e regista os pressupostos.", pergunta: "Pede decisões de arquitetura, orçamento, publicação e dados." },
  { nome: "Máxima", acoes: "Também pode integrar no ramo principal e publicar em QA quando os testes passam.", pergunta: "Pede autorização para produção e gastos quando essa autorização ainda não foi dada." },
];

export function perguntasDaDelegacao(contas, autonomia) {
  return [
    ...(NIVEIS.some((nivel) => nivel.nome === autonomia) ? [] : [{
      id: "autonomia", pergunta: "Que autonomia queres dar ao orquestrador neste trabalho?",
      recomendacao: "Executar e registar", opcoes: NIVEIS,
    }]),
    ...(contas.length < 2 ? [] : [{
      id: "papeis_contas", pergunta: "Como queres repartir o planeamento e a execução entre estas contas?",
      contas,
      opcoes: [
        { id: "separar", nome: "Uma planeia e outra executa", acoes: "A planeadora trabalha em leitura. A executora recebe o plano aprovado." },
        { id: "planear-em-conjunto", nome: "Ambas planeiam antes de executar", acoes: "As duas propõem e discutem. Escolhes quem executa o plano conjunto depois de o aprovares." },
        { id: "personalizar", nome: "Distribuir os papéis por conta", acoes: "Escolhes quem planeia, executa ou verifica." },
      ],
    }]),
  ];
}

/** As perguntas do inventário (perguntas-inventario.mjs), com a autonomia já escolhida ou a pergunta dela. */
export function perguntasDoInventario(inventario, { permitidos = [], autonomia } = {}) {
  return perguntasBase(inventario, {
    permitidos,
    nivel: NIVEIS.find((nivel) => nivel.nome === autonomia) ?? null,
    perguntaAutonomia: perguntasDaDelegacao([], autonomia),
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  if (args[0] === "--inventario") {
    try {
      const opcoes = opcoesDoInventario(args.slice(1));
      const inventario = await obterInventario(opcoes);
      console.log(JSON.stringify(perguntasDoInventario(inventario, {
        permitidos: opcoes.permitidos,
        autonomia: process.env.CID_AUTONOMIA,
      }), null, 2));
    } catch (erro) {
      console.error(erro.message);
      process.exitCode = 2;
    }
  } else {
    const elegiveis = args.filter((id) => ["claude", "codex"].includes(id));
    const contas = [...new Set(elegiveis)].flatMap((fornecedor) => [
      { fornecedor, id: PRINCIPAL, nome: "Principal" },
      ...lerContas(fornecedor).map(({ id, nome }) => ({ fornecedor, id, nome })),
    ]);
    console.log(JSON.stringify(perguntasDaDelegacao(contas, process.env.CID_AUTONOMIA), null, 2));
  }
}
