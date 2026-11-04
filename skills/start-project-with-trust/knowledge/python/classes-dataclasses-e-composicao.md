---
id: python/classes-dataclasses-e-composicao
titulo: "Classes, dataclasses e composição"
seccao: "Boas práticas de Python"
paginas: [32, 33]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Classes, dataclasses e composição

**Resumo:** Dataclasses para dados e composição em vez de herança profunda.

## Conteúdo

- `@dataclass` (ou `attrs`/Pydantic) para dados; `@property` para acesso calculado; `__slots__` quando há muitos objetos.
- Composição em vez de herança profunda; herança só para «é um» verdadeiro.
- Encapsular estado; evitar atributos mutáveis partilhados.

**Para uma skill:** dados simples usam dataclass; preferir composição a herança.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [dataclasses](https://docs.python.org/3/library/dataclasses.html) — `@dataclass`, `slots=True`, `frozen`, `default_factory` contra defaults mutáveis

> **Nota (fonte oficial):** Composição vs herança não é tratada nas fontes oficiais consultadas; apoio só para dataclasses/slots.

Fonte: págs. 32, 33 (Dicionario-Boas-Praticas.pdf)
