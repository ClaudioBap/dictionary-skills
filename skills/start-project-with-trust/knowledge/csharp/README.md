# Boas práticas de C#

Tag no Logseq: `#csharp`.

Fonte: págs. 38–40 (Dicionario-Boas-Praticas.pdf)

## Entradas

- [Convenções e estilo](convencoes-e-estilo.md) — Convenções de nomes C#, `.editorconfig` partilhado e `dotnet format` com analisadores no CI. *(pág. 38)*
- [Estrutura, namespaces e build](estrutura-namespaces-e-build.md) — Namespaces que seguem as pastas e pacotes NuGet geridos centralmente. *(pág. 38)*
- [Imutabilidade e records](imutabilidade-e-records.md) — `record` para dados e DTOs, com `init`/`readonly` e coleções só-leitura. *(pág. 38)*
- [Nullable reference types](nullable-reference-types.md) — Ligar nullable, distinguir `string` de `string?` e tratar os avisos como erros. *(pág. 38)*
- [Async/await](async-await.md) — `async`/`await` para I/O, sem `async void` nem bloqueios, com cancelamento propagado. *(págs. 38, 39)*
- [LINQ e coleções](linq-e-colecoes.md) — Expor interfaces de coleção e ter atenção à execução adiada do LINQ. *(pág. 39)*
- [Exceções](excecoes.md) — Apanhar o mais específico, nunca `catch` vazio, relançar com `throw;`. *(pág. 39)*
- [Gestão de recursos (IDisposable)](gestao-de-recursos-idisposable.md) — `using` para tudo o que é `IDisposable`, sem ligações nem streams por fechar. *(pág. 39)*
- [Design, SOLID e injeção de dependências](design-solid-e-injecao-de-dependencias.md) — SOLID, injeção de dependências pelo contentor e serviços sem estado partilhado mutável. *(pág. 39)*
- [Testes](testes.md) — xUnit ou NUnit com testes rápidos e isolados que testam comportamento. *(págs. 39, 40)*
- [Logging](logging.md) — `ILogger` com logging estruturado, nunca `Console.WriteLine`, sem segredos. *(pág. 40)*
- [Segurança em C#](seguranca-em-csharp.md) — Queries parametrizadas, segredos num cofre e criptografia da biblioteca padrão. *(pág. 40)*
- [Pattern matching e features modernas](pattern-matching-e-features-modernas.md) — Usar as features modernas para clareza, não por moda. *(pág. 40)*
