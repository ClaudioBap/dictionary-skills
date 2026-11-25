---
id: seguranca/cyber-resilience-act
titulo: "Cyber Resilience Act, obrigações de quem coloca software ou equipamentos no mercado da UE"
seccao: "Segurança"
paginas: []
fonte: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj"
data_lancamento: 2024-10-23
confianca: alta
verificado_em: 2026-11-25
---

# Cyber Resilience Act, obrigações de quem coloca software ou equipamentos no mercado da UE

**Resumo:** O Regulamento (UE) 2024/2847 aplica-se aos produtos com elementos digitais disponibilizados no mercado da UE numa atividade comercial, a pagar ou de graça. Desde 11 de setembro de 2026 o fabricante notifica as vulnerabilidades ativamente exploradas e os incidentes graves pela plataforma única da ENISA, em 24 e 72 horas; a partir de 11 de dezembro de 2027 aplicam-se os requisitos dos produtos, entre eles a lista de materiais do software (SBOM), a política de divulgação coordenada de vulnerabilidades e um período de suporte de pelo menos cinco anos.

## Conteúdo

- Âmbito: produtos com elementos digitais, ou seja, software ou hardware e as suas soluções de tratamento remoto de dados, incluindo componentes colocados no mercado à parte, cuja finalidade prevista ou uso razoavelmente previsível inclui uma ligação de dados, lógica ou física, direta ou indireta, a um dispositivo ou a uma rede. Disponibilizar no mercado é fornecer para distribuição ou uso no mercado da União, no âmbito de uma atividade comercial, a pagar ou gratuitamente. O fabricante é quem desenvolve ou fabrica o produto, ou o manda conceber, desenvolver ou fabricar, e o comercializa com o seu nome ou marca. Fonte: [Regulamento (UE) 2024/2847 (EUR-Lex, 23 de outubro de 2024, lido a 2026-11-25)](https://eur-lex.europa.eu/eli/reg/2024/2847/oj)
- O que fica de fora: segundo os considerandos, os sítios web que não suportam a funcionalidade de um produto e os serviços na nuvem concebidos fora da responsabilidade do fabricante de um produto não estão no âmbito. Aos serviços de computação em nuvem, como SaaS, PaaS e IaaS, aplica-se a Diretiva NIS2 quando o prestador é média empresa ou maior. Uma solução na nuvem só conta como tratamento remoto de dados do produto quando é feita pelo fabricante, ou sob a sua responsabilidade, e sem ela o produto não cumpre uma das suas funções. Fonte: o mesmo regulamento.
- Datas: aplica-se a partir de 11 de dezembro de 2027; o artigo 14.º (notificação) aplica-se desde 11 de setembro de 2026 e o capítulo IV (artigos 35.º a 51.º) desde 11 de junho de 2026. Um produto colocado no mercado antes de 11 de dezembro de 2027 só fica sujeito aos requisitos se tiver uma modificação substancial a partir dessa data, mas o artigo 14.º aplica-se a todos os produtos abrangidos, também aos colocados antes. Fonte: o mesmo regulamento.
- Notificação (artigo 14.º): o fabricante notifica ao mesmo tempo a equipa de resposta a incidentes (CSIRT) designada como coordenadora e a Agência da União Europeia para a Cibersegurança (ENISA), pela plataforma única de notificação do artigo 16.º. Numa vulnerabilidade ativamente explorada: aviso prévio sem demora injustificada e até 24 horas depois de tomar conhecimento, notificação até 72 horas e relatório final até 14 dias depois de haver uma medida corretiva ou de mitigação. Num incidente grave com impacto na segurança do produto: aviso prévio até 24 horas, notificação até 72 horas e relatório final até um mês depois da notificação. Fonte: o mesmo regulamento.
- A plataforma única da ENISA funciona desde 11 de setembro de 2026. O fabricante notifica uma vez; a notificação vai para a CSIRT do Estado-Membro onde tem o estabelecimento principal e, salvo circunstâncias excecionais, fica disponível ao mesmo tempo para a ENISA. Fontes: [ENISA: lançamento da plataforma (2026-09-11)](https://www.enisa.europa.eu/news/the-cra-single-reporting-platform-is-launched), [Comissão Europeia: obrigações de notificação do CRA (atualizada a 2026-11-23)](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting)
- Requisitos de tratamento de vulnerabilidades, a partir de 11 de dezembro de 2027 (anexo I, parte II): identificar e documentar as vulnerabilidades e os componentes do produto, com um SBOM num formato de uso comum e legível por máquina que cubra pelo menos as dependências de primeiro nível; ter e aplicar uma política de divulgação coordenada de vulnerabilidades; dar um endereço de contacto para reportar vulnerabilidades; distribuir as atualizações de segurança sem demora e gratuitamente, salvo acordo em contrário com um utilizador empresarial num produto feito por medida. O período de suporte é de pelo menos cinco anos, ou o tempo de uso previsto, se for menor. Fonte: o mesmo regulamento.

**Para uma skill:** quando a decisão «Específico ou modular» é «produto» e o resultado é software ou equipamento disponibilizado no mercado da UE, o plano diz quem é o fabricante e tem, desde já, o processo para notificar pela plataforma única em 24 e 72 horas. Os lançamentos a partir de 11 de dezembro de 2027 levam o SBOM de cada versão (ver [Cadeia de fornecimento verificada](cadeia-de-fornecimento-verificada.md)), a política de divulgação coordenada com o endereço de contacto e o período de suporte escrito. Um site ou um serviço SaaS que não faz parte de um produto fica fora deste regulamento; para esse caso, ver a [Diretiva NIS2](nis2-entidades-medidas-e-notificacao.md). Quando não é claro se o caso está no âmbito, a dúvida fica «Por preencher» para o jurídico do cliente *(interpretação)*.

## Ver também

- [Diretiva NIS2, entidades abrangidas, medidas mínimas e notificação de incidentes](nis2-entidades-medidas-e-notificacao.md) (Segurança)
- [Cadeia de fornecimento verificada](cadeia-de-fornecimento-verificada.md) (Segurança)
- [Específico ou modular](../produto/especifico-ou-modular.md) (Modularização e produtização)
- [Versionamento e registo de alterações (SemVer, Conventional Commits, Keep a Changelog)](../produto/versionamento-e-registo-de-alteracoes.md) (Modularização e produtização)

Fonte: EUR-Lex (texto do regulamento), Comissão Europeia e ENISA, ligadas em cada ponto; lidas a 2026-11-25. Não vem do PDF.
