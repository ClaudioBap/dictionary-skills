# Boas práticas de Python

Tag no Logseq: `#python`.

Fonte: págs. 31–34 (Dicionario-Boas-Praticas.pdf)

## Entradas

- [Estilo e formatação](estilo-e-formatacao.md) — Seguir a PEP 8 com formatador e linter automáticos no CI e nomes que dizem a intenção. *(pág. 31)*
- [Type hints e tipagem estática](type-hints-e-tipagem-estatica.md) — Anotar as assinaturas públicas e correr mypy ou pyright no CI, evitando `Any`. *(pág. 31)*
- [Estrutura de projeto e imports](estrutura-de-projeto-e-imports.md) — Layout `src/`, imports absolutos, um módulo por responsabilidade e sem ciclos. *(pág. 31)*
- [Ambientes e dependências](ambientes-e-dependencias.md) — Ambiente isolado, dependências fixadas com lock e auditadas. *(págs. 31, 32)*
- [Erros e exceções](erros-e-excecoes.md) — Apanhar exceções específicas, nunca engolir erros e relançar com contexto. *(pág. 32)*
- [Gestão de recursos (context managers)](gestao-de-recursos-context-managers.md) — Abrir ficheiros, ligações e locks com `with`, para garantir o fecho mesmo com exceção. *(pág. 32)*
- [Funções: design e armadilhas](funcoes-design-e-armadilhas.md) — Funções pequenas com um propósito, sem defaults mutáveis nem efeitos escondidos. *(pág. 32)*
- [Classes, dataclasses e composição](classes-dataclasses-e-composicao.md) — Dataclasses para dados e composição em vez de herança profunda. *(págs. 32, 33)*
- [Programação assíncrona](programacao-assincrona.md) — `asyncio` para I/O sem nunca bloquear o event loop. *(pág. 33)*
- [Testes](testes.md) — `pytest` com testes rápidos e isolados, que testam comportamento e incluem casos de erro. *(pág. 33)*
- [Logging](logging.md) — Usar o módulo `logging`, nunca `print`, sem segredos nem dados pessoais. *(pág. 33)*
- [Segurança em Python](seguranca-em-python.md) — Sem `eval`, `shell=True` nem `pickle` sobre dados externos, e SQL sempre parametrizado. *(pág. 33)*
- [Desempenho e código idiomático](desempenho-e-codigo-idiomatico.md) — Código idiomático com built-ins e geradores, e otimização só depois de medir. *(págs. 33, 34)*
