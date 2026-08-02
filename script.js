/* ===========================================================
   MD KAMRAN — PORTFOLIO · INTERACTIONS
   =========================================================== */

/* ---------- loader ---------- */
(function(){
  const loader = document.getElementById('loader');
  const fill = document.getElementById('ldFill');
  const pct = document.getElementById('ldPct');
  let p = 0;
  const t = setInterval(()=>{
    p += Math.random()*18;
    if(p >= 100){
      p = 100;
      clearInterval(t);
      setTimeout(()=>loader.classList.add('done'),300);
    }
    fill.style.width = p + '%';
    pct.textContent = Math.floor(p) + '%';
  },140);
})();

/* ---------- custom cursor ---------- */
(function(){
  const cur = document.getElementById('cur');
  const cur2 = document.getElementById('cur2');
  if(!cur || window.matchMedia('(hover:none)').matches) return;
  let x=0,y=0,x2=0,y2=0;
  window.addEventListener('mousemove', e=>{
    x = e.clientX; y = e.clientY;
    cur.style.left = x+'px'; cur.style.top = y+'px';
  });
  (function loop(){
    x2 += (x-x2)*0.15; y2 += (y-y2)*0.15;
    cur2.style.left = x2+'px'; cur2.style.top = y2+'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.skill-card,.project-card,.stat-card').forEach(el=>{
    el.addEventListener('mouseenter', ()=>{cur2.style.width='54px';cur2.style.height='54px';cur2.style.borderColor='rgba(255,30,60,.9)'});
    el.addEventListener('mouseleave', ()=>{cur2.style.width='34px';cur2.style.height='34px';cur2.style.borderColor='rgba(255,30,60,.5)'});
  });
})();

/* ---------- scroll progress + nav bg ---------- */
(function(){
  const bar = document.getElementById('sp');
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', ()=>{
    const h = document.documentElement;
    const scrolled = (h.scrollTop)/(h.scrollHeight - h.clientHeight)*100;
    bar.style.width = scrolled + '%';
    nav.classList.toggle('scrolled', h.scrollTop > 40);
  });
})();

/* ---------- mobile nav toggle ---------- */
(function(){
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', ()=>{
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
    toggle.classList.remove('open');
    links.classList.remove('open');
  }));
})();

/* ---------- active nav link on scroll ---------- */
(function(){
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', ()=>{
    let cur = '';
    sections.forEach(sec=>{
      const top = sec.offsetTop - 140;
      if(scrollY >= top) cur = sec.id;
    });
    links.forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href') === '#'+cur);
    });
  });
})();

/* ---------- typed word rotation ---------- */
(function(){
  const words = ['scalable web apps','immersive UIs','clean back-ends','digital experiences'];
  const el = document.getElementById('typedWord');
  if(!el) return;
  let wi=0, ci=0, deleting=false;
  function tick(){
    const w = words[wi];
    ci += deleting ? -1 : 1;
    el.textContent = w.slice(0, ci);
    let delay = deleting ? 40 : 80;
    if(!deleting && ci === w.length){ delay = 1400; deleting = true; }
    else if(deleting && ci === 0){ deleting = false; wi = (wi+1)%words.length; delay = 300; }
    setTimeout(tick, delay);
  }
  tick();
})();

/* ---------- reveal on scroll (sections + stagger items) ---------- */
(function(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.15});

  document.querySelectorAll('.reveal, .reveal-r').forEach(el=>io.observe(el));

  const staggerIO = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        staggerIO.unobserve(entry.target);
      }
    });
  },{threshold:0.15});
  document.querySelectorAll('.stagger-item').forEach(el=>staggerIO.observe(el));
})();

/* ---------- stat counters ---------- */
(function(){
  const nums = document.querySelectorAll('.stat-num');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.dataset.target,10);
        let cur = 0;
        const step = Math.max(1, Math.ceil(target/60));
        const t = setInterval(()=>{
          cur += step;
          if(cur >= target){ cur = target; clearInterval(t); }
          el.textContent = cur;
        },25);
        io.unobserve(el);
      }
    });
  },{threshold:0.5});
  nums.forEach(n=>io.observe(n));
})();

/* ---------- skill bar fill ---------- */
(function(){
  const bars = document.querySelectorAll('.sk-fill');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.width = entry.target.dataset.w + '%';
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.4});
  bars.forEach(b=>io.observe(b));
})();

/* ---------- project filter ---------- */
(function(){
  const btns = document.querySelectorAll('.flt-btn');
  const cards = document.querySelectorAll('.project-card');
  function apply(f){
    cards.forEach(c=>{
      const match = f === 'all' || c.dataset.cat === f;
      c.classList.toggle('show-card', match);
    });
  }
  apply('all');
  btns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      apply(btn.dataset.f);
    });
  });
})();

/* ---------- floating particles in hero ---------- */
(function(){
  const wrap = document.getElementById('particles');
  if(!wrap) return;
  const count = window.innerWidth < 768 ? 18 : 36;
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    const size = Math.random()*3+1;
    p.style.cssText = `
      position:absolute;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:rgba(255,30,60,${Math.random()*0.5+0.2});
      animation:pFloat ${Math.random()*10+10}s linear infinite;
      animation-delay:${Math.random()*-20}s;
    `;
    wrap.appendChild(p);
  }
  const style = document.createElement('style');
  style.textContent = `@keyframes pFloat{
    0%{transform:translateY(0) translateX(0);opacity:0}
    10%{opacity:1}
    90%{opacity:1}
    100%{transform:translateY(-120px) translateX(20px);opacity:0}
  }`;
  document.head.appendChild(style);
})();

/* ---------- starfield canvas ---------- */
(function(){
  const canvas = document.getElementById('stars');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w,h,stars=[];
  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = Array.from({length: Math.floor((w*h)/9000)}, ()=>({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.2+0.2,
      a: Math.random(),
      s: Math.random()*0.015+0.003
    }));
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    stars.forEach(s=>{
      s.a += s.s;
      const op = (Math.sin(s.a)+1)/2*0.8+0.1;
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${op*0.5})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  resize();
  draw();
  window.addEventListener('resize', resize);
})();

/* ---------- contact form (formspree ajax) ---------- */
(function(){
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('submitBtn');
  if(!form) return;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    try{
      const res = await fetch(form.action, {
        method:'POST',
        body:new FormData(form),
        headers:{'Accept':'application/json'}
      });
      if(res.ok){
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent';
        form.reset();
      } else {
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Try Again';
      }
    } catch(err){
      btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Try Again';
    }
    setTimeout(()=>{ btn.innerHTML = original; }, 2800);
  });
})();
