---
id: 3d-webgl/pipeline-blender-gltf
titulo: "Pipeline Blender → glTF"
seccao: "3D, WebGL e animação"
paginas: [21, 22]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Pipeline Blender → glTF

**Resumo:** Modelar no Blender, exportar para glTF e otimizar (Draco/Meshopt, KTX2) antes de publicar.

## Conteúdo

- **O que é:** modelar e animar no Blender e exportar para `.glb` / glTF, o formato nativo da web, que o Three.js carrega com `GLTFLoader`.
- **Porque glTF:** é compacto e guarda malha, materiais PBR, animações e cena num ficheiro.
- **Otimizar antes de publicar:** reduzir polígonos (decimate/retopo), comprimir a malha (Draco ou Meshopt), texturas em KTX2/Basis, atlas de texturas, `gltf-transform` ou `gltfpack` para limpar.
- **Animação ao scroll:** ligar o tempo da animação do glTF, ou a rotação do modelo, à posição do scroll.

**Para uma skill:** um modelo para web vem comprimido (Draco/Meshopt + KTX2), com orçamento de polígonos e de MB, nunca o `.blend` nem um glTF cru.

Fonte: págs. 21, 22 (Dicionario-Boas-Praticas.pdf)
