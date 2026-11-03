---
id: node/encerramento-gracioso
titulo: "Encerramento gracioso"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Encerramento gracioso

**Resumo:** Ao receber `SIGTERM`, deixar de aceitar pedidos, terminar os em curso e fechar ligações, com tempo limite.

## Conteúdo

- Tratar `SIGTERM` (e `SIGINT`): parar de aceitar pedidos novos, terminar os que estão em curso, fechar ligações à base de dados e a filas.
- Ter um tempo limite para o encerramento; se passar, terminar à força.
- O health check deixa de reportar «pronto» durante o encerramento.

**Para uma skill:** um deploy ou reinício não corta pedidos a meio.

## Ver também

- [Kubernetes: saúde e armazenamento](../docker/kubernetes-saude-e-armazenamento.md) (Docker e orquestração)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.
