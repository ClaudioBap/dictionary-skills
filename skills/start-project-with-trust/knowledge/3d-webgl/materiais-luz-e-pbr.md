---
id: 3d-webgl/materiais-luz-e-pbr
titulo: "Materiais, luz e PBR"
seccao: "3D, WebGL e animação"
paginas: [22]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Materiais, luz e PBR

**Resumo:** Materiais PBR realistas, preferindo iluminação por environment map a sombras dinâmicas quando o desempenho aperta.

## Conteúdo

- **O que é:** PBR (physically based rendering) dá materiais realistas (metal, rugosidade, normais). A luz define o aspeto tanto como a malha.
- **Opções de luz:** luz direta (custa sombras) ou um `environment map`/HDRI que ilumina a cena de uma vez, mais barato e bonito.
- **Custo:** sombras em tempo real e pós-processamento são caros; muitas vezes um HDRI e materiais bem afinados chegam.

**Para uma skill:** preferir iluminação por `environment map` a sombras dinâmicas quando o desempenho aperta.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [MeshStandardMaterial (Three.js)](https://threejs.org/docs/pages/MeshStandardMaterial.html) — Material PBR metal-roughness; especificar sempre environment map para melhores resultados
- [glTF (Khronos)](https://www.khronos.org/gltf/) — glTF transporta materiais PBR no próprio ficheiro

Fonte: pág. 22 (Dicionario-Boas-Praticas.pdf)
