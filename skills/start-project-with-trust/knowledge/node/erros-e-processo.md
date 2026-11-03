---
id: node/erros-e-processo
titulo: "Erros e processo"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Erros e processo

**Resumo:** Tratar todas as rejeições, distinguir erros operacionais de bugs e deixar o processo terminar quando o estado é incerto.

## Conteúdo

- Toda a promessa é aguardada ou tem tratamento de erro; nos handlers HTTP, os erros chegam ao middleware de erros.
- Distinguir erros operacionais (rede, entrada inválida), que se tratam, de erros de programação, que se corrigem.
- Em `uncaughtException` / `unhandledRejection`: registar e terminar o processo; o orquestrador reinicia-o. Não continuar com estado incerto.

**Para uma skill:** não há rejeições por tratar; um erro fatal regista-se e termina o processo.

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.
