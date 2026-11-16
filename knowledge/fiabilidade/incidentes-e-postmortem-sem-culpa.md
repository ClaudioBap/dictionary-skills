---
id: fiabilidade/incidentes-e-postmortem-sem-culpa
titulo: "Incidentes e postmortem sem culpa"
seccao: "Fiabilidade e resiliência"
paginas: []
fonte: "Google SRE Book (capítulo 15) e lista de verificação de excelência operacional do Azure Well-Architected, ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Incidentes e postmortem sem culpa

**Resumo:** Um incidente segue um processo escrito, com papéis e passos definidos, e termina num postmortem que procura as causas e não culpados.

## Conteúdo

- Processo: «Establish a clear, structured incident management process», com «defined roles, documented procedures, and architecture designed for rapid detection, diagnosis, and recovery.» (OE:08). Fonte: [Operational Excellence checklist (Azure Well-Architected)](https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/checklist)
- Sem culpa: «For a postmortem to be truly blameless, it must focus on identifying the contributing causes of the incident» «without indicting any individual or team for bad or inappropriate behavior.» Fonte: [Postmortem Culture (SRE Book, cap. 15)](https://sre.google/sre-book/postmortem-culture/)
- A premissa: «A blamelessly written postmortem assumes that everyone involved in an incident had good intentions» «and did the right thing with the information they had.» Fonte: [Postmortem Culture](https://sre.google/sre-book/postmortem-culture/)
- A lista do Azure liga as duas coisas: o ponto OE:01 pede práticas padrão que incluam «a blameless culture that supports learning». Fonte: [Operational Excellence checklist](https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/checklist)
- O capítulo 14 do SRE Book («Managing Incidents») não foi lido: o que diz sobre a gestão do incidente em curso fica por confirmar.

**Para uma skill:** a entrega inclui o processo de incidentes escrito (quem é chamado, como se comunica, onde se regista) e um modelo de postmortem sem culpa; a prova é o documento no repositório e um exercício simulado registado.

## Ver também

- [Operação padronizada e runbooks](operacao-padronizada-e-runbooks.md) (Fiabilidade e resiliência)
- [Recuperação de desastre](recuperacao-de-desastre.md) (Fiabilidade e resiliência)
- [SLO, SLI e orçamento de erro](slo-sli-e-orcamento-de-erro.md) (Fiabilidade e resiliência)
- [Prontidão operacional e passagem](prontidao-operacional-e-passagem.md) (Fiabilidade e resiliência)

Fonte: Google SRE Book (capítulo 15) e lista de verificação de excelência operacional do Azure Well-Architected, ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF.
