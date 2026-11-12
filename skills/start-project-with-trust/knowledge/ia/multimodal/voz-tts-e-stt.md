---
id: ia/multimodal/voz-tts-e-stt
titulo: "Voz: síntese (TTS) e reconhecimento (STT)"
seccao: "Construir com IA"
paginas: []
fonte: "Repositórios, cartões de modelo e páginas de preços e de vozes oficiais, ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
editado_em: 2026-11-10
---

# Voz: síntese (TTS) e reconhecimento (STT)

**Resumo:** Para narrar em português de Portugal sem custo há uma opção local (Piper, com vozes pt_PT) e um escalão gratuito na nuvem (Azure, com vozes pt-PT); a licença do motor, das vozes e do modelo decide o que se pode usar com clientes.

## Conteúdo

- Piper: motor de TTS local («A fast and local neural text-to-speech engine»). A versão atual (OHF-Voice/piper1-gpl) tem licença GPL-3.0; a versão anterior (rhasspy/piper, release 2023.11.14-2) tem licença MIT e traz um binário para Windows (`piper_windows_amd64.zip`) que corre sem Python. As vozes têm licença MIT e cobrem 35 línguas; a pasta `pt_PT` tem a voz `tugão` (qualidade `medium`, 22050 Hz, mono, 16 bits), com licença MIT e dataset CC0; a qualidade de ouvido fica por confirmar pelo utilizador. Em Windows, o binário 2023.11 não lê caminhos com acentos (falha em silêncio com o código 0xC0000409): converte-se cada caminho para o nome curto 8.3 e passam-se `--espeak_data` e `--config` explícitos, porque o nome curto esconde a extensão `.onnx`. Com `--sentence_silence 0.25`, a voz lê cerca de 18 caracteres por segundo. O Piper não é determinista: a mesma frase sai diferente a cada geração, com sílabas mais ou menos engolidas. Em 7 de 19 frases o modelo acabou com a voz ainda 25 a 30 dB abaixo do pico e caiu para silêncio de uma vez (nota-se como fim cortado), e nenhum parâmetro (`--length_scale`, `--noise_w`, `--noise_scale`) o evita; algumas frases começam sem silêncio ou com uma rajada curta antes da voz (nota-se como ruído). O que resulta: gerar quatro tomadas por frase com `--sentence_silence 0` e escolher a que não tem ruído, acaba menos cortada e tem a duração mais próxima da mediana (os fins cortados desceram para 2 em 22), cortar o que vem antes da fala, um desvanecer de 10 ms à entrada e de 30 ms à saída (90 ms quando o fim foi cortado), e `--length_scale 1.08` com `--noise_w 0.6` para uma fala mais lenta e regular. O espeak-ng lê as palavras estrangeiras com fonética portuguesa: siglas e endereços passam por um dicionário de pronúncias e os termos em inglês dizem-se em português. Fonte: [rhasspy/piper (releases)](https://github.com/rhasspy/piper/releases/tag/2023.11.14-2), [OHF-Voice/piper1-gpl](https://github.com/OHF-Voice/piper1-gpl), [voz pt_PT-tugão-medium](https://huggingface.co/rhasspy/piper-voices/tree/main/pt/pt_PT/tug%C3%A3o/medium); o problema dos caminhos, o não determinismo e os fins cortados *(verificado em teste, 2026-11-10, pela análise do envelope do áudio; a qualidade de ouvido foi confirmada pelo utilizador)*
- Kokoro-82M: licença Apache 2.0; a versão 1.0 (2025-01-27) tem 8 línguas e 54 vozes. O português não aparece na página lida, por isso pt-PT não está confirmado. Fonte: [hexgrad/Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M)
- XTTS-v2: 17 línguas, com «pt» sem distinguir pt-PT de pt-BR. A licença é a «Coqui Public Model License», apontada como não comercial; os termos não foram lidos, por isso o uso comercial fica por confirmar. Fonte: [coqui/XTTS-v2](https://huggingface.co/coqui/XTTS-v2)
- Whisper: reconhecimento de fala com licença MIT (código e pesos), em tamanhos de 39M (tiny) a 1550M (large) parâmetros, e o turbo com 809M. O suporte de português não foi confirmado no texto lido. Fonte: [openai/whisper](https://github.com/openai/whisper)
- faster-whisper: licença MIT; corre em CPU com `device="cpu"` e `compute_type="int8"`, e diz ser «up to 4 times faster» que o openai/whisper. No exemplo de CPU, o modelo small com int8 usou 1477MB de RAM. Fonte: [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper)
- Azure AI Speech, escalão gratuito F0: TTS neural «0.5 million characters free per month», STT em tempo real «5 audio hours free per month» e «1 model free per month» de endpoint personalizado. Fonte: [preços do Azure Speech](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/)
- O Azure tem vozes neurais pt-PT: pt-PT-RaquelNeural, pt-PT-DuarteNeural e pt-PT-FernandaNeural, e a voz HD pt-PT-Rui. Não está confirmado que o escalão gratuito inclua as vozes HD. Fonte: [Language support (Azure, atualizado a 2026-11-01)](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts)
- API REST de texto para voz do Azure: `POST https://<região>.tts.speech.microsoft.com/cognitiveservices/v1`, com o corpo em SSML (`<speak version='1.0' xml:lang='…'><voice name='…'>texto</voice></speak>`), `Content-Type: application/ssml+xml`, `X-Microsoft-OutputFormat` (por exemplo `riff-24khz-16bit-mono-pcm` ou `riff-22050hz-16bit-mono-pcm`; não há RIFF a 16 kHz) e `User-Agent` obrigatório; a chave vai em `Ocp-Apim-Subscription-Key` ou num token `Authorization: Bearer`. O áudio de um pedido não passa de 10 minutos. Ainda não foi testada com uma chave real. Fonte: [Text to speech REST API](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/rest-text-to-speech)
- O Google Cloud Text-to-Speech não foi lido (página de preços e lista de vozes truncadas); o escalão gratuito e as vozes pt-PT ficam por confirmar.

**Para uma skill:** a narração em pt-PT de um vídeo usa primeiro uma voz local gratuita (Piper com a voz `pt_PT-tugão-medium`, depois de o utilizador a ouvir) ou o escalão gratuito do Azure com uma voz pt-PT, conta os caracteres do guião face ao limite mensal, e regista a licença do motor e da voz; um modelo com licença não comercial não entra em vídeos de clientes sem os termos confirmados.

Fonte: repositórios, cartões de modelo e páginas de preços e de vozes oficiais, ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF.

## Histórico

- **data não indicada**: antes, «Piper: motor de TTS local («A fast and local neural text-to-speech engine»), com licença GPL-3.0. As vozes têm licença MIT e cobrem 35 línguas; existe uma pasta `pt_PT` além da `pt_BR`, mas os nomes e a qualidade de cada voz não foram confirmados.» e, em «Para uma skill», «Piper pt_PT, depois de ouvir e confirmar a voz» (fonte anterior: os mesmos repositórios). Mudou porque a voz `pt_PT-tugão-medium` foi confirmada no cartão do Hugging Face e usada num vídeo de teste, e o binário Windows do release 2023.11.14-2 (MIT) foi lido e testado. Fonte: [rhasspy/piper (releases)](https://github.com/rhasspy/piper/releases/tag/2023.11.14-2), [voz pt_PT-tugão-medium](https://huggingface.co/rhasspy/piper-voices/tree/main/pt/pt_PT/tug%C3%A3o/medium). Editado a 2026-11-10.
