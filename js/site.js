// Casa Prática: atalhos automáticos, botão de topo e página ampliada. Sem rastreador, sem cookie.
(function () {
  // 1. Atalhos: um botão para cada elemento com data-atalho, na ordem da página.
  var lista = document.getElementById('lista-atalhos');
  if (lista) {
    document.querySelectorAll('[data-atalho]').forEach(function (el) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.className = 'atalho';
      a.href = '#' + el.id;
      var t = document.createElement('span');
      t.className = 'atalho-txt';
      t.textContent = el.getAttribute('data-atalho');
      a.appendChild(t);
      var card = el.closest('.card') || el;
      if (card.querySelector('.publi')) {
        var p = document.createElement('span');
        p.className = 'publi';
        p.textContent = 'publi';
        a.appendChild(p);
      }
      li.appendChild(a);
      lista.appendChild(li);
    });
  }

  // 2. Botão "Atalhos" aparece depois de rolar a página.
  var topo = document.querySelector('.btn-topo');
  var alvo = document.querySelector('.atalhos');
  if (topo && alvo) {
    var checa = function () {
      var fim = alvo.getBoundingClientRect().bottom;
      topo.classList.toggle('ver', fim < 0);
    };
    window.addEventListener('scroll', checa, { passive: true });
    checa();
  }

  // 3. Prévia do e-book: toque na página para ampliar.
  var dlg = document.getElementById('zoom');
  if (dlg && typeof dlg.showModal === 'function') {
    var img = dlg.querySelector('img');
    document.querySelectorAll('[data-zoom]').forEach(function (b) {
      b.addEventListener('click', function () {
        img.src = b.getAttribute('data-zoom');
        img.alt = b.querySelector('img').alt;
        dlg.showModal();
      });
    });
    dlg.addEventListener('click', function () { dlg.close(); });
  }
})();
