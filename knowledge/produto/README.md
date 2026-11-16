# Modularização e produtização

⚠️ Esta secção não vem do PDF. Foi acrescentada a pedido do utilizador para que cada projeto decida, de forma explícita, se o que se constrói serve um caso só ou vai ser reutilizado para outros clientes, áreas ou conjuntos de dados. Quando a resposta é «reutilizar», estas entradas dão a forma rápida de transportar o que foi feito: separar o núcleo do que é específico de cada caso, pôr o variável em configuração, versionar o núcleo e, só quando se justifica, servir vários inquilinos ou gerar projetos a partir de um modelo. Cada ponto liga à fonte oficial (consulta a 2026-11-10).

Fonte: Páginas dos autores e documentação oficial de cada prática ou ferramenta, ligadas em cada ponto; consultadas a 2026-11-10. Não vem do PDF.

## Entradas

- [Configuração fora do código (os doze fatores)](configuracao-fora-do-codigo.md) — O que muda de instalação para instalação vive no ambiente, e os serviços de que a aplicação depende são recursos ligados que se trocam sem tocar no código. *(fora do PDF)*
- [Específico ou modular](especifico-ou-modular.md) — Antes de construir, decide-se se o resultado serve um caso só ou vai ser reutilizado; a opção mais barata que cumpre o pedido é a certa, e abstrair sem um segundo caso à vista é custo sem retorno. *(fora do PDF)*
- [Feature flags (toggles)](feature-flags.md) — Uma flag liga ou desliga um comportamento sem mudar o código instalado; há quatro tipos, e o de permissão é o que dá a um cliente uma funcionalidade que os outros não têm, sem copiar o projeto. *(fora do PDF)*
- [Modelos de projeto reutilizáveis (Cookiecutter e Copier)](modelos-de-projeto-reutilizaveis.md) — Um modelo de projeto gera o segundo caso a partir do primeiro; a diferença entre as ferramentas está em se os projetos já gerados recebem as melhorias feitas depois ao modelo. *(fora do PDF)*
- [Multi-inquilino (modelos de tenancy)](multi-inquilino.md) — Servir vários clientes com uma instalação partilhada é mais barato e mais arriscado do que uma instalação por cliente; a escolha depende do número de clientes previsto e é também uma decisão comercial. *(fora do PDF)*
- [Núcleo e adaptadores (arquitetura hexagonal)](nucleo-e-adaptadores.md) — A aplicação fala com o exterior por portas, e cada dispositivo, base de dados ou cliente liga-se por um adaptador; o que é específico de um caso fica no adaptador e o núcleo mantém-se igual. *(fora do PDF)*
- [Versionamento e registo de alterações (SemVer, Conventional Commits, Keep a Changelog)](versionamento-e-registo-de-alteracoes.md) — Um núcleo partilhado por vários casos precisa de um número de versão que diga se uma atualização parte alguma coisa, de commits que permitam derivar esse número e de um registo de alterações escrito para pessoas. *(fora do PDF)*
