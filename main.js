/* Util */
const formatDays = (msLeft) => {
  const days = Math.max(0, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));
  return `${days} day${days !== 1 ? 's' : ''} left`;
};

/* Trial banner (pricing) — simulated via localStorage for demo */
(function initTrialBanner() {
  const banner = document.getElementById('trialBanner');
  const countdown = document.getElementById('trialCountdown');
  const startBtn = document.getElementById('startTrialBtn');
  if (!countdown || !banner) return;

  const now = Date.now();
  let trialEnds = localStorage.getItem('trialEndsAt');
  if (trialEnds) trialEnds = Number(trialEnds);

  const setBanner = () => {
    const msLeft = trialEnds - Date.now();
    if (msLeft > 0) {
      countdown.textContent = formatDays(msLeft);
      banner.hidden = false;
    } else {
      banner.hidden = true;
    }
  };

  // Start trial button simulates a 7‑day trial
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
      const endsAt = Date.now() + sevenDaysMs;
      localStorage.setItem('trialEndsAt', String(endsAt));
      trialEnds = endsAt;
      setBanner();
      // Soft nudge
      alert('🎉 Your 7‑day free trial has started!');
    });
  }

  // Initial render + hourly updates
  if (trialEnds && trialEnds > now) {
    setBanner();
    setInterval(setBanner, 60 * 60 * 1000);
  }
})();

/* Community feed — local demo storage */
(function initFeed() {
  const form = document.getElementById('postForm');
  const content = document.getElementById('postContent');
  const charCount = document.getElementById('charCount');
  const posts = document.getElementById('posts');
  if (!form || !content || !posts) return;

  // Load from localStorage
  const loadPosts = () => {
    const raw = localStorage.getItem('pp_posts');
    return raw ? JSON.parse(raw) : [];
  };
  const savePosts = (list) => localStorage.setItem('pp_posts', JSON.stringify(list));

  const render = () => {
    const list = loadPosts();
    posts.innerHTML = '';
    list.slice().reverse().forEach((p, idx) => {
      const el = document.createElement('article');
      el.className = `post-card ${p.hidden ? 'hidden' : ''}`;
      el.innerHTML = `
        <div class="post-meta">
          <span>${new Date(p.ts).toLocaleString()}</span>
          <span>by ${p.author || 'Anonymous'}</span>
        </div>
        <p>${p.text}</p>
        <div class="post-actions">
          <button class="pill" data-action="like">🐾 ${p.likes || 0}</button>
          <button class="pill" data-action="cheer">💚 ${p.cheers || 0}</button>
          <button class="pill flag" data-action="flag">Flag</button>
          <button class="pill" data-action="hide">${p.hidden ? 'Unhide' : 'Hide'}</button>
          <button class="pill" data-action="delete">Delete</button>
        </div>
      `;
      // Attach handlers
      el.querySelectorAll('.pill').forEach((btn) => {
        btn.addEventListener('click', () => {
          const action = btn.getAttribute('data-action');
          const listNow = loadPosts();
          // Map back to correct post by timestamp match
          const targetIndex = listNow.findIndex((i) => i.ts === p.ts);
          const item = listNow[targetIndex];
          if (!item) return;

          if (action === 'like') item.likes = (item.likes || 0) + 1;
          if (action === 'cheer') item.cheers = (item.cheers || 0) + 1;
          if (action === 'flag') alert('Reported — moderators will review.');
          if (action === 'hide') item.hidden = !item.hidden;
          if (action === 'delete') listNow.splice(targetIndex, 1);

          savePosts(listNow);
          render();
        });
      });

      posts.appendChild(el);
    });
  };

  // Character counter
  content.addEventListener('input', () => {
    charCount.textContent = `${content.value.length} / ${content.maxLength}`;
  });

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = content.value.trim();
    if (!text) return;
    const list = loadPosts();
    list.push({ ts: Date.now(), text, likes: 0, cheers: 0, hidden: false, author: 'You' });
    savePosts(list);
    content.value = '';
    charCount.textContent = `0 / ${content.maxLength}`;
    render();
  });

  render();
})();

/* Contact form — demo submit */
(function initContact() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Thanks! We’ll be in touch soon.';
    status.classList.remove('muted');
    setTimeout(() => { status.textContent = ''; }, 4000);
    form.reset();
  });
})();
