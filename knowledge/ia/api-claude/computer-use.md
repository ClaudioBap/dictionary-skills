---
id: ia/api-claude/computer-use
titulo: "Computer use"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data, a parte final da página por ler. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Computer use

**Resumo:** O Claude controla um ambiente de trabalho com capturas de ecrã, rato e teclado, e é a tua aplicação que executa cada ação.

## Conteúdo

- O que é: «screenshot capabilities and mouse/keyboard control for autonomous desktop interaction». É uma ferramenta do lado do cliente: a aplicação executa cada ação. Fonte: [Computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)
- Como usar: `{"type": "computer_toolset_20260801"}`, com as ferramentas `bash` e `text_editor`, sem cabeçalho beta. O conjunto tem 17 ferramentas, todas ligadas por omissão; desliga-se uma com `configs`, por exemplo `{"zoom": {"enabled": false}}`. As coordenadas são em pixels da captura. Nesta versão, `display_width_px`, `display_height_px`, `display_number`, `name` e `enable_zoom` são recusados. Versões anteriores: `computer_20251124` (beta `computer-use-2025-11-24`) e `computer_20250124`. Fonte: [Computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)
- Limites: com o toolset e o Opus 4.7 em diante, 2 576 px no lado maior e 4 784 tokens visuais; nos modelos anteriores, 1 568 px e cerca de 1,15 MP. Uma sequência de ações para na primeira que falha. Não está disponível nos Managed Agents. Fonte: [Computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)
- Segurança, nas palavras da documentação: usar «a dedicated virtual machine or container with minimal privileges», limitar o acesso à internet a uma lista de domínios, pedir a uma pessoa que confirme as decisões com consequências reais, e contar com que «instructions on webpages or contained in images might override your instructions». Os utilizadores finais devem ser informados dos riscos e dar o seu consentimento. Fonte: [Computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)
- Dados: entra na retenção zero de dados, e as capturas ficam no teu ambiente. O preço não está na parte da página que foi lida. Fonte: [Computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)

**Para uma skill:** um agente com computer use corre numa máquina virtual ou contentor dedicado, com uma lista de domínios permitidos, e pede confirmação a uma pessoa antes de ações com consequências (pagamentos, envios, apagar dados).

## Ver também

- [Segurança e governação de IA](../seguranca-e-governacao-de-ia.md) (Construir com IA)
- [Web search e web fetch](web-search-e-web-fetch.md) (Construir com IA)

Fonte: documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data, a parte final da página por ler. Não vem do PDF.
