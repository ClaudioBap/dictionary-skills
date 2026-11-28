import { pathToFileURL } from "node:url";
import { lerContas, PRINCIPAL } from "./fornecedores.mjs";

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

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const elegiveis = process.argv.slice(2).filter((id) => ["claude", "codex"].includes(id));
  const contas = [...new Set(elegiveis)].flatMap((fornecedor) => [
    { fornecedor, id: PRINCIPAL, nome: "Principal" },
    ...lerContas(fornecedor).map(({ id, nome }) => ({ fornecedor, id, nome })),
  ]);
  console.log(JSON.stringify(perguntasDaDelegacao(contas, process.env.CID_AUTONOMIA), null, 2));
}
