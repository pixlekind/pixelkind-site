const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
  // move main cursor
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';

  // create sparks
  for (let i = 0; i < 3; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.left = e.pageX + 'px';
    spark.style.top = e.pageY + 'px';

    // random scatter direction
    const dx = (Math.random() - 0.5) * 60 + 'px';
    const dy = (Math.random() - 0.5) * 60 + 'px';
    spark.style.setProperty('--dx', dx);
    spark.style.setProperty('--dy', dy);

    document.body.appendChild(spark);

    // remove after animation
    spark.addEventListener('animationend', () => spark.remove());
  }
});
