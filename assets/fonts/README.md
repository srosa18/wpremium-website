# assets/fonts/ — fontes auto-hospedadas

Solte aqui os arquivos de fonte da marca. Sem build step: o CSS aponta direto
pra estes arquivos via `@font-face` (declarado em `css/tokens.css`).

## Formato
- **`.woff2`** (preferido — menor e suportado em todos os browsers atuais).
- `.woff`, `.otf` ou `.ttf` também funcionam. Se só tiver esses, manda assim
  mesmo que eu adapto.

## Nomes dos arquivos (por papel, não por fundição)
Nomeie por **papel + peso**, minúsculo, kebab-case. Assim o CSS nunca depende do
nome comercial da fonte e a troca futura é indolor:

```
display-light.woff2     ← título / display · peso 300  (opcional)
display-regular.woff2   ← 400
display-medium.woff2    ← 500
body-regular.woff2      ← corpo · 400
body-medium.woff2       ← 500
body-semibold.woff2     ← 600  (opcional)
```

Itálico, se houver: sufixo `-italic` (ex.: `body-italic.woff2`).

## Me diga junto com os arquivos
- Qual é a fonte **display** e qual é a **body** (nomes reais, ex.: "display =
  Canela, body = Söhne") — só pra eu acertar a stack de _fallback_.
- Os pesos que vierem. Se faltar 300 ou 600, sem problema, ajusto.

> O `@font-face` já está reservado em `css/tokens.css` apontando pra estes nomes,
> com as famílias apelidadas de `"WP Display"` e `"WP Body"`. Assim que os
> arquivos caírem aqui, é só linkar o `tokens.css` na página e funciona.
