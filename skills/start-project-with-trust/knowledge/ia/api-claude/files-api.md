---
id: ia/api-claude/files-api
titulo: "Files API"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Files API

**Resumo:** Carrega-se um ficheiro uma vez e usa-se o `file_id` em vários pedidos, sem voltar a enviar o conteúdo.

## Conteúdo

- Estado: «The Files API is out of beta and needs no beta header.» Está disponível em todos os modelos. Fonte: [Files](https://platform.claude.com/docs/en/build-with-claude/files)
- Como usar: `POST /v1/files` (multipart, campo `file`) devolve um `id`. Num pedido, o ficheiro entra como `{"type":"document","source":{"type":"file","file_id":...}}`, como `"type":"image"` com a mesma origem, ou como `"type":"container_upload"` para a execução de código. Outros endpoints: `GET /v1/files` (lista), `GET /v1/files/{file_id}` (metadados), `DELETE /v1/files/{file_id}` e `GET /v1/files/{file_id}/content` (descarga, só para ficheiros criados por skills ou pela execução de código). Fonte: [Files](https://platform.claude.com/docs/en/build-with-claude/files)
- Limites: «Maximum file size: 500 MB for each file.» «Total storage: 1 TB for each organization.» A expiração é opcional, com `expires_in_seconds` entre 3 600 e 7 776 000 (90 dias), definida no carregamento. Os ficheiros não se alteram depois de carregados. As operações de ficheiros têm um limite de cerca de 500 pedidos por minuto. Fonte: [Files](https://platform.claude.com/docs/en/build-with-claude/files)
- Preço: carregar, descarregar, listar, ver metadados e apagar é grátis; o conteúdo usado num pedido conta como tokens de entrada. Fonte: [Files](https://platform.claude.com/docs/en/build-with-claude/files)
- Retenção e acesso: os ficheiros ficam até serem apagados ou expirarem, e a Files API não entra na retenção zero de dados. Os ficheiros pertencem ao workspace, e a documentação avisa para nunca aceitar valores de `file_id` vindos de utilizadores finais. Fonte: [Files](https://platform.claude.com/docs/en/build-with-claude/files), [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)

**Para uma skill:** os ficheiros com dados pessoais carregados na Files API têm `expires_in_seconds` ou um passo de `DELETE` no fim do processo, e nenhum `file_id` vem do cliente final.

## Ver também

- [Retenção de dados e retenção zero (ZDR)](retencao-de-dados-e-zdr.md) (Construir com IA)
- [Imagens e PDF](visao-e-pdf.md) (Construir com IA)
- [Execução de código](execucao-de-codigo.md) (Construir com IA)

Fonte: documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF.
