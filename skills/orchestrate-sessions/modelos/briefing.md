# Briefing S<n> — <objetivo curto>

Abrir com, na pasta do projeto:

```
claude --model <modelo> --effort <nível>
```

Depois colar: «Lê `<pasta>/briefings/S<n>.md` e executa-o.»

## O que fazer

- **Mini skill:** `/<mini skill>`. <!-- Se no catálogo estiver «por criar»: «Lê knowledge/<secções>/, começando pelo README.md de cada uma.» -->
- **Entra:** <ficheiros, saídas de outras sessões, URLs>
- **Não mexer em:** <ficheiros que outras sessões estão a editar>

| # | Tarefa | Critério de fim | Quem executa | Modelo | Effort |
|---|--------|-----------------|--------------|--------|--------|

## Subagentes

<!-- Um destes: -->
- Sem subagentes: faz todas as tarefas nesta sessão.
- Lança um subagente para cada tarefa marcada «subagente», com o `model` e o `effort` da tabela. O subagente devolve o resultado e não decide sozinho o que é crítico.

## Se uma tarefa falhar o critério de fim

Sobe um degrau segundo `modelo-e-effort.md` da skill `orchestrate-sessions` e regista a subida. Se a subida pedir autorização (regra 3 desse ficheiro), para e pergunta ao utilizador.

## Se te faltar um valor que só o utilizador tem

Não pares: deixa a variável no `.env.example`, regista-a em «Por preencher» da saída (nome, para quê, onde se obtém, formato; nunca o valor) e continua com o que não depende dela.

## Ao terminar

Escreve `<pasta>/saidas/S<n>.md` com:

- cada tarefa: feito, por preencher ou não feito, e a prova (comando e saída, ficheiro ou URL);
- o que ficou por preencher pelo utilizador, uma linha por valor;
- a saída de `node <pasta da skill humanizar>/scripts/humanizar.mjs <o que alteraste>`: limpa, ou com os achados que ficaram por decidir pelo utilizador (não corrijas sem autorização);
- as subidas de nível, com a razão;
- a saída de `/usage` (custo estimado e uso por modelo);
- o que ficou em aberto.
