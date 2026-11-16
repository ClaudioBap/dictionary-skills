---
id: ia/api-claude/execucao-de-codigo
titulo: "Execução de código"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Execução de código

**Resumo:** O Claude corre Python e Bash num contentor isolado sem internet, pago por tempo de execução depois de uma quota mensal grátis.

## Conteúdo

- O que é: «Run Python and Bash code in a sandboxed container». Fonte: [Code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool)
- Como usar: `{"type": "code_execution_20250825", "name": "code_execution"}` dá Bash e operações de ficheiros; `code_execution_20260120` acrescenta estado de REPL e programmatic tool calling; `code_execution_20260521` tem o mesmo runtime, com um limite de 90 segundos por célula. Não precisa de cabeçalho beta. Para reutilizar um contentor, passa-se o `container` no topo do pedido; os ficheiros entram pela Files API num bloco `container_upload`. Fonte: [Code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool)
- Limites: 5 GiB de RAM e «5 GiB of workspace storage». «The container has no internet access.» O contentor expira 30 dias depois de criado e é guardado num checkpoint ao fim de cerca de 5 minutos parado. O erro por excesso de tempo é `execution_time_exceeded`. Fonte: [Code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool)
- Preço: cobrado por tempo de execução, com um mínimo de 5 minutos. Há «1,550 free hours» por organização e por mês; depois, «$0.05 USD per hour, per container». É grátis quando o pedido inclui `web_search_20260209` ou `web_fetch_20260209`, ou versões posteriores. Os ficheiros no contentor pagam-se mesmo que a ferramenta não seja chamada. Fonte: [Code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool)
- Dados: não entra na retenção zero de dados; «Container data retained up to 30 days». Fonte: [Code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool)

**Para uma skill:** as análises com dados pessoais não usam a execução de código da API quando o cliente exige retenção zero, e o plano regista onde o código corre.

## Ver também

- [Files API](files-api.md) (Construir com IA)
- [Retenção de dados e retenção zero (ZDR)](retencao-de-dados-e-zdr.md) (Construir com IA)

Fonte: documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF.
