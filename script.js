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

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Particle factory
function createParticle(x, y) {
  particles.push({
