---
id: seguranca/ambientes-seguros-por-omissao
titulo: "Ambientes seguros por omissão"
seccao: "Segurança"
paginas: [5]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Ambientes seguros por omissão

**Resumo:** Sem configuração, ou com configuração errada, a aplicação cai no modo mais restrito: falha fechado.

## Conteúdo

- Sem configuração, a aplicação cai no modo mais restrito, não no mais permissivo.
- Só o valor literal de produção compra os privilégios de produção; um valor errado falha para o lado seguro.
- A aplicação recusa arrancar se o ambiente declarado não bater com o destino a que está ligada.

**Para uma skill:** um erro ou falta de configuração nunca abre privilégios; falha fechado.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [CWE-636 Not Failing Securely](https://cwe.mitre.org/data/definitions/636.html) — perante erro, não recair num estado menos seguro; omissões seguras
- [OWASP Top 10:2025 A10](https://top10.owasp.org/2025/A10_2025-Mishandling_of_Exceptional_Conditions/) — falhar fechado em condições excecionais

Fonte: pág. 5 (Dicionario-Boas-Praticas.pdf)
