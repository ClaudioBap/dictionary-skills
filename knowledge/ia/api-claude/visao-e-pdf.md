---
id: ia/api-claude/visao-e-pdf
titulo: "Imagens e PDF"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Imagens e PDF

**Resumo:** O Claude lê imagens e PDFs enviados no pedido, com limites de tamanho, de número e de páginas que decidem como dividir os documentos.

## Conteúdo

- Imagens: formatos «JPEG, PNG, GIF, and WebP», sem animação. O tamanho máximo por imagem é «10 MB (base64-encoded) on the Claude API» (5 MB no Amazon Bedrock), com dimensões até «8000x8000 px». Cabem 100 imagens por pedido nos modelos com contexto de 200 mil tokens e 600 nos restantes; acima de 20 imagens, nenhuma dimensão pode passar de 3 000 px. A imagem pode ir em base64, por URL ou pela Files API (`file_id`). Fonte: [Vision](https://platform.claude.com/docs/en/build-with-claude/vision)
- Custo de uma imagem: «`⌈width / 28⌉ × ⌈height / 28⌉` visual tokens». O escalão normal reduz a imagem a 1 568 px e o de alta resolução a 2 576 px (Claude 4.7 em diante). Fonte: [Vision](https://platform.claude.com/docs/en/build-with-claude/vision)
- PDF: «Maximum request size: 128 MB on the first-party Claude API.» «Maximum pages per request: 600 (100 when the request's context window is under 1M tokens).» Os dois limites contam para o pedido inteiro, e um PDF denso pode encher o contexto antes de chegar ao limite de páginas. Fonte: [PDF support](https://platform.claude.com/docs/en/build-with-claude/pdf-support)
- Outros formatos: .txt, .csv e .md vão como `text/plain` em blocos de documento, através da Files API. Os .xlsx e .docx não são aceites em blocos de documento e têm de ser convertidos antes. Fonte: [PDF support](https://platform.claude.com/docs/en/build-with-claude/pdf-support)

**Para uma skill:** um fluxo com PDFs ou imagens do cliente verifica o tamanho e o número de páginas antes de enviar, e divide o documento quando passa dos limites.

## Ver também

- [Files API](files-api.md) (Construir com IA)
- [Citações](citacoes.md) (Construir com IA)
- [RAG de documentos visuais (ColPali)](../rag/rag-de-documentos-visuais-colpali.md) (Construir com IA)

Fonte: documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF.
