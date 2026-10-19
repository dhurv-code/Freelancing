
const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40));
const links=document.getElementById('links');
document.getElementById('burger').onclick=()=>links.classList.toggle('open');
links.querySelectorAll('a').forEach(a=>a.onclick=()=>links.classList.remove('open'));
// marquee duplicate
const t=document.getElementById('track');t.innerHTML+=t.innerHTML;
// reveal + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target);
  e.target.querySelectorAll('[data-n]').forEach(count);
}),{threshold:.15});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
function count(el){
  const n=+el.dataset.n,d=+el.dataset.d||0,s=performance.now();
  (function f(now){const p=Math.min((now-s)/1400,1);el.textContent=(n*(1-Math.pow(1-p,3))).toFixed(d);if(p<1)requestAnimationFrame(f)})(s);
}
// quotes rotate
const qs=[...document.querySelectorAll('.q')];let qi=0;
setInterval(()=>{qs[qi].classList.remove('on');qi=(qi+1)%qs.length;qs[qi].classList.add('on')},4500);
// faq
document.querySelectorAll('.fq button').forEach(b=>b.onclick=()=>{
  const f=b.parentElement,o=f.classList.contains('open');
  document.querySelectorAll('.fq').forEach(x=>x.classList.remove('open'));
  if(!o)f.classList.add('open');
});

// smart call: dial on mobile, popup on desktop
const modal=document.getElementById('modal');
const isMobile=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||matchMedia('(pointer:coarse)').matches;
document.querySelectorAll('a[href^="tel:"]').forEach(a=>a.addEventListener('click',e=>{
  if(isMobile||a.hasAttribute('data-native'))return;
  e.preventDefault();modal.classList.add('show');
}));
document.getElementById('mx').onclick=()=>modal.classList.remove('show');
modal.onclick=e=>{if(e.target===modal)modal.classList.remove('show')};
addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('show')});
document.getElementById('copy').onclick=()=>{
  navigator.clipboard.writeText('+447532788671').catch(()=>{});
  const t=document.getElementById('toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2000);
};

// ===== v2 =====
const bar=document.getElementById('bar');
addEventListener('scroll',()=>{bar.style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100)+'%'},{passive:true});
document.querySelectorAll('.spot').forEach(c=>c.addEventListener('pointermove',e=>{
  const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');
}));
if(matchMedia('(hover:hover) and (pointer:fine)').matches){
  document.querySelectorAll('.step,.svc').forEach(c=>{
    c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      c.style.transform=`perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-6px)`});
    c.addEventListener('pointerleave',()=>c.style.transform='');
  });
}
