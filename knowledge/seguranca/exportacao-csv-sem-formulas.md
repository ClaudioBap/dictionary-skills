---
id: seguranca/exportacao-csv-sem-formulas
titulo: "Exportar CSV sem injeção de fórmulas"
seccao: "Segurança"
paginas: []
fonte: "https://owasp.org/www-community/attacks/CSV_Injection"
data_lancamento: null
confianca: media
verificado_em: 2026-11-16
---

# Exportar CSV sem injeção de fórmulas

**Resumo:** Um CSV que leva texto de utilizadores pode executar fórmulas quando abre numa folha de cálculo; neutraliza-se cada célula que começa por `=`, `+`, `-`, `@`, tabulação ou retorno de linha, e a exportação de registos de auditoria guarda quem, quando e o quê sem alterar o que se exporta.

## Conteúdo

- O ataque: a injeção de CSV (ou de fórmulas) acontece quando um sítio põe entrada não confiável num CSV, e a folha de cálculo a trata como fórmula. As consequências podem ir do comprometimento do computador à fuga de dados. Fonte: [CSV Injection (OWASP, sem data, lida a 2026-11-16)](https://owasp.org/www-community/attacks/CSV_Injection)
- Caracteres de risco no início da célula: `=`, `+`, `-`, `@`, tabulação (0x09), retorno de carro (0x0D), avanço de linha (0x0A), e as variantes de largura total como `＝` e `＠`. Fonte: a mesma página.
- Mitigação indicada: prefixar a célula com uma aspa simples, envolver cada campo em aspas duplas e duplicar as aspas duplas internas; cuidar do separador de campo, porque com ele um atacante pode abrir uma célula nova. Fonte: a mesma página.
- Limites: o Excel pode retirar as aspas ou os caracteres de escape quando o ficheiro é guardado e reaberto, e as técnicas acima «are not reliable» depois disso. O prefixo fica nos dados e pode afetar quem os processa a jusante. A página não dá uma estratégia universal. Fonte: a mesma página.
- Auditoria: cada evento regista «when, where, who and what», incluindo data e hora e a identidade de quem agiu e o resultado. A OWASP pede deteção de adulteração do registo, cópia para suporte só de leitura, registo e monitorização dos acessos ao próprio registo, e leitura restrita e revista periodicamente. Fonte: [Logging Cheat Sheet (OWASP, sem data, lida a 2026-11-16)](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)

**Para uma skill:** toda a exportação para CSV passa por uma função que prefixa com aspa simples as células que começam pelos caracteres acima e escapa aspas e separadores, com um teste que exporta um valor como `=1+1` e confirma o prefixo. Aplica-se a todas as colunas e não só às que parecem texto livre. A exportação da auditoria respeita os filtros do ecrã e tem um número máximo de linhas *(interpretação)*. A página avisa que a neutralização não é fiável depois de reabrir no Excel, por isso a documentação diz que o ficheiro é para leitura.

## Ver também

- [Auditoria append-only e à prova de adulteração](auditoria-append-only.md) (Segurança)
- [Painel de administração e controlo](../design/painel-de-administracao-e-controlo.md) (Design)
- [Validação de entradas](validacao-de-entradas.md) (Segurança)

Fonte: OWASP Community e OWASP Cheat Sheet Series, lidas a 2026-11-16. As páginas não indicam data, por isso a confiança é média. Não vem do PDF.
