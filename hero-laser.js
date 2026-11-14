import React from 'https://esm.sh/react@18.3.1';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client?deps=react@18.3.1';
import LaserFlow from './LaserFlow.js';

const mount = document.querySelector('#hero-laser-root');
const surface = document.querySelector('#bot-preview-surface');
if (mount && surface) {
  createRoot(mount).render(React.createElement(LaserFlow, {
    surfaceRef: { current: surface },
    beamPosition: 0.6,
    color: '#7c3aed',
    intensity: 2,
    flare: 2,
    spread: 1.5,
    spill: 2,
    fog: 0,
    dust: 2,
    revealImage: 'bot-screenshot.png',
    revealRadius: 340,
    revealOpacity: 0.7,
    streaks: 0.5,
    dots: 2,
    pulse: 1.7,
    speed: 3,
    seed: 13,
    className: 'hero-laser'
  }));
}
