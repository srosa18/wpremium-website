# W Premium · Concierge Digital
## Adendo de handoff — ajustes de 10/09/2026

Complemento ao `handoff-desenvolvimento.md`. Cobre quatro commits, do
`c19e6f8` ao `f242e09`. Tudo publicado; a versão no ar é `v=50`.

---

## 1. O que muda para quem vai desenvolver

Três coisas neste adendo pedem atenção de vocês. O resto é conteúdo.

**Nada de placeholder aparece mais.** Onde falta imagem, não há caixa, ícone
nem aviso — o bloco simplesmente não é exibido. A marcação continua no HTML.

**Dobras ocultas com `hidden`.** Quatro dobras de cada sala e alguns blocos de
outras páginas estão no HTML com o atributo `hidden`. Não foram apagadas: o
`data-comment-id` segue lá para o wireframe e para o CMS.

**A alternância de fundo é manual.** Se vocês revelarem ou esconderem uma
dobra, confiram se duas seções de mesmo fundo não ficaram vizinhas.

---

## 2. Placeholders

O slot de imagem pendente exibia um triângulo de atenção, um ícone e o texto
"Imagem não encontrada no Drive". Isso foi retirado em duas etapas: primeiro
sobrou só o retângulo; depois o retângulo também saiu.

Onde ficou registrado:

```css
/* css/highfi.css */
.ph::before, .ph::after,
.ph:not(.ph-missing)::before,
.ph:not(.ph-missing)::after { content:none !important; }
.img-missing { display:none !important; }
```

Foram removidos 30 blocos `<style>` que pintavam o aviso dentro das páginas e
87 marcações `<span class="img-missing">` do markup.

**A classe `.ph-missing` continua no HTML.** Ela não tem mais peso visual, mas
segue marcando quais slots aguardam imagem — é por ela que vocês encontram os
pontos que o CMS vai precisar preencher.

---

## 3. Dobras ocultas

| Dobra | Onde | Por quê |
|---|---|---|
| `05-gastronomia` | 26 salas | era título + caixa vazia; as fotos de cardápio são pendência do cliente |
| `06-bem-estar` | 26 salas | os três cards passaram para Amenidades |
| `10-identidade` | 26 salas | era título + caixa vazia |
| `11-press` | 26 salas | era só o aviso de clipping |
| `imagem-capa` | `artigo.html` | capa vazia cuja legenda creditava um fotógrafo por uma imagem inexistente |
| `bloco-1` a `bloco-3` | `premios.html` | três seções de título + caixa, sem conteúdo |

Para revelar qualquer uma, basta remover o atributo `hidden` da `<section>`.
Depois disso, conferir a alternância de fundo (seção 6).

---

## 4. Bem-estar entra em Amenidades

Os três cards da dobra Bem-estar — Conectividade, The Wonder Club Collection e
Tomada — passaram para a dobra de Amenidades, que agora tem seis itens em duas
linhas de três. Foram 71 cards movidos em 26 salas.

Os cards vindos do Bem-estar tinham moldura (`card card-body`); foram
convertidos para o padrão da Amenidades, sem moldura, para as duas linhas
lerem como um bloco só.

A dobra `06-bem-estar` virou um stub: mantém `data-comment-id` e
`data-comment-label`, sem conteúdo próprio, com `hidden`.

---

## 5. Componentes de layout novos

Dois, ambos em `css/highfi.css`.

### `.card-atalho`

O card "Veja todas" da dobra de cross-sell não é uma sala — é a porta para a
listagem. Não tem foto. Em vez de exibir uma caixa vazia, virou bloco de
texto: sem fundo, sem moldura, alinhado ao topo e à direita, de modo que a
borda do texto cai na mesma linha vertical do botão de menu do topo.

```css
.sala-card.card-atalho{ background:transparent; border:none; box-shadow:none; align-self:start; }
.sala-card.card-atalho .card-body{ text-align:right; padding-top:0; padding-left:0; }
```

### `.grid-cross-sell`

A coluna do atalho é mais estreita, então as duas fotos ganham largura:

```css
.grid.grid-cross-sell{ grid-template-columns:1fr 1fr minmax(150px,.42fr); }
```

As fotos das salas passaram de 400px para 486px. Abaixo de 900px o atalho
ocupa a linha inteira e volta a alinhar à esquerda; abaixo de 640px, coluna
única.

---

## 6. Alternância de fundo — atenção ao mexer

As dobras alternam entre `.section` e `.section section-alt`. **Essa
alternância está escrita no HTML, não é calculada.**

Quando uma dobra é ocultada, duas seções de mesmo fundo podem ficar vizinhas e
se fundirem visualmente num bloco só. Foi o que aconteceu em quatro páginas,
todas por causa de seções removidas em rodadas anteriores — já corrigidas:

| Página | Correção |
|---|---|
| `airport-rooms.html` | `bloco-4` → sem alt, `bloco-5` → alt |
| `arrival-services.html` | `bloco-3` → sem alt |
| `meet-assist.html` | `bloco-5` → alt |
| `sobre.html` | `bloco-4` → alt |

As 26 salas não precisaram de ajuste: com as quatro dobras ocultas, as classes
já alternavam corretamente.

`verificador.html` é exceção proposital — os três estados aparecem empilhados
com o mesmo fundo, por convenção do wireframe.

> **Uma nota de transparência.** Numa versão intermediária deste trabalho eu
> resolvi isso com uma função em runtime (`rebalanceSections()` no `app.js`),
> que recalculava a alternância entre as seções visíveis. Foi retirada a
> pedido do Sandro, com razão: era arquitetura demais para o problema, e
> deixaria vocês com lógica de layout em JS num site estático. Se um dia a
> quantidade de dobras condicionais crescer a ponto de a correção manual virar
> risco, esse é o caminho — mas hoje não é.

---

## 7. Botão "Verificar Acesso"

Ocultado do nav a pedido do cliente. **Comentado, não apagado**, em
`js/app.js`:

```javascript
/* OCULTO TEMPORARIAMENTE a pedido do cliente (10/09). Para voltar,
   basta remover as barras de comentario da linha abaixo. */
/* '      <button class="btn btn-secondary btn-sm" data-open-verifier>Verificar Acesso</button>'+ */
```

O modal e a página `verificador.html` continuam funcionando. Só o atalho do
topo saiu.

---

## 8. Fotos que faltavam e já existiam

Quinze cards mostravam caixa vazia para salas que já tinham foto desde a
rodada de fotos em alta. Passaram a usar a imagem real: 5th Avenue, Recife
Frevo, The West, São João e Belém Doméstica, em `verificador.html` e
`busca-global.html`.

---

## 9. Dados que não conferiam

Este bloco é o mais sensível do adendo. Foram encontrados dados inventados em
páginas que deveriam ser factuais.

**`privacidade.html`** afirmava "CNPJ 00.000.000/0001-00" e nomeava um
Encarregado de Dados — "Carlos Drumond" — com telefone. Documento legal
declarando fatos falsos. Substituído por encaminhamento aos canais de
atendimento.

> **Pendência com a W Premium Group:** o CNPJ real e o contato do DPO precisam
> vir do cliente. Política de privacidade normalmente traz os dois de forma
> explícita, e hoje a página não traz.

**`imprensa.html`** trazia contatos que não existem: "Mariana Ferraz · Head of
Comms", "FBN Comunicação", telefone 99000-0000. Removidos. Duas das três
entradas de release eram aviso de pendência ou texto não confirmado — também
removidas.

**Domínio de e-mail.** Cinco páginas usavam `@wpremium.com.br`. O domínio real,
confirmado nos endereços que a própria cliente usa, é `@wpremiumlounge.com`.
Corrigido em acessibilidade, contato, perfil, privacidade e termos.

> **Vale confirmar:** as caixas `contato@`, `juridico@`, `dpo@` e
> `acessibilidade@` existem nesse domínio? Os nomes são convencionais, mas não
> foram verificados.

**`premios.html`** afirmava "selos editoriais, prêmios da indústria e menções
na imprensa internacional desde 2018", com zero conteúdo na página. O lede
passa a dizer que os reconhecimentos serão publicados ali. A página segue
acessível pelo rodapé, sem afirmar o que não foi confirmado.

**`artigo.html`** creditava "Foto: Lucas Lacaz Ruiz" em uma capa que não
existe, e trazia duas figuras na mesma situação. Removidas com as legendas.

---

## 10. Antes de publicar

- [ ] `?v=` incrementado, se mexeu em `css/` ou `js/`
- [ ] as três ferramentas de `_ferramentas/` rodadas e limpas
- [ ] conferido no **DOM renderizado** — nav, rodapé e modal são injetados por
      JS, e um erro no `app.js` some com os três sem quebrar nada no
      código-fonte
- [ ] se revelou ou escondeu alguma dobra, conferida a alternância de fundo
- [ ] `alt` em toda imagem

Estado na última verificação: estrutura **17/17 conforme** · **0 links
quebrados** · auditoria **42 ok, 0 falhas** · nenhuma caixa de imagem vazia em
todo o site.
