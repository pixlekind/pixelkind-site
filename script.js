// Canvas-based trail + smooth lead cursor
const canvas = document.getElementById('cursor-trail');
const ctx = canvas.getContext('2d');
const cursor = document.querySelector('.cursor');

let width = window.innerWidth;
let height = window.innerHeight;
let particles = [];
let mouseX = width / 2;
let mouseY = height / 2;
let leadX = mouseX;
let leadY = mouseY;

// Resize canvas
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

// Track mouse
function setMouse(e) {
  const x = e.clientX ?? (e.touches && e.touches[0].clientX);
  const y = e.clientY ?? (e.touches && e.touches[0].clientY);
  if (x == null || y == null) return;
  mouseX = x;
  mouseY = y;
}
window.addEventListener('mousemove', setMouse);
window.addEventListener('touchmove', setMouse, { passive: true });

// Particle factory (Kimiv2-style soft glow)
function createParticle(x, y) {
  particles.push({
    x, y,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    life: 1.0,
    size: 8 + Math.random() * 6
  });
}

// Render loop
function loop() {
  // Ease the lead cursor towards mouse (smooth trailing)
  const ease = 0.18;
  leadX += (mouseX - leadX) * ease;
  leadY += (mouseY - leadY) * ease;

  // Move the DOM cursor
  cursor.style.transform = `translate(${leadX}px, ${leadY}px)`;

  // Spawn particles near the lead
  for (let i = 0; i < 2; i++) createParticle(leadX, leadY);

  // Fade the canvas slightly to create trails
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(10,10,10,0.2)';
  ctx.fillRect(0, 0, width, height);

  // Draw particles with additive glow
  ctx.globalCompositeOperation = 'lighter';
  for (let p of particles) {
    // Update
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.02;
    p.size *= 0.98;

    // Color shift (cyan → aqua → white)
    const alpha = Math.max(p.life, 0);
    const g = 255;
    const b = 247;
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, ${g}, ${b}, ${alpha})`;
    ctx.shadowColor = `rgba(0, ${g}, ${b}, ${alpha})`;
    ctx.shadowBlur = 24;
    ctx.arc(p.x, p.y, Math.max(p.size, 0.5), 0, Math.PI * 2);
    ctx.fill();
  }

  // Cull dead particles
  particles = particles.filter(p => p.life > 0.05 && p.size > 0.5);

  requestAnimationFrame(loop);
}
loop();

// Hide trail on reduced motion
const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mq.matches) {
  particles = [];
  ctx.clearRect(0, 0, width, height);
}

// Safety: stop spawning when window not focused
window.addEventListener('blur', () => { particles = []; });
