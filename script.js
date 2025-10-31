const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
  // move main cursor
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';

  // create trailing particles
  const trail = document.createElement('div');
  trail.className = 'trail';
  trail.style.left = e.pageX + 'px';
  trail.style.top = e.pageY + 'px';
  document.body.appendChild(trail);

  // remove after animation
  trail.addEventListener('animationend', () => trail.remove());
});
