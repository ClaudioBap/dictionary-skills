# Atualizações: Segurança

Novidades com confiança alta ou média (as de média levam «Confiança: media»), organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## Regulação

- **2026-11-18** em [Cyber Resilience Act, obrigações de quem coloca software ou equipamentos no mercado da UE](cyber-resilience-act.md): Foi publicada a primeira norma europeia de apoio ao CRA, com princípios genéricos de cibersegurança para uma vasta gama de produtos com elementos digitais, como quadro comum da conceção e do desenvolvimento à produção, manutenção, fim de suporte e desativação. Há mais de 30 normas em desenvolvimento, pedidas pela Comissão ao CEN, ao CENELEC e ao ETSI em fevereiro de 2025; as normas por categoria de produto vêm depois. A página não diz se a norma é harmonizada nem se dá presunção de conformidade. Fonte: [Comissão Europeia: First European standard published to support the Cyber Resilience Act](https://digital-strategy.ec.europa.eu/en/news/first-european-standard-published-support-cyber-resilience-act). Confiança: alta. Adicionado a 2026-11-26.

## OWASP

- **2026-11-01** em [CSRF: verificar a origem, não só o cookie](csrf-verificar-a-origem.md): A CSRF Prevention Cheat Sheet deixa de afirmar que os browsers aplicam SameSite=Lax por omissão: os valores por omissão variam entre browsers, e definir SameSite=Lax explicitamente evita o valor mais permissivo. Mantém o aviso de que alguns clientes ignoram o SameSite. Fonte: [OWASP Cheat Sheet Series, PR #2881](https://github.com/OWASP/CheatSheetSeries/pull/2881). Confiança: alta. Adicionado a 2026-11-04.
- **2026-11-01** em [Defesa contra XSS: escapar e CSP](defesa-contra-xss.md): A XSS Prevention Cheat Sheet passa a recomendar escapar por omissão todos os valores mostrados, e não decidir caso a caso o que não é de confiança. Fonte: [OWASP Cheat Sheet Series, PR #2889](https://github.com/OWASP/CheatSheetSeries/pull/2889). Confiança: alta. Adicionado a 2026-11-04.
