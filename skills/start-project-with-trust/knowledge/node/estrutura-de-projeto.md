---
id: node/estrutura-de-projeto
titulo: "Estrutura de projeto"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Estrutura de projeto

**Resumo:** Módulos ES, camadas separadas (rotas, serviços, acesso a dados) e um módulo por responsabilidade.

## Conteúdo

- Módulos ES (`"type": "module"`) em código novo.
- Separar camadas: rotas/controladores, serviços com a lógica de negócio e acesso a dados; a lógica não depende do framework HTTP.
- Um módulo por responsabilidade; evitar ficheiros gigantes e dependências circulares.

**Para uma skill:** a lógica de negócio está fora das rotas e pode ser testada sem servidor HTTP.

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.
