# Segurança

As skills incluem scripts e hooks que correm na máquina de quem as instala (`scripts/verificar.mjs`, `scripts/verificar-publicacao.mjs`, `scripts/guarda-hook.mjs`, `scripts/rastreabilidade-hook.mjs` e os scripts da `update-knowledge`). Uma falha nestes ficheiros pode afetar quem os usa, por isso trata-se em privado.

## Como reportar

Usa o reporte privado de vulnerabilidades do GitHub: separador **Security** deste repositório, botão **Report a vulnerability**. Não abras um issue público nem um pull request com os pormenores.

Indica, se possível:

- o ficheiro e a versão (commit) afetados;
- o que acontece e em que condições;
- os passos para reproduzir;
- o impacto que vês (por exemplo, execução de comandos, fuga de dados, um hook que deixa passar o que devia bloquear).

## O que esperar

Respondo a confirmar a receção e, depois de analisar, digo se a falha se confirma e quando fica corrigida. Quando a correção estiver publicada, o reporte pode ser divulgado, com crédito a quem o fez, se o quiser.

## Fora do âmbito

- Vulnerabilidades nas plataformas e ferramentas citadas na base de conhecimento: reporta-as ao respetivo fornecedor.
- Conteúdo desatualizado do conhecimento: usa o modelo de issue «Correção ao conhecimento».
