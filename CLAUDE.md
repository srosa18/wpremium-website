# CLAUDE.md — Site W Premium (Concierge Digital)

Instruções para qualquer agente/dev que trabalhe neste repositório. **Leia antes de editar.**

---

## 0. Natureza do projeto (leia primeiro)

- Este site é um **protótipo de alta fidelidade / MVP**. O propósito é o cliente **navegar e aprovar** a proposta antes do desenvolvimento final.
- O site final será construído **reaproveitando boa parte deste código** e terá um **CMS** para gerir imagens, conteúdo e dados.
- Portanto: **não trate dados, textos e imagens como definitivos.** Modele conteúdo de forma que migre fácil para um CMS — evite hardcodar dado de negócio espalhado pelo HTML. Quando precisar repetir um valor (contagem de salas, política de acesso, nome de sala), pense "isto viraria um campo de CMS" e centralize.

---

## 1. Stack real (o que o código É)

**HTML estático puro. Sem framework, sem build, sem etapa de compilação.**

| Item | Realidade |
|---|---|
| Framework | ❌ nenhum (não é Next.js/React/Vue) |
| `package.json` / `node_modules` | ❌ não existem |
| Build | ❌ nenhum — os `.html` são servidos como estão |
| Linguagens | HTML5 semântico · CSS3 puro (CSS Variables) · Vanilla JS (ES5) |
| Deploy | **Vercel** (static hosting) em `wpremium-website.vercel.app`, servido do branch `main`. *(O `README.md` ainda menciona "GitHub Pages" — desatualizado; a verdade atual é Vercel.)* |
| Como publicar | `git push` para `main` → Vercel republica sozinho. Não há comando de build. |

### Camadas de CSS (ordem importa)
`css/wireframe.css` (base/estrutura herdada do wireframe) → `css/tokens.css` (paleta, tipografia: Forum nos headlines, EB Garamond, etc.) → `css/highfi.css` (overrides de alta-fidelidade). Inter vem do Google Fonts.

### Cache-busting `?v=N` (regra obrigatória)
Todos os links de CSS/JS levam `?v=N` (hoje **`?v=7`**). **Ao editar qualquer arquivo em `css/` ou `js/`, incremente o `?v=` em todas as páginas que o referenciam** — senão o cliente vê estilo/script em cache (versão antiga).

---

## 2. Como as páginas são montadas

- Cada página é um `.html` completo e independente na **raiz** do repo.
- `nav`, `footer` e o `modal` do verificador **não estão no HTML** — são injetados em runtime por **`js/app.js`** nos pontos de montagem:
  - `<div data-nav></div>` · `<div data-footer></div>` · `<div data-modal-mount></div>`
- O `<body>` carrega dois atributos lidos pelo `app.js`:
  - `data-prefix` — prefixo de caminho (relativo a subpastas; raiz = `""`).
  - `data-highfi` — liga a versão visual de alta-fidelidade.
- `app.js` (~510 linhas, ES5) concentra: `NAV_LINKS`, builders `navHTML`/`footerHTML`/`verifierModalHTML`, `inject()`, nav ativa, hambúrguer, slideshow do hero, **carrossel B2B** (`bindB2BCarousel` — reaproveitado nas galerias das salas), acordeões, chips, verificador de BIN, galeria, count-up de números, formulários e a **busca** (array de aeroportos).

> Não há "data layer" central. A única estrutura de dados em JS é o array da busca em `app.js` (aeroportos + contagem de salas) — bom candidato a virar fonte de CMS no futuro.

---

## 3. Convenções de página (documente como o código faz)

### Slugs e URLs
- **Sala:** arquivo `sala-{nome}.html` (ex.: `sala-5th-avenue.html`).
- **Hub de aeroporto:** arquivo `aeroporto-{iata}.html` (ex.: `aeroporto-gru.html`).
- **URL semântica `/pt/salas/{iata}/{slug}`** (ex.: `/pt/salas/gru/5th-avenue`) é uma **convenção RESERVADA para o site final** — aparece no texto do redirect da The Pier, mas **NÃO está implementada** hoje. A realidade atual é o `.html` plano na raiz (não há `vercel.json` nem rewrites). Não finja que a rota `/pt/...` existe.

### "Templates" reaproveitáveis (não são arquivos isolados — são páginas-referência)
Não existe um arquivo `template.html`. Os "templates" são **padrões de página consolidados**; para criar uma página nova, **copie a página-referência mais próxima** e troque o conteúdo:
- **Sala (padrão canônico): [`sala-5th-avenue.html`](sala-5th-avenue.html)** — dobras: Hero (16:9, texto fora, eyebrow dourado) → Galeria (imagem fixa à esquerda = `foto-2` + carrossel à direita = `foto-3/4/5` + dots; hero = `foto-1`; **nenhuma foto se repete na página** — regra do cliente em 04/09/2026; arquivos só de carrossel vão em 4:5 (1000×1250), fixa/hero em 3:2 (1600 px); onde a `foto-2` original repetia o hero, a fixa virou `foto-4` nova e o carrossel tem 4 slides + 4º dot: Beira-mar, Maringá, The West) → Amenidades (3 cards) → Gastronomia → Bem-estar (3 cards) → Identidade local → Outras salas (3 cards de cross-sell).
- **Hub de aeroporto (padrão): [`aeroporto-gru.html`](aeroporto-gru.html) / [`aeroporto-poa.html`](aeroporto-poa.html)** — Header (IATA + hero) → faixa de **big numbers** (padrão "híbrido": Forum + count-up nos numéricos, `.stat-text` menor nos valores de texto) → Sala em destaque → Mapa esquemático → Outros serviços → Ficha "em números".
- Cada dobra é marcada com `data-comment-id` / `data-comment-label` — útil para localizar blocos.

### Redirect intencional vs. página própria
- Padrão de redirect: `<meta http-equiv="refresh" content="0; url=sala-âncora.html">` (ver [`sala-the-pier.html`](sala-the-pier.html) → `sala-5th-avenue.html`).
- **Use redirect** quando um slug precisa existir (consistência de URL/cross-link) mas é **alias/âncora** de outra sala. **Use página própria** quando a sala tem conteúdo distinto.

### Assets / imagens
- Ficam em `assets/img/{aeroporto-xxx}/` e `assets/img/salas/{slug}/`.
- Referência sempre com `?v=N` (ex.: `assets/img/salas/skyline/hero.jpg?v=1`); incremente ao trocar a imagem.
- **Origem:** Google Drive do cliente. Padrão de processamento: redimensionar para **máx. 1600px** no maior lado, **JPEG q85**, aplicando **orientação EXIF** (senão fotos de celular saem rotacionadas).
- **Marcadores "Imagem não encontrada no Drive" são INTENCIONAIS** — sinalizam imagens que o cliente ainda não enviou. **Não remova nem invente imagem**; preserve o slot. Duas formas:
  1. Marcação por card: `<div class="ph ph-missing">…<span class="img-missing">…ícone + texto</span></div>`.
  2. Regra de página inteira: bloco `<style>` após `<div data-nav></div>` com `.ph:not(.ph-missing)::before/::after` (ícone triangle-alert + texto). Usada em páginas sem nenhuma foto ainda.

---

## 4. Conteúdo e dados

- Dados de **salas, aeroportos e contagens são placeholder/ilustrativos** no protótipo.
- **Fonte de verdade da rede real:** **25 salas em 17 aeroportos** (documentada no briefing do cliente). **Não assuma** que os nomes/aeroportos atuais do protótipo são os reais.
- **Contagem de salas exibida = fonte única.** Hoje há **inconsistência real**: a home (`index.html`) e `salas.html` mostram **"21+ salas"**; ~18 páginas de sala mostram **"21 salas da rede"** (hardcoded, ~linha 252); a rede real é **25**. **Não espalhe o número hardcoded** — quando for corrigir, centralize (idealmente um campo único / variável, pensando no CMS).

---

## 5. Checklist antes de commitar (problemas já pegos no protótipo)

- [ ] **Nenhuma sala referenciada em cross-sell/listagem sem que a página dela exista.** *(Caso real: "Capibaribe" é linkada em `sala-frevo.html` mas `sala-capibaribe.html` NÃO existe — criar a página ou remover o link.)*
- [ ] **Cross-sell aponta para a página correta da sala** — nunca para a própria página nem para uma genérica. *(Casos reais: o array de busca em `js/app.js` manda POA/CGH/BSB/FTE/USH todos para `aeroporto-gru.html`; e blocos "Outras salas" já apontaram tudo para a própria sala.)*
- [ ] **Política de Priority Pass / LoungeKey única e consistente** em todas as páginas. *(Aparece em `busca-global.html`, `como-acessar.html`, `formas-de-acesso.html`, `sala-5th-avenue.html`, `sala-frevo.html` — hoje há contradição entre "não aceitos" e "em salas selecionadas". Reconciliar.)*
- [ ] **Sem `href="#"` placeholder** quando a funcionalidade já existe; quando não existir, deixar **claramente marcado como pendente**.
- [ ] **`?v=` incrementado** se editou `css/` ou `js/`.
- [ ] **`alt` em toda imagem**; contraste adequado; hierarquia de headings `h1→h6` correta.

---

## 6. Não improvisar (arquitetura reservada para o site final)

- **i18n EN/ES:** a estrutura `/pt/...` já antecipa multilíngue. Tratar idioma como **decisão de roteamento + conteúdo** (idealmente via CMS), **não** gambiarra por página.
- **Booking transacional:** é **sistema** (reserva + pagamento), não ajuste de conteúdo. O protótipo apenas reserva o lugar (login / concierge / Day Pass). **Não improvisar checkout.**

---

## 7. Padrões de qualidade / acessibilidade

- `alt` descritivo em imagens (e mantido nos slots de "imagem não encontrada").
- Contraste adequado (a paleta de alta-fi está em `tokens.css`).
- Headings semânticos com hierarquia correta (`h1` único por página → `h2` → …).

---

## 8. Fluxo de trabalho de deploy (processo combinado)

1. Editar os arquivos.
2. **Revisar no localhost** (servidor estático) — o cliente/aprovador confere.
3. Após aprovação, **publicar**: `git push` para `main` → Vercel republica.
4. **Nunca** auto-publicar cada edição; só após o "ok". Antes de enviar o link ao cliente, garantir que a **proteção de deploy do Vercel ("Require Login") esteja desativada**, senão ele esbarra em tela de login.

---

## Referências
- `README.md` — visão geral (atenção: cita "GitHub Pages", desatualizado).
- `BRIEFING-VISUAL.md` — memória do design system e ordem de ataque.
- `_RELATORIO-IMAGENS/` (fora do site) — inventário das imagens faltantes por página/dobra/cidade.
