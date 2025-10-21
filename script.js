// Smooth scroll and nav active sync
document.addEventListener('DOMContentLoaded', ()=>{
  const links = document.querySelectorAll('.nav-list a');

  // reveal animation for nav items (staggered)
  links.forEach((a,i)=> setTimeout(()=> a.classList.add('show'), i*80));

  // click -> smooth scroll
  links.forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target){
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // update active class immediately
        links.forEach(x=>x.classList.remove('active'));
        a.classList.add('active');
      }
    });
  });

  // update active link on scroll using IntersectionObserver
  const sections = document.querySelectorAll('main .section, main .hero');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.id;
        if(!id) return;
        links.forEach(a=> a.classList.toggle('active', a.getAttribute('href') === '#'+id));
      }
    });
  },{threshold:0.52});

  sections.forEach(s=> obs.observe(s));
  
  // Header sticky background toggle on scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if(window.scrollY > 24) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
});
