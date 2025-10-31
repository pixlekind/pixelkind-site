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

function setMouse(e) {
  const x = e.clientX ?? (e.touches && e.touches[0].clientX);
  const y = e.clientY ?? (e.touches && e.touches[0].clientY);
  if (x == null || y == null) return;
  mouseX = x
