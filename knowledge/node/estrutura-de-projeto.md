---
id: node/estrutura-de-projeto
titulo: "Estrutura de projeto"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Estrutura de projeto

**Resumo:** Módulos ES com `type` declarado, imports internos com `#` e API pública declarada em `exports`.

## Conteúdo

- Usar módulos ES, o formato padrão; declarar sempre o campo `type` no `package.json`. — [nodejs.org/api/esm.html](https://nodejs.org/api/esm.html), [nodejs.org/api/packages.html](https://nodejs.org/api/packages.html)
- **Utilidade:** imports internos com `#` (campo `imports`) em vez de caminhos relativos longos. — [nodejs.org/api/packages.html](https://nodejs.org/api/packages.html)
- Em pacotes, declarar a API pública com o campo `exports`. — [nodejs.org/api/packages.html](https://nodejs.org/api/packages.html)
- Separar rotas, lógica de negócio e acesso a dados, para a lógica não depender do framework HTTP; um módulo por responsabilidade e sem dependências circulares. *(sem fonte oficial)*

**Para uma skill:** o código usa ESM e o `package.json` declara `type`.

Fonte: Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.
