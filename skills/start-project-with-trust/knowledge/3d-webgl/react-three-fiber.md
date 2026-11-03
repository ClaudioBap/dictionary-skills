---
id: 3d-webgl/react-three-fiber
titulo: "React Three Fiber (R3F)"
seccao: "3D, WebGL e animação"
paginas: [21]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# React Three Fiber (R3F)

**Resumo:** Three.js como componentes React, só quando o projeto já é React e a cena é complexa.

## Conteúdo

- **O que é:** Three.js escrito como componentes React; o ecossistema `drei` traz atalhos (controlos, loaders, helpers).
- **Quando vale:** o site já é React e a cena é complexa o suficiente para ganhar com componentes e estado declarativo.
- **Custo:** o de Three.js mais o de React; não reduz o peso do WebGL.
- **Boas práticas:** `Suspense` para carregar modelos; instanciar (`instancedMesh`) o que se repete; não recriar objetos a cada render.

**Para uma skill:** escolher R3F só se o projeto já for React; senão, Three.js puro.

Fonte: pág. 21 (Dicionario-Boas-Praticas.pdf)
