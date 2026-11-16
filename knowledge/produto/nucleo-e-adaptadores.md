---
id: produto/nucleo-e-adaptadores
titulo: "Núcleo e adaptadores (arquitetura hexagonal)"
seccao: "Modularização e produtização"
paginas: []
fonte: "https://alistair.cockburn.us/hexagonal-architecture/; consultado a 2026-11-10. Não vem do PDF."
data_lancamento: 2005-09-04
confianca: alta
verificado_em: 2026-11-10
---

# Núcleo e adaptadores (arquitetura hexagonal)

**Resumo:** A aplicação fala com o exterior por portas, e cada dispositivo, base de dados ou cliente liga-se por um adaptador; o que é específico de um caso fica no adaptador e o núcleo mantém-se igual.

## Conteúdo

- Objetivo do padrão: «Allow an application to equally be driven by users, programs, automated test or batch scripts». Fonte: [Hexagonal architecture (Cockburn, 2005-09-04)](https://alistair.cockburn.us/hexagonal-architecture/)
- A aplicação constrói-se e testa-se «in isolation from its eventual run-time devices and databases». Fonte: o mesmo artigo.
- Trocar a base de dados não muda a conversa com a aplicação: «the conversation across the API should not change». Fonte: o mesmo artigo.
- Para a reutilização *(interpretação)*: o que é específico de um cliente (a fonte dos dados, o sistema de autenticação, o formato de saída) entra por uma porta e vive num adaptador; o núcleo partilha-se entre casos sem alterações. Testar o núcleo sem os adaptadores reais é o que prova que a separação existe.
- A página está marcada como versão 0.9, a atualizar depois de comentários. Fonte: o mesmo artigo.

**Para uma skill:** as dependências específicas de um caso (dados, autenticação, sistemas externos) estão atrás de uma interface própria, e o núcleo tem testes que correm sem elas.

## Ver também

- [Específico ou modular](especifico-ou-modular.md) (Modularização e produtização)
- [Configuração fora do código](configuracao-fora-do-codigo.md) (Modularização e produtização)
- [Pirâmide de testes](../cicd/piramide-de-testes.md) (CI/CD e ferramentas)

Fonte: https://alistair.cockburn.us/hexagonal-architecture/, consultado a 2026-11-10. Não vem do PDF.
