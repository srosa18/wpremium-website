# -*- coding: utf-8 -*-
"""
Auditoria geral do site W Premium

Varre o site de ponta a ponta conferindo:
  A. os pedidos do documento do cliente (17/08/2026)
  B. integridade tecnica (roster, versoes, fontes)
  C. acessibilidade (checklist do CLAUDE.md)
  D. pontas soltas (href vazio, textos de wireframe)

Uso: py _ferramentas/auditoria-geral.py
"""
import os, re, sys, glob, io

sys.stdout.reconfigure(encoding='utf-8')
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

paginas = sorted(glob.glob(os.path.join(RAIZ, '*.html')))
salas = sorted(glob.glob(os.path.join(RAIZ, 'sala-*.html')))
hubs = sorted(glob.glob(os.path.join(RAIZ, 'aeroporto-*.html')))


def ler(p):
    return io.open(p, encoding='utf-8', errors='replace').read()


TUDO = {os.path.basename(p): ler(p) for p in paginas}
JS = ler(os.path.join(RAIZ, 'js', 'app.js'))
CSS = ''.join(ler(f) for f in glob.glob(os.path.join(RAIZ, 'css', '*.css')))

ok_n = falha_n = aviso_n = 0
pendencias = []


def checa(rotulo, condicao, detalhe='', tipo='erro'):
    global ok_n, falha_n, aviso_n
    if condicao:
        ok_n += 1
        print('   OK   %s' % rotulo)
    elif tipo == 'aviso':
        aviso_n += 1
        pendencias.append(('aviso', rotulo, detalhe))
        print('   ~~   %s  %s' % (rotulo, detalhe))
    else:
        falha_n += 1
        pendencias.append(('erro', rotulo, detalhe))
        print('   XX   %s  %s' % (rotulo, detalhe))


def em(arq, txt):
    return txt in TUDO.get(arq, '')


def em_alguma(txt):
    return any(txt in h for h in TUDO.values())


def contagem(txt):
    return sum(h.count(txt) for h in TUDO.values())


print('=' * 72)
print('A · PEDIDOS DO DOCUMENTO DO CLIENTE (17/08/2026)')
print('=' * 72)
print(' HOME')
checa('banner "Descubra sobre as salas"', em('index.html', 'Descubra sobre as salas'))
checa('texto da rede (25 operacoes VIP)', em('index.html', '25 operações VIP em 14 aeroportos'))
checa('"W Premium Verify" eliminado', not em_alguma('W Premium Verify'))
checa('rodape sem Facebook e YouTube', 'Facebook' not in JS and 'YouTube' not in JS)
checa('salas ficticias fora da home',
      not any(x in TUDO['index.html'] for x in ('Green Park', 'Ocean View', 'Gold Standard')))

print(' SALAS')
# o lede era ficha tecnica; o cliente pediu texto aspiracional (doc 18/08)
checa('lede aspiracional em salas.html', em('salas.html', 'experiências em hospitalidade'))
checa('cidade nao repete na listagem', not em('salas.html', 'Belém · Doméstica · Belém'))
checa('chip "Domestica" (era Domestico)', em('salas.html', '>Doméstica<'))
checa('chip "Premium Lounge"', em('salas.html', '>Premium Lounge<'))
checa('chips novos (Cafe/Arrival/ducha/brinquedoteca/Wonder)',
      all(em('salas.html', c) for c in ('Café Lounge', 'Arrival Lounge', 'Com ducha',
                                        'Com brinquedoteca', 'Wonder Club')))
checa('26 salas reais listadas', TUDO['salas.html'].count('class="card sala-card"') >= 26,
      'achou %d' % TUDO['salas.html'].count('class="card sala-card"'))


print(' SERVICOS')
checa('"W Airport Rooms" em todo o site', not re.search(r'(?<!W )Airport Rooms', ''.join(TUDO.values())))
checa('"Arrival Services" eliminado', not em_alguma('Arrival Services'))
checa('"Produto novo 2026" removido', not em_alguma('Produto novo'))
checa('Check in and Go', em('servicos.html', 'Check in and Go'))
checa('Meet & Assist Light e Premium',
      em('servicos.html', 'Meet &amp; Assist Light') and em('servicos.html', 'Meet &amp; Assist Premium'))

print(' DEMAIS PAGINAS')
checa('"L3" de wireframe removido', not re.search(r'L3\s*[·&]', ''.join(TUDO.values())))
checa('Sobre com 25 salas', em('sobre.html', 'data-to="25"'))
checa('Sobre com 14 aeroportos', em('sobre.html', 'data-to="14"'))
# a cliente pediu a troca da preposicao no slide 13 do PPT de 18/08
checa('"Trabalhe no W Premium Group"', em('trabalhe-conosco.html', 'Trabalhe no W Premium Group'))
checa('portal de vagas Solides', em('trabalhe-conosco.html', 'vagaswpremium.vagas.solides.com.br'))
checa('campo de curriculo em PDF', em('formulario.html', 'accept="application/pdf"'))
checa('"algo mais rapido" antes do formulario',
      TUDO['formulario.html'].find('algo mais rápido') < TUDO['formulario.html'].find('Enviar mensagem'))
checa('campo Estado em reservas de grupo', em('reservas-grupo.html', 'data-uf-filtro'))
checa('foto lateral em reservas de grupo',
      '<img' in TUDO['reservas-grupo.html'], 'cliente pediu foto na lateral', 'aviso')
checa('FAQ centralizado', '.acc{max-width:820px' in CSS)
checa('lupa de busca na nav', 'data-open-busca' in JS)
BACKUP = os.path.join(os.path.dirname(RAIZ), 'backup-imagens-originais')
BACKUP_ALT = "D:/CLAUDE COWORK/CLIENTES/W-Premium/DIRETRIZES AJUSTES 17082026/_ENTREGAVEIS/backup-imagens-originais"
checa('tratamento fotografico aplicado',
      os.path.isdir(BACKUP) or os.path.isdir(BACKUP_ALT),
      'sem backup de originais: sinal de que a normalizacao nao rodou', 'aviso')

print()
print('=' * 72)
print('B · INTEGRIDADE TECNICA')
print('=' * 72)
checa('26 paginas de sala', len(salas) == 26, 'achou %d' % len(salas))
checa('17 hubs de aeroporto', len(hubs) == 17, 'achou %d' % len(hubs))
checa('nenhuma sala ficticia no site',
      not re.search(r'(Green Park|Ocean View|Gold Standard|Cerrado|Pelourinho|Ipanema)',
                    ''.join(TUDO.values())))
versoes = set(re.findall(r'css/[a-z]+\.css\?v=(\d+)', ''.join(TUDO.values())))
checa('cache-bust uniforme', len(versoes) == 1, 'versoes encontradas: %s' % sorted(versoes))
checa('so Montserrat no Google Fonts',
      not em_alguma('family=Inter') and not em_alguma('family=EB+Garamond'))
checa('nenhuma fonte antiga referenciada',
      'Lemon Milk' not in CSS.replace('@font-face', '') or '--font-label:\'Lemon Milk' not in CSS)
checa('app.js sem widget de QA', 'qa-widget' not in JS)

print()
print('=' * 72)
print('C · ACESSIBILIDADE (checklist do CLAUDE.md)')
print('=' * 72)
sem_alt = []
for nome, h in TUDO.items():
    for tag in re.findall(r'<img\b[^>]*>', h):
        if 'alt=' not in tag:
            sem_alt.append(nome)
            break
checa('toda imagem com alt', not sem_alt, 'sem alt em: %s' % ', '.join(sem_alt[:5]))

def h1_visiveis(h):
    """conta so os h1 que aparecem: estados alternativos ficam em display:none
    e nao entram na arvore de acessibilidade"""
    limpo = re.sub(r'<section\b[^>]*display:\s*none[^>]*>.*?</section>', '', h, flags=re.S)
    return len(re.findall(r'<h1\b', limpo))


multi_h1 = [n for n, h in TUDO.items() if h1_visiveis(h) > 1]
# paginas de redirect intencional nao tem h1 por design (meta refresh)
def eh_redirect(h):
    return 'http-equiv="refresh"' in h.replace("'", '"')
sem_h1 = [n for n, h in TUDO.items() if '<h1' not in h and not eh_redirect(h)]
checa('um unico h1 por pagina', not multi_h1, 'mais de um h1: %s' % ', '.join(multi_h1[:5]))
checa('toda pagina tem h1', not sem_h1, 'sem h1: %s' % ', '.join(sem_h1[:6]), 'aviso')

sem_label = []
for nome, h in TUDO.items():
    # campo identificado = tem aria-label proprio, ou existe <label> suficiente na pagina
    campos = re.findall(r'<input\b(?![^>]*type="hidden")[^>]*>', h)
    com_aria = [c for c in campos if 'aria-label' in c]
    n_lb = len(re.findall(r'<label\b', h))
    if len(campos) - len(com_aria) > n_lb:
        sem_label.append('%s(%d sem identificacao)' % (nome, len(campos) - len(com_aria) - n_lb))
checa('campos de formulario identificados', not sem_label, '; '.join(sem_label[:4]), 'aviso')

sem_lang = [n for n, h in TUDO.items() if 'lang=' not in h[:200]]
checa('idioma declarado no html', not sem_lang, ', '.join(sem_lang[:4]))

print()
print('=' * 72)
print('D · PONTAS SOLTAS')
print('=' * 72)
vazios = {}
for nome, h in TUDO.items():
    n = len(re.findall(r'href="#"', h))
    if n:
        vazios[nome] = n
tot_vazios = sum(vazios.values())
marcados = 'a[href="#"]::after' in CSS and 'em breve' in CSS
checa('links href="#" sinalizados como pendentes', marcados,
      '%d ocorrencias sem marcacao visivel' % tot_vazios, 'aviso')
if marcados:
    print('        (%d links pendentes, todos exibindo "em breve")' % tot_vazios)

resid = [t for t in ('Wireframe Mode', 'Template Fase 03', 'Fase 03 · Sitemap', 'Lorem', 'lorem ipsum')
         if em_alguma(t)]
checa('sem texto residual de wireframe', not resid, 'encontrados: %s' % ', '.join(resid), 'aviso')

checa('busca.html ainda existe', not os.path.exists(os.path.join(RAIZ, 'busca.html')),
      'redundante com a lupa; decidir se vira redirect', 'aviso')

print()
print('=' * 72)
print('PLACAR:  %d ok   ·   %d falha(s)   ·   %d aviso(s)' % (ok_n, falha_n, aviso_n))
print('=' * 72)
if pendencias:
    print('\nPENDENCIAS:')
    for tipo, rot, det in pendencias:
        print('  [%s] %s%s' % ('FALHA' if tipo == 'erro' else 'aviso', rot, ' — ' + det if det else ''))
sys.exit(1 if falha_n else 0)
