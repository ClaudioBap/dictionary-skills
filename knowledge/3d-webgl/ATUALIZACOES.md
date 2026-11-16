# Atualizações: 3D, WebGL e animação

Novidades com confiança alta ou média (as de média levam «Confiança: media»), organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## Three.js

- **2026-10-30** em [Three.js / WebGL](threejs-webgl.md): O three.js r187 remove o código que estava descontinuado desde a r177; antes de atualizar, consultar o guia de migração da 186 para a 187. Alterações que podem partir código existente: o WebGLRenderer só aplica o pixel ratio ao canvas em setViewport() e setScissor(); o WebGPURenderer passa a dar erro quando count e dispatchSize são usados em conjunto; ProxyNodeMaterial passa a chamar-se NodeMaterialInstance. Fonte: [three.js r187](https://github.com/mrdoob/three.js/releases/tag/r187). Confiança: alta. Adicionado a 2026-11-04.
