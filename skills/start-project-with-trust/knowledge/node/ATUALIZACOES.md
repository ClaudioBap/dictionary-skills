# Atualizações: Boas práticas de Node.js

Novidades com confiança alta ou média (as de média levam «Confiança: media»), organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## Node.js (segurança)

- **2026-11-11** em [Versões e runtime](versoes-e-runtime.md): Lançamentos de segurança de novembro de 2026: v26.13.1, v24.22.3 e v22.23.5. Corrigem 16 vulnerabilidades (7 de gravidade alta, 6 média e 3 baixa). As de gravidade alta estão no HTTP/2 e no TLS: um cliente HTTP/2 sem autenticação consegue derrubar o servidor (CVE-2026-123863), há três falhas de memória em sessões e streams HTTP/2 (CVE-2026-123865, CVE-2026-123866 e CVE-2026-123874), um use-after-free no parser HTTP em ligações HTTPS (CVE-2026-123864), um callback de handshake TLS que termina o processo (CVE-2026-126051) e a troca do `servername` na renegociação TLS 1.2, que contorna a autenticação por certificado de cliente (CVE-2026-123872). Quem corre uma destas três linhas atualiza para a versão indicada. Fonte: [Node.js: November 2026 Security Releases](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases). Confiança: alta. Adicionado a 2026-11-14.
