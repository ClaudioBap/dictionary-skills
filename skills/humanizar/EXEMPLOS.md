# Exemplos: humanizar

## O que faz

Procura em tudo o que vai ser entregue (texto, código, interface, commits, documentação e dados de exemplo) as marcas que denunciam trabalho feito por uma ferramenta: travessões a ligar frases, palavras de brochura, comentários que narram o código, páginas com tudo centrado. O verificador `scripts/humanizar.mjs` apanha o que se reconhece por padrão e a leitura apanha o resto, com o catálogo de `marcas.md`. Nada se corrige sem autorização: os achados mostram-se por categoria e o utilizador decide uma categoria de cada vez.

## Quando usar

- Antes de entregar um trabalho a um cliente.
- Como última tarefa de uma orquestração, sobre tudo o que as sessões produziram.
- Nas mensagens de commit, para os commits seguintes seguirem o estilo do repositório.
- Durante o trabalho, com o hook opcional que verifica cada ficheiro à medida que é escrito.
- No CI do projeto, para as marcas de gravidade alta não voltarem.

## Quando não usar

- Para reescrever um texto inteiro: a skill só mexe no que apontou, e o sentido, os factos e as citações ficam iguais.
- Em citações de fontes, que guardam a pontuação original; por isso a pasta `knowledge/` fica de fora por omissão.

## Exemplo: verificar no fim de cada tarefa

**Pedido:** «Antes de dares a tarefa por feita, verifica as marcas de IA no que mudaste, sem corrigir nada.»

**O que a skill faz:**

1. Corre o verificador só sobre os ficheiros da tarefa, por exemplo `node .claude/skills/humanizar/scripts/humanizar.mjs RUNBOOK.md scripts src/publico`, e cola a saída completa.
2. Cada achado traz o ficheiro, a linha, a marca, a gravidade e o que uma pessoa faria no lugar.
3. Regista os achados na saída da tarefa sem os corrigir, porque a correção pede autorização.
4. Deixa a decisão para quem recolhe as saídas, categoria a categoria.

**Resultado:** Foi assim em todas as tarefas da fase 1 do site de notícias. A palavra «tela» num ficheiro da cena 3D foi apanhada e corrigida; os travessões em dados de teste que copiam o formato do `CHANGELOG.md` ficaram, por serem dados.

## Exemplo: rever a documentação antes da entrega

**Pedido:** «Revê a documentação e os commits do projeto antes de eu entregar ao cliente.»

**O que a skill faz:**

1. Confirma o âmbito (a pasta `docs/`, o `README.md` e os últimos 20 commits) e corre `node <pasta da skill>/scripts/humanizar.mjs docs README.md --commits 20`.
2. Lê o que o verificador não apanha, marcado com L em `marcas.md`: resumos finais que repetem o que foi dito, documentação que explica o óbvio e cala o difícil, números sem fonte.
3. Mostra os achados por categoria, com o antes e o depois de um exemplo, e pergunta categoria a categoria: todos, só alguns ou nenhum.
4. Corrige só o que foi autorizado, corre o formatador do projeto e volta a correr o verificador até ficar limpo, ou até só restarem achados que o utilizador decidiu manter.
5. Os commits já publicados não se reescrevem: o achado fica registado para os seguintes.

**Resultado:** A documentação sem marcas, os achados mantidos registados com a razão, e a saída final do verificador como prova na entrega.
