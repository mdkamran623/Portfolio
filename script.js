/* ═══ LOADER ═══ */
(function(){
  const fill=document.getElementById('ldFill'),pct=document.getElementById('ldPct'),loader=document.getElementById('loader');
  let v=0;
  const t=setInterval(()=>{
    v+=Math.random()*4+1.5;if(v>100)v=100;
    fill.style.width=v+'%';pct.textContent=Math.floor(v)+'%';
    if(v>=100){clearInterval(t);setTimeout(()=>loader.classList.add('done'),300)}
  },35);
  window.addEventListener('load',()=>{v=100;fill.style.width='100%';pct.textContent='100%';setTimeout(()=>loader.classList.add('done'),300)},{once:true})
})();

/* ═══ STARS CANVAS ═══ */
(function(){
  const c=document.getElementById('stars'),ctx=c.getContext('2d');
  function resize(){c.width=window.innerWidth;c.height=window.innerHeight}
  resize();
  window.addEventListener('resize',resize);
  const stars=Array.from({length:120},()=>({
    x:Math.random()*c.width,y:Math.random()*c.height,
    r:Math.random()*.8+.2,a:Math.random(),
    s:Math.random()*.003+.001
  }));
  let rafId;
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    stars.forEach(s=>{
      s.a+=s.s;if(s.a>1||s.a<0)s.s*=-1;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(0,255,136,${s.a*.4})`;ctx.fill();
    });
    rafId=requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('visibilitychange',()=>{
    if(document.hidden)cancelAnimationFrame(rafId);
    else draw();
  });
})();

/* ═══ CURSOR ═══ */
(function(){
  const c=document.getElementById('cur'),f=document.getElementById('cur2');
  if(!c)return;
  let mx=0,my=0,fx=0,fy=0,rafId;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;c.style.left=mx+'px';c.style.top=my+'px'});
  function tick(){fx+=(mx-fx)*.12;fy+=(my-fy)*.12;f.style.left=fx+'px';f.style.top=fy+'px';rafId=requestAnimationFrame(tick)}
  tick();
  window.addEventListener('visibilitychange',()=>{
    if(document.hidden)cancelAnimationFrame(rafId);
    else tick();
  });
})();

/* ═══ NAV SCROLL + ACTIVE ═══ */
(function(){
  const nav=document.getElementById('nav'),sp=document.getElementById('sp'),links=document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll',()=>{
    nav.classList.toggle('scrolled',scrollY>60);
    const h=document.documentElement.scrollHeight-innerHeight;
    sp.style.width=(scrollY/h*100)+'%';
    let cur='';
    document.querySelectorAll('section[id]').forEach(s=>{
      if(scrollY>=s.offsetTop-200)cur=s.id;
    });
    links.forEach(a=>{a.classList.toggle('active',a.getAttribute('href')==='#'+cur)});
  },{passive:true});
})();

/* ═══ HAMBURGER ═══ */
document.getElementById('menuToggle').addEventListener('click',function(){
  this.classList.toggle('open');
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{
  document.getElementById('menuToggle').classList.remove('open');
  document.getElementById('navLinks').classList.remove('open');
}));

/* ═══ PARTICLES ═══ */
(function(){
  const wrap=document.getElementById('particles');
  for(let i=0;i<40;i++){
    const p=document.createElement('div');p.className='ptcl';
    const size=Math.random()*3+1;
    const colors=['var(--g)','var(--b)','var(--p)'];
    p.style.cssText=`left:${Math.random()*100}%;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*3)]};animation-duration:${Math.random()*12+8}s;animation-delay:${Math.random()*8}s`;
    wrap.appendChild(p);
  }
})();

/* ═══ TYPING EFFECT - SMOOTH ═══ */
(function(){
  const words=['scalable web apps','stunning UI/UX','full-stack solutions','clean, fast code','digital experiences'];
  const el=document.getElementById('typedWord');
  let wi=0,ci=0,del=false,typing=false;
  function type(){
    if(typing)return;
    typing=true;
    const w=words[wi];
    const interval=del?50:75;
    const nextChar=()=>{
      const t=del?w.slice(0,ci-1):w.slice(0,ci+1);
      el.textContent=t;
      del?ci--:ci++;
      if(!del&&ci===w.length){del=true;typing=false;setTimeout(type,1800);return}
      if(del&&ci===0){del=false;wi=(wi+1)%words.length;typing=false;setTimeout(type,400);return}
      setTimeout(nextChar,interval);
    };
    nextChar();
  }
  setTimeout(type,2800);
})();

/* ═══ SCROLL REVEAL ═══ */
(function(){
  const callback=(entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting)entry.target.classList.add('active');
    });
  };
  const obs=new IntersectionObserver(callback,{threshold:.15});
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.stagger-item').forEach(el=>obs.observe(el));
})();

/* ═══ SKILL BARS ═══ */
(function(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.querySelectorAll('.sk-fill').forEach(b=>b.style.width=b.dataset.w+'%');
        obs.unobserve(e.target);
      }
    });
  },{threshold:.3});
  document.querySelectorAll('.skill-card').forEach(c=>obs.observe(c));
})();

/* ═══ COUNTER ANIMATION - SMOOTH ═══ */
(function(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      e.target.querySelectorAll('.stat-num[data-target]').forEach(el=>{
        const target=+el.dataset.target;let v=0;const step=target/60;
        let rafId,startTime=null;
        const frame=(time)=>{
          if(!startTime)startTime=time;
          const progress=(time-startTime)/1800;
          if(progress>=1){el.textContent=target+(target===100?'%':'+');return}
          v=step*60*progress;el.textContent=Math.floor(v)+(target===100?'%':'+');
          rafId=requestAnimationFrame(frame);
        };
        rafId=requestAnimationFrame(frame);
      });
      obs.unobserve(e.target);
    });
  },{threshold:.5});
  document.querySelectorAll('.dp-stats').forEach(s=>obs.observe(s));
})();

/* ═══ PROJECT FILTER ═══ */
document.querySelectorAll('.flt-btn').forEach(btn=>{
  btn.addEventListener('click',function(){
    document.querySelectorAll('.flt-btn').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    const f=this.dataset.f;
    document.querySelectorAll('.project-card').forEach(c=>{
      const match=f==='all'||c.dataset.cat===f;
      c.style.opacity=match?'1':'.2';
      c.style.transform=match?'':'scale(.95)';
      c.style.pointerEvents=match?'':'none';
    });
  });
});

/* ═══ CARD TILT ═══ */
document.querySelectorAll('.project-card').forEach(card=>{
  let tiltRaf;
  card.addEventListener('mousemove',function(e){
    if(window.innerWidth<768)return;
    cancelAnimationFrame(tiltRaf);
    const r=this.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;
    this.style.transform=`translateY(-12px) perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg)`;
  });
  card.addEventListener('mouseleave',function(){
    cancelAnimationFrame(tiltRaf);
    this.style.transform='';
  });
});

/* ═══ SMOOTH SCROLL ═══ */
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',function(e){
  const target=document.querySelector(this.getAttribute('href'));
  if(!target)return;
  e.preventDefault();
  target.scrollIntoView({behavior:'smooth',block:'start'});
}));

/* ═══ CONTACT FORM ═══ */
(function(){
  const form=document.getElementById('contactForm'),btn=document.getElementById('submitBtn');
  let isSubmitting=false;
  form.addEventListener('submit',function(e){
    if(isSubmitting)return;
    isSubmitting=true;
    btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled=true;
    setTimeout(()=>{
      btn.innerHTML='<i class="fas fa-check"></i> Sent!';
      btn.style.background='linear-gradient(135deg,#00c851,#007e33)';
      setTimeout(()=>{
        btn.innerHTML='<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background='';
        btn.disabled=false;
        isSubmitting=false;
        form.reset();
      },3000);
    },1800);
  });
})();