---
name: seguranca
description: Mini skill para auditar ou proteger um site ou aplicação. Em modo auditoria corre o verificador de publicação, percorre os critérios da base de conhecimento como lista de verificação e devolve as falhas por ordem de risco, cada uma com a correção e a entrada que a sustenta. Em modo construção aplica as práticas de segurança, privacidade e acesso remoto ao que se está a construir, com prova. Nunca explora falhas, só verifica. Usar sozinha ou numa sessão lançada pela orchestrate-sessions. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe.
argument-hint: "URL ou pasta a auditar, ou o que se vai construir"
metadata:
  estado: produção
  tipo: sub
  usa: [humanizar]
  impacto: { ia: 4, seguranca: 10, nuvem: 5, desenvolvimento: 5, web: 2 }
---

# Segurança

O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/`: `seguranca/`, `privacidade/`, `acesso-remoto/` e, para aplicações com LLM, `ia/seguranca/`. Lê o `README.md` de cada secção que o pedido toca. Se `~/.start-project-with-trust/knowledge/` tiver uma entrada com o mesmo caminho, vale a pessoal: é a versão já atualizada.

## Regras

- Seguem-se as regras de `../orchestrate-sessions/regras.md`, incluindo a autonomia depois da decisão: o que só o utilizador pode dar (chaves, certificados, contas) fica «Por preencher», e o resto continua.
- Modelo e effort segundo `../orchestrate-sessions/modelo-e-effort.md`: a auditoria e as decisões de segurança são «Rever e decidir com risco»; aplicar uma correção já decidida é «Construir»; recolher cabeçalhos e configurações é «Ler».
- Nunca explorar, só verificar. Não se testa uma falha com dados reais nem se tenta entrar onde não há autorização. Tudo o que exige autorização do dono (testes ativos, acesso a servidores, dados pessoais) pára e vai ao utilizador antes de continuar. Base: `seguranca/testes-de-seguranca-ativos.md`.
- Segredos nunca ficam em documentos nem no repositório: só a referência ao cofre. Base: `seguranca/segredos-num-cofre.md`, `acesso-remoto/inventario-de-acessos-sem-segredos.md`.

## Âmbito

Verifica e protege sites, portais, aplicações e APIs com as entradas do passo 2: TLS e cabeçalhos, autenticação e sessões, autorização, validação de entradas, segredos, dados pessoais, pipeline e dependências, acessos SSH e RDP, aplicações com LLM e portais de agentes. Faz também a passagem que a `documentacao` lhe pede antes de um documento sair da equipa: procurar tokens, chaves, emails e endereços internos. Só verifica: nunca explora uma falha, e um teste ativo pára até o dono o autorizar.

| Pedido | Esta skill | Porquê, e para onde vai |
|---|---|---|
| Testes à segurança de um portal, site, aplicação ou API | Sim | É a auditoria do passo 4, ou a construção do passo 5. |
| WAF, proteção contra DDoS e limites de taxa à frente da aplicação | Só verifica | Confirma os limites nos caminhos sensíveis e a configuração da borda no repositório (`seguranca/rate-limit-e-waf.md`). Escolher e montar a borda é da `infra-deploy` (`publicacao/waf-e-protecao-ddos.md`). Pôr a WAF à prova com ataques ou tráfego é um teste ativo. |
| Testes a uma firewall de rede ou à rede de um escritório (regras, segmentação, equipamentos) | Não | A skill nunca explora, e a base não cobre firewalls de rede nem segmentação: fica fora da base. |
| Teste de intrusão ou ataque real | Não | Prepara o threat model e a lista do que testar (`seguranca/testes-de-seguranca-ativos.md`); o teste é de quem o dono autorizar. |
| Montar o pipeline, o alojamento ou o TLS | Não | `infra-deploy`. |
| Monitorização, runbooks, cópias de segurança e processo de incidentes | Não | `operar`. Aqui só se confirma que os eventos de segurança geram alerta e que o runbook de incidente existe (`seguranca/observabilidade-e-alertas.md`, `seguranca/detecao-e-resposta-a-incidentes.md`). |
| A segurança de um pull request numa linguagem | Não | `boas-praticas-codigo`, com a entrada de segurança dessa linguagem. A aplicação inteira é aqui. |
| As defesas de uma funcionalidade com IA, ao construí-la | Não | `ia-aplicada`. Auditar a aplicação com LLM é aqui (`ia/seguranca/`). |

Quando parte do pedido cai numa linha que não é desta skill, encaminha essa parte como diz `../orchestrate-sessions/regras.md`.

## 1. O que verificar, para quê e a que nível

Chamada por uma mãe, o briefing traz o objeto, o objetivo e o nível: passa ao passo 2. Sozinha, com um pedido que não os diz, ou sem pedido, pergunta o que falta, uma pergunta de cada vez, no formato de `../orchestrate-sessions/regras.md`, e pára quando tiveres os três. Antes de perguntar, vê tu no URL e no repositório se o projeto está publicado (P14 de `../orchestrate-sessions/PERGUNTAS.md`), se guarda dados pessoais (P11) e se chama um LLM: é isso que decide as entradas do passo 2, e só perguntas o que não conseguires ver.

1. **Objeto.** O que vamos verificar ou proteger: um site, portal ou aplicação (o URL ou o repositório), uma API, os acessos a servidores (SSH, RDP) ou uma aplicação com LLM. Se a resposta for «firewall», pergunta se é a WAF à frente do site ou a firewall da rede: a WAF verifica-se aqui, a da rede fica fora da base. Para outra linha do «Âmbito» que não é desta skill, diz para onde vai antes de continuar.
2. **Objetivo**, entre estas opções:
   1. **Auditar** o que já existe (um URL, um repositório, um servidor). O resultado é uma lista de falhas por risco.
   2. **Construir** com segurança desde o início. O resultado são as práticas aplicadas ao que se está a fazer, com prova.
   3. **Rever acessos remotos** (SSH, RDP, contas). O resultado é o inventário revisto, sem segredos.
3. **Nível.** O nível ASVS alvo, que `seguranca/owasp-como-referencial.md` manda escolher, de 1 (básico) a 3 (rigoroso). Recomenda-o pelo que está em jogo: o 1 sem contas nem dados pessoais, o 2 com contas ou dados pessoais, o 3 com dados sensíveis *(interpretação)*. O nível dá a coluna de `../orchestrate-sessions/modelo-e-effort.md`: o 1 é simples, o 2 profissional e o 3 topo *(interpretação)*.

## 2. Ler só o que interessa

- Sempre: `seguranca/owasp-como-referencial.md`, `seguranca/tls-e-cabecalhos-versionados.md`, `seguranca/autenticacao-forte.md`, `seguranca/autorizacao-no-servidor.md`, `seguranca/segredos-num-cofre.md`, `seguranca/ambientes-seguros-por-omissao.md`.
- Com dados pessoais: `privacidade/` inteira, `seguranca/criptografia-e-protecao-de-dados.md`, `seguranca/dados-de-teste-sinteticos-e-minimizacao.md`, `seguranca/auditoria-append-only.md`.
- Com emails (convites, aceitação de contas, avisos, recuperação): `seguranca/links-por-email-sem-sessao.md`. Nenhum link enviado por email abre sessão.
- Com exposição pública: `seguranca/rate-limit-e-waf.md`, `seguranca/defesa-contra-xss.md`, `seguranca/csrf-verificar-a-origem.md`, `seguranca/validacao-de-entradas.md`, `seguranca/queries-parametrizadas.md`, `seguranca/seguranca-de-api.md`, `seguranca/sessoes-robustas.md`, `seguranca/sessoes-tempos-rotacao-e-cookies.md`, `seguranca/endpoints-de-saude-discretos.md`.
- Com login por OIDC: `seguranca/oidc-codigo-com-pkce-state-e-nonce.md` e, com o Microsoft Entra, `seguranca/mfa-imposto-pelo-fornecedor-de-identidade.md`.
- Com exportações para CSV ou folha de cálculo: `seguranca/exportacao-csv-sem-formulas.md`.
- Com uma funcionalidade sensível: `seguranca/testes-de-seguranca-ativos.md` (threat model; o teste dinâmico só com autorização do dono).
- Com servidores ou máquinas: `acesso-remoto/` inteira, `seguranca/contentores-endurecidos.md`, `seguranca/menor-privilegio-na-base-de-dados.md`.
- Com LLM: `ia/seguranca/owasp-top-10-llm.md`, `ia/seguranca/injecao-de-prompt-mitigacoes.md`.
- Com um portal que recebe eventos de sessões de agentes ou as conduz: `portais-de-agentes/espaco-por-pessoa-e-projeto-por-repositorio.md`, `portais-de-agentes/caixa-de-perguntas-a-distancia.md`, `portais-de-agentes/agente-local-licenca-e-emparelhamento.md`.
- Com pipeline e dependências: `seguranca/ci-como-portao-do-deploy.md`, `seguranca/cadeia-de-fornecimento-verificada.md`, `seguranca/integridade-e-migracoes-aditivas.md`.
- Para detetar e reagir: `seguranca/observabilidade-e-alertas.md`, `seguranca/detecao-e-resposta-a-incidentes.md`.
- Com obrigações legais de cibersegurança (cliente de um setor abrangido pela NIS2, ou um produto vendido ou distribuído no mercado da UE): `seguranca/nis2-entidades-medidas-e-notificacao.md`, `seguranca/cyber-resilience-act.md`.
- Com obrigações legais de cibersegurança na UE (uma entidade abrangida pela NIS2, ou um produto com elementos digitais disponibilizado no mercado da UE): as entradas da NIS2 e do Cyber Resilience Act.

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre o que o utilizador precisa, ou a entrada está desatualizada face ao que ele descreve, segue «Quando falta conhecimento» em `../update-knowledge/SKILL.md` antes de responder. Fontes oficiais deste tema: OWASP, o fornecedor e o organismo em causa.

## 4. Auditoria

1. Se há um URL público, corre a partir da pasta desta skill e cola a saída completa:

   ```
   node ../orchestrate-sessions/scripts/verificar-publicacao.mjs https://<domínio> --admin <caminho da administração, sem barra inicial>
   ```

2. Para cada entrada lida, a linha «Para uma skill» é um item da lista de verificação. Para cada item regista uma de duas coisas: a prova de que se cumpre (comando e saída, cabeçalho devolvido, ficheiro de configuração), ou uma falha.
3. Cada falha leva o risco (alto, médio ou baixo, marcado *(estimativa)* quando não há fonte que o fixe), o que corrigir e a entrada que o sustenta.
4. Ordena as falhas por risco e mostra a lista. Corrigir é decisão do utilizador: pergunta por onde começar. Depois de ele decidir, aplicas a correção até ao fim, como no passo 5, e voltas a correr a verificação.

## 5. Construção

1. Para cada prática que se aplica, o critério de fim é a linha «Para uma skill» da entrada.
2. Aplica a prática no código e na configuração. Chaves, certificados e contas que só o utilizador pode criar ficam no `.env.example` e em «Por preencher» de `entrega.md`, e o resto continua.
3. Só dás a prática por feita com prova: um teste que passa, um cabeçalho que a resposta devolve, uma configuração que o verificador aceita.
4. No fim, se o projeto está exposto, corre o verificador de publicação e regista a saída em `entrega.md` («Publicação»).
5. **Check-up depois de definir a interface.** Quando a interface fica definida (maquetes aprovadas, páginas ou fluxos novos: entrar, convites, aceitação de contas, emails, partilhas, links públicos), corre a auditoria do passo 4 sobre esses fluxos antes de os publicar, com as entradas de autenticação, sessões e emails. Cada link que sai do sistema (email, atalho público, convite) responde a «quem o tiver na mão entra sem se autenticar?»; se a resposta for sim, é uma falha de risco alto.

**Humanizar.** O código, a configuração e a documentação que entregas não podem deixar perceber que foram feitos por uma IA. Corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs <ficheiros tocados> --commits <n>`) e relê o que o verificador não apanha com as secções «Código» e «Commits, documentação e dados» de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria, e a saída final entra no relatório.

## Relatório

- O objetivo (auditoria, construção ou acessos), o nível ASVS alvo e o que está em jogo (dados pessoais, exposição, LLM).
- A saída do verificador de publicação, se correu.
- As falhas por ordem de risco, cada uma com a correção e a entrada; as corrigidas, com a prova.
- O que parou por precisar de autorização do dono.
- O que ficou fora do âmbito e para onde foi: a skill, pelo nome, ou «fora da base».
- O que ficou por preencher.
- As fontes que foste buscar, se a biblioteca não chegava.


## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.
