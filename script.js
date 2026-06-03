// Build nav dots
const total = 17;
const nav = document.getElementById('navDots');
for (let i = 1; i <= total; i++) {
  const btn = document.createElement('button');
  btn.className = 'nav-dot';
  btn.textContent = i;
  btn.onclick = () => goToSlide(i);
  nav.appendChild(btn);
}

// Scroll progress + active dot
const bar = document.getElementById('progress');
const dots = document.querySelectorAll('.nav-dot');
const slides = document.querySelectorAll('.slide');

let currentSlide = 1;

function goToSlide(n) {
  if (n < 1 || n > total) return;
  currentSlide = n;
  document.getElementById('slide-' + n).scrollIntoView({ behavior: 'smooth' });
}

function getCurrentSlide() {
  let closest = 1;
  slides.forEach((slide, i) => {
    const rect = slide.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      closest = i + 1;
    }
  });
  return closest;
}

// Arrow key navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    goToSlide(getCurrentSlide() + 1);
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    goToSlide(getCurrentSlide() - 1);
  }
});

// On-screen prev/next buttons
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', () => goToSlide(getCurrentSlide() - 1));
nextBtn.addEventListener('click', () => goToSlide(getCurrentSlide() + 1));

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total_h = document.body.scrollHeight - window.innerHeight;
  bar.style.width = (scrolled / total_h * 100) + '%';

  // active dot
  slides.forEach((slide, i) => {
    const rect = slide.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      dots.forEach(d => d.classList.remove('active'));
      if (dots[i]) dots[i].classList.add('active');
      currentSlide = i + 1;
    }
  });

  // hide/show prev-next buttons
  prevBtn.style.opacity = currentSlide <= 1 ? '0.3' : '1';
  nextBtn.style.opacity = currentSlide >= total ? '0.3' : '1';
});
