let index = 0;

const slideContainer = document.querySelector('section.slider');

const slides = document.querySelectorAll('section.slide-section, .bp, .mmr, .hpv, .q-pharm, .del, .wella');

setInterval(() => {
  index = (index + 1) % slides.length;
  slideContainer.style.transform = `translateX(-${index * 100}%)`;
}, 6500);


const cards = document.querySelector('.cards');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let startX = 0;
let endX = 0;

cards.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

cards.addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50;

  if (endX < startX - threshold && currentIndex < cards.children.length - 1) {
    currentIndex++;
  }

  if (endX > startX + threshold && currentIndex > 0) {
    currentIndex--;
  }

  cards.style.transform = `translateX(-${currentIndex * 100}vw)`;
  updateIndicators();
}

function updateIndicators() {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const numbers = document.querySelectorAll(".number");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1500; // 1.5 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let frame = 0;

        const counter = setInterval(() => {
          frame++;
          current += increment;

          if (frame >= steps) {
            el.textContent = target;
            clearInterval(counter);
          } else {
            el.textContent = Math.floor(current);
          }
        }, duration / steps);

        observer.unobserve(el); // run once
      }
    });
  }, { threshold: 0.5 });

  numbers.forEach(num => observer.observe(num));
});
