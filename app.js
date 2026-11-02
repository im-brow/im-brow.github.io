const cases=[
 ['women','work-w1','여자눈썹 · 전후 비교 01','위 Before / 아래 After'],
 ['women','work-w2','여자눈썹 · 전후 비교 02','원본의 위·아래 전후 사진'],
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
function render(filter='all'){gallery.replaceChildren();cases.filter(c=>filter==='all'||c[0]===filter).forEach(c=>{const b=document.createElement('button');b.className='case';b.setAttribute('aria-label',c[2]+' 크게 보기');b.innerHTML=`<span class="case-media"><img src="assets/${c[1]}.webp" alt="임브로우 실제 ${c[2]}" loading="lazy" width="600" height="800"></span><span class="case-caption"><span>${c[2]}</span><span>↗</span></span>`;b.addEventListener('click',()=>openImage(`assets/${c[1]}.webp`,c[2]+' · '+c[3]));gallery.append(b)})}render();
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});render(b.dataset.filter)}));
document.querySelector('.close-viewer').addEventListener('click',closeImage);viewer.addEventListener('cancel',e=>{e.preventDefault();closeImage()});viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeImage()}});
document.querySelectorAll('.review-open').forEach(b=>b.addEventListener('click',()=>openImage(b.dataset.src,'임브로우 제공 실제 고객 후기 원문')));
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let observer;
function motion(){observer?.disconnect();document.documentElement.classList.toggle('js-motion',!reduced.matches);if(!reduced.matches){observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('visible',e.isIntersecting)),{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e))}document.querySelectorAll('video').forEach(v=>{v.muted=true;if(reduced.matches){v.pause();v.removeAttribute('autoplay')}else{v.setAttribute('autoplay','');v.play().catch(()=>{})}})}motion();reduced.addEventListener('change',motion);
window.addEventListener('pageshow',e=>{if(!e.persisted)window.scrollTo({top:0,left:0,behavior:'instant'})});
