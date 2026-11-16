---
id: 3d-webgl/react-three-fiber
titulo: "React Three Fiber (R3F)"
seccao: "3D, WebGL e animação"
paginas: [21]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# React Three Fiber (R3F)

**Resumo:** Three.js como componentes React, só quando o projeto já é React e a cena é complexa.

## Conteúdo

- **O que é:** Three.js escrito como componentes React; o ecossistema `drei` traz atalhos (controlos, loaders, helpers).
- **Quando vale:** o site já é React e a cena é complexa o suficiente para ganhar com componentes e estado declarativo.
- **Custo:** o de Three.js mais o de React; não reduz o peso do WebGL.
- **Boas práticas:** `Suspense` para carregar modelos; instanciar (`instancedMesh`) o que se repete; não recriar objetos a cada render.

**Para uma skill:** escolher R3F só se o projeto já for React; senão, Three.js puro.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Introduction (R3F)](https://r3f.docs.pmnd.rs/getting-started/introduction) — R3F é um renderer React para three.js; drei no ecossistema
- [Scaling performance (R3F)](https://r3f.docs.pmnd.rs/advanced/scaling-performance) — Instancing, reutilizar geometrias/materiais, Suspense e useLoader com cache
- [Performance pitfalls (R3F)](https://r3f.docs.pmnd.rs/advanced/pitfalls) — Não recriar objetos em loops; usar instancing para repetições

> **Nota (fonte oficial):** A documentação R3F afirma não ter overhead de desempenho face ao three.js; não contradiz «não reduz o peso do WebGL», mas o «custo de React» não é reconhecido pela fonte.

Fonte: pág. 21 (Dicionario-Boas-Praticas.pdf)
