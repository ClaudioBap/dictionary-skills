# Boas práticas de Java

Tag no Logseq: `#java`.

Fonte: págs. 35–37 (Dicionario-Boas-Praticas.pdf)

## Entradas

- [Convenções e estilo](convencoes-e-estilo.md) — Convenções de nomes Java e formatador e linter a correr no CI. *(pág. 35)*
- [Estrutura, packages e build](estrutura-packages-e-build.md) — Pacotes por domínio invertido e build Maven ou Gradle com versões geridas centralmente. *(pág. 35)*
- [Imutabilidade e records](imutabilidade-e-records.md) — Preferir objetos imutáveis, `record` para dados e coleções imutáveis. *(pág. 35)*
- [Null safety e Optional](null-safety-e-optional.md) — Não retornar `null`; usar `Optional` para ausência, nunca em campos nem parâmetros. *(pág. 35)*
- [Exceções](excecoes.md) — Apanhar o mais específico, nunca `catch` vazio, try-with-resources para recursos. *(págs. 35, 36)*
- [Coleções, generics e Streams](colecoes-generics-e-streams.md) — Programar para interfaces de coleção, com generics e Streams legíveis. *(pág. 36)*
- [Concorrência](concorrencia.md) — Preferir imutabilidade e `java.util.concurrent`, sem estado mutável partilhado sem proteção. *(pág. 36)*
- [Design OO e SOLID](design-oo-e-solid.md) — Princípios SOLID, composição e injeção de dependências. *(pág. 36)*
- [equals, hashCode e toString](equals-hashcode-e-tostring.md) — `equals` e `hashCode` coerentes e `toString` útil, sem dados sensíveis. *(pág. 36)*
- [Gestão de recursos](gestao-de-recursos.md) — try-with-resources para recursos e atenção a fugas de memória. *(págs. 36, 37)*
- [Testes](testes.md) — JUnit 5, AssertJ e Mockito, com testes rápidos que testam comportamento. *(pág. 37)*
- [Logging](logging.md) — SLF4J com mensagens parametrizadas, nunca `System.out`, sem segredos. *(pág. 37)*
- [Segurança em Java](seguranca-em-java.md) — `PreparedStatement` sempre, sem desserializar dados não confiáveis e sem cripto caseira. *(pág. 37)*
