# W Premium · Concierge Digital
## Handoff — o que foi feito e o que depende do cliente

Documento de passagem para o time de desenvolvimento e para a W Premium Group.
Rodada de ajustes de agosto/2026.

---

## 1. Em uma frase

O protótipo está navegável de ponta a ponta: **26 salas em 17 aeroportos**, com
fotos em alta dos originais, textos revisados e todo o conteúdo sem lastro
comercial removido. O que falta é material que só a W Premium pode produzir —
está listado na seção 5, que é a parte deste documento a ser lida com caneta na mão.

---

## 2. O que mudou nesta rodada

### Conteúdo sem lastro
A rodada anterior deixou passar textos e números que descreviam coisas que não
existem. Foram removidos:

| Onde | O que saía |
|---|---|
| `premios.html` | seis prêmios, cinco citações a veículos reais e uma tabela histórica de premiações |
| `sobre.html` | Skytrax, Casa Vogue, Travel + Leisure, Wallpaper* e Monocle como quem "fala sobre nosso trabalho" |
| `imprensa.html` | release anunciando prêmio não confirmado |
| `formas-de-acesso`, `verificador` | planos Mensal (R$ 890) e Anual (R$ 6.990) |
| `airport-rooms.html` | Day Room, Night Suite e Long Stay, com preços de R$ 380 a R$ 980 |
| `arrival-services.html` | planos Standard, Plus e Concierge, de R$ 380 a R$ 1.480 |
| `meet-assist.html` | três pessoas inventadas com botão "conectar", e um card de chamada de vídeo |
| `trabalhe-conosco.html` | seis vagas fictícias, todas com link morto, e uma lista de benefícios com valores |
| `reservas-grupo.html` | R$ 2.400 e R$ 8.000 |

Vale um registro: `imprensa.html` é justamente a página que um jornalista abriria.

### Aeroportos fora da rede
Guarulhos e Galeão apareciam como sedes de W Airport Rooms, e o Galeão sobrevivia
em outros oito pontos — dois deles com troca de aeroporto, não só de nome:
`historico.html` dava a sala Frevo como sendo do Galeão (Frevo é de Recife), e o
verificador mostrava Belém · Doméstica com o código GIG · T2.

### Produto
- W Pass passa a ser apresentado como avulso, com valor por sala, e não como plano
- W Fast Pass: R$ 25 a R$ 40 por pessoa, em Guarulhos T1 e Cuiabá
- W Premium Services passa a mostrar a estrutura real: Check in and Go e Meet & Assist
- W Airport Rooms: quatro cidades em ordem alfabética — Curitiba (em breve),
  Fortaleza, Recife, Salvador (em breve) — com foto real de cada uma
- Trabalhe Conosco aponta para o portal Solides e para `rh.brasil@wpremiumlounge.com`
- CTAs de reserva vão para `reserva@wpremiumlounge.com`

### Imagens
As fotos do site estavam em ~744px porque foram extraídas do PDF, que é
comprimido. Foram refeitas a partir dos originais do Drive:

- **78 fotos, 26 salas**, todas com o lado maior em 1600px
- 18 salas usam a subpasta `Web` já curada pela W Premium; nas 8 restantes a
  seleção foi feita por prancha de contato
- Orientação EXIF aplicada, JPEG q88 progressivo
- Tratamento fotográfico: normalização por foto em direção à mediana do conjunto.
  A dispersão de brilho caiu de 4,11× para 2,02×, e a de saturação de 5,71× para 3,12×

As dez imagens das páginas de serviço seguiram exatamente os links que a W Premium
indicou nos comentários do PowerPoint de direcionamento.

### Facilidades
As oito facilidades da rede deixaram de ocupar uma foto grande e passaram a ter
ícone, usando o kit da própria marca — 149 cards em 26 salas.

### Textos e navegação
- Home: logo duplicada resolvida; "Você é elegível?" virou "Você tem acesso?"
- Saíram duas promessas sem lastro: "Nenhum concorrente no Brasil tem isso" e
  "Quinzenal, sem ruído"
- "W Day Pass" virou "W Pass" em todo o site
- A seção Editorial virou Diário, consolidada em uma única URL
- Rótulos de taxonomia interna que vazavam para o leitor ("Discovery · Entry Point",
  "Sub-produto · L3", "Utility · Cookies banner") viraram texto de leitor
- Doze salas em aeroporto de sala única anunciavam "Outras salas em XXX" e listavam
  salas de outro aeroporto; agora dizem "Outras salas da rede"

### Acessibilidade
O trabalho seguiu WCAG 2.2 AA: contraste, alvos de toque de 24px, skip link, foco
visível, `aria-expanded` nos acordeões e controle de pausa no carrossel. Um rótulo
dizia "Acessibilidade" para descrever "Wi-Fi em alta velocidade" — Wi-Fi não é
acessibilidade; passou a ser "Conectividade".

---

## 3. Como o site é feito

HTML estático puro. Sem framework, sem build, sem `package.json`. Deploy é
`git push` para `main`; a Vercel republica sozinha.

| Item | Realidade |
|---|---|
| Linguagens | HTML5 semântico · CSS3 com variáveis · JavaScript ES5 |
| Camadas de CSS | `wireframe.css` → `tokens.css` → `highfi.css` (a ordem importa) |
| Tipografia | Forum e Georgia nos títulos; Montserrat em todo o resto |
| Nav, rodapé e modal | não estão no HTML: `js/app.js` injeta em runtime |

**Cache-busting é manual.** Todo link de CSS/JS carrega `?v=N`. Ao editar qualquer
arquivo em `css/` ou `js/`, incremente o `?v=` em todas as páginas — senão o
navegador serve a versão antiga. Isso já causou erro nesta rodada.

**O wireframe é contrato.** Cada dobra é marcada com `data-comment-id`
(`sala-curitiba.04-amenidades`, `aeroporto-gru.bloco-2`). O CMS e a ferramenta de
comentários dependem desses identificadores. Não renomeie sem combinar antes.

### Ferramentas de verificação
Três scripts em `_ferramentas/`, para rodar antes de qualquer publicação:

```bash
py _ferramentas/verifica-estrutura.py
```

```bash
py _ferramentas/verifica-links.py
```

```bash
py _ferramentas/auditoria-geral.py
```

Estado atual: **17/17 páginas conformes · 577 links, nenhum quebrado · auditoria
41 ok, 0 falhas**.

---

## 4. O que o site ainda não resolve

São decisões de sistema, não de conteúdo. Ficam para a fase de desenvolvimento:

- **Reserva e pagamento.** O protótipo apenas reserva o lugar (login, concierge,
  W Pass). Não há checkout.
- **Multilíngue.** A estrutura `/pt/...` antecipa EN e ES, mas o roteamento não
  existe. É decisão de rota + conteúdo, idealmente pelo CMS.
- **URLs semânticas.** Hoje são arquivos `.html` na raiz. A convenção
  `/pt/salas/{iata}/{slug}` está reservada para o site final.
- **CMS.** Contagem de salas, políticas de acesso e nomes de sala ainda aparecem
  escritos direto no HTML. Devem virar campos.

---

## 5. O que depende da W Premium Group

Esta é a lista que trava o fechamento. Nada aqui é bloqueio de desenvolvimento —
é material que só a operação tem.

### 5.1 Fotos que a rede ainda não tem

Três dobras de cada uma das 26 salas seguem com aviso de conteúdo a confirmar,
porque não há foto disponível no Drive:

| Dobra | O que falta |
|---|---|
| Gastronomia | foto do cardápio e dos pratos de cada sala |
| Identidade local | o elemento regional de cada sala |
| Depoimentos | avaliações reais de hóspedes |

Junto disso: **os mimos das salas** — os detalhes que diferenciam a experiência e
que hoje o site não consegue mostrar. Se a produção dessas fotos não couber agora,
o caminho natural é o cliente subir pelo CMS quando o site final estiver no ar.
É uma escolha de vocês, e as duas funcionam.

### 5.2 Imagens específicas

- **Salvador Rooms** — a W Premium avisou no PowerPoint que subiria o material
  "segunda". Hoje a página usa um render da recepção.
- **Congonhas** — as três fotos da página são **renders**, não fotos da sala
  pronta. O site não sinaliza isso. Vale substituir por foto real quando houver,
  ou deixar explícito que é projeto.
- **Curitiba Rooms** — render, coerente com o status "em breve".

### 5.3 Três pontos que precisam de definição

Foram deliberadamente **não ajustados** nesta rodada, porque qualquer escolha
nossa seria um chute:

1. **Número de assentos.** Os valores de assentos, tamanho e capacidade divergem
   entre a planilha, o PDF e o site. Foi pedido remover esses campos, mas eles
   também são um dos pontos em aberto — preferimos não mexer até a definição.
2. **Contagem da rede.** Home e listagem falam em "21+ salas"; a planilha traz 25;
   o site hoje tem 26 páginas. Precisa de um número único, que idealmente vira
   campo de CMS em vez de texto repetido.
3. **Ribeirão Preto.** O status da sala não está claro entre as fontes.

### 5.4 Dúvidas do próprio direcionamento

- **Recife Rooms** — o slide 8 mostra Recife como operando, mas o texto do
  comentário escreve "Recife Rooms (em breve)". Seguimos o slide, porque há 279
  fotos de inauguração de Recife no Drive. Vale confirmar.
- **"Usar o texto Maringá"** — anotação no slide 11, sem indicar o que substituir.
  Não foi aplicada.

### 5.5 Conteúdo de terceiros

- **Clipping e prêmios** — as páginas `premios.html`, `sobre.html` e `imprensa.html`
  estão com aviso aguardando material da assessoria de imprensa.
- **Texto aspiracional das salas** — foram oferecidas cinco opções; falta escolher.
- **Regras de cartões** — as condições por bandeira precisam de validação
  comercial antes de voltarem ao ar. Hoje remetem ao Verificador.

### 5.6 Redes sociais

Instagram e LinkedIn no rodapé seguem sem destino. Faltam as URLs oficiais.

---

## 6. Uma nota sobre a fonte

O site usa duas famílias serifadas — Forum e Georgia — junto com a Montserrat.
Isso é proposital, e vale explicar porque parece inconsistência e não é.

A serifada carrega o valor: é ela que faz o nome da sala parecer um lugar, e não
um item de lista. A Montserrat carrega a função: rótulo, botão, dado, navegação.
Se o site inteiro fosse Montserrat, ganharia uniformidade e perderia exatamente a
camada que comunica sofisticação — que é o ativo da marca. A serifada dá o valor,
a Montserrat dá a função.

---

## 7. Antes de publicar

- [ ] `?v=` incrementado, se mexeu em `css/` ou `js/`
- [ ] as três ferramentas de verificação rodadas e limpas
- [ ] conferido no **DOM renderizado**, não só no HTML servido — nav, rodapé e
      modal são injetados por JS, e um erro no `app.js` some com os três de uma vez
      sem quebrar nada visível no código-fonte
- [ ] `alt` em toda imagem
- [ ] proteção de deploy da Vercel desativada, antes de mandar o link ao cliente
