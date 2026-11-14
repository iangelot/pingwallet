# PingWallet redesign

A responsive, single-page redesign for PingWallet, a Telegram-first public wallet monitoring service. The hero follows the supplied references: Cabinet Grotesk, General Sans, and IBM Plex Mono typography, spacious dark grid, vivid violet beam, and a wide recreated Telegram bot interface. The supplied bot screenshot is used as LaserFlow's cursor reveal image. Demo activity is explicitly labeled, and unsupported service metrics and the invented testimonial have been removed.

## Run locally

Open `index.html` through a static file server. The original page stays plain HTML, CSS, and JavaScript; the hero effect mounts React Bits LaserFlow from browser ES modules (React 18 is loaded from esm.sh), so it needs an internet connection. No build step is required.

## Interactions

- Monthly, quarterly, and yearly plan pricing toggle
- Responsive navigation menu
- Single-open FAQ accordion
- Scroll reveal with reduced-motion support
- One-time liquid-glass logo reveal per browser tab
- React Bits LaserFlow mounted over the Telegram bot screenshot, using the configured purple beam and reveal effect
- Telegram links for signup and plan deep links

## Design sources

The LaserFlow shader is adapted from the JavaScript + CSS source supplied for the [React Bits LaserFlow component](https://reactbits.dev/). Its hero props use the requested violet beam, intensity, surface spill, reveal image, and motion settings. The product preview is recreated with HTML and CSS from the provided screenshot. Network identity marks are included as local SVG symbols for consistent rendering. The liquid-glass logo reveal takes direction from 21st.dev's **Liquid Glass Logo Reveal** by `shepovalovdenis` (demo 43085), implemented with CSS and an SVG displacement filter.

Product claims and pricing should be confirmed against PingWallet before publication.

