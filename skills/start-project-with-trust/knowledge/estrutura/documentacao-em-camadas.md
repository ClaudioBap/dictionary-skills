---
id: estrutura/documentacao-em-camadas
titulo: "Documentação em camadas"
seccao: "Estrutura e documentação"
paginas: [41]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Documentação em camadas

**Resumo:** Separar referência, estado, decisões e registo, que envelhecem a ritmos diferentes.

## Conteúdo

- Separar quatro coisas que envelhecem a ritmos diferentes: referência (como funciona), estado (o que falta agora), decisões (porquê) e registo (quem mudou o quê).
- Não misturar estado volátil na referência estável, nem decisões em comentários perdidos.
- Cada camada tem o seu sítio e a sua regra de alteração.

**Para uma skill:** uma informação nova vai para a camada certa (referência, estado, decisão ou registo).

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Diátaxis](https://diataxis.fr/) — Separar a documentação em formas distintas, sem as misturar
- [Architectural Decision Records](https://adr.github.io/) — As decisões e o seu porquê vivem num registo próprio
- [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — O registo de alterações é uma camada própria, distinta do log do git

> **Nota (fonte oficial):** O Diátaxis separa por necessidade do leitor (tutoriais, guias, referência, explicação), não pelas quatro camadas do PDF (referência, estado, decisões, registo); apoia o princípio de separar, não a divisão concreta.

Fonte: pág. 41 (Dicionario-Boas-Praticas.pdf)
