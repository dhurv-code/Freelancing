const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%4)*80+'ms';io.observe(el)});
const nav=document.getElementById('nav'),mb=document.getElementById('mbar'),steps=document.getElementById('steps');
function sc(){nav.classList.toggle('s',scrollY>10);mb.classList.toggle('show',scrollY>380);
const r=steps.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.8-r.top)/(r.height+innerHeight*.2)));steps.style.setProperty('--p',(p*100)+'%')}
addEventListener('scroll',sc,{passive:true});sc();
const qs=[...document.querySelectorAll('.q')],dots=document.getElementById('dots');let cur=0,t;
qs.forEach((_,i)=>{const d=document.createElement('button');d.setAttribute('aria-label','Review '+(i+1));d.onclick=()=>{show(i)};dots.appendChild(d)});
function show(i){cur=i;qs.forEach((q,j)=>q.classList.toggle('on',j===i));[...dots.children].forEach((d,j)=>{d.classList.remove('on');if(j===i){void d.offsetWidth;d.classList.add('on')}});clearTimeout(t);t=setTimeout(()=>show((cur+1)%qs.length),6000)}
show(0);
const done=document.getElementById('done');
document.getElementById('form').addEventListener('submit',e=>{e.preventDefault();const n=document.getElementById('n').value.trim().split(' ')[0];document.getElementById('who').textContent=n?', '+n:'';done.classList.add('on');e.target.reset()});
document.getElementById('again').onclick=()=>done.classList.remove('on');
const sh=document.getElementById('share');if(sh)sh.onclick=async()=>{try{if(navigator.share){await navigator.share({title:document.title,url:location.href})}else{await navigator.clipboard.writeText(location.href);sh.textContent='Link copied ✓'}}catch(e){}};
document.getElementById('y').textContent=new Date().getFullYear();
