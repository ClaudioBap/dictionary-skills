# Inventário e arranque de sessões

## Descobrir e escolher modelos

Corre a partir da pasta da skill:

```sh
node scripts/delegacao.mjs --inventario --permitir claude,codex,ollama
```

A lista em `--permitir` é um exemplo. Usa os identificadores dos fornecedores que a resposta P11 autoriza para este trabalho. Sem lista de fornecedores autorizados, o inventário continua visível e as opções de papéis ficam indisponíveis. A resposta JSON devolve `portal`, `origem`, `agente`, `modelos`, a autonomia conhecida e as perguntas. Mostra a mensagem de `confirmar_modelos` inteira antes de perguntar. A caixa de perguntas do portal ou a conversa local apresenta a mesma lista. Credenciais e autenticação ficam no agente ou na ferramenta do fornecedor.

O comando procura o agente em `<base>/cid/agente/agente.mjs`. Se a instalação usar outro caminho, passa `--agente <ficheiro>` ou define `CID_AGENTE`. Quando a ligação ao portal está ativa, usa as opções de Ligações apresentadas pelo agente. Quando está indisponível, diz que a lista vem da configuração local e oferece verificar a ligação e atualizar. Passa `--local` para um trabalho que deve ficar local, mesmo com agente instalado. Sem agente compatível, o comando procura perfis das ferramentas registadas em `scripts/fornecedores.mjs` e modelos Ollama no endereço local deste PC. Os perfis sem modelo confirmado aparecem como «Modelos por verificar».

Se faltar um modelo conhecido e configurado para abertura manual, indica onde validar a ligação. Depois de a pessoa confirmar a ligação e o nome exato do modelo, atualiza a lista com `--modelo-manual <fornecedor> <conta> <subscricao|api|local> <modelo>`. Esta opção usa referências públicas e habilita abertura manual. Podes repeti-la para mais do que um modelo. Conserva o estado mais recente do agente quando ele já conhece a combinação.

Pergunta pelos papéis de cada combinação elegível de conta e modelo. Uma combinação pode ter vários papéis, ou ficar de fora. A capacidade `delegar` indica que o agente pode abrir essa combinação, e cada papel disponível vem declarado nas capacidades. Propõe os modos depois de saber que sessões entram. Só oferece abrir todas de forma delegada se cada sessão escolhida o suportar. Para o modo misto, confirma por sessão as combinações escolhidas, o modo e as dependências. Guarda as decisões em `sessoes.md` e `estado.json`. O campo `papeis_modelos` usa o `id` de cada modelo devolvido pelo comando como chave e uma lista dos papéis escolhidos como valor. Mantém `papeis_contas` para trabalhos que já o usam. Para a retoma antiga, uma conta sem executor só pode aparecer como planeadora ou verificadora. Uma mudança de modelo continua dependente da escolha de papéis da pessoa.

## Da aprovação à execução

Prepara um manifesto `orquestracao.json` na pasta do trabalho quando o agente participa no arranque ou na recolha das sessões. Identifica cada sessão e indica os seus pré-requisitos. Uma sessão que planeia antes da aprovação tem o seu briefing de planeamento. Na aprovação final confirma quais as sessões que vão executar ou verificar, o modo de abertura e em que ordem. Regista as saídas de planeamento já recolhidas no projeto e inclui no manifesto de execução os passos que ainda têm de arrancar. O plano apresentado à pessoa inclui a atribuição, a revisão e a autonomia. A aprovação refere-se a essa versão.

Formato do manifesto após aprovação, com um executor delegado e uma verificação manual:

```json
{
  "versao": 1,
  "trabalho": "entrega-do-projeto",
  "revisao": "1",
  "repo": "equipa/projeto",
  "titulo": "Execução e verificação da entrega",
  "aprovado": true,
  "autonomia": "Executar e registar",
  "sessoes": [
    {
      "id": "S1",
      "modo": "delegada",
      "papel": "executor",
      "fornecedor": "codex",
      "conta": "principal",
      "acesso": "subscricao",
      "modelo": "gpt-5.2",
      "briefing": "Executa o plano aprovado. Devolve as alterações e a prova pedida.",
      "depende_de": []
    },
    {
      "id": "S2",
      "modo": "manual",
      "papel": "verificador",
      "fornecedor": "claude",
      "conta": "principal",
      "acesso": "subscricao",
      "modelo": "sonnet",
      "briefing": "Verifica a saída do executor com os critérios do plano.",
      "depende_de": ["S1"]
    }
  ]
}
```

`briefing` contém o texto a entregar à sessão. Inclui as referências aos ficheiros e os critérios de aceitação. Acrescenta `sessao_orquestrador` com o ID real da sessão e `plano` com o texto aprovado quando disponíveis. Com partilha de planos ativa, o agente usa esses dados para ligar o plano ao projeto. Para um trabalho explicitamente local, guarda `"portal": false` no manifesto. No percurso misto, uma sessão manual já selecionada pode levar `sessao` com o identificador real. Os IDs de sessão do manifesto continuam estáveis até ao fim.

Só depois de receberes aprovação explícita guarda `"aprovado": true`, assinala a revisão em «Validação» e executa os comandos seguintes. Regista em `estado.json` o campo `orquestracao` com `agente` e `manifesto`, ambos caminhos absolutos, e a `revisao` aprovada. Passa cada caminho com espaços como um argumento entre aspas no PowerShell ou no terminal da máquina.

```sh
node <agente> orquestracao executar <manifesto>
node <agente> orquestracao estado <manifesto>
```

O agente abre as sessões delegadas cujas dependências estão prontas. Para cada sessão manual pronta, indica à pessoa o fornecedor, conta, modelo, pasta, como abrir no VS Code ou terminal, texto do briefing e onde guardar a saída. Pode associar a sessão que já abriu e entregar a saída da tarefa quando terminar:

```sh
node <agente> orquestracao briefing <manifesto> <id>
node <agente> orquestracao associar <manifesto> <id> <sessao>
node <agente> orquestracao entregar <manifesto> <id> <ficheiro-saida>
```

O comando `briefing` inclui os resultados das dependências concluídas. Depois da entrega manual, consulta o estado e continua o manifesto aprovado. Ao retomar ou repetir o pedido de arranque, usa o mesmo manifesto e a mesma revisão para preservar a identidade de lançamento. Quando o agente não existir, entrega os briefings e recolhe as saídas manualmente, continuando pelo ficheiro `sessoes.md`. As sessões que precisem de execução delegada aguardam pelo agente ou por uma alteração aprovada ao plano.

Se um modelo deixar de estar disponível, regista a razão no trabalho. Aplica uma alternativa aprovada com o mesmo papel e permitida pela P11. Qualquer outra troca pede a decisão que faltar. Para instruções durante a execução, usa o encaminhamento do portal quando a sessão o suportar e confirma a entrega na sessão certa.
