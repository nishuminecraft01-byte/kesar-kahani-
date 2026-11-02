import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CafeTour from './components/CafeTour';
import ChaiExperience from './components/ChaiExperience';
import Menu from './components/Menu';
import Ambience from './components/Ambience';
import OurStory from './components/OurStory';
import VisitUs from './components/VisitUs';
import Footer from './components/Footer';
import './styles/globals.css';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ markers: false });

/* ── Ultra-Reliable Loading Screen ──────────────────────────── */
function LoadingScreen({ onDone }) {
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const hasFinishedRef = useRef(false);

  const finish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setPercent(100);
    setExiting(true);
    setTimeout(() => {
      onDone();
    }, 700);
  }, [onDone]);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1400; // 1.4s smooth load

    let rafId;
    const tick = (now) => {
      const elapsed = now - startTime;
      const p = Math.min(100, Math.round((elapsed / duration) * 100));
      setPercent(p);
      if (p < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(finish, 150);
      }
    };
    rafId = requestAnimationFrame(tick);

    // Hard fallback timeout: GUARANTEES dismissal within 2.2s even if tab was in background
    const hardFallback = setTimeout(finish, 2200);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(hardFallback);
    };
  }, [finish]);

  return (
    <div
      onClick={finish}
      title="Click to enter"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#0d0500',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
        opacity: exiting ? 0 : 1,
        transition: 'transform 0.75s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.6s ease',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      {/* Animated background rings */}
      {[280, 200, 120].map((size, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            border: `1px solid rgba(212,146,42,${0.05 + i * 0.03})`,
            animation: `spinSlow ${20 + i * 8}s linear infinite ${i % 2 ? 'reverse' : ''}`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        {/* Lotus SVG */}
        <div
          style={{
            marginBottom: '1.6rem',
            animation: 'floatSlow 4s ease-in-out infinite',
          }}
        >
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <path d="M26 6 C26 6, 12 20, 26 34 C40 20, 26 6, 26 6Z" fill="#d4922a" opacity="0.75" />
            <path d="M6 26 C6 26, 20 12, 34 26 C20 40, 6 26, 6 26Z" fill="#d4922a" opacity="0.45" />
            <path d="M46 26 C46 26, 32 12, 18 26 C32 40, 46 26, 46 26Z" fill="#d4922a" opacity="0.45" />
            <path d="M14 14 C14 14, 18 24, 26 26 C24 18, 14 14, 14 14Z" fill="#e6b84a" opacity="0.5" />
            <path d="M38 14 C38 14, 34 24, 26 26 C28 18, 38 14, 38 14Z" fill="#e6b84a" opacity="0.5" />
            <circle cx="26" cy="26" r="5" fill="#e6b84a" opacity="0.95" />
            <circle cx="26" cy="26" r="2" fill="#fff" opacity="0.7" />
          </svg>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.2rem, 7vw, 4.5rem)',
            fontWeight: 300,
            letterSpacing: '0.08em',
            lineHeight: 1,
            color: '#f5ede0',
          }}
        >
          <span>KESAR</span>
          <span
            style={{
              fontStyle: 'italic',
              color: '#d4922a',
              margin: '0 0.25em',
              background: 'linear-gradient(135deg, #e6b84a, #d4922a, #c4622d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            &amp;
          </span>
          <span>KAHANI</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.68rem',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: '#d4922a',
            marginTop: '0.9rem',
          }}
        >
          A little taste of India
        </p>

        {/* Progress bar container */}
        <div
          style={{
            marginTop: '2.8rem',
            width: '180px',
            height: '2px',
            background: 'rgba(212,146,42,0.15)',
            borderRadius: '2px',
            position: 'relative',
            margin: '2.8rem auto 0',
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'linear-gradient(to right, #7a3b1e, #d4922a, #e6b84a)',
              width: `${percent}%`,
              transition: 'width 0.08s linear',
              borderRadius: '2px',
              position: 'relative',
              boxShadow: '0 0 10px rgba(230,184,74,0.6)',
            }}
          >
            {/* Glowing tip */}
            <div
              style={{
                position: 'absolute',
                right: '-3px',
                top: '-3px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#e6b84a',
                boxShadow: '0 0 10px #e6b84a, 0 0 20px #d4922a',
              }}
            />
          </div>

          {/* Percentage text */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: '12px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.62rem',
              color: '#d4922a',
              letterSpacing: '0.1em',
              fontWeight: 500,
            }}
          >
            {percent}%
          </div>
        </div>

        {/* Subtle skip hint */}
        <div
          style={{
            marginTop: '2.5rem',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(212,146,42,0.4)',
          }}
        >
          Click to enter
        </div>
      </div>
    </div>
  );
}

/* ── Custom Cursor ──────────────────────────────────────────── */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    const animate = () => {
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px';
        ringRef.current.style.top = ringPos.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseOver = (e) => {
      if (e.target && e.target.closest('a, button, [role="button"], input, .menu-card-item, .chai-card, .scene-card')) {
        ringRef.current?.classList.add('hovered');
      } else {
        ringRef.current?.classList.remove('hovered');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

/* ── App Shell ──────────────────────────────────────────────── */
function App() {
  const [loaded, setLoaded] = useState(false);
  const handleDone = useCallback(() => {
    setLoaded(true);
    // Refresh ScrollTrigger once loading screen finishes revealing content
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  return (
    <>
      <CustomCursor />
      {!loaded && <LoadingScreen onDone={handleDone} />}
      <div
        className="app grain-overlay"
        style={{
          opacity: 1,
          visibility: 'visible',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <CafeTour />
          <ChaiExperience />
          <Menu />
          <Ambience />
          <OurStory />
          <VisitUs />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
