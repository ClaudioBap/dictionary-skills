---
id: 3d-webgl/pipeline-blender-gltf
titulo: "Pipeline Blender → glTF"
seccao: "3D, WebGL e animação"
paginas: [21, 22]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Pipeline Blender → glTF

**Resumo:** Modelar no Blender, exportar para glTF e otimizar (Draco/Meshopt, KTX2) antes de publicar.

## Conteúdo

- **O que é:** modelar e animar no Blender e exportar para `.glb` / glTF, o formato nativo da web, que o Three.js carrega com `GLTFLoader`.
- **Porque glTF:** é compacto e guarda malha, materiais PBR, animações e cena num ficheiro.
- **Otimizar antes de publicar:** reduzir polígonos (decimate/retopo), comprimir a malha (Draco ou Meshopt), texturas em KTX2/Basis, atlas de texturas, `gltf-transform` ou `gltfpack` para limpar.
- **Animação ao scroll:** ligar o tempo da animação do glTF, ou a rotação do modelo, à posição do scroll.

**Para uma skill:** um modelo para web vem comprimido (Draco/Meshopt + KTX2), com orçamento de polígonos e de MB, nunca o `.blend` nem um glTF cru.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [glTF 2.0 (Manual do Blender)](https://docs.blender.org/manual/en/latest/addons/scene_gltf2.html) — Exportador glTF: PBR metal/rough, animações, compressão Draco, uso na web
- [glTF Transform](https://gltf-transform.dev/) — Otimizar glTF: Draco, Meshopt, KTX2/Basis, prune, simplify
- [glTF (Khronos)](https://www.khronos.org/gltf/) — Formato eficiente de transmissão de cenas 3D com PBR e animações

Fonte: págs. 21, 22 (Dicionario-Boas-Praticas.pdf)
