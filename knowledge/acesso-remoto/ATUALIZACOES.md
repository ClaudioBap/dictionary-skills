# Atualizações: Acesso remoto (SSH e RDP)

Novidades com confiança alta ou média (as de média levam «Confiança: media»), organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## AWS

- **2026-11-23** em [Acesso por identidade, sem portas abertas](acesso-por-identidade-sem-portas-abertas.md): O SSM Agent, de que o Session Manager depende, usa uma chave criptográfica por omissão no registo das instâncias em AMIs Windows Server lançadas antes de 2026-09-09 com o agente anterior à 3.3.5226.0 (CVE-2026-134069). As instâncias lançadas dessas AMIs continuam afetadas mesmo depois de atualizar o agente: corrige-se substituindo-as por instâncias de AMIs corrigidas. Apagar o Vault do agente não é uma correção suportada e parte as instâncias com Default Host Management Configuration; sem substituição imediata, limita-se o acesso local de utilizadores sem direitos de administrador. Fonte: [AWS Security Bulletin 2026-197-AWS](https://aws.amazon.com/security/security-bulletins/rss/2026-197-aws/). Confiança: alta. Adicionado a 2026-11-26.
