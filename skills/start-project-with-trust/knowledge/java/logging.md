---
id: java/logging
titulo: "Logging"
seccao: "Boas práticas de Java"
paginas: [37]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Logging

**Resumo:** SLF4J com mensagens parametrizadas, nunca `System.out`, sem segredos.

## Conteúdo

- SLF4J como fachada, nunca `System.out`; mensagens parametrizadas (`log.info("x={}", x)`); níveis corretos.
- Não registar segredos nem dados pessoais.

**Para uma skill:** zero `System.out`; logs parametrizados, sem segredos.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [SLF4J FAQ](https://www.slf4j.org/faq.html) — logging parametrizado `{}` evita custo quando desativado
- [SLF4J user manual](https://www.slf4j.org/manual.html) — fachada; bibliotecas dependem só de slf4j-api

> **Nota (fonte oficial):** As fontes consultadas não tratam de segredos/dados pessoais nos logs.

Fonte: pág. 37 (Dicionario-Boas-Praticas.pdf)
