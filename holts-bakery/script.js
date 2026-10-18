const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
// Sticky nav shadow + mobile menu
addEventListener('scroll',()=>$('#nav').classList.toggle('stuck',scrollY>10));
$('#burger').onclick=e=>{const o=$('#links').classList.toggle('open');e.target.setAttribute('aria-expanded',o)};
$$('#links a').forEach(a=>a.onclick=()=>$('#links').classList.remove('open'));
$('#yr').textContent=new Date().getFullYear();

// Hero photo shuffle
const stack=$('#stack'),imgs=[...stack.querySelectorAll('img')];
const slots=[['rotate(-8deg) translateX(-14%)',1],['rotate(7deg) translateX(14%)',2],['rotate(-1deg)',3]];let off=0;
function place(){imgs.forEach((im,i)=>{const s=slots[(i+off)%3];im.style.transform=s[0];im.style.zIndex=s[1]})}
stack.onclick=()=>{off=(off+1)%3;place()};place();

// Cake builder
const cake=$('#cake');let color='#f7b8c8';
const base={quarter:30,sheet:40,tier:60,cup:18};
function update(){
  const s=document.querySelector('input[name=size]:checked');
  cake.dataset.s=s.value;cake.style.setProperty('--fr',color);
  const light=['#fff6ea','#ffd44d','#f7b8c8','#8cc6ff','#c9a7f0'].includes(color);
  $('#msg').style.color=light?'#1f2a5c':'#fff';
  const o=$('#occasion').selectedOptions[0];
  $('#topper').textContent=o.dataset.t;
  $('#msg').textContent=$('#text').value.trim()||o.dataset.m;
  let p=base[s.value];
  if($('#flavor').value==='Red velvet'||$('#flavor').value==='Strawberry')p+=5;
  if($('#text').value.trim())p+=0;
  $('#price').textContent='$'+p;
}
$$('input[name=size]').forEach(r=>r.onchange=update);
['#flavor','#occasion'].forEach(s=>$(s).onchange=()=>{update();});
$('#text').oninput=update;
$$('.sw').forEach(b=>b.onclick=()=>{$$('.sw').forEach(x=>x.classList.remove('on'));b.classList.add('on');color=b.dataset.c;update()});
update();

// Toast
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),5000)}
$('#designForm').onsubmit=e=>{e.preventDefault();
  const size=document.querySelector('input[name=size]:checked').parentElement.textContent;
  toast(`Thanks ${$('#name').value}! We got your ${size.toLowerCase()} idea (${$('#flavor').value}, "${$('#msg').textContent}"). We'll call ${$('#phone').value} to confirm.`);
  e.target.reset();$$('.sw').forEach((x,i)=>x.classList.toggle('on',i===0));color='#f7b8c8';update()};

// Gallery filter
$$('#filters button').forEach(b=>b.onclick=()=>{
  $$('#filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
  $$('#grid figure').forEach(f=>f.classList.toggle('hide',b.dataset.f!=='all'&&f.dataset.k!==b.dataset.f))});

// Lightbox
const lb=$('#lb');
$$('#grid figure').forEach(f=>f.onclick=()=>{$('#lbImg').src=f.querySelector('img').src;$('#lbImg').alt=f.querySelector('img').alt;$('#lbCap').textContent=f.querySelector('figcaption').textContent;lb.hidden=false});
lb.onclick=()=>lb.hidden=true;
addEventListener('keydown',e=>{if(e.key==='Escape')lb.hidden=true});
