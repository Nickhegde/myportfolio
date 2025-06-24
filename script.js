const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';

function draw() {
    // Solid black background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0, 255, 0, 0.3)'; // Slightly more visible green
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.2) { // Slightly denser than before
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(draw, 90); // Slightly faster refresh

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.fill(1);
});

//scroll animation

const scrollElements = document.querySelectorAll('.fade-in-on-scroll');

function elementInView(el, offset = 100) {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= 
    (window.innerHeight || document.documentElement.clientHeight) - offset
  );
}

function handleScrollAnimation() {
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

//Text animation
const typedText = document.getElementById('intro-subtitle');
const typedPhrases = [
  "Full Stack Developer",
  "Front-End Developer",
  "Solutions Engineer",
  "Data Engineer",
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let erasingDelay = 60;
let newPhraseDelay = 1500;

function type() {
  const currentPhrase = typedPhrases[currentPhraseIndex];
  if (!isDeleting && currentCharIndex < currentPhrase.length) {
    typedText.textContent += currentPhrase.charAt(currentCharIndex);
    currentCharIndex++;
    setTimeout(type, typingDelay);
  } else if (isDeleting && currentCharIndex > 0) {
    typedText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
    currentCharIndex--;
    setTimeout(type, erasingDelay);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(type, newPhraseDelay);
    } else {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % typedPhrases.length;
      setTimeout(type, typingDelay);
    }
  }
}

window.addEventListener('load', () => {
    // Initiate typed text effect
    setTimeout(type, 500);
  });