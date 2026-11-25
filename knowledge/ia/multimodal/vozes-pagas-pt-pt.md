---
id: ia/multimodal/vozes-pagas-pt-pt
titulo: "Vozes pagas em português de Portugal"
seccao: "Construir com IA"
paginas: []
fonte: "Páginas oficiais de preços, vozes e dados de cada fornecedor, ligadas em cada ponto; consultadas a 2026-11-25. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-25
---

# Vozes pagas em português de Portugal

**Resumo:** Para quem quiser pagar uma voz em pt-PT há cinco fornecedores com preço público: Amazon Polly, Google Cloud, Azure, ElevenLabs e OpenAI. Diferem nas vozes pt-PT que têm, no preço por milhão de caracteres, na licença comercial e no sítio onde ficam os dados.

## Conteúdo

- Amazon Polly: vozes pt-PT Inês e Cristiano; na lista de vozes neurais só aparece a Inês, e na das generativas não há pt-PT. Preço por milhão de caracteres (USD): Standard 4, Neural 16, Long-Form 100, Generative 30. Escalão gratuito: 5 milhões de caracteres por mês nas Standard; 1 milhão nas Neural, 500 mil nas Long-Form e 100 mil nas Generative, estas nos primeiros 12 meses. As perguntas frequentes falam em 12 meses para todo o escalão. Desde 15/07/2025, uma conta nova recebe até 200 USD de créditos. Uso comercial: «your Polly output belongs to you», sem restrições a guardar e reutilizar o áudio. Dados: ficam cifrados na região AWS onde se usa a Polly; a AWS pode usar o texto para melhorar os seus serviços de IA e guardá-lo noutra região, a menos que se faça o opt-out por uma política do AWS Organizations. As vozes neurais existem em Frankfurt, Irlanda, Londres e Zurique. Fonte: [preços](https://aws.amazon.com/polly/pricing/), [perguntas frequentes](https://aws.amazon.com/polly/faqs/), [vozes](https://docs.aws.amazon.com/polly/latest/dg/available-voices.html), [vozes neurais](https://docs.aws.amazon.com/polly/latest/dg/neural-voices.html), [vozes generativas](https://docs.aws.amazon.com/polly/latest/dg/generative-voices.html)
- Google Cloud Text-to-Speech, depois do escalão gratuito (ver [Voz: síntese e reconhecimento](voz-tts-e-stt.md)), por milhão de caracteres (USD): Standard e WaveNet 4, Neural2 16, Chirp 3: HD 30, Studio 160. As vozes pt-PT são só Standard e WaveNet. O Gemini 3.8 Flash TTS (pré-visualização, com pt-PT em pré-visualização) cobra por tokens: 0,50 USD por milhão de tokens de texto e 9,00 USD por milhão de tokens de áudio até 31/12/2026, e 1,00 e 18,00 USD a partir de 1/1/2027. Dados: com o endpoint `eu-texttospeech.googleapis.com` ficam na Europa, e a Google diz que não regista o texto nem o áudio. Fonte: [preços](https://cloud.google.com/text-to-speech/pricing), [endpoints](https://cloud.google.com/text-to-speech/docs/endpoints), [registo de dados](https://cloud.google.com/text-to-speech/docs/data-logging)
- Azure AI Speech, depois do escalão gratuito, na região West Europe: voz neural a 13,47 EUR por milhão de caracteres (em vigor desde 2024-02-01) e Neural HD a 19,75 EUR (desde 2026-03-01). A página de preços não mostra os valores sem JavaScript, por isso vêm da API oficial de preços. As vozes pt-PT estão em [Voz: síntese e reconhecimento](voz-tts-e-stt.md). Dados: a Microsoft não guarda o texto da síntese em tempo real, e «Neither input text nor output audio content is stored in Microsoft logs». Fonte: [API de preços de retalho do Azure](https://prices.azure.com/api/retail/prices), [dados, privacidade e segurança do TTS (2026-02-25)](https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/speech-service/text-to-speech/data-privacy-security)
- ElevenLabs: o modelo Multilingual v2 tem «Portuguese (Brazil, Portugal)»; os outros modelos dizem só «Portuguese». Planos mensais (USD), com créditos por mês: Free 0 (10 mil), Starter 6 (30 mil; 1 USD no primeiro mês), Creator 22 (121 mil), Pro 99 (600 mil), Scale 299 (1,8 milhões), Business 990 (6 milhões), e Enterprise à medida. O Free não tem licença comercial: o Starter é o primeiro plano que acrescenta «Commercial License». No site, cada carácter de texto para voz gasta 1 crédito; pela API, o Eleven v4, o v3 e o Multilingual v2 gastam 1 e o Turbo, o Flash e o v3 Conversational gastam 0,5. Dados: por omissão ficam nos Estados Unidos; a residência na UE só existe no Enterprise. Fonte: [preços](https://elevenlabs.io/pricing), [modelos](https://elevenlabs.io/docs/overview/models), [residência de dados](https://elevenlabs.io/docs/overview/administration/data-residency)
- OpenAI: o endpoint `/v1/audio/speech` com `gpt-4o-mini-tts` tem 11 vozes, «optimized for English», e segue as línguas do Whisper, onde aparece «Portuguese» sem distinguir pt-PT de pt-BR. Os modelos `tts-1`, `tts-1-hd` e `gpt-4o-mini-tts` estão descontinuados e desligam a 2027-01-06; a substituição é o `gpt-realtime-2.1-mini` pela Realtime API, que não funciona no `/v1/audio/speech`. Preço do `gpt-realtime-2.1-mini` por milhão de tokens (USD): áudio 10 à entrada, 20 à saída e 0,30 em cache; texto 0,60, 2,40 e 0,06. As políticas de uso obrigam a dizer a quem ouve que a voz é gerada por IA. Dados: o `/v1/audio/speech` não é usado para treino, guarda 30 dias para monitorização de abuso e pode ter retenção zero. As páginas lidas não falam de escalão gratuito. Fonte: [text to speech](https://developers.openai.com/api/docs/guides/text-to-speech), [preços](https://developers.openai.com/api/docs/pricing), [os teus dados](https://developers.openai.com/api/docs/guides/your-data)
- Fish Audio: preços e planos em [Voz: síntese e reconhecimento](voz-tts-e-stt.md).

**Para uma skill:** uma voz paga só entra se a pessoa quiser pagar e depois de ouvir a mesma frase de teste nas vozes gratuitas. Antes de a usar, a skill regista o plano com licença comercial (na ElevenLabs, a partir do Starter), onde ficam os dados (endpoint ou região na UE; na Polly, se o opt-out está feito) e o custo estimado do guião em caracteres. Com a OpenAI, avisa quem ouve que a voz é gerada por IA e não usa os modelos do `/v1/audio/speech` em trabalho que dure depois de 6 de janeiro de 2027.

## Ver também

- [Voz: síntese (TTS) e reconhecimento (STT)](voz-tts-e-stt.md) (Construir com IA)
- [OpenAI API: batch, cache, saída estruturada e controlo de dados](../fornecedores/openai-api.md) (Construir com IA)

Fonte: páginas oficiais de preços, vozes e dados de cada fornecedor, ligadas em cada ponto; consultadas a 2026-11-25. Não vem do PDF.
