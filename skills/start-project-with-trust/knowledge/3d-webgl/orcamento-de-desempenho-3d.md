---
id: 3d-webgl/orcamento-de-desempenho-3d
titulo: "Orçamento de desempenho 3D"
seccao: "3D, WebGL e animação"
paginas: [22]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Orçamento de desempenho 3D

**Resumo:** Medir FPS, peso e memória, com metas de partida, carregamento tardio e pausa fora de vista.

## Conteúdo

- **Medir, não adivinhar:** FPS, tempo de carregamento, peso dos modelos e texturas, memória de GPU.
- **Metas de partida:** 60 FPS no desktop e um mínimo aceitável no telemóvel; carregar o 3D só quando entra no ecrã; cena pausada quando não está visível.
- **Técnicas:** `instancedMesh` para repetições, níveis de detalhe (LOD), texturas comprimidas, limitar `pixelRatio`, menos draw calls.

**Para uma skill:** o 3D tem um orçamento (MB e FPS) verificado, carrega tarde e pausa fora de vista.

Fonte: pág. 22 (Dicionario-Boas-Praticas.pdf)
