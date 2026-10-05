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
// GSAP only enhances existing readable content. Sticky scenes stay in native document flow.
if(window.gsap&&window.ScrollTrigger&&!reduce){
 gsap.registerPlugin(ScrollTrigger);
 document.documentElement.classList.add('scroll-motion');
 ScrollTrigger.config({ignoreMobileResize:true});
 $$('.reveal').forEach(el=>gsap.from(el,{y:36,opacity:0,duration:.9,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));
 $$('.partner-list>div').forEach((el,i)=>gsap.from(el,{y:20,opacity:0,duration:.7,delay:i*.09,scrollTrigger:{trigger:'.partner-list',start:'top 88%',once:true}}));
 const sky=gsap.timeline({scrollTrigger:{trigger:'.sky-transition',start:'top top',end:'bottom bottom',scrub:1.1}});
 sky.to('.road-layer',{scale:1.18,xPercent:-10,opacity:0,duration:.6},0).to('.sky-layer',{opacity:1,scale:1,duration:.7},.15).fromTo('.transition-copy p',{scale:.9},{scale:1.06,duration:1},0).to('.transition-copy .eyebrow',{y:-15,duration:1},0);
 gsap.fromTo('.closing>img',{scale:1.08},{scale:1,opacity:.18,ease:'none',scrollTrigger:{trigger:'.closing',start:'top bottom',end:'bottom top',scrub:1}});

 const flight=gsap.timeline({scrollTrigger:{trigger:'.flight-story',start:'top top',end:'bottom bottom',scrub:1,invalidateOnRefresh:true,onUpdate:s=>{
  const n=s.progress<.35?0:s.progress<.72?1:2;
  $('.flight-step').textContent=['01 / VORBEREITUNG','02 / ABFLUG','03 / NEUE HORIZONTE'][n];
  $('.flight-description').textContent=['Jeder Flug beginnt mit Sorgfalt.','Bereit für neue Perspektiven.','Ein Anspruch. Über alle Grenzen hinweg.'][n];
  gsap.set('.flight-progress i',{scaleX:Math.max(.03,s.progress)});
 }}});
 flight.fromTo('.flight-plane',{xPercent:-36,yPercent:30,rotation:-9,scale:.7},{xPercent:0,yPercent:-2,rotation:-3,scale:1,duration:.55,ease:'power1.out'},0)
 .to('.flight-plane',{xPercent:42,yPercent:-34,scale:1.18,rotation:-7,opacity:0,duration:.45,ease:'power1.in'},.55)
 .to('.flight-sky',{opacity:1,scale:1,duration:.45},.55)
 .to('.flight-heading',{yPercent:-15,opacity:.65,duration:1},0);
 addEventListener('load',()=>ScrollTrigger.refresh(),{once:true});
}else{$('.sky-layer').style.opacity='1';$('.road-layer').style.opacity='0';$('.flight-sky').style.opacity='1';$('.flight-plane').style.display='none';}
