import React, { useEffect, useRef } from 'react';

/* ── Jali SVG Pattern Component ─────────────────────────────── */
const JaliPattern = ({ style = {} }) => (
  <svg
    style={{ position: 'absolute', opacity: 0.07, pointerEvents: 'none', ...style }}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="jali" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="20" height="20" fill="none" stroke="#e6b84a" strokeWidth="0.4"/>
        <circle cx="10" cy="10" r="3" fill="none" stroke="#e6b84a" strokeWidth="0.4"/>
        <line x1="10" y1="0" x2="10" y2="7" stroke="#e6b84a" strokeWidth="0.4"/>
        <line x1="10" y1="13" x2="10" y2="20" stroke="#e6b84a" strokeWidth="0.4"/>
        <line x1="0" y1="10" x2="7" y2="10" stroke="#e6b84a" strokeWidth="0.4"/>
        <line x1="13" y1="10" x2="20" y2="10" stroke="#e6b84a" strokeWidth="0.4"/>
        <circle cx="0" cy="0" r="1.5" fill="#e6b84a" opacity="0.5"/>
        <circle cx="20" cy="0" r="1.5" fill="#e6b84a" opacity="0.5"/>
        <circle cx="0" cy="20" r="1.5" fill="#e6b84a" opacity="0.5"/>
        <circle cx="20" cy="20" r="1.5" fill="#e6b84a" opacity="0.5"/>
      </pattern>
    </defs>
    <rect width="200" height="200" fill="url(#jali)"/>
  </svg>
);

/* ── Steam Particle ─────────────────────────────────────────── */
const SteamParticle = ({ left, delay, duration }) => (
  <div style={{
    position: 'absolute',
    bottom: '100%',
    left,
    width: '3px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(to top, rgba(255,255,255,0.5), transparent)',
    filter: 'blur(2px)',
    animation: `steamRise ${duration}s ease-in-out ${delay}s infinite`,
    transformOrigin: 'bottom center',
  }} />
);

/* ── Ornamental Divider ─────────────────────────────────────── */
const OrnamentalDivider = ({ color = '#d4922a' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
    <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${color})` }} />
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill={color} opacity="0.7"/>
    </svg>
    <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${color})` }} />
  </div>
);

export { JaliPattern, SteamParticle, OrnamentalDivider };

