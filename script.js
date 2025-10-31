const canvas = document.getElementById('cursor-trail');
const ctx = canvas.getContext('2d');
const cursor = document.querySelector('.cursor');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

let mouseX = width / 2;
let mouseY = height / 2;
let x = mouseX, y = mouseY;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

let particles = [];

function createParticle(x, y) {
  particles.push({
    x, y,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5,
    life: 1,
    size: 6
  });
}

function loop() {
  // smooth follow
  x += (mouseX - x) * 0.2;
  y += (mouseY - y) * 0.2;
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';

  // spawn particles
  createParticle(x, y);

  // fade canvas
  ctx.fillStyle = 'rgba(10,10,10,0.2)';
  ctx.fillRect(0, 0, width, height);

  // draw particles
  ctx.globalCompositeOperation = 'lighter';
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.02;
    p.size *= 0.96;

    ctx.beginPath();
    ctx.fillStyle = `rgba(0,255,247,${p.life})`;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  particles = particles.filter(p => p.life > 0);

  requestAnimationFrame(loop);
}
loop();
