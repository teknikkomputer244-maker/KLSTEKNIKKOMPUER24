// Particle background + gallery upload logic
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
let particles = [];
const num = Math.floor((w*h)/90000) + 30;

function rand(min,max){return Math.random()*(max-min)+min}

class P{constructor(){this.reset()}reset(){this.x=rand(0,w);this.y=rand(0,h);this.vx=rand(-0.2,0.6);this.vy=rand(-0.1,0.4);this.r=rand(0.8,3.2);this.alpha=rand(0.05,0.35)}update(){this.x+=this.vx;this.y+=this.vy;if(this.x<-10||this.x>w+10||this.y<-10||this.y>h+10)this.reset()}draw(){ctx.beginPath();ctx.fillStyle=`rgba(200,40,40,${this.alpha})`;ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fill()}}
function init(){particles=[];for(let i=0;i<num;i++)particles.push(new P())}
function loop(){ctx.clearRect(0,0,w,h);const g=ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,Math.max(w,h)/1.2);g.addColorStop(0,'rgba(40,8,8,0.25)');g.addColorStop(1,'rgba(0,0,0,0.6)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);for(let p of particles){p.update();p.draw()}requestAnimationFrame(loop)}
init();loop();window.addEventListener('resize',()=>{w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight;init()})

// Gallery upload + preview + delete
const fileInput = document.getElementById('file');
const grid = document.getElementById('grid');
const delAll = document.getElementById('delAll');
let images = [];

function renderGrid(){grid.innerHTML='';if(images.length===0){for(let i=1;i<=6;i++){const ph=document.createElement('div');ph.className='placeholder';ph.textContent='Contoh Foto '+i;grid.appendChild(ph)}}else{images.forEach((src, idx)=>{const wrap=document.createElement('div');wrap.className='card';wrap.style.position='relative';const img=document.createElement('img');img.src=src;img.alt='galeri-'+idx;img.loading='lazy';img.style.height='160px';img.style.width='100%';img.style.objectFit='cover';img.style.borderRadius='10px';wrap.appendChild(img);const btn=document.createElement('button');btn.textContent='✕';btn.title='Hapus foto';btn.style.position='absolute';btn.style.top='8px';btn.style.right='8px';btn.style.background='rgba(150,20,20,0.9)';btn.style.border='none';btn.style.color='#fff';btn.style.padding='6px 8px';btn.style.borderRadius='8px';btn.style.cursor='pointer';btn.addEventListener('click',()=>{images.splice(idx,1);renderGrid()});wrap.appendChild(btn);grid.appendChild(wrap)})}}

fileInput.addEventListener('change', (e)=>{const files=Array.from(e.target.files);files.forEach(f=>{const u=URL.createObjectURL(f);images.push(u)});renderGrid();fileInput.value=''})
delAll.addEventListener('click', ()=>{if(confirm('Hapus semua foto?')){images=[];renderGrid()}})
renderGrid()