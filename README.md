# Namisha & Yashutosh — Wedding Website

A luxury, mobile-first cinematic wedding website with three uniquely-themed event sections, painterly photo treatments, animated sparkles, glassmorphism RSVP, and WhatsApp integration.

## File structure

```
wedding-site/
├── index.html      # Main page (open this in a browser)
├── style.css       # All styles, animations, photo art treatments
├── script.js       # Countdown, sparkles, parallax, RSVP, sound
├── photos/         # Your photos (currently 4 uploaded)
│   ├── p1.jpeg     # Pink kurtas (used: hero + sangeet)
│   ├── p2.jpeg     # Red saree + maroon (used: wedding)
│   ├── p3.jpeg     # Beach sunset (used: hero + story)
│   └── p4.jpeg     # Yellow top (used: haldi)
└── README.md       # This file
```

## How photos are artistically transformed

Rather than placing static photos, each event section transforms your real photos with CSS filters and overlays into editorial-style artwork:

- **Sangeet (pink)** — pink color wash, sparkle overlay, saturation boost, painterly contrast
- **Haldi (yellow)** — sepia + hue-rotate for warm yellow tones, sunbeam radial glow, marigold particles
- **Wedding (maroon)** — desaturated+darkened cinematic treatment, mandap-glow at base, rose petal fall, firefly stars

All applied live in CSS — no Photoshop needed.

## To deploy on GitHub Pages

1. Create a new GitHub repo
2. Upload the entire `wedding-site` folder contents to the repo (so `index.html` is at the root)
3. Settings → Pages → Source: deploy from `main` branch / root
4. Your site is live at `https://yourname.github.io/yourrepo/`

## Things to customize

### 1. Phone numbers (Contact section)
In `index.html`, search for `+910000000000` — replace with real numbers in two places.

### 2. WhatsApp RSVP number
In `script.js`, line ~150, change:
```js
const WHATSAPP_NUMBER = '910000000000';
```
To your family's WhatsApp (country code + number, no `+` or spaces).

### 3. The Story text
In `index.html`, find the `<section class="story">` block and edit the paragraphs to your real meeting story.

### 4. Family names
Search `Goyal Family` and `Bansal Family` and update parent names if needed.

### 5. To replace photos later
Just drop new images into `/photos` keeping the same filenames (p1, p2, p3, p4) and they'll automatically appear styled correctly.

### 6. To add more gallery photos
In the Memories section, copy a `<div class="photo-tile tile-X">...` block and add it.

## RSVP submissions

Currently submissions save to browser localStorage (visible only to the user who submitted). For real submissions, two easy options:

- **WhatsApp button** (already wired) — opens WhatsApp with a pre-formatted RSVP message
- **Google Form / Formspree** — replace the `handleRsvp` function in `script.js` with a `fetch` to your form endpoint

## Features

✅ Loading screen with shimmering monogram
✅ Floating sparkle particles site-wide
✅ Falling petals in hero
✅ Live countdown to wedding ceremony
✅ Three event sections each with distinct universe
✅ Painterly photo treatments (pink/yellow/maroon)
✅ Editorial number labels & decorative SVG flourishes
✅ Smooth scroll-triggered reveals
✅ Subtle parallax on event photos
✅ Sound toggle (generates gentle ambient drone)
✅ Glassmorphism RSVP card
✅ WhatsApp deep-link RSVP
✅ Fully responsive, mobile-first
✅ Reduced-motion friendly
✅ No build step / no dependencies — pure HTML/CSS/JS

Made with love.
