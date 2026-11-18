---
titulo: "Entendimento do desenvolvimento"
subtitulo: "Portal de pedidos"
data: 2026-11-18
autor: "Equipa do portal"
versao: "1.2"
---

<!--
Comentário de várias linhas do modelo.
Não pode aparecer no Word.
-->

[[indice]]

<!-- quebra -->

# O que é e para quem

O portal recebe **pedidos de clientes** e mostra o *estado de cada um*. Quem o mantém corre `npm test` antes de publicar. <!-- nota em linha que some --> A fonte de cada número é o livro [processos e estatísticas](processos-e-estatisticas.xlsx).

Fica fora: a faturação, que vive noutro sistema (ver [o site da equipa](https://example.com/equipa)).\
Esta linha começa depois de uma quebra de linha.

## Como as peças se ligam

![Diagrama das três partes](imagens/diagrama.png)

| Parte | O que faz | Linhas |
|:---|:---:|---:|
| Entrada | Recebe o pedido e valida os campos | 120 |
| Fila | Guarda o pedido até ser tratado, com `retry` | 80 |
| Painel | Mostra o estado ao cliente \| e ao balcão | 210 |

### Decisão sobre a fila

> A fila fica em base de dados, sem serviço novo.
> Com o volume atual, um serviço à parte só traria custo.
>
> Decidido pelo utilizador em 2026-10-07.

# Cronologia

1. Arranque: requisitos e plano ([P-0001](processos/P-0001-requisitos.md), [P-0002](processos/P-0002-plano.md)).
2. Construção, com duas partes:
   - modelo de dados, ainda *parcial*;
   - ecrã de entrada, reconstruído a partir da saída S3.
3. Entrega: a publicação falhou no certificado.

- Lista com marcas, nível 1
  - nível 2 com **negrito** e `código`
- outra entrada

<!-- quebra -->

# Como se trabalha no projeto

```bash
npm install
npm test
node scripts/publicar.mjs --destino producao
```

---

Os ***riscos*** estão em [Limites](#limites-e-riscos-conhecidos); os relatórios estão na pasta [processos](processos/).

# Glossário

| Termo | O que quer dizer aqui |
|---|---|
| Processo | Uma tarefa que entregou alguma coisa ou tentou e falhou |
| Prova | Comando, ficheiro ou URL que outra pessoa pode repetir |
