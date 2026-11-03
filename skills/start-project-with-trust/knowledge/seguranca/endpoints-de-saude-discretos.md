---
id: seguranca/endpoints-de-saude-discretos
titulo: "Endpoints de saúde discretos"
seccao: "Segurança"
paginas: [7]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Endpoints de saúde discretos

**Resumo:** O `/health` público diz só «vivo»; o diagnóstico detalhado fica autenticado ou na rede interna.

## Conteúdo

- O `/health` público devolve só «vivo»; não revela ambiente, backend de autenticação nem configuração.
- O diagnóstico detalhado fica num endpoint autenticado ou só na rede interna.

**Para uma skill:** nenhum endpoint anónimo revela configuração que ajude a reconhecer o sistema.

Fonte: pág. 7 (Dicionario-Boas-Praticas.pdf)
