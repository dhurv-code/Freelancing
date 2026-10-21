(function(){
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function(s,r){return (r||document).querySelector(s)};
  var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  /* Scroll progress shown as water filling the header edge */
  var bar = $('#progress');
  function prog(){
    var h = document.documentElement.scrollHeight - innerHeight;
    var p = h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0;
    bar.style.transform = 'scaleX(' + p + ')';
  }
  addEventListener('scroll', prog, {passive:true}); prog();

  /* Reveal on scroll (content is already readable at rest) */
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});
    $$('.rv').forEach(function(el){ io.observe(el); });
  } else { $$('.rv').forEach(function(el){ el.classList.add('in'); }); }

  /* Click ripples */
  document.addEventListener('pointerdown', function(ev){
    var b = ev.target.closest && ev.target.closest('.btn'); if(!b) return;
    var holder = $('.rips', b); if(!holder) return;
    var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2.2;
    var s = document.createElement('span'); s.className = 'rip';
    s.style.width = s.style.height = d + 'px';
    s.style.left = (ev.clientX - r.left - d/2) + 'px';
    s.style.top = (ev.clientY - r.top - d/2) + 'px';
    holder.appendChild(s); setTimeout(function(){ s.remove(); }, 800);
  });

  /* Hero bubbles */
  (function(){
    var cv = $('#bubbles'); if(!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d'), w=0, h=0, bubbles=[], raf=null;
    function size(){
      var dpr = Math.min(window.devicePixelRatio||1, 2), r = cv.getBoundingClientRect();
      w = r.width; h = r.height; cv.width = w*dpr; cv.height = h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    function mk(){ return {x:Math.random()*w, y:Math.random()*h, r:2+Math.random()*7, v:.25+Math.random()*.7, ph:Math.random()*6.28, amp:6+Math.random()*14}; }
    function init(){ size(); var n = Math.round(Math.min(34, Math.max(10, w/32))); bubbles = []; for(var i=0;i<n;i++) bubbles.push(mk()); }
    function draw(t){
      ctx.clearRect(0,0,w,h);
      bubbles.forEach(function(b){
        if(!reduce){ b.y -= b.v; if(b.y < -20){ b.y = h+20; b.x = Math.random()*w; } }
        var x = b.x + Math.sin(t/1200 + b.ph)*b.amp;
        ctx.beginPath(); ctx.arc(x,b.y,b.r,0,6.283); ctx.fillStyle='rgba(120,226,240,.08)'; ctx.fill();
        ctx.strokeStyle='rgba(120,226,240,.5)'; ctx.lineWidth=1.2; ctx.stroke();
        ctx.beginPath(); ctx.arc(x-b.r*.3,b.y-b.r*.3,b.r*.22,0,6.283); ctx.fillStyle='rgba(255,255,255,.6)'; ctx.fill();
      });
    }
    function loop(t){ draw(t); raf = requestAnimationFrame(loop); }
    init(); draw(0);
    if(!reduce && 'IntersectionObserver' in window){
      new IntersectionObserver(function(es){
        if(es[0].isIntersecting){ if(!raf) raf = requestAnimationFrame(loop); }
        else if(raf){ cancelAnimationFrame(raf); raf = null; }
      }).observe(cv);
    }
    var rt; addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(function(){ init(); draw(0); }, 150); });
  })();

  /* Pressure gauge */
  (function(){
    var NS = 'http://www.w3.org/2000/svg', face = $('#gaugeFace'), needle = $('#needle'); if(!face) return;
    function pt(r, bar){ var a = (-120 + bar*60) * Math.PI/180; return [120 + r*Math.sin(a), 120 - r*Math.cos(a)]; }
    function el(n, attrs){ var e = document.createElementNS(NS, n); for(var k in attrs) e.setAttribute(k, attrs[k]); return e; }
    function arc(b1, b2, color){
      var p1 = pt(86,b1), p2 = pt(86,b2);
      face.appendChild(el('path', {d:'M'+p1[0].toFixed(1)+' '+p1[1].toFixed(1)+' A86 86 0 0 1 '+p2[0].toFixed(1)+' '+p2[1].toFixed(1), fill:'none', stroke:color, 'stroke-width':9, 'stroke-linecap':'butt', opacity:.9}));
    }
    arc(1,2,'var(--water-bright)'); arc(3,4,'var(--copper-bright)');
    for(var i=0;i<=8;i++){
      var bar = i/2, major = i%2===0, a = pt(major?96:100, bar), b = pt(106, bar);
      face.appendChild(el('line', {x1:a[0], y1:a[1], x2:b[0], y2:b[1], stroke:'var(--on-deep-muted)', 'stroke-width': major?2:1, 'stroke-linecap':'round'}));
      if(major){
        var t = pt(68, bar), tx = el('text', {x:t[0], y:t[1]+4, 'text-anchor':'middle', 'font-family':'IBM Plex Mono, monospace', 'font-size':11, fill:'var(--on-deep-muted)'});
        tx.textContent = String(bar); face.appendChild(tx);
      }
    }
    if(!reduce && needle){
      needle.style.transition = 'none'; needle.style.transform = 'rotate(-120deg)';
      void needle.getBoundingClientRect();
      setTimeout(function(){ needle.style.transition = ''; needle.style.transform = 'rotate(-36deg)'; }, 500);
    }
  })();

  /* Copy helpers */
  function copyText(text, sourceEl, btn, doneLabel){
    var orig = btn ? btn.firstChild.textContent : '';
    function ok(){ if(btn){ btn.firstChild.textContent = doneLabel || 'Copied'; setTimeout(function(){ btn.firstChild.textContent = orig; }, 1800); } }
    function fallback(){
      try{
        var r = document.createRange(); r.selectNodeContents(sourceEl); var s = getSelection(); s.removeAllRanges(); s.addRange(r);
        if(btn){ btn.firstChild.textContent = 'Selected, press copy'; setTimeout(function(){ btn.firstChild.textContent = orig; }, 2200); }
      }catch(e){}
    }
    try{
      if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(text).then(ok, fallback); }
      else fallback();
    }catch(e){ fallback(); }
  }
  $$('[data-copy-el]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var src = document.getElementById(btn.getAttribute('data-copy-el'));
      copyText('07972 176630', src, btn, 'Copied');
    });
  });

  /* Service cards pre-fill the form */
  var sel = $('#f-service');
  $$('[data-service]').forEach(function(a){
    a.addEventListener('click', function(){ sel.value = a.getAttribute('data-service'); });
  });

  /* Form */
  var form = $('#bookForm'), summary = $('#summary'), sumText = $('#sumText');
  var dateIn = $('#f-date'), d = new Date();
  var todayISO = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  dateIn.min = todayISO;

  var emNote = $('#emNote');
  $$('input[name="urgency"]').forEach(function(r){
    r.addEventListener('change', function(){ emNote.hidden = !(r.checked && r.value.indexOf('Emergency') === 0); });
  });

  var rules = {
    name: function(v){ return v.trim().length >= 2 || 'Please enter your name.'; },
    phone: function(v){ return /^(?:\+44|0044|0)\d{9,10}$/.test(v.replace(/[\s()-]/g,'')) || 'Enter a UK phone number, for example 07972 176630.'; },
    email: function(v){ return !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Check the email address.'; },
    postcode: function(v){ return /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(v.trim()) || 'Enter a UK postcode, for example BS2 0AF.'; },
    service: function(v){ return !!v || 'Choose a service so we know what to bring.'; },
    date: function(v){ return !v || v >= todayISO || 'Pick today or a later date.'; }
  };
  var ids = {name:'f-name', phone:'f-phone', email:'f-email', postcode:'f-postcode', service:'f-service', date:'f-date'};

  function check(key){
    var input = document.getElementById(ids[key]), err = document.getElementById('e-' + key);
    var res = rules[key](input.value);
    if(res === true){ input.removeAttribute('aria-invalid'); err.hidden = true; err.textContent = ''; return true; }
    input.setAttribute('aria-invalid','true'); err.hidden = false; err.textContent = res; return false;
  }
  Object.keys(ids).forEach(function(k){
    var input = document.getElementById(ids[k]);
    input.addEventListener('blur', function(){ if(input.value) check(k); });
    input.addEventListener('input', function(){ if(input.getAttribute('aria-invalid')) check(k); });
  });

  function niceDate(iso){
    if(!iso) return 'No date chosen';
    var p = iso.split('-'); var dt = new Date(+p[0], +p[1]-1, +p[2]);
    return dt.toLocaleDateString('en-GB', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
  }

  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    var firstBad = null;
    Object.keys(ids).forEach(function(k){ if(!check(k) && !firstBad) firstBad = document.getElementById(ids[k]); });
    if(firstBad){ firstBad.focus(); return; }
    var f = new FormData(form), lines = [
      'Booking request for Bristol Plumbing Co.',
      'Name: ' + f.get('name').trim(),
      'Phone: ' + f.get('phone').trim(),
      f.get('email').trim() ? 'Email: ' + f.get('email').trim() : null,
      'Postcode: ' + f.get('postcode').trim().toUpperCase(),
      'Service: ' + f.get('service'),
      'Urgency: ' + f.get('urgency'),
      'Preferred date: ' + niceDate(f.get('date')),
      'Time window: ' + f.get('time'),
      f.get('notes').trim() ? 'Details: ' + f.get('notes').trim() : null
    ].filter(Boolean);
    var text = lines.join('\n');
    sumText.textContent = text;
    $('#waLink').href = 'https://wa.me/447972176630?text=' + encodeURIComponent(text);
    form.hidden = true; summary.hidden = false;
    summary.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'center'});
  });
  $('#editReq').addEventListener('click', function(){ summary.hidden = true; form.hidden = false; $('#f-name').focus(); });
  $('#copySum').addEventListener('click', function(){ copyText(sumText.textContent, sumText, this, 'Copied'); });
})();
