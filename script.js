const cursor = document.querySelector('.cursor');
const orbs = document.querySelectorAll('.orb');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';

  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 0.3;
    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});
