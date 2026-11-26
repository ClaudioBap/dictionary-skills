# Perguntas do questionário

São a base do questionário desta skill (`SKILL.md`, «Questionário»). Os números são os mesmos da `start-project-with-trust`, e as mini skills citam-nos (por exemplo, a `seguranca` usa P11 e P14). A ordem é a sugerida: cada resposta decide a pergunta seguinte.

As pistas «Liga a» indicam as pastas de `knowledge/` a ler quando se dividem as tarefas.

> Esta lista foi escrita para a `start-project-with-trust` e aprovada pelo dono do repositório. Não vem do PDF que deu origem a `knowledge/`.

| ID | Tema | Pergunta | Liga a |
|----|------|----------|--------|
| P1 | O quê | O que se quer construir ou resolver, numa frase? | `plataformas/` |
| P2 | Porquê | Que problema ou oportunidade motiva o projeto? | — |
| P3 | Sucesso | Como se mede que o projeto correu bem? | `fiabilidade/`, `custo/` |
| P4 | Para quem | Quem são os utilizadores e os interessados? | `design/` |
| P5 | Âmbito | O que fica dentro do projeto e o que fica explicitamente fora? | — |
| P6 | Situação atual | O que já existe: sistemas, dados, documentação? | `estrutura/`, `base-de-dados/`, `plataformas/` |
| P7 | Prazo | Há datas fixas ou marcos? | `governacao/` |
| P8 | Orçamento | Qual é o limite de orçamento e o modelo de custo aceitável? | `custo/`, `nuvem/` |
| P9 | Recursos | Que equipa, competências, infraestrutura e licenças estão disponíveis? | `infraestrutura/`, `nuvem/`, `cicd/` |
| P15 | Acesso remoto | Há servidores ou máquinas a que alguém precisa de aceder remotamente (SSH ou RDP)? Quem, a partir de onde e por que via? | `acesso-remoto/`, `infraestrutura/` |
| P10 | Restrições técnicas | Há tecnologia imposta ou proibida? | `python/`, `java/`, `csharp/`, `javascript/`, `node/`, `rust/`, `docker/`, `api/`, `plataformas/` |
| P11 | Dados e conformidade | Há dados pessoais ou sensíveis? Há exigências de RGPD, de jurisdição ou de cibersegurança (o cliente é de um setor abrangido pela NIS2, ou o resultado é um produto vendido ou distribuído na UE)? | `privacidade/`, `soberania/`, `seguranca/` |
| P12 | Riscos | O que pode correr mal, e o que seria inaceitável? | `seguranca/`, `fiabilidade/` |
| P13 | Decisão | Quem aprova as decisões do projeto, e como? | `governacao/` |
| P14 | Publicação | O resultado vai estar acessível ao público ou só internamente? É para testar a título pessoal (grátis) ou para uso da organização (pago ou empresarial)? Há área de administração? | `publicacao/`, `seguranca/`, `nuvem/`, `soberania/` |
| P16 | Reutilização | Isto é para um caso só, ou vai voltar a ser preciso para outros clientes, áreas ou conjuntos de dados? Se sim, o que muda de um caso para o outro (dados, marca, regras, ligações) e o que fica igual? | `produto/` |

Para uma solução com IA, consultar também `ia/` (P1, P9 e P12).

## O que cada skill precisa de saber

Quando o questionário mostra que uma skill vai entrar, junta-se a pergunta dela, se as P da última coluna ainda não lhe responderam. A resposta vai no briefing da sessão, e a skill não volta a perguntar. Chamada sozinha, cada skill pergunta isto mesmo no seu pequeno questionário (`regras.md`, «Pedido vago ou vazio»).

| Skill | O que precisa de saber | P que já respondem |
|---|---|---|
| `design-ux` | O que se desenha (página, fluxo, componente, painel de administração, formulário, site de conteúdos), para quem e o nível de exigência (simples, profissional, topo), com um exemplo de cada | P4 |
| `design-3d-motion` | A experiência (cena 3D, produto rotativo, fundo animado, secção com scroll e motion, animação de SVG), onde entra no site, que dispositivos serve e o que a pessoa deve sentir ou perceber | P4 |
| `seguranca` | Auditar o que existe, construir com segurança ou rever acessos remotos, e o que está em jogo: dados pessoais, exposição pública, LLM na aplicação | P11, P14, P15 |
| `performance-verifier` | O que medir (site, API e base de dados, solução com IA, 3D, infraestrutura) e o alvo, com um valor concreto | P3, P8 |
| `backend-dados` | API nova, esquema novo, alteração ao que existe, processamento em segundo plano, ou tudo | P3, P10, P11 |
| `infra-deploy` | Pipeline, contentores, alojamento e domínio, publicação com TLS e borda, ou tudo | P8, P10, P11, P14 |
| `boas-praticas-codigo` | Nova funcionalidade, correção, revisão ou refatoração, e o nível; a linguagem vê-se no repositório | P10 |
| `ia-aplicada` | O que se vai fazer com IA, com uma opção por subpasta de `knowledge/ia/` | P1 |
| `produtizar` | Até onde ir (a decisão «Específico ou modular»), o segundo caso que serve de prova e, se se vende por partes, por onde (funcionalidade, bloco, separador, janela, API ou plano) | P16 |
| `operar` | Que plataforma é, onde corre, quem a vai operar e com que conhecimento | P3, P12 |
| `gravacao-video` | O URL, o que mostrar, o público, se precisa de login (e em que variáveis de ambiente estão as credenciais), o formato (teaser, demonstração, explicação) e o estilo (apresentação ou sóbrio) | P4 |
| `humanizar` | O que verificar (a pasta, só os ficheiros alterados ou um conjunto) e se as mensagens de commit entram | nenhuma |
| `documentacao` | Registar um processo ou gerar os documentos; para gerar, 2 a 3 ficheiros-padrão da casa (aconselha um Excel, um PowerPoint, um PDF e um Word) ou o estilo sóbrio | nenhuma |
| `portal-de-agentes` | Recriar o portal de origem ou fazer um novo e, num novo, o que a pessoa quer ver dos agentes e porquê | P1, P4 |
| `n8n` | O que se vai fazer com o n8n (decidir se serve, instalar ou atualizar, um workflow, IA e MCP, proteger), onde corre, e se é só para a empresa ou também para os clientes dela (a licença muda) | P1, P4, P14 |
| `jarvis` | Que projeto (OpenJarvis ou Microsoft JARVIS) e para quê; para instalar, a máquina (RAM e GPU) e o que pode sair dela | P1, P11 |

As skills em testes não estão nesta tabela: só entram num trabalho se o utilizador o aceitar.
