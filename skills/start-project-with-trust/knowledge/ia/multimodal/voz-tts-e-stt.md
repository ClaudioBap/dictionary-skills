---
id: ia/multimodal/voz-tts-e-stt
titulo: "Voz: síntese (TTS) e reconhecimento (STT)"
seccao: "Construir com IA"
paginas: []
fonte: "Repositórios, cartões de modelo e páginas de preços e de vozes oficiais, ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Voz: síntese (TTS) e reconhecimento (STT)

**Resumo:** Para narrar em português de Portugal sem custo há uma opção local (Piper, com vozes pt_PT) e um escalão gratuito na nuvem (Azure, com vozes pt-PT); a licença do motor, das vozes e do modelo decide o que se pode usar com clientes.

## Conteúdo

- Piper: motor de TTS local («A fast and local neural text-to-speech engine»), com licença GPL-3.0. As vozes têm licença MIT e cobrem 35 línguas; existe uma pasta `pt_PT` além da `pt_BR`, mas os nomes e a qualidade de cada voz não foram confirmados. Fonte: [OHF-Voice/piper1-gpl](https://github.com/OHF-Voice/piper1-gpl), [rhasspy/piper-voices](https://huggingface.co/rhasspy/piper-voices/tree/main/pt)
- Kokoro-82M: licença Apache 2.0; a versão 1.0 (2025-01-27) tem 8 línguas e 54 vozes. O português não aparece na página lida, por isso pt-PT não está confirmado. Fonte: [hexgrad/Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M)
- XTTS-v2: 17 línguas, com «pt» sem distinguir pt-PT de pt-BR. A licença é a «Coqui Public Model License», apontada como não comercial; os termos não foram lidos, por isso o uso comercial fica por confirmar. Fonte: [coqui/XTTS-v2](https://huggingface.co/coqui/XTTS-v2)
- Whisper: reconhecimento de fala com licença MIT (código e pesos), em tamanhos de 39M (tiny) a 1550M (large) parâmetros, e o turbo com 809M. O suporte de português não foi confirmado no texto lido. Fonte: [openai/whisper](https://github.com/openai/whisper)
- faster-whisper: licença MIT; corre em CPU com `device="cpu"` e `compute_type="int8"`, e diz ser «up to 4 times faster» que o openai/whisper. No exemplo de CPU, o modelo small com int8 usou 1477MB de RAM. Fonte: [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper)
- Azure AI Speech, escalão gratuito F0: TTS neural «0.5 million characters free per month», STT em tempo real «5 audio hours free per month» e «1 model free per month» de endpoint personalizado. Fonte: [preços do Azure Speech](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/)
- O Azure tem vozes neurais pt-PT: pt-PT-RaquelNeural, pt-PT-DuarteNeural e pt-PT-FernandaNeural, e a voz HD pt-PT-Rui. Não está confirmado que o escalão gratuito inclua as vozes HD. Fonte: [Language support (Azure, atualizado a 2026-11-01)](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts)
- O Google Cloud Text-to-Speech não foi lido (página de preços e lista de vozes truncadas); o escalão gratuito e as vozes pt-PT ficam por confirmar.

**Para uma skill:** a narração em pt-PT de um vídeo usa primeiro uma voz local gratuita (Piper pt_PT, depois de ouvir e confirmar a voz) ou o escalão gratuito do Azure com uma voz pt-PT, conta os caracteres do guião face ao limite mensal, e regista a licença do motor e da voz; um modelo com licença não comercial não entra em vídeos de clientes sem os termos confirmados.

Fonte: repositórios, cartões de modelo e páginas de preços e de vozes oficiais, ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF.
