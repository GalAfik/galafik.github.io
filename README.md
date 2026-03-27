# Gal Afik Portfolio Website

**Live Site**: [galafik.com](https://galafik.com)  
**Author**: Gal Afik  
**Tech Stack**: HTML5, CSS3, Vanilla JavaScript, Google Analytics

---

## 📁 Project Structure

```
galafik.github.io/
├── index.html              # Main portfolio page (single-page application)
├── css/
│   └── style.css          # All styles with CSS custom properties
├── js/
│   └── main.js            # All interactive functionality
├── assets/
│   └── GalAfik_Software_2026.docx  # Downloadable resume
├── img/                   # Image assets
│   ├── published-games/   # Game cover images
│   └── unpublished-games/ # Additional game assets
├── job-search-tracker/    # Standalone job tracker app page
│   ├── index.html
│   ├── style.css
│   └── img/
├── legacy/                # Old portfolio version (kept for reference)
├── rosenthalaccounting/   # Client project showcase
├── robots.txt             # Search engine crawler instructions
├── sitemap.xml            # SEO sitemap
├── _redirects             # Netlify redirect configuration
├── CNAME                  # Custom domain configuration
└── favicon.svg            # Site favicon

```

---

## 🚀 Features

### Core Functionality

- **Single-page design** with smooth scroll navigation
- **Parallax animations** with GPU-accelerated transforms
- **Responsive design** with mobile hamburger menu
- **Accessibility-first** with ARIA labels, keyboard navigation, semantic HTML
- **Google Analytics** with event tracking for downloads and clicks
- **Video modal** for YouTube trailer playback
- **Project filtering** by category (VR, Web, Systems)
- **Skill tabs** switching between Game Dev and Web & Systems

### Performance Optimizations

- Passive scroll listeners
- IntersectionObserver for fade-in animations
- Lazy-loaded images
- `requestAnimationFrame` for smooth animations
- `will-change` CSS property for transform optimization

### Analytics Tracking

- **Page views**: Automatic tracking
- **Resume downloads**: `trackResumeDownload()`
- **Job Tracker clicks**: `trackJobTrackerClick()`
- **Donation clicks**: `trackDonation()`

---

## 🛠️ Development

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (e.g., Live Server, Python HTTP server, AMPPS)

### Running Locally

**Option 1: VS Code Live Server**

1. Open project folder in VS Code
2. Install "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"

**Option 2: Python HTTP Server**

```bash
# Python 3
python -m http.server 8000

# Navigate to: http://localhost:8000
```

**Option 3: AMPPS (Current Setup)**

- Place files in `www/galafik.github.io/`
- Access via `http://localhost/galafik.github.io/`

---

## 📝 Code Standards

### HTML

- ✅ Semantic HTML5 elements (`<section>`, `<nav>`, `<article>`)
- ✅ ARIA labels for accessibility
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Alt text for all images
- ✅ Valid markup (W3C validated)

### CSS

- ✅ CSS custom properties for theming
- ✅ Mobile-first responsive design
- ✅ BEM-inspired naming conventions
- ✅ Organized by component sections
- ✅ GPU-optimized animations

### JavaScript

- ✅ ES5 compatible (wide browser support)
- ✅ IIFE pattern to avoid global pollution
- ✅ Strict mode (`'use strict'`)
- ✅ Well-documented with section comments
- ✅ Event delegation where appropriate
- ✅ Passive scroll listeners for performance

---

## 🔧 Configuration

### Google Analytics

Update the Measurement ID in `index.html`:

```html
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-WFZN2JFZ6J"
></script>
```

### Donation Button

Update PayPal link in `index.html` (line ~1715):

```html
<a href="https://www.paypal.com/donate/?business=YOUR_PAYPAL_EMAIL&currency_code=USD"
```

### Domain Configuration

- **Custom domain**: Edit `CNAME` file
- **Redirects**: Edit `_redirects` file (Netlify format)

---

## 📊 SEO & Metadata

### Sitemap

- Located at `/sitemap.xml`
- Submitted to Google Search Console
- Auto-referenced in `robots.txt`

### Meta Tags

- Open Graph for social sharing
- Twitter Card metadata
- Canonical URL set to `https://galafik.com`
- Structured data (JSON-LD) for Person schema

---

## 🎨 Theming

Colors are defined as CSS custom properties in `:root`:

```css
--bg: #0a0a0f; /* Background */
--surface: #12121a; /* Card backgrounds */
--yellow: #f5e642; /* Primary accent */
--cyan: #00f5d4; /* Secondary accent */
--magenta: #ff2d78; /* Tertiary accent */
--orange: #ff6b2b; /* Quaternary accent */
--violet: #a855f7; /* Quinary accent */
--white: #f0eeff; /* Text color */
--muted: #6b6b8a; /* Secondary text */
```

---

## 📱 Browser Support

**Fully Supported:**

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Android

**Graceful Degradation:**

- Older browsers receive functional site without advanced animations
- IntersectionObserver polyfill not needed (graceful fallback)

---

## 🚢 Deployment

### GitHub Pages

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

### Netlify

- Automatically deploys from `main` branch
- Custom domain configured via CNAME
- Redirects configured via `_redirects`

---

## 📄 License

© 2026 Gal Afik. All rights reserved.

Portfolio content, game assets, and personal information are proprietary.  
Code structure may be used as a reference for educational purposes.

---

## 📞 Contact

- **Email**: gal.p.afik@gmail.com
- **LinkedIn**: [linkedin.com/in/galafik](https://linkedin.com/in/galafik/)
- **GitHub**: [github.com/GalAfik](https://github.com/GalAfik)
- **Portfolio**: [galafik.com](https://galafik.com)

---

## 🎯 Future Enhancements

- [ ] Dark/Light mode toggle
- [ ] Blog section for game dev articles
- [ ] Case studies for projects
- [ ] Testimonials section
- [ ] More interactive demos
- [ ] WebGL shader backgrounds
