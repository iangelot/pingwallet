# PingWallet redesign

A responsive, single-page redesign for PingWallet, a Telegram-first public wallet monitoring service. The page keeps the existing product positioning and current public plan details while introducing a darker, more considered visual system built around on-chain signal, motion, and a live alert preview.

## Run locally

Open `index.html` in a browser or serve this folder with any static file server. There are no build steps or runtime dependencies.

## Interactions

- Monthly, quarterly, and yearly plan pricing toggle
- Responsive navigation menu
- Single-open FAQ accordion
- Scroll reveal and subtle motion, with reduced-motion support
- One-time liquid glass logo reveal on the first page view of each browser tab
- Telegram links for free signup and the published plan deep links

## Design source

The animated wallet-led hero takes direction from 21st.dev's **Crypto hero** component (demo 8759). The atmospheric dark blue/black gradient, grain, and vignette treatment are adapted from 21st.dev's **Dark Blue Hero gradient** component (demo 27274). The final implementation is framework-free and tuned to PingWallet's product, content, and static hosting constraints.

The intro references 21st.dev's **Liquid Glass Logo Reveal** by `shepovalovdenis` (demo 43085): a droplet lands, forms a refractive glass tile, reveals the product mark, then releases into the page. The implementation uses CSS and an SVG turbulence/displacement filter; it plays once per tab session and respects reduced-motion preferences.

Product claims and pricing were checked against the live PingWallet site at the time this redesign was prepared. Confirm operational metrics and plan prices before future updates.

