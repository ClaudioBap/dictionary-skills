---
id: fiabilidade/operacao-padronizada-e-runbooks
titulo: "Operação padronizada e runbooks"
seccao: "Fiabilidade e resiliência"
paginas: []
fonte: "https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/checklist (ms.date 2026-02-11, atualizada a 2026-06-11); consultada a 2026-11-10. Não vem do PDF."
data_lancamento: 2026-02-11
confianca: alta
verificado_em: 2026-11-10
---

# Operação padronizada e runbooks

**Resumo:** As operações de rotina, pontuais e de emergência seguem procedimentos escritos e iguais para todos, apoiados em infraestrutura como código, monitorização e entregas seguras.

## Conteúdo

- OE:01: «Define your standard practices to develop and operate your workload.» Fonte: [Operational Excellence checklist (Azure Well-Architected)](https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/checklist)
- OE:02: «Use standardization as a way to make routine, ad-hoc, and emergency operations consistent and predictable.» Um runbook é a forma escrita dessa padronização: os passos de uma operação, prontos a seguir por quem não a conhece *(interpretação; as definições de runbook e playbook da AWS não foram lidas)*. Fonte: [Operational Excellence checklist](https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/checklist)
- OE:05: «Use a standardized infrastructure as code (IaC) approach to prepare resources and configurations.» Fonte: a mesma lista.
- OE:07: «Design a monitoring stack» que capte «operational telemetry, metrics, and logs». Fonte: a mesma lista.
- OE:08: processo de incidentes estruturado, com papéis e procedimentos documentados. Ver [Incidentes e postmortem sem culpa](incidentes-e-postmortem-sem-culpa.md).
- OE:11: «Clearly define your workload's safe deployment practices.» Inclui «Plan for both routine and emergency deployments.» Fonte: a mesma lista.
- Os restantes pontos da lista: OE:03 formalizar os processos de desenvolvimento, OE:04 ferramentas e processos, OE:06 cadeia de fornecimento da carga de trabalho, OE:09 testes, OE:10 automação. Fonte: a mesma lista.

**Para uma skill:** cada operação recorrente da plataforma (implantar, repor uma cópia, rodar um segredo, escalar) tem um runbook versionado no repositório que alguém que não o escreveu consegue seguir; a prova é a execução registada por essa pessoa.

## Ver também

- [Incidentes e postmortem sem culpa](incidentes-e-postmortem-sem-culpa.md) (Fiabilidade e resiliência)
- [Prontidão operacional e passagem](prontidao-operacional-e-passagem.md) (Fiabilidade e resiliência)
- [Testes no pipeline](../cicd/testes-no-pipeline.md) (CI/CD e ferramentas)
- [Registo de alterações (o sentido da mudança)](../estrutura/registo-de-alteracoes.md) (Estrutura e documentação)

Fonte: https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/checklist (ms.date 2026-02-11, atualizada a 2026-06-11); consultada a 2026-11-10. Não vem do PDF.
