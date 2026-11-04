# Acesso remoto (SSH e RDP)

⚠️ Esta secção não vem do PDF. Foi acrescentada a pedido do utilizador para que o arranque pergunte, logo no início (P15), como se acede aos servidores, e para que o projeto mantenha um inventário de acessos sem segredos (`acessos.md`). Cada ponto liga à fonte oficial (consulta a 2026-11-04).

Fonte: Fontes oficiais dos projetos, fornecedores e organismos citados (OpenSSH, NIST, Microsoft, AWS, Cloudflare, Tailscale, OWASP), ligadas em cada ponto; consultadas a 2026-11-04. Não vem do PDF.

## Entradas

- [Acesso por identidade, sem portas abertas](acesso-por-identidade-sem-portas-abertas.md) — Em vez de abrir as portas 22 ou 3389, o acesso passa por um serviço que valida a identidade, aplica políticas e regista as sessões: AWS Session Manager, Cloudflare Access for Infrastructure, Tailscale SSH ou Azure Bastion. *(fora do PDF)*
- [Inventário de acessos, sem segredos](inventario-de-acessos-sem-segredos.md) — Cada projeto mantém um inventário de quem acede a que servidor, por que via e com que método, revisto com regularidade, com as chaves e passwords guardadas num cofre e nunca no inventário. *(fora do PDF)*
- [RDP protegido](rdp-protegido.md) — O RDP não fica aberto diretamente à Internet: passa por um RD Gateway com MFA ou por um serviço como o Azure Bastion, e exige sempre Network Level Authentication. *(fora do PDF)*
- [SSH endurecido](ssh-endurecido.md) — No SSH entra-se só com chave (Ed25519, de preferência numa chave de hardware FIDO) ou certificado, nunca com password, sem login direto de root, só para os utilizadores autorizados e com o OpenSSH sempre na versão mais recente. *(fora do PDF)*
