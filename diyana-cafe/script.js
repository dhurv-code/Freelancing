const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$('#yr').textContent=new Date().getFullYear();
// Header + drawer
addEventListener('scroll',()=>$('#hdr').classList.toggle('stuck',scrollY>40));
$('#bg').onclick=()=>{const o=$('#drawer').classList.toggle('open');$('#bg').textContent=o?'Close':'Menu';$('#bg').setAttribute('aria-expanded',o)};
$$('#drawer a').forEach(a=>a.onclick=()=>{$('#drawer').classList.remove('open');$('#bg').textContent='Menu'});
// Hero glow follows the cursor
const hero=$('.hero'),glow=$('#glow');
hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect();glow.style.left=e.clientX-r.left+'px';glow.style.top=e.clientY-r.top+'px'});
// Menu list: image follows cursor
const f=$('#follow');
$$('#mlist li').forEach(li=>{
  li.addEventListener('mouseenter',()=>{f.src=li.dataset.img;f.classList.add('on')});
  li.addEventListener('mouseleave',()=>f.classList.remove('on'));
  li.addEventListener('mousemove',e=>{f.style.transform=`translate(${e.clientX+30}px,${e.clientY-120}px)`});
});
// Count-up stats
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);
  const el=e.target,n=+el.dataset.n,d=n%1?1:0;let t=0;
  const id=setInterval(()=>{t+=n/40;if(t>=n){t=n;clearInterval(id)}el.textContent=t.toFixed(d)},30)}),{threshold:.6});
$$('[data-n]').forEach(b=>io.observe(b));
// Cake builder
const cake=$('#cake'),base={quarter:30,sheet:40,tier:60,cup:18};let color='#f7b8c8';
function update(){
  const s=document.querySelector('input[name=size]:checked').value;
  cake.dataset.s=s;cake.style.setProperty('--fr',color);
  $('#msg').style.color=color==='#6b3f2a'?'#fff':'#1f1410';
  const o=$('#occasion').selectedOptions[0];
  $('#topper').textContent=o.dataset.t;
  $('#msg').textContent=$('#text').value.trim()||o.dataset.m;
  let p=base[s];if(['Red velvet','Strawberry'].includes($('#flavor').value))p+=5;
  $('#price').textContent='$'+p;
}
$$('input[name=size]').forEach(r=>r.onchange=update);
['#flavor','#occasion'].forEach(s=>$(s).onchange=update);
$('#text').oninput=update;
$$('.sw').forEach(b=>b.onclick=()=>{$$('.sw').forEach(x=>x.classList.remove('on'));b.classList.add('on');color=b.dataset.c;update()});
update();
// Toast
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),5000)}
$('#designForm').onsubmit=e=>{e.preventDefault();
  toast(`Thank you ${$('#name').value}! We received your idea ("${$('#msg').textContent}"). We will call ${$('#phone').value} to confirm.`);
  e.target.reset();$$('.sw').forEach((x,i)=>x.classList.toggle('on',!i));color='#f7b8c8';update()};
$('#news').onsubmit=e=>{e.preventDefault();toast('You are subscribed. Thank you!');e.target.reset()};
// Lightbox
const lb=$('#lb');
$$('#mosaic figure').forEach(g=>g.onclick=()=>{const i=g.querySelector('img');$('#lbi').src=i.src;$('#lbi').alt=i.alt;$('#lbp').textContent=g.querySelector('figcaption').textContent;lb.hidden=false});
lb.onclick=()=>lb.hidden=true;addEventListener('keydown',e=>{if(e.key==='Escape')lb.hidden=true});
