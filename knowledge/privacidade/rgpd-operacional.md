---
id: privacidade/rgpd-operacional
titulo: "RGPD operacional"
seccao: "Privacidade e conformidade"
paginas: [10]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# RGPD operacional

**Resumo:** Cada tratamento tem base legal e registo, há processo para os direitos do titular e privacidade desde a conceção. Uma violação de dados pessoais notifica-se à CNPD sem demora e, sempre que possível, até 72 horas, salvo se não for suscetível de resultar num risco para as pessoas.

## Conteúdo

- Base legal para cada tratamento (consentimento, contrato, interesse legítimo); registar os tratamentos.
- Direitos do titular: acesso, retificação, apagamento, portabilidade, oposição; ter processo para os cumprir.
- Política de privacidade clara; DPIA quando o risco é alto; acordos (DPA) com cada subprocessador.
- Privacidade desde a conceção e por omissão.
- Violação de dados pessoais: o responsável pelo tratamento notifica a autoridade de controlo sem demora injustificada e, sempre que possível, até 72 horas depois de ter tido conhecimento, a menos que a violação não seja suscetível de resultar num risco para os direitos e liberdades das pessoas; depois das 72 horas, a notificação leva os motivos do atraso. O subcontratante avisa o responsável sem demora injustificada. Cada violação fica documentada (os factos, os efeitos e as medidas tomadas), também a que não se notifica, e, se o risco for elevado, comunica-se aos titulares sem demora injustificada. Fonte: [RGPD, artigos 33.º e 34.º (EUR-Lex, Regulamento (UE) 2016/679 de 27 de abril de 2016, lido a 2026-11-25)](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- Em Portugal, a notificação vai à Comissão Nacional de Proteção de Dados (CNPD), que tem um formulário próprio para isso. Fonte: [CNPD: violação de dados (sem data, lida a 2026-11-25)](https://www.cnpd.pt/organizacoes/outras-obrigacoes/violacao-de-dados-ou-data-breach/)
- Registo das atividades de tratamento: o responsável e o subcontratante mantêm cada um o seu registo, por escrito (o formato eletrónico conta), e facultam-no à autoridade quando ela o pede. A dispensa das organizações com menos de 250 pessoas não vale se o tratamento puder resultar num risco para os titulares, não for ocasional ou incluir categorias especiais de dados ou dados penais. A CNPD diz que as circunstâncias em que a dispensa se aplica são «absolutamente excecionais», pede dois registos diferenciados a quem trata dados como responsável e como subcontratante, e disponibiliza um modelo. Fontes: [RGPD, artigo 30.º (EUR-Lex)](https://eur-lex.europa.eu/eli/reg/2016/679/oj), [CNPD: registo de atividades de tratamento (sem data, lida a 2026-11-25)](https://www.cnpd.pt/organizacoes/outras-obrigacoes/registo-de-atividades-de-tratamento/)
- Encarregado de proteção de dados (EPD): obrigatório quando o tratamento é feito por uma autoridade ou organismo público, exceto os tribunais no exercício da função jurisdicional, e quando as atividades principais do responsável ou do subcontratante exigem um controlo regular e sistemático dos titulares em grande escala ou consistem em tratar em grande escala categorias especiais de dados (artigo 9.º) ou dados penais (artigo 10.º). Cabe ao responsável e ao subcontratante avaliar cada caso, e a CNPD não se pronuncia sobre o caso concreto; a designação comunica-se à CNPD num formulário próprio. Fontes: [RGPD, artigo 37.º (EUR-Lex)](https://eur-lex.europa.eu/eli/reg/2016/679/oj), [CNPD: encarregado de proteção de dados (sem data, lida a 2026-11-25)](https://www.cnpd.pt/organizacoes/outras-obrigacoes/encarregado-de-protecao-de-dados/)
- Lei nacional: a CNPD fiscaliza o RGPD e também a Lei n.º 58/2019, de 8 de agosto, cujo artigo 12.º regula a designação do EPD nas entidades públicas. O texto da lei não foi lido, porque o Diário da República só abre com JavaScript. Fontes: [CNPD: o que somos e quem somos (sem data, lida a 2026-11-25)](https://www.cnpd.pt/cnpd/o-que-somos-e-quem-somos/), [CNPD: encarregado de proteção de dados](https://www.cnpd.pt/organizacoes/outras-obrigacoes/encarregado-de-protecao-de-dados/)
- Medidas de segurança: a CNPD recomenda ao responsável e, com as devidas adaptações, ao subcontratante as medidas técnicas e organizativas adequadas à sensibilidade de cada tratamento, para cumprir o artigo 32.º do RGPD. A lista não é exaustiva e muda com a tecnologia; o responsável continua responsável pelo que os subcontratantes fazem e tem de ter controlo eficaz sobre eles. Entre as medidas:
  - plano de resposta a incidentes e de recuperação, exercitado com regularidade, com a avaliação do risco para os titulares que decide se a violação se notifica à CNPD e aos titulares; o prazo de 72 horas é contínuo, não para aos sábados, domingos e feriados, e a informação pode seguir por fases;
  - informação classificada por confidencialidade e sensibilidade, políticas de segurança documentadas e revistas, vulnerabilidades documentadas e corrigidas sem demora, auditorias e testes de penetração regulares;
  - acessos: cada pessoa só com os dados de que precisa, permissões revistas e perfis inativos desativados; palavras-passe com pelo menos 12 caracteres, únicas e complexas; autenticação multifator ponderada pela sensibilidade, pelos privilégios ou pelo acesso remoto; contas bloqueadas após várias tentativas falhadas;
  - registos de auditoria ativos e conservados, e alertas para acessos, tentativas ou utilizações indevidas;
  - sistemas, aplicações e firmware atualizados, redes segmentadas, acesso por IP validado nos servidores expostos ao público e o RDP fora do porto por omissão;
  - cifra das credenciais, das categorias especiais de dados, dos dados de natureza altamente pessoal e dos financeiros, e cifra no transporte; cópias de segurança atualizadas, seguras e testadas, separadas das bases de dados principais e sem acesso externo;
  - proteção de dados desde a conceção, análise de risco e pseudonimização ou anonimização definidas já no desenvolvimento e nos testes de aceitação, também quando o sistema é feito por um subcontratante;
  - email com dados pessoais: vários destinatários em Bcc, anexos só com os dados que se querem comunicar, cifra com um código que só o destinatário tem, e alerta quando alguém cria uma regra de reencaminhamento automático para contas externas;
  - formação e cultura de privacidade, e trabalhadores informados do dever de confidencialidade.
  Fonte: [CNPD, Diretriz/2023/1, sobre medidas organizativas e de segurança aplicáveis aos tratamentos de dados pessoais (aprovada a 2023-01-10, PDF lido por inteiro a 2026-11-25)](https://www.cnpd.pt/umbraco/surface/cnpdDecision/download/122048)

**Para uma skill:** cada dado pessoal tem base legal, retenção e um caminho para os direitos do titular. Existe o registo das atividades de tratamento (ou a razão escrita da dispensa), um procedimento escrito para notificar a CNPD até 72 horas e documentar cada violação, e a decisão sobre o EPD escrita com o critério do artigo 37.º. Num projeto com dados pessoais confirma-se, com a Diretriz/2023/1 da CNPD, que há um plano de resposta a incidentes escrito e com a data do último exercício, que os registos de auditoria estão ativos, que as palavras-passe exigem pelo menos 12 caracteres e o acesso remoto ou privilegiado tem autenticação multifator, que as credenciais e os dados sensíveis estão cifrados, e que a cópia de segurança está separada das bases principais, sem acesso externo e com um restauro testado.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Comissão Europeia: fundamentos de licitude](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/legal-grounds-processing-data_en) — os seis fundamentos: consentimento, contrato, interesse legítimo, etc.
- [Comissão Europeia: pedidos dos titulares](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/dealing-requests-individuals_en) — acesso, retificação, apagamento, portabilidade, oposição; resposta em 1 mês
- [EDPB: Be compliant](https://www.edpb.europa.eu/sme/be-compliant/be-compliant_en) — registo de tratamentos, AIPD, proteção desde a conceção e por omissão

*As fontes da edição de 2026-11-25 (EUR-Lex e CNPD) estão ligadas em cada ponto do «Conteúdo».*

Fonte: pág. 10 (Dicionario-Boas-Praticas.pdf)
