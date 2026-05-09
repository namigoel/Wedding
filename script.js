/* ============================================================
   LOADER — fade out after page is ready
   ============================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1400);
});

/* ============================================================
   NAV — burger + scroll state
   ============================================================ */
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
const navEl = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  menu.classList.toggle('open');
});
document.querySelectorAll('#menu a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    menu.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) navEl.classList.add('scrolled');
  else navEl.classList.remove('scrolled');
}, { passive: true });

/* ============================================================
   COUNTDOWN — ticks to wedding ceremony
   25 November 2026, 9:00 PM IST
   ============================================================ */
const target = new Date('2026-11-25T21:00:00+05:30').getTime();
const elD = document.getElementById('d');
const elH = document.getElementById('h');
const elM = document.getElementById('m');
const elS = document.getElementById('s');
const pad = n => (n < 10 ? '0' + n : '' + n);

function tick() {
  let diff = target - Date.now();
  if (diff < 0) diff = 0;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;
  if (elD) elD.textContent = pad(d);
  if (elH) elH.textContent = pad(h);
  if (elM) elM.textContent = pad(m);
  if (elS) elS.textContent = pad(s);
}
tick();
setInterval(tick, 1000);

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ============================================================
   SPARKLE PARTICLES — site-wide ambient
   ============================================================ */
const sparkleContainer = document.getElementById('sparkles');
function createSparkle() {
  if (!sparkleContainer) return;
  const s = document.createElement('div');
  s.className = 'sparkle';
  const size = 2 + Math.random() * 4;
  s.style.width = size + 'px';
  s.style.height = size + 'px';
  s.style.left = Math.random() * 100 + '%';
  s.style.animationDuration = (12 + Math.random() * 18) + 's';
  s.style.animationDelay = '0s';
  sparkleContainer.appendChild(s);
  setTimeout(() => s.remove(), 30000);
}
// Generate ambient sparkles
for (let i = 0; i < 20; i++) {
  setTimeout(createSparkle, i * 800);
}
setInterval(createSparkle, 1500);

/* ============================================================
   PETAL PARTICLES — hero
   ============================================================ */
const petalContainer = document.getElementById('petals');
function createPetal() {
  if (!petalContainer) return;
  const p = document.createElement('div');
  p.className = 'petal';
  const size = 8 + Math.random() * 14;
  p.style.width = size + 'px';
  p.style.height = size + 'px';
  p.style.left = Math.random() * 100 + '%';
  p.style.animationDuration = (10 + Math.random() * 12) + 's';
  // Random color variation between pink/champagne
  const colors = [
    'radial-gradient(ellipse at 30% 30%, rgba(201,56,123,.5), rgba(201,56,123,0) 70%)',
    'radial-gradient(ellipse at 30% 30%, rgba(212,175,122,.6), rgba(212,175,122,0) 70%)',
    'radial-gradient(ellipse at 30% 30%, rgba(244,204,224,.6), rgba(244,204,224,0) 70%)',
    'radial-gradient(ellipse at 30% 30%, rgba(156,45,43,.4), rgba(156,45,43,0) 70%)'
  ];
  p.style.background = colors[Math.floor(Math.random() * colors.length)];
  petalContainer.appendChild(p);
  setTimeout(() => p.remove(), 22000);
}
// Initial bloom
for (let i = 0; i < 10; i++) {
  setTimeout(createPetal, i * 600);
}
setInterval(createPetal, 1200);

/* ============================================================
   PARALLAX — subtle depth on event art
   ============================================================ */
const artStacks = document.querySelectorAll('.art-stack');
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const sy = window.scrollY;
      artStacks.forEach(stack => {
        const rect = stack.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const offsetFactor = (rect.top - window.innerHeight / 2) * 0.04;
          const img = stack.querySelector('.art-frame img');
          if (img) {
            img.style.transform = `translateY(${offsetFactor}px) scale(1.05)`;
          }
        }
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ============================================================
   SOUND TOGGLE — uses Web Audio for a soft ambient tone
   (No external file required — generates a gentle sine tone)
   ============================================================ */
const soundBtn = document.getElementById('soundBtn');
const soundOn = document.getElementById('soundOn');
const soundOff = document.getElementById('soundOff');

let audioCtx = null;
let oscillator = null;
let gainNode = null;
let isPlaying = false;

function startAmbient() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();

  // Create gentle ambient drone with multiple oscillators for richness
  gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 1.5);
  gainNode.connect(audioCtx.destination);

  // Soft pad chord — Indian raga-flavoured (C, E♭, G, A, B♭ — Yaman-ish)
  const freqs = [261.63, 311.13, 392.00, 440.00];
  oscillator = freqs.map(freq => {
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    oscGain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    osc.connect(oscGain);
    oscGain.connect(gainNode);
    osc.start();
    return osc;
  });
}
function stopAmbient() {
  if (!audioCtx || !gainNode || !oscillator) return;
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
  setTimeout(() => {
    oscillator.forEach(osc => { try { osc.stop(); } catch(e){} });
    oscillator = null;
  }, 1100);
}

soundBtn.addEventListener('click', () => {
  if (!isPlaying) {
    startAmbient();
    soundOn.style.display = 'block';
    soundOff.style.display = 'none';
    isPlaying = true;
  } else {
    stopAmbient();
    soundOn.style.display = 'none';
    soundOff.style.display = 'block';
    isPlaying = false;
  }
});

/* ============================================================
   RSVP — saves locally + WhatsApp deep link
   ============================================================ */
// Update this number to the family's WhatsApp (with country code, no '+')
const WHATSAPP_NUMBER = '910000000000';

function buildWhatsAppLink() {
  const name = document.getElementById('name').value.trim();
  const guests = document.getElementById('guests').value;
  const attend = document.getElementById('attend').value;
  const msg = document.getElementById('msg').value;

  const attendText = attend === 'yes' ? 'Yes, attending' :
                     attend === 'some' ? 'Attending some events' : 'Cannot attend';
  const text =
    `Hi! RSVP for Namisha & Yashutosh's Wedding:\n\n` +
    `*Name:* ${name || '(please add name)'}\n` +
    `*Guests:* ${guests}\n` +
    `*Attending:* ${attendText}\n` +
    (msg ? `\n*Message:* ${msg}\n` : '') +
    `\nLooking forward to celebrating! 💛`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Update WhatsApp button href as user types
const whatsappBtn = document.getElementById('whatsappBtn');
['name', 'guests', 'attend', 'msg'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => {
    whatsappBtn.href = buildWhatsAppLink();
  });
});
whatsappBtn.href = buildWhatsAppLink();

function handleRsvp() {
  const name = document.getElementById('name').value.trim();
  const status = document.getElementById('rsvpStatus');
  if (!name) {
    status.textContent = 'Please enter your name.';
    status.style.color = '#9c2d2b';
    return;
  }
  const guests = document.getElementById('guests').value;
  const attend = document.getElementById('attend').value;
  const msg = document.getElementById('msg').value;

  // Persist locally (replace with backend / Google Form / Formspree as needed)
  const rsvps = JSON.parse(localStorage.getItem('namisha-yashutosh-rsvps') || '[]');
  rsvps.push({ name, guests, attend, msg, when: new Date().toISOString() });
  localStorage.setItem('namisha-yashutosh-rsvps', JSON.stringify(rsvps));

  status.style.color = '#8a6f3f';
  status.innerHTML = `Thank you, <em>${name}</em>! Your RSVP has been recorded. We can't wait to see you. 💛`;

  // Optional: clear form after delay
  setTimeout(() => {
    document.getElementById('name').value = '';
    document.getElementById('msg').value = '';
  }, 1500);
}
window.handleRsvp = handleRsvp;
