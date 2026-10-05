'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
// Mobile navigation and native dialog preserve keyboard focus and Escape behavior.
const menu=$('.menu-button'), mobileNav=$('#mobile-nav');
function closeMenu(){mobileNav.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Menü öffnen');document.body.classList.remove('no-scroll');}
menu.addEventListener('click',()=>{const open=mobileNav.hidden;mobileNav.hidden=!open;menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');document.body.classList.toggle('no-scroll',open)});
$$('#mobile-nav a').forEach(a=>a.addEventListener('click',closeMenu));
addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();}});
const dialog=$('#booking'),form=$('#booking-form');let dialogTrigger;
$$('[data-book]').forEach(b=>b.addEventListener('click',()=>{dialogTrigger=b;closeMenu();if(b.dataset.book)form.elements.service.value=b.dataset.book;if(b.dataset.location)form.elements.location.value=b.dataset.location;if(b.dataset.book==='Flugzeugpflege')form.elements.location.value='Flugzeugpflege / vor Ort';if(b.dataset.book==='WaschEngel Express')form.elements.location.value='WaschEngel Express · Nürnberg';dialog.showModal();document.body.classList.add('no-scroll')}));
$('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>{document.body.classList.remove('no-scroll');dialogTrigger?.focus()});
form.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(form),subject=`Terminanfrage — ${f.get('service')}`,body=`Guten Tag WaschEngel Team,\n\nich interessiere mich für ${f.get('service')}.\nWunschstandort: ${f.get('location')}\n\n${f.get('message')}\n\nMit freundlichen Grüßen\n${f.get('name')}`;window.location.href=`mailto:info@waschengel.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;$('#form-note').textContent='Ihre E-Mail ist vorbereitet. Bitte senden Sie diese in Ihrem E-Mail-Programm. Falls sich kein Programm öffnet, rufen Sie uns unter 09131 1239258 an. Es wurde noch kein Termin gebucht.'});
$('#year').textContent=new Date().getFullYear();
let ticking=false;
function updateChrome(){const y=scrollY,travel=document.documentElement.scrollHeight-innerHeight;$('.header').classList.toggle('scrolled',y>100);$('.header').classList.toggle('light-header',y<$('.partners').offsetTop-90);$('.progress').style.width=`${travel?y/travel*100:0}%`;ticking=false;}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateChrome);ticking=true}},{passive:true});updateChrome();

