---
id: node/node-em-contentores
titulo: "Node.js em contentores"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Node.js em contentores

**Resumo:** Imagem oficial por digest, multi-stage, sem dependências de dev, a correr como utilizador sem privilégios.

## Conteúdo

- Imagem base oficial fixada por digest (variante `slim` ou equivalente); build multi-stage.
- Instalar com `npm ci --omit=dev` na imagem final e definir `NODE_ENV=production`.
- Correr com o utilizador `node`, não root; arrancar com `node` diretamente (não `npm start`), para os sinais chegarem ao processo.

**Para uma skill:** a imagem Node não corre como root, não tem dependências de dev e recebe os sinais de encerramento.

## Ver também

- [Imagem endurecida](../docker/imagem-endurecida.md) (Docker e orquestração)
- [Contentores endurecidos](../seguranca/contentores-endurecidos.md) (Segurança)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.
