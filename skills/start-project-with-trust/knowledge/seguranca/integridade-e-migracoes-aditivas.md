---
id: seguranca/integridade-e-migracoes-aditivas
titulo: "Integridade dos dados e migrações aditivas"
seccao: "Segurança"
paginas: [4]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Integridade dos dados e migrações aditivas

**Resumo:** Nunca perder o rasto de um dado: ledger, chaves referenciadas estáveis, correções por versão e migrações só aditivas por release.

## Conteúdo

- Registo (ledger) do que foi gravado onde, para nunca se perder o rasto de um dado aprovado.
- Nunca renumerar nem recriar chaves primárias referenciadas; corrigir marcando versões, não apagando.
- Migrações só aditivas por release, para a versão anterior servir o esquema novo.

**Para uma skill:** nenhuma migração remove ou renomeia no mesmo release; as correções preservam o histórico.

## Ver também

- [Migrações](../base-de-dados/migracoes.md) (Base de dados)
- [Chaves primárias](../base-de-dados/chaves-primarias.md) (Base de dados)

Fonte: pág. 4 (Dicionario-Boas-Praticas.pdf)
