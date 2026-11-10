const cases=[
 ['women','work-new1-20261103','여자눈썹 · 3단 비교','제공 원본의 위·가운데·아래 순서 그대로'],
 ['women','work-new2-20261103','여자눈썹 · 2단 비교','제공 원본의 위·아래 순서 그대로'],
 ['men','work-m1','남자눈썹 · 전후 비교 01','왼쪽 Before / 오른쪽 After'],
 ['men','work-m2','남자눈썹 · 전후 비교 02','위 Before / 아래 After'],
 ['women','work-w3','여자눈썹 · 전후 비교 03','왼쪽 Before / 오른쪽 After'],
 ['women','work-w4','여자눈썹 · 전후 비교 04','원본의 왼쪽·오른쪽 전후 사진'],
 ['men','work-m3','남자눈썹 · 전후 비교 03','위 Before / 아래 After'],
 ['men','work-m4','남자눈썹 · 전후 비교 04','왼쪽 Before / 오른쪽 After']
];
const gallery=document.querySelector('#gallery'),viewer=document.querySelector('#viewer');let returnFocus;
function openImage(src,label){returnFocus=document.activeElement;viewer.querySelector('img').src=src;viewer.querySelector('img').alt=label;document.querySelector('#viewer-caption').textContent=label;viewer.showModal();document.body.style.overflow='hidden'}
function closeImage(){viewer.close();document.body.style.overflow='';returnFocus?.focus()}
function render(filter='all'){gallery.replaceChildren();cases.filter(c=>filter==='all'||c[0]===filter).forEach(c=>{const b=document.createElement('button');b.className='case';b.setAttribute('aria-label',c[2]+' 크게 보기');b.innerHTML=`<span class="case-media"><img src="assets/${c[1]}.webp" alt="임브로우 실제 ${c[2]}" loading="lazy" width="600" height="800"></span><span class="case-caption"><span>${c[2]}</span><span>↗</span></span>`;b.addEventListener('click',()=>openImage(`assets/${c[1]}.webp`,c[2]+' · '+c[3]));gallery.append(b)});document.dispatchEvent(new Event('gallery:updated'))}render();
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});render(b.dataset.filter)}));
document.querySelector('.close-viewer').addEventListener('click',closeImage);viewer.addEventListener('cancel',e=>{e.preventDefault();closeImage()});viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeImage()}});
document.querySelectorAll('.review-open').forEach(b=>b.addEventListener('click',()=>openImage(b.dataset.src,'임브로우 제공 실제 고객 후기 원문')));
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;const activeMotion=new WeakMap();
function selectMotion(el){
 if(el.matches('.hero-word'))return 'brand';
 if(el.matches('.hero-copy'))return 'hero';
 if(el.matches('.hero-media'))return 'focus';
 if(el.matches('.method-media'))return 'curtain';
 if(el.matches('.method-copy,.pricing > .reveal:first-child,.footer-bottom'))return 'from-right';
 if(el.matches('.concern .section-head,.faq .section-head'))return 'from-left';
 if(el.matches('.concern-list,.steps,.visit-details'))return 'stagger';
 if(el.matches('.case'))return 'gallery';
 if(el.matches('.process-films figure,.space figure'))return 'image';
 if(el.matches('.price-panel'))return 'price';
 if(el.matches('.review-section .reveal'))return 'review';
 if(el.matches('.final-cta'))return 'soft';
 if(el.matches('.questions'))return 'stagger';
 return 'title';
}
function framesFor(type){
 const soft=reduced.matches,d=soft?14:32;
 const end={opacity:1,transform:'none',filter:'blur(0px)',clipPath:'inset(0% 0% 0% 0%)'};
 const from={opacity:0,transform:`translateY(${d}px)`};
 if(type==='brand')Object.assign(from,{transform:`translateY(${soft?3:18}px)`,filter:`blur(${soft?1:4}px)`});
 if(type==='hero'||type==='stagger')from.transform='none';
 if(type==='from-right')from.transform=`translateX(${d}px)`;
 if(type==='from-left')from.transform=`translateX(-${d}px)`;
 if(type==='curtain')Object.assign(from,{transform:`translateX(-${d}px)`,clipPath:soft?'inset(0 10% 0 0)':'inset(0 28% 0 0)'});
 if(type==='focus')Object.assign(from,{transform:soft?'none':'scale(1.025)',filter:`blur(${soft?3:8}px)`});
 if(type==='soft')Object.assign(from,{transform:'none',filter:`blur(${soft?3:8}px)`});
 if(type==='image')Object.assign(from,{transform:soft?'none':'scale(1.025)',clipPath:soft?'inset(2% 0)':'inset(8% 0)'});
 if(type==='gallery')from.transform=`translateY(${soft?12:25}px)`;
 if(type==='price')from.transform=soft?'translateY(5px)':'translateY(22px) scale(.985)';
 if(type==='review')from.transform=`translateX(-${soft?5:22}px)`;
 if(type==='title')Object.assign(from,{clipPath:soft?'inset(0 0 5% 0)':'inset(0 0 20% 0)'});
 return [from,end];
}
function reveal(el){
 if(el.dataset.motionShown==='yes')return;el.dataset.motionShown='yes';el.style.opacity='1';
 const type=el.dataset.motion,anims=[];const duration=reduced.matches?650:(type==='curtain'||type==='focus'?1050:800);
 const delay=0;
 anims.push(el.animate(framesFor(type),{duration,delay,easing:'cubic-bezier(.16,.7,.24,1)',fill:'both'}));
 let items=[];
 if(type==='hero'){
  items=[...el.children].filter(item=>item.tagName!=='H1');
  el.querySelectorAll('.hero-title-line').forEach((line,i)=>anims.push(line.animate([{opacity:0,transform:`translateX(${(i===0?-1:1)*(reduced.matches?22:40)}px)`},{opacity:1,transform:'none'}],{duration:950,delay:80+i*150,easing:'cubic-bezier(.16,.75,.2,1)',fill:'both'})));
 }
 if(type==='stagger')items=[...el.querySelectorAll(':scope > article,:scope > details,:scope > dl > div')];
 if(type==='review')items=[...el.querySelectorAll('blockquote')];
 items.forEach((item,i)=>{const side=(i%2===0?-1:1)*(reduced.matches?12:24);const from=(type==='hero'||type==='stagger'||type==='review')?`translateX(${side}px)`:`translateY(${reduced.matches?8:18}px)`;anims.push(item.animate([{opacity:0,transform:from},{opacity:1,transform:'none'}],{duration:reduced.matches?650:850,delay:Math.min(i*(reduced.matches?90:120),500),easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'}))});
 activeMotion.set(el,anims);
}
function observeMotion(root=document){
 root.querySelectorAll('.reveal,.case,.hero-word').forEach((el,i)=>{
  if(el.dataset.motionObserved==='yes')return;
  el.dataset.motion=selectMotion(el);el.dataset.motionOrder=String(i);el.dataset.motionObserved='yes';el.style.opacity='0';revealObserver.observe(el);
 });
}
function setupMotion(){
 revealObserver?.disconnect();document.documentElement.classList.remove('js-motion');
 document.querySelectorAll('[data-motion]').forEach(el=>{activeMotion.get(el)?.forEach(a=>a.cancel());delete el.dataset.motionObserved;delete el.dataset.motionShown});
 revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(!e.target.isConnected){revealObserver.unobserve(e.target);return}
  if(e.isIntersecting)reveal(e.target);
  else{activeMotion.get(e.target)?.forEach(a=>a.cancel());e.target.style.opacity='0';delete e.target.dataset.motionShown}
 }),{threshold:[0,.1],rootMargin:'0px 0px -12px 0px'});
 observeMotion();
}
setupMotion();reduced.addEventListener('change',setupMotion);
document.addEventListener('gallery:updated',()=>observeMotion(gallery));
document.querySelectorAll('.questions details').forEach(el=>el.addEventListener('toggle',()=>{if(el.open)el.querySelector('p')?.animate([{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'none'}],{duration:350,easing:'ease-out'})}));
window.addEventListener('pageshow',e=>{if(!e.persisted)window.scrollTo({top:0,left:0,behavior:'instant'})});

// Keep decorative motion reduced while the requested studio films play in view.
const filmObserver=new IntersectionObserver(entries=>entries.forEach(({target:v,isIntersecting})=>{v.muted=true;v.defaultMuted=true;if(isIntersecting){v.setAttribute('autoplay','');v.play().catch(()=>{})}else{v.pause()}}),{threshold:.1});
document.querySelectorAll('video').forEach(v=>filmObserver.observe(v));

// Short, spaced bounce cues for the event and persistent actions.
function bounceCue(el,amplitude,delay=0){
 if(document.hidden||el.matches(':hover'))return;
 const r=el.getBoundingClientRect();if(r.bottom<=0||r.top>=innerHeight)return;
 el.animate([{transform:'translateY(0)',offset:0},{transform:`translateY(-${amplitude}px)`,offset:.26},{transform:'translateY(0)',offset:.47},{transform:`translateY(-${amplitude*.55}px)`,offset:.68},{transform:'translateY(0)',offset:1}],{duration:1050,delay,easing:'ease-out'});
}
function playAttentionCues(){
 document.querySelectorAll('.fixed-cta a').forEach((el,i)=>bounceCue(el,reduced.matches?9:13,i*180));
 document.querySelectorAll('.event,.price-panel h3,a.photo-consult').forEach(el=>bounceCue(el,reduced.matches?15:22,100));
}
setTimeout(playAttentionCues,1400);setInterval(playAttentionCues,4400);
