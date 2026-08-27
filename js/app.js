/* W Premium Wireframe — global components & interactions (Fase 03) */
(function(){
  'use strict';

  // =====================================================
  // GLOBAL COMPONENTS — Nav, Footer, Verifier Modal
  // =====================================================

  var NAV_LINKS = [
    {href:'salas.html',         label:'Salas'},
    {href:'airport-rooms.html', label:'W Airport Rooms'},
    {href:'servicos.html',      label:'Serviços'},
    {href:'como-acessar.html',  label:'Como Acessar'},
    {href:'diario.html',        label:'Diário'},
    {href:'sobre.html',         label:'Sobre'},
    {href:'b2b.html',           label:'B2B'},
    {href:'contato.html',       label:'Contato'}
  ];

  var W_BUSCA = [
      {t:'aeroporto', nome:'Belém', meta:'BEL · 2 salas', termos:'bel belém aeroporto internacional de belém · val-de-cans', url:'aeroporto-bel.html'},
      {t:'aeroporto', nome:'Cuiabá', meta:'CGB · 1 sala', termos:'cgb cuiabá aeroporto internacional marechal rondon', url:'aeroporto-cgb.html'},
      {t:'aeroporto', nome:'Congonhas · São Paulo', meta:'CGH · 1 sala', termos:'cgh congonhas · são paulo aeroporto de são paulo/congonhas', url:'aeroporto-cgh.html'},
      {t:'aeroporto', nome:'Curitiba', meta:'CWB · 1 sala', termos:'cwb curitiba aeroporto internacional afonso pena', url:'aeroporto-cwb.html'},
      {t:'aeroporto', nome:'Fortaleza', meta:'FOR · 4 salas', termos:'for fortaleza aeroporto internacional pinto martins', url:'aeroporto-for.html'},
      {t:'aeroporto', nome:'El Calafate · Argentina', meta:'FTE · 1 sala', termos:'fte el calafate · argentina aeroporto internacional comandante armando tola', url:'aeroporto-fte.html'},
      {t:'aeroporto', nome:'Guarulhos · São Paulo', meta:'GRU · 4 salas', termos:'gru guarulhos · são paulo aeroporto internacional de são paulo/guarulhos', url:'aeroporto-gru.html'},
      {t:'aeroporto', nome:'Goiânia', meta:'GYN · 1 sala', termos:'gyn goiânia aeroporto internacional santa genoveva', url:'aeroporto-gyn.html'},
      {t:'aeroporto', nome:'Londrina', meta:'LDB · 1 sala', termos:'ldb londrina aeroporto de londrina · governador josé richa', url:'aeroporto-ldb.html'},
      {t:'aeroporto', nome:'Maringá', meta:'MGF · 1 sala', termos:'mgf maringá aeroporto regional sílvio name júnior', url:'aeroporto-mgf.html'},
      {t:'aeroporto', nome:'Navegantes', meta:'NVT · 1 sala', termos:'nvt navegantes aeroporto internacional ministro victor konder', url:'aeroporto-nvt.html'},
      {t:'aeroporto', nome:'Palmas', meta:'PMW · 1 sala', termos:'pmw palmas aeroporto brigadeiro lysias rodrigues', url:'aeroporto-pmw.html'},
      {t:'aeroporto', nome:'Porto Alegre', meta:'POA · 2 salas', termos:'poa porto alegre aeroporto internacional salgado filho', url:'aeroporto-poa.html'},
      {t:'aeroporto', nome:'Ribeirão Preto', meta:'RAO · 1 sala', termos:'rao ribeirão preto aeroporto estadual doutor leite lopes', url:'aeroporto-rao.html'},
      {t:'aeroporto', nome:'Recife', meta:'REC · 2 salas', termos:'rec recife aeroporto internacional do recife · gilberto freyre', url:'aeroporto-rec.html'},
      {t:'aeroporto', nome:'Trelew · Argentina', meta:'REL · 1 sala', termos:'rel trelew · argentina aeroporto almirante marco andrés zar', url:'aeroporto-rel.html'},
      {t:'aeroporto', nome:'Ushuaia · Argentina', meta:'USH · 1 sala', termos:'ush ushuaia · argentina aeroporto internacional ushuaia · malvinas argentinas', url:'aeroporto-ush.html'},
      {t:'sala', nome:'Belém · Doméstica', meta:'BEL · Doméstica', termos:'belém · doméstica bel belém', url:'sala-belem-domestica.html'},
      {t:'sala', nome:'Belém · Internacional', meta:'BEL · Internacional', termos:'belém · internacional bel belém', url:'sala-belem-internacional.html'},
      {t:'sala', nome:'Cuiabá', meta:'CGB · Doméstica', termos:'cuiabá cgb cuiabá', url:'sala-cuiaba.html'},
      {t:'sala', nome:'Congonhas', meta:'CGH · Doméstica', termos:'congonhas cgh congonhas · são paulo', url:'sala-congonhas.html'},
      {t:'sala', nome:'Curitiba', meta:'CWB · Doméstica', termos:'curitiba cwb curitiba', url:'sala-curitiba.html'},
      {t:'sala', nome:'Fortaleza Premium', meta:'FOR · Doméstica', termos:'fortaleza premium for fortaleza', url:'sala-fortaleza-premium.html'},
      {t:'sala', nome:'Fortaleza Arrival', meta:'FOR · Internacional', termos:'fortaleza arrival for fortaleza', url:'sala-fortaleza-arrival.html'},
      {t:'sala', nome:'Iracema', meta:'FOR · Internacional', termos:'iracema for fortaleza', url:'sala-iracema.html'},
      {t:'sala', nome:'Beira-Mar', meta:'FOR · Internacional', termos:'beira-mar for fortaleza', url:'sala-fortaleza-beira-mar.html'},
      {t:'sala', nome:'Goiânia', meta:'GYN · Doméstica', termos:'goiânia gyn goiânia', url:'sala-goiania.html'},
      {t:'sala', nome:'Guarulhos T1', meta:'GRU · Doméstica', termos:'guarulhos t1 gru guarulhos · são paulo', url:'sala-gru-t1.html'},
      {t:'sala', nome:'The West', meta:'GRU · Doméstica', termos:'the west gru guarulhos · são paulo', url:'sala-the-west.html'},
      {t:'sala', nome:'5th Avenue', meta:'GRU · Internacional', termos:'5th avenue gru guarulhos · são paulo', url:'sala-5th-avenue.html'},
      {t:'sala', nome:'The Pier', meta:'GRU · Internacional', termos:'the pier gru guarulhos · são paulo', url:'sala-the-pier.html'},
      {t:'sala', nome:'Londrina', meta:'LDB · Doméstica', termos:'londrina ldb londrina', url:'sala-londrina.html'},
      {t:'sala', nome:'Maringá', meta:'MGF · Doméstica', termos:'maringá mgf maringá', url:'sala-maringa.html'},
      {t:'sala', nome:'Navegantes', meta:'NVT · Doméstica', termos:'navegantes nvt navegantes', url:'sala-navegantes.html'},
      {t:'sala', nome:'Palmas', meta:'PMW · Doméstica', termos:'palmas pmw palmas', url:'sala-palmas.html'},
      {t:'sala', nome:'Porto Alegre', meta:'POA · Doméstica', termos:'porto alegre poa porto alegre', url:'sala-porto-alegre.html'},
      {t:'sala', nome:'Porto Alegre · Internacional', meta:'POA · Internacional', termos:'porto alegre · internacional poa porto alegre', url:'sala-porto-alegre-internacional.html'},
      {t:'sala', nome:'Frevo', meta:'REC · Internacional', termos:'frevo rec recife', url:'sala-frevo.html'},
      {t:'sala', nome:'São João', meta:'REC · Doméstica', termos:'são joão rec recife', url:'sala-recife-sao-joao.html'},
      {t:'sala', nome:'Ribeirão Preto', meta:'RAO · Doméstica', termos:'ribeirão preto rao ribeirão preto', url:'sala-ribeirao-preto.html'},
      {t:'sala', nome:'El Calafate', meta:'FTE · Doméstica', termos:'el calafate fte el calafate · argentina', url:'sala-el-calafate.html'},
      {t:'sala', nome:'Trelew', meta:'REL · Doméstica', termos:'trelew rel trelew · argentina', url:'sala-trelew.html'},
      {t:'sala', nome:'Ushuaia', meta:'USH · Doméstica', termos:'ushuaia ush ushuaia · argentina', url:'sala-ushuaia.html'},
      {t:'pagina', nome:'W Airport Rooms', meta:'Página', termos:'w airport rooms', url:'airport-rooms.html'},
      {t:'pagina', nome:'W Fast Pass', meta:'Página', termos:'w fast pass', url:'w-fast-pass.html'},
      {t:'pagina', nome:'W Premium Services', meta:'Página', termos:'w premium services', url:'arrival-services.html'},
      {t:'pagina', nome:'Formas de acesso', meta:'Página', termos:'formas de acesso', url:'formas-de-acesso.html'},
      {t:'pagina', nome:'Como acessar', meta:'Página', termos:'como acessar', url:'como-acessar.html'},
      {t:'pagina', nome:'Soluções B2B', meta:'Página', termos:'soluções b2b', url:'b2b.html'},
      {t:'pagina', nome:'Reservas de grupo', meta:'Página', termos:'reservas de grupo', url:'reservas-grupo.html'},
      {t:'pagina', nome:'Contato', meta:'Página', termos:'contato', url:'contato.html'},
      {t:'pagina', nome:'Sobre', meta:'Página', termos:'sobre', url:'sobre.html'},
      {t:'pagina', nome:'Diário', meta:'Página', termos:'diario diário editorial', url:'diario.html'}
  ];


  function navHTML(prefix, highfi){
    prefix = prefix || '';
    var links = NAV_LINKS.map(function(l){
      return '<a href="'+prefix+l.href+'">'+l.label+'</a>';
    }).join('');
    var overlay = highfi ? '<div class="nav-overlay" data-nav-backdrop></div>' : '';
    var drawerHead = highfi ? '<img class="nav-drawer-logo" src="'+prefix+'assets/img/logo/logo-black.svg" alt="W Premium Group"><button class="nav-close" data-nav-close aria-label="Fechar menu"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6 18 18M18 6 6 18"/></svg></button>' : '';
    var logoHTML = highfi
      ? '<a href="'+prefix+'index.html" class="nav-logo" aria-label="W Premium Group"><img class="nav-logo-img nav-logo-light" src="'+prefix+'assets/img/logo/logo-white.svg" alt="W Premium Group"><img class="nav-logo-img nav-logo-dark" src="'+prefix+'assets/img/logo/logo-black.svg" alt=""></a>'
      : '<a href="'+prefix+'index.html" class="nav-logo">W <span>Premium</span></a>';
    return ''+
      '<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>'+
      '<div class="wf-banner">Wireframe Mode · W Premium Concierge Digital <span>Fase 03 · Sitemap V1</span></div>'+
      '<header class="nav">'+
      '  <div class="container nav-inner">'+
      '    '+logoHTML+
      '    <nav class="nav-links" id="nav-principal" aria-label="Principal">'+drawerHead+links+'</nav>'+
      '    <div class="nav-actions">'+
      '      <button class="nav-search-btn" data-open-busca aria-label="Buscar">'+
      '        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>'+
      '      </button>'+
      '      <button class="lang-switch" data-lang-switch aria-label="Idioma">'+
      '        <span class="lang-current">PT</span><span class="lang-sep">·</span><span class="lang-other">EN</span><span class="lang-sep">·</span><span class="lang-other">ES</span>'+
      '      </button>'+
      '      <button class="btn btn-secondary btn-sm" data-open-verifier>Verificar Acesso</button>'+
      '      <a href="'+prefix+'login.html" class="btn btn-ghost btn-sm">Entrar</a>'+
      '      <button class="nav-hamburger" aria-label="Menu" aria-expanded="false" aria-controls="nav-principal" data-hamburger>'+
      '        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="2" y1="4" x2="14" y2="4"/><line x1="2" y1="8" x2="14" y2="8"/><line x1="2" y1="12" x2="14" y2="12"/></svg>'+
      '      </button>'+
      '    </div>'+
      '  </div>'+
      overlay+
      '</header>';
  }

  function footerHTML(prefix, highfi){
    prefix = prefix || '';
    var footerLogo = highfi
      ? '<img class="footer-logo-img" src="'+prefix+'assets/img/logo/logo-black.svg" alt="W Premium Group">'
      : '<div class="nav-logo">W <span>Premium</span></div>';
    var social = highfi
      ? '<a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>'+
        '<a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>'
      : '<a href="#" aria-label="Instagram">ig</a><a href="#" aria-label="LinkedIn">in</a>';
    var footerLangs = highfi ? '' : '<span class="footer-langs"><a href="#" class="lang-pill active">PT</a> <a href="#" class="lang-pill">EN</a> <a href="#" class="lang-pill">ES</a></span>';
    return ''+
      '<footer class="footer" data-comment-id="global.footer" data-comment-label="Footer global">'+
      '  <div class="container">'+
      '    <div class="footer-grid">'+
      '      <div>'+
      '        '+footerLogo+
      '        <p class="small mt-2" style="max-width:280px;">Concierge digital para a maior rede premium em aeroportos brasileiros e argentinos.</p>'+
      '        <div class="footer-social mt-3">'+social+'</div>'+
      '      </div>'+
      '      <div>'+
      '        <h5>Produto</h5>'+
      '        <ul class="footer-links">'+
      '          <li><a href="'+prefix+'salas.html">Salas</a></li>'+
      '          <li><a href="'+prefix+'airport-rooms.html">W Airport Rooms</a></li>'+
      '          <li><a href="'+prefix+'servicos.html">Serviços</a></li>'+
      '          <li><a href="'+prefix+'como-acessar.html">Como Acessar</a></li>'+
      '          <li><a href="'+prefix+'formas-de-acesso.html">Formas de Acesso</a></li>'+
      '        </ul>'+
      '      </div>'+
      '      <div>'+
      '        <h5>Conteúdo &amp; Marca</h5>'+
      '        <ul class="footer-links">'+
      '          <li><a href="'+prefix+'diario.html">Diário</a></li>'+
      '          <li><a href="'+prefix+'sobre.html">Sobre</a></li>'+
      '          <li><a href="'+prefix+'historia.html">História</a></li>'+
      '          <li><a href="'+prefix+'premios.html">Prêmios</a></li>'+
      '          <li><a href="'+prefix+'imprensa.html">Imprensa</a></li>'+
      '        </ul>'+
      '      </div>'+
      '      <div>'+
      '        <h5>Negócios</h5>'+
      '        <ul class="footer-links">'+
      '          <li><a href="'+prefix+'b2b.html">B2B</a></li>'+
      '          <li><a href="'+prefix+'reservas-grupo.html">Reservas de Grupo</a></li>'+
      '          <li><a href="'+prefix+'parcerias-operadoras.html">Parcerias Operadoras</a></li>'+
      '          <li><a href="'+prefix+'trabalhe-conosco.html">Trabalhe Conosco</a></li>'+
      '        </ul>'+
      '      </div>'+
      '      <div>'+
      '        <h5>Suporte</h5>'+
      '        <ul class="footer-links">'+
      '          <li><a href="'+prefix+'contato.html">Contato</a></li>'+
      '          <li><a href="'+prefix+'faq.html">FAQ</a></li>'+
      '          <li><a href="'+prefix+'busca-global.html">Busca</a></li>'+
      '          <li><a href="'+prefix+'verificador.html" data-open-verifier>Verificador de Acesso</a></li>'+
      '        </ul>'+
      '      </div>'+
      '    </div>'+
      '    <div class="footer-utility">'+
      '      <div class="footer-utility-links">'+
      '        <a href="'+prefix+'termos.html">Termos de Uso</a> · '+
      '        <a href="'+prefix+'privacidade.html">Privacidade (LGPD)</a> · '+
      '        <a href="'+prefix+'cookies.html">Cookies</a> · '+
      '        <a href="'+prefix+'acessibilidade.html">Acessibilidade (WCAG 2.1 AA)</a> · '+
      '        <a href="'+prefix+'sitemap.xml">Sitemap.xml</a>'+
      '      </div>'+
      '    </div>'+
      '    <div class="footer-bottom">'+
      '      <span>© 2026 W Premium Group · Concierge Digital · Fase 03</span>'+
      '      '+footerLangs+
      '    </div>'+
      '  </div>'+
      '</footer>';
  }

  function verifierModalHTML(prefix){
    prefix = prefix || '';
    return ''+
      '<div class="modal-backdrop" data-modal-backdrop hidden>'+
      '  <div class="modal" role="dialog" aria-label="Verificador de Acesso" aria-modal="true" data-comment-id="modal.verificador" data-comment-label="Modal · Verificador de Acesso">'+
      '    <button class="modal-close" data-modal-close aria-label="Fechar">×</button>'+
      '    <div class="modal-body">'+
      '      <div class="eyebrow">W Premium Group · Modal</div>'+
      '      <h2 class="h2 mt-1">Você tem acesso?</h2>'+
      '      <p class="muted mt-1" style="font-size:13px;">Insira o BIN do seu cartão e descubra, em tempo real, quais salas você tem direito hoje — sem precisar sair desta página.</p>'+
      '      <form id="verif-form" class="mt-3">'+
      '        <div class="field mb-2">'+
      '          <label>Número do cartão (BIN ou completo)</label>'+
      '          <input class="input" inputmode="numeric" maxlength="19" placeholder="0000  0000  0000  0000" required>'+
      '        </div>'+
      '        <button class="btn btn-primary btn-block" type="submit">Verificar Acesso</button>'+
      '        <p class="tiny muted mt-2 text-center">Consultivo · não armazenamos seus dados.</p>'+
      '      </form>'+
      '      <div id="state-success" class="state-success mt-3" style="display:none;">'+
      '        <strong>✓ Você tem acesso!</strong>'+
      '        <p class="mt-1" style="font-size:13px;color:#2E6B4A;">Seu cartão dá acesso a <strong>15 salas</strong> W Premium agora mesmo.</p>'+
      '        <div class="mt-2 flex gap-1"><a href="'+prefix+'verificador.html" class="btn btn-primary btn-sm">Ver salas elegíveis</a><button class="btn btn-ghost btn-sm" data-verif-reset>Verificar outro</button></div>'+
      '      </div>'+
      '      <div id="state-fail" class="state-error mt-3" style="display:none;">'+
      '        <strong>Cartão sem acesso direto</strong>'+
      '        <p class="mt-1" style="font-size:13px;color:#8A3326;">Você ainda pode entrar com o W Pass.</p>'+
      '        <div class="mt-2 flex gap-1"><a href="'+prefix+'formas-de-acesso.html" class="btn btn-primary btn-sm">Ver Formas de Acesso</a><button class="btn btn-ghost btn-sm" data-verif-reset>Tentar outro</button></div>'+
      '      </div>'+
      '      <div class="modal-divider"></div>'+
      '      <a href="'+prefix+'como-acessar.html" class="btn-link">Ver página completa de Como Acessar →</a>'+
      '    </div>'+
      '  </div>'+
      '  </div>'+
      '</div>';
  }

  // =====================================================
  // INJECTION
  // =====================================================


  function buscaOverlayHTML(){
    return ''+
      '<div class="busca-overlay" data-busca-overlay hidden role="dialog" aria-modal="true" aria-label="Busca no site">'+
      '  <div class="busca-painel">'+
      '    <button class="busca-fechar" data-busca-fechar aria-label="Fechar busca">'+
      '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M6 6 18 18M18 6 6 18"/></svg>'+
      '    </button>'+
      '    <div class="busca-caixa">'+
      '    <label class="busca-label" for="busca-input">Buscar</label>'+
      '    <input id="busca-input" class="busca-input" type="text" autocomplete="off" placeholder="Cidade, sala ou código IATA">'+
      '    <div class="busca-resultados" data-busca-resultados></div>'+
      '    </div>'+
      '  </div>'+
      '</div>';
  }

  function bindBusca(){
    var overlay = document.querySelector('[data-busca-overlay]');
    if(!overlay) return;
    var input = overlay.querySelector('#busca-input');
    var caixa = overlay.querySelector('[data-busca-resultados]');
    var prefix = document.body.getAttribute('data-prefix') || '';

    function abrir(){
      overlay.hidden = false;
      document.body.classList.add('busca-aberta');
      setTimeout(function(){ input.focus(); }, 60);
    }
    function fechar(){
      overlay.hidden = true;
      document.body.classList.remove('busca-aberta');
      input.value = '';
      render('');
    }
    function render(q){
      q = (q || '').trim().toLowerCase();
      if(!q){ caixa.innerHTML = ''; return; }
      // casa por inicio de palavra (evita 'rec' casar com 'Marechal');
      // consulta com espaco cai para busca livre no texto completo
      var multi = q.indexOf(' ') > -1;
      var hits = W_BUSCA.map(function(i){
        var nome = i.nome.toLowerCase(), score = 0;
        if(nome.indexOf(q) === 0) score = 4;
        else if(multi && i.termos.indexOf(q) > -1) score = 3;
        else if(i.termos.split(' ').some(function(w){ return w.indexOf(q) === 0; })) score = 2;
        else if(nome.indexOf(q) > -1) score = 1;
        return {i:i, s:score};
      }).filter(function(x){ return x.s > 0; })
        .sort(function(a,b){ return b.s - a.s; })
        .slice(0, 8).map(function(x){ return x.i; });
      if(!hits.length){
        caixa.innerHTML = '<p class="busca-vazio">Nada encontrado para "' + q + '".</p>';
        return;
      }
      caixa.innerHTML = hits.map(function(i){
        return '<a class="busca-item" href="' + prefix + i.url + '">'+
               '<span class="busca-item-nome">' + i.nome + '</span>'+
               '<span class="busca-item-meta">' + i.meta + '</span></a>';
      }).join('') +
      '<a class="busca-todos" href="' + prefix + 'busca-global.html?q=' +
      encodeURIComponent(q) + '">Ver todos os resultados para "' + q + '"</a>';
    }

    document.addEventListener('click', function(e){
      if(e.target.closest('[data-open-busca]')){ e.preventDefault(); abrir(); }
      else if(e.target.closest('[data-busca-fechar]')){ fechar(); }
      else if(e.target === overlay){ fechar(); }
    });
    input.addEventListener('input', function(){ render(input.value); });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && !overlay.hidden) fechar();
    });
  }

  function inject(){
    var prefix = document.body.getAttribute('data-prefix') || '';
    var highfi = document.body.hasAttribute('data-highfi');
    var navMount = document.querySelector('[data-nav]');
    var footerMount = document.querySelector('[data-footer]');
    var modalMount = document.querySelector('[data-modal-mount]');

    if(navMount && navMount.innerHTML.trim() === '') navMount.innerHTML = navHTML(prefix, highfi);
    if(footerMount && footerMount.innerHTML.trim() === '') footerMount.innerHTML = footerHTML(prefix, highfi);
    if(modalMount && modalMount.innerHTML.trim() === '') modalMount.innerHTML = verifierModalHTML(prefix);
    if(!document.querySelector('[data-busca-overlay]')) document.body.insertAdjacentHTML('beforeend', buscaOverlayHTML());
  }

  function markActiveNav(){
    var path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function(a){
      var href = a.getAttribute('href');
      if(!href) return;
      var clean = href.split('/').pop();
      if(clean === path){
        a.classList.add('active');
      }
    });
  }

  // =====================================================
  // INTERACTIONS
  // =====================================================

  function bindHamburger(){
    var drawer = document.body.hasAttribute('data-highfi');
    function setNav(open){
      var hb = document.querySelector('[data-hamburger]');
      if(hb) hb.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
    document.addEventListener('click', function(e){
      var ham = e.target.closest('[data-hamburger]');
      if(ham){
        e.preventDefault();
        if(drawer){
          setNav(!document.body.classList.contains('nav-open'));
        } else {
          var links = document.querySelector('.nav-links');
          if(!links) return;
          var open = links.classList.toggle('is-open');
          links.style.cssText = open ? 'display:flex;flex-direction:column;position:absolute;top:72px;left:0;right:0;background:#fff;border-bottom:1px solid var(--border);padding:24px;gap:8px;z-index:60;' : '';
        }
        return;
      }
      if(drawer && (e.target.closest('[data-nav-close]') || e.target.matches('[data-nav-backdrop]') || e.target.closest('.nav-links a'))){
        setNav(false);
      }
    });
    document.addEventListener('keydown', function(e){
      if(drawer && e.key === 'Escape') setNav(false);
    });
  }

  function bindHeroSlideshow(){
    var box = document.querySelector('[data-hero-slideshow]');
    if(!box) return;
    var slides = box.querySelectorAll('.hero-slide');
    if(slides.length < 2) return;
    var bars = document.querySelectorAll('.hero-progress .hero-bar-fill');
    var DUR = 5500;
    var i = 0;
    function render(idx){
      for(var n=0;n<slides.length;n++){ slides[n].classList.toggle('is-active', n===idx); }
      for(var b=0;b<bars.length;b++){
        bars[b].style.transition = 'none';
        bars[b].style.width = (b < idx ? '100%' : '0%');
      }
      if(bars[idx]){
        void bars[idx].offsetWidth;
        bars[idx].style.transition = 'width ' + DUR + 'ms linear';
        bars[idx].style.width = '100%';
      }
    }
    render(0);
    setInterval(function(){
      i = (i + 1) % slides.length;
      render(i);
    }, DUR);
  }

  function bindB2BCarousel(){
    var cars = [].slice.call(document.querySelectorAll('[data-b2b-carousel]'));
    if(!cars.length) return;

    cars.forEach(function(car){
      var track  = car.querySelector('[data-b2b-track]');
      var vp     = car.querySelector('.b2b-viewport');
      var slides = [].slice.call(car.querySelectorAll('.b2b-slide'));
      var dots   = [].slice.call(car.querySelectorAll('.b2b-dot'));
      if(!track || !vp || slides.length < 2) return;

      var idx = 0;

      function render(){
        var desired   = slides[idx].offsetLeft;
        var maxScroll = Math.max(0, track.scrollWidth - vp.clientWidth);
        var tx        = Math.min(desired, maxScroll);
        track.style.transform = 'translateX(' + (-tx) + 'px)';

        for(var i=0;i<slides.length;i++){ slides[i].classList.toggle('is-active', i===idx); }

        for(var d=0;d<dots.length;d++){
          dots[d].classList.remove('is-active');
          dots[d].classList.toggle('is-seen', d < idx);
          if(d !== idx) dots[d].removeAttribute('aria-current');
        }
        if(dots[idx]){
          void dots[idx].offsetWidth;              // reinicia a animacao de preenchimento
          dots[idx].classList.add('is-active');
          dots[idx].setAttribute('aria-current', 'true');
        }
      }

      function avancar(){ idx = (idx + 1) % slides.length; render(); }

      dots.forEach(function(dot){
        dot.addEventListener('click', function(){
          idx = parseInt(dot.getAttribute('data-b2b-dot'), 10) || 0;
          render();
        });
        // o avanco acompanha o fim do preenchimento: pausar a animacao
        // (hover/foco, via CSS) pausa o carrossel sem sair de sincronia
        dot.addEventListener('animationend', function(e){
          if(e.animationName === 'b2bFill' && dot.classList.contains('is-active')) avancar();
        });
      });

      // WCAG 2.2.2 · controle explicito de pausa.
      // Hover e foco ja pausavam, mas em toque nao existe hover.
      var dots_wrap = car.querySelector('.b2b-dots');
      if(dots_wrap && !car.querySelector('.b2b-pausa')){
        var linha = document.createElement('div');
        linha.className = 'b2b-dots-linha';
        dots_wrap.parentNode.insertBefore(linha, dots_wrap);
        linha.appendChild(dots_wrap);
        var bt = document.createElement('button');
        bt.type = 'button';
        bt.className = 'b2b-pausa';
        bt.setAttribute('aria-label', 'Pausar rotação das imagens');
        bt.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>';
        bt.addEventListener('click', function(){
          var pausado = car.classList.toggle('esta-pausado');
          bt.setAttribute('aria-label', pausado ? 'Retomar rotação das imagens' : 'Pausar rotação das imagens');
          bt.innerHTML = pausado
            ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M7 4l12 8-12 8z"/></svg>'
            : '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>';
        });
        linha.appendChild(bt);
      }

      var rt;
      window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(render, 120); });
      render();
    });
  }

  function bindNavScroll(){
    if(!document.body.hasAttribute('data-highfi')) return;
    // páginas sem hero full-screen: nav sólida desde o topo (não fica branca invisível)
    if(!document.body.hasAttribute('data-hero')){
      document.body.classList.add('nav-scrolled');
      return;
    }
    function onScroll(){
      document.body.classList.toggle('nav-scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  function bindAccordions(){
    document.addEventListener('click', function(e){
      var trig = e.target.closest('.acc-trigger');
      if(!trig) return;
      var acc = trig.closest('.acc');
      if(acc) acc.classList.toggle('open');
    });
  }

  function bindChips(){
    document.querySelectorAll('[data-chip-group]').forEach(function(group){
      group.querySelectorAll('.chip').forEach(function(chip){
        chip.addEventListener('click', function(){
          group.querySelectorAll('.chip').forEach(function(c){c.classList.remove('active');});
          chip.classList.add('active');
        });
      });
    });
  }

  // =====================================================
  // VERIFIER (modal + standalone page)
  // =====================================================
  function bindVerifier(){
    document.addEventListener('click', function(e){
      var open = e.target.closest('[data-open-verifier]');
      if(open){
        e.preventDefault();
        openModal();
      }
      var close = e.target.closest('[data-modal-close]');
      if(close){
        closeModal();
      }
      if(e.target.matches('[data-modal-backdrop]')){
        closeModal();
      }
      var reset = e.target.closest('[data-verif-reset]');
      if(reset){
        var ok = document.getElementById('state-success');
        var no = document.getElementById('state-fail');
        var form = document.getElementById('verif-form');
        if(ok) ok.style.display = 'none';
        if(no) no.style.display = 'none';
        if(form) {
          form.style.display = 'block';
          var i = form.querySelector('input');
          if(i) i.value = '';
        }
      }
    });

    document.addEventListener('submit', function(e){
      var form = e.target.closest('#verif-form');
      if(!form) return;
      e.preventDefault();
      var input = form.querySelector('input');
      var v = (input.value || '').replace(/\s/g,'');
      var stOk = document.getElementById('state-success');
      var stNo = document.getElementById('state-fail');
      var stIn = document.getElementById('state-input');
      if(stIn) stIn.style.display = 'none';
      if(/^[345]/.test(v) && v.length >= 6){
        if(stOk) stOk.style.display = 'block';
        if(stNo) stNo.style.display = 'none';
      } else {
        if(stNo) stNo.style.display = 'block';
        if(stOk) stOk.style.display = 'none';
      }
      form.style.display = 'none';
    });

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeModal();
    });
  }

  function openModal(){
    var bd = document.querySelector('[data-modal-backdrop]');
    if(!bd) return;
    bd.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(function(){
      var input = bd.querySelector('input');
      if(input) input.focus();
    }, 50);
  }

  function closeModal(){
    var bd = document.querySelector('[data-modal-backdrop]');
    if(!bd) return;
    bd.hidden = true;
    document.body.style.overflow = '';
    // reset
    var form = document.getElementById('verif-form');
    if(form){
      form.style.display = 'block';
      var i = form.querySelector('input');
      if(i) i.value = '';
    }
    var ok = document.getElementById('state-success');
    var no = document.getElementById('state-fail');
    if(ok) ok.style.display = 'none';
    if(no) no.style.display = 'none';
  }

  // =====================================================
  // GALLERY · STARS · FORMS · SEARCH SUGGEST · TABS
  // =====================================================

  function bindGallery(){
    document.querySelectorAll('[data-gallery]').forEach(function(g){
      var dots = g.querySelectorAll('.dot');
      dots.forEach(function(d){
        d.addEventListener('click', function(){
          dots.forEach(function(x){x.classList.remove('active');});
          d.classList.add('active');
        });
      });
      var arrows = g.querySelectorAll('.gallery-arrow');
      arrows.forEach(function(a, idx){
        a.addEventListener('click', function(){
          var arr = Array.prototype.slice.call(dots);
          var active = g.querySelector('.dot.active');
          var i = arr.indexOf(active);
          var next = idx === 0 ? (i-1+arr.length)%arr.length : (i+1)%arr.length;
          arr.forEach(function(x){x.classList.remove('active');});
          arr[next].classList.add('active');
        });
      });
    });
  }

  function bindStars(){
    document.querySelectorAll('[data-star-row]').forEach(function(row){
      var stars = row.querySelectorAll('.star');
      stars.forEach(function(st, i){
        st.addEventListener('click', function(){
          stars.forEach(function(s, j){ s.classList.toggle('on', j <= i); });
        });
      });
    });
  }

  function bindForms(){
    document.addEventListener('submit', function(e){
      var f = e.target.closest('[data-form-demo]');
      if(!f) return;
      e.preventDefault();
      var msg = f.getAttribute('data-form-msg') || 'Obrigado. Recebemos sua mensagem.';
      var redirect = f.getAttribute('data-form-redirect');
      if(!f.querySelector('.note.demo-feedback')){
        var feedback = document.createElement('div');
        feedback.className = 'note demo-feedback';
        feedback.style.marginTop = '12px';
        feedback.textContent = msg;
        f.appendChild(feedback);
      }
      f.querySelectorAll('input,textarea').forEach(function(i){ if(i.type !== 'submit') i.value=''; });
      if(redirect){
        setTimeout(function(){ location.href = redirect; }, 1500);
      }
    });
  }

  function bindSearchSuggest(){
    var input = document.getElementById('airport-search');
    var box = document.getElementById('airport-suggest');
    if(!input || !box) return;
    var prefix = document.body.getAttribute('data-prefix') || '';
    var data = [
      {iata:'FOR', city:'Fortaleza', salas:4, slug:'aeroporto-for.html'},
      {iata:'GRU', city:'Guarulhos · São Paulo', salas:4, slug:'aeroporto-gru.html'},
      {iata:'BEL', city:'Belém', salas:2, slug:'aeroporto-bel.html'},
      {iata:'POA', city:'Porto Alegre', salas:2, slug:'aeroporto-poa.html'},
      {iata:'REC', city:'Recife', salas:2, slug:'aeroporto-rec.html'},
      {iata:'CGB', city:'Cuiabá', salas:1, slug:'aeroporto-cgb.html'},
      {iata:'CGH', city:'Congonhas · São Paulo', salas:1, slug:'aeroporto-cgh.html'},
      {iata:'CWB', city:'Curitiba', salas:1, slug:'aeroporto-cwb.html'},
      {iata:'GYN', city:'Goiânia', salas:1, slug:'aeroporto-gyn.html'},
      {iata:'LDB', city:'Londrina', salas:1, slug:'aeroporto-ldb.html'},
      {iata:'MGF', city:'Maringá', salas:1, slug:'aeroporto-mgf.html'},
      {iata:'NVT', city:'Navegantes', salas:1, slug:'aeroporto-nvt.html'},
      {iata:'PMW', city:'Palmas', salas:1, slug:'aeroporto-pmw.html'},
      {iata:'RAO', city:'Ribeirão Preto', salas:1, slug:'aeroporto-rao.html'},
      {iata:'FTE', city:'El Calafate · Argentina', salas:1, slug:'aeroporto-fte.html'},
      {iata:'REL', city:'Trelew · Argentina', salas:1, slug:'aeroporto-rel.html'},
      {iata:'USH', city:'Ushuaia · Argentina', salas:1, slug:'aeroporto-ush.html'}
    ];
    function render(q){
      var qq = (q||'').toLowerCase();
      var hits = data.filter(function(d){
        return d.iata.toLowerCase().indexOf(qq) === 0 || d.city.toLowerCase().indexOf(qq) >= 0;
      });
      if(!hits.length || !qq){ box.style.display='none'; return; }
      box.innerHTML = hits.map(function(h){
        return '<a href="'+prefix+h.slug+'" class="suggest-item">'+
          '<span><strong>'+h.city+'</strong> · '+h.iata+'</span>'+
          '<span class="tiny">'+h.salas+' sala'+(h.salas>1?'s':'')+'</span></a>';
      }).join('');
      box.style.display='block';
    }
    input.addEventListener('input', function(){ render(input.value); });
    input.addEventListener('focus', function(){ if(input.value) render(input.value); });
    document.addEventListener('click', function(e){
      if(!box.contains(e.target) && e.target !== input) box.style.display='none';
    });
  }

  // =====================================================
  // INIT
  // =====================================================

  document.addEventListener('DOMContentLoaded', function(){
    inject();
    markActiveNav();
    bindHeroSlideshow();
    bindB2BCarousel();
    bindNavScroll();
    bindHamburger();
    bindBusca();
    bindAccordions();
    bindChips();
    bindVerifier();
    bindGallery();
    bindStars();
    bindForms();
    bindSearchSuggest();
  });
})();
