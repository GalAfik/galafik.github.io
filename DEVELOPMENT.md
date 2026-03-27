# Development Guide

This document provides technical details for developers working on this portfolio.

---

## 🏗️ Architecture

### File Organization

**Single-Page Application (SPA) Structure:**

- Main content in `index.html` (~3900 lines)
- All styles in `css/style.css` (component-based organization)
- All scripts in `js/main.js` (modular IIFE functions)

**Why this structure?**

- Fast load time (single HTML file, no routing)
- SEO-friendly (all content in DOM)
- No build process required
- Easy to maintain and deploy

---

## 🎨 CSS Architecture

### Organization Pattern

```css
/* 1. CSS Variables (Theme) */
:root { ... }

/* 2. CSS Reset */
*, *::before, *::after { ... }

/* 3. Global Styles */
html, body { ... }

/* 4. Layout Components */
/* Navigation, Hero, Sections */

/* 5. Reusable Components */
/* Buttons, Cards, Badges */

/* 6. Animations */
/* @keyframes, transitions */

/* 7. Media Queries */
/* Responsive breakpoints */
```

### Naming Conventions

**BEM-Inspired Pattern:**

```css
.block {
} /* Component */
.block__element {
} /* Child element */
.block--modifier {
} /* Variation */
```

**Examples:**

- `.game-card` → `.game-card__title` → `.game-card--featured`
- `.btn` → `.btn--primary` → `.btn--secondary`
- `.nav-links` → `.nav-links--mobile`

### Responsive Strategy

**Mobile-First Approach:**

```css
/* Base styles for mobile */
.element { ... }

/* Tablet and up */
@media (min-width: 768px) { ... }

/* Desktop */
@media (min-width: 1200px) { ... }
```

**Breakpoints:**

- Mobile: `< 768px`
- Tablet: `768px - 1199px`
- Desktop: `≥ 1200px`

---

## 💻 JavaScript Architecture

### Module Pattern (IIFE)

**Structure:**

```javascript
(function moduleName() {
  'use strict';

  // Private variables
  var element = document.getElementById('id');

  // Private functions
  function helper() { ... }

  // Public initialization
  function init() { ... }

  // Auto-execute
  init();
})();
```

### Core Modules

1. **initShapes()** - Parallax geometric shapes
2. **initHeroParallax()** - Hero section parallax
3. **initFadeUps()** - Scroll-triggered fade-in
4. **initNavActive()** - Active nav highlighting
5. **initNavShrink()** - Sticky nav shrinking
6. **initHamburger()** - Mobile menu toggle
7. **initSkillTabs()** - Skill panel switching
8. **initProjectFilter()** - Project filtering
9. **initVideoModal()** - Trailer modal
10. **Analytics tracking functions** (global scope)

### Why this approach?

- ✅ **No global pollution**: Each module is self-contained
- ✅ **Browser compatibility**: Works in older browsers
- ✅ **No dependencies**: Pure vanilla JS
- ✅ **Easy debugging**: Clear module boundaries

---

## 🎭 Animation System

### Parallax System

**Shapes Animation:**

```javascript
// RAF loop for smooth 60fps animation
function tick() {
  shapes.forEach((shape) => {
    // Oscillating horizontal movement
    var tx = Math.sin(phase + time * freq) * amplitude;

    // Scroll-based vertical parallax
    var ty = scrollY * parallaxRate;

    // Apply transform
    shape.style.transform = `translate(${tx}px, ${ty}px) rotate(${angle}deg)`;
  });
  requestAnimationFrame(tick);
}
```

**Performance:**

- Uses `transform` instead of `top/left` (GPU accelerated)
- `will-change: transform` hint for browser
- Pauses on `visibilitychange` to save resources

### Fade-Up System

**IntersectionObserver Pattern:**

```javascript
var observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // One-time animation
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
```

**CSS Side:**

```css
.fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 📊 Analytics Implementation

### Event Tracking Functions

**Pattern:**

```javascript
function trackEventName() {
  if (typeof gtag !== "undefined") {
    gtag("event", "action", {
      event_category: "Category",
      event_label: "Label",
      value: 1,
    });
  }
}
```

**Events Currently Tracked:**

1. Resume downloads (`download` event)
2. Job Tracker page visits (`click` event)
3. Donation button clicks (`click` event)

### Adding New Events

**Step 1: Create tracking function**

```javascript
function trackNewEvent() {
  if (typeof gtag !== "undefined") {
    gtag("event", "custom_action", {
      event_category: "New Category",
      event_label: "Descriptive Label",
      value: 1,
    });
  }
}
```

**Step 2: Add onclick handler**

```html
<button onclick="trackNewEvent()">Click Me</button>
```

**Step 3: View in Google Analytics**

- Go to Events in GA4
- Filter by event name `custom_action`

---

## ♿ Accessibility

### ARIA Implementation

**Modal Dialog:**

```html
<div id="modal" role="dialog" aria-modal="true" aria-label="Video Trailer">
  ...
</div>
```

**Navigation:**

```html
<nav role="navigation" aria-label="Main navigation">
  <button aria-label="Toggle menu" aria-expanded="false"></button>
</nav>
```

**Tabs:**

```html
<div role="tablist">
  <button role="tab" aria-selected="true">Game Dev</button>
</div>
<div role="tabpanel">...</div>
```

### Keyboard Navigation

**Implemented:**

- ✅ Tab focus visible on all interactive elements
- ✅ Escape key closes modal
- ✅ Enter/Space activates buttons
- ✅ Skip-to-content link (implicit via anchor links)

---

## 🐛 Debugging

### Common Issues

**Problem: Parallax not working**

```javascript
// Check if element exists
console.log(document.getElementById("px-canvas"));

// Verify requestAnimationFrame is running
console.log("Animation frame:", frameId);
```

**Problem: Analytics not tracking**

```javascript
// Check if gtag is loaded
console.log(typeof gtag); // Should be 'function'

// Check dataLayer
console.log(window.dataLayer); // Should be array
```

**Problem: Fade-up not triggering**

```javascript
// Check if IntersectionObserver is supported
console.log("IntersectionObserver" in window);

// Check if elements have class
console.log(document.querySelectorAll(".fade-up").length);
```

### Browser DevTools

**Performance Profiling:**

1. Open DevTools → Performance
2. Record page load
3. Check for:
   - Long tasks (>50ms)
   - Layout thrashing
   - Excessive repaints

**Network Optimization:**

1. Open DevTools → Network
2. Check:
   - Total page weight (<2MB ideal)
   - Number of requests (<50 ideal)
   - Caching headers

---

## 🧪 Testing Checklist

### Before Deployment

**Functionality:**

- [ ] All navigation links work
- [ ] Mobile menu toggles correctly
- [ ] Video modal opens/closes
- [ ] Project filters work
- [ ] Skill tabs switch
- [ ] Download links work
- [ ] External links open in new tabs

**Responsive:**

- [ ] Test on mobile (375px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1920px)
- [ ] Test in landscape orientation

**Browser Testing:**

- [ ] Chrome (Windows, Mac, Android)
- [ ] Firefox (Windows, Mac)
- [ ] Safari (Mac, iOS)
- [ ] Edge (Windows)

**Accessibility:**

- [ ] Tab through entire page
- [ ] Test with screen reader
- [ ] Check color contrast
- [ ] Verify ARIA labels

**Performance:**

- [ ] Lighthouse score >90
- [ ] Page load <3 seconds
- [ ] Images optimized
- [ ] No console errors

---

## 🔄 Git Workflow

### Branch Strategy

```bash
main          # Production branch (deployed)
├── dev       # Development branch
└── feature/* # Feature branches
```

### Commit Messages

**Format:**

```
<type>: <subject>

<body>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, CSS changes
- `refactor`: Code restructuring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Build tasks, dependencies

**Examples:**

```
feat: add project filtering by category

fix: mobile menu not closing on link click

docs: update README with deployment instructions

style: adjust hero section spacing on mobile

perf: optimize parallax animation performance
```

---

## 📦 Deployment

### Pre-Deployment Checklist

- [ ] Update sitemap lastmod dates
- [ ] Verify Google Analytics ID
- [ ] Check all external links
- [ ] Test on multiple devices
- [ ] Run Lighthouse audit
- [ ] Clear browser cache
- [ ] Validate HTML/CSS

### Deploy to GitHub Pages

```bash
# Ensure you're on main branch
git checkout main

# Pull latest changes
git pull origin main

# Push changes
git push origin main

# GitHub Pages will auto-deploy
# Check: https://galafik.github.io
```

### Deploy to Netlify

**Automatic Deployment:**

- Pushes to `main` trigger automatic builds
- Custom domain configured in Netlify dashboard
- SSL certificate auto-generated

**Manual Deploy:**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

---

## 🎓 Learning Resources

### Technologies Used

- **Vanilla JavaScript**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **Modern CSS**: [CSS Tricks](https://css-tricks.com)
- **Web Performance**: [web.dev](https://web.dev/learn/)
- **Accessibility**: [A11y Project](https://www.a11yproject.com/)

### Specific Topics

- **IntersectionObserver**: [MDN Guide](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- **requestAnimationFrame**: [MDN Guide](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- **Google Analytics 4**: [Official Docs](https://developers.google.com/analytics/devguides/collection/ga4)

---

## 💡 Tips & Best Practices

1. **Always test on real devices** - Emulators don't catch everything
2. **Optimize images** - Use WebP format, compress PNGs
3. **Minimize reflows** - Batch DOM reads/writes
4. **Use transform over position** - GPU accelerated
5. **Lazy load below fold** - Faster initial load
6. **Monitor Core Web Vitals** - LCP, FID, CLS
7. **Test with slow 3G** - Check mobile performance
8. **Use semantic HTML** - Better for SEO and a11y
9. **Validate frequently** - Catch errors early
10. **Document as you build** - Comments save time later
