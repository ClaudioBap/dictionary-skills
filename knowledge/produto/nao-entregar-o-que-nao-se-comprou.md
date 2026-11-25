---
id: produto/nao-entregar-o-que-nao-se-comprou
titulo: "Não entregar o que não se comprou"
seccao: "Modularização e produtização"
paginas: []
fonte: "https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/; consultado a 2026-11-25, página sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-25
---

# Não entregar o que não se comprou

**Resumo:** O que o cliente não comprou não chega ao lado dele, nem em código, nem em dados, nem em rotas que respondam; esconder na interface não chega.

## Conteúdo

- A OWASP inclui nas falhas de controlo de acesso «Bypassing access control checks by modifying the URL (parameter tampering or force browsing), internal application state, or the HTML page, or by using an attack tool that modifies API requests» e «Force browsing (guessing URLs) to authenticated pages as an unauthenticated user or to privileged pages as a standard user». Fonte: [OWASP Top 10:2025, A01 Broken Access Control](https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/) (data não indicada)
- Entre as fraquezas da categoria está a CWE-200, «Exposure of Sensitive Information to an Unauthorized Actor». E recomenda: «Log access control failures, alert admins when appropriate (e.g., repeated failures).» Fonte: a mesma página.
- Para a entrega *(interpretação)*: o que vai para o browser ou para uma instalação no cliente pode ser lido e alterado. Numa aplicação web, o código de uma parte não comprada fica num pacote à parte, que só se carrega depois de o servidor confirmar o direito, e as respostas da API não trazem campos dessa parte. Numa instalação no cliente, o pacote leva só os módulos comprados, em vez de levar tudo e desligar por flag.
- Os pedidos recusados por falta de direito ficam registados, e uma série de recusas do mesmo cliente gera um alerta (ver o ponto da OWASP acima).

**Para uma skill:** com uma conta sem a parte, a prova tem três verificações: as rotas dessa parte respondem com recusa; o código que o browser descarrega, ou o pacote instalado, não contém o módulo (procura-se o nome ou a chave dele); e as respostas da API não trazem dados dessa parte.

## Ver também

- [Direitos por plano no servidor](direitos-por-plano-no-servidor.md) (Modularização e produtização)
- [Segmentar em partes vendáveis](segmentar-em-partes-vendaveis.md) (Modularização e produtização)
- [Autorização no servidor, negar por omissão](../seguranca/autorizacao-no-servidor.md) (Segurança)

Fonte: https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/, consultado a 2026-11-25, página sem data. Não vem do PDF.
