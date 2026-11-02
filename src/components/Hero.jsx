import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/* ── Particle Canvas ────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let W, H;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.5 - 0.1,
      alpha: Math.random() * 0.6 + 0.1,
      life: Math.random(),
      maxLife: Math.random() * 200 + 100,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life > p.maxLife || p.y < -5) {
          p.x = Math.random() * W;
          p.y = H + 5;
          p.life = 0;
          p.alpha = Math.random() * 0.6 + 0.1;
        }
        const fade = 1 - p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        // Gold-to-orange gradient particles
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2);
        grad.addColorStop(0, `rgba(230,184,74,${p.alpha * fade})`);
        grad.addColorStop(1, `rgba(196,98,45,0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }}
    />
  );
}

/* ── Animated text chars ─────────────────────────────────────── */
function AnimatedWord({ text, color = '#f5ede0', delay = 0, size = 'inherit', italic = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll('.char');
    gsap.fromTo(chars,
      { y: '110%', opacity: 0, rotateZ: 8 },
      {
        y: '0%', opacity: 1, rotateZ: 0,
        duration: 1,
        stagger: 0.04,
        delay,
        ease: 'power4.out',
      }
    );
  }, [delay]);

  return (
    <span ref={ref} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="char"
          style={{
            display: 'inline-block',
            color,
            fontSize: size,
            fontStyle: italic ? 'italic' : 'normal',
            opacity: 0,
            willChange: 'transform',
            whiteSpace: ch === ' ' ? 'pre' : 'normal',
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

const heroImage = 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=2000&q=90&auto=format&fit=crop';

const Hero = () => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  /* Parallax on scroll */
  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      const y = window.scrollY * 0.4;
      bgRef.current.style.transform = `scale(1.1) translateY(${y}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Mouse parallax */
  useEffect(() => {
    const onMove = (e) => {
      if (!heroRef.current || !bgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      gsap.to(bgRef.current, {
        x: x * 0.6,
        y: y * 0.4,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: true,
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Floating ornament */
  useEffect(() => {
    gsap.to('.hero-ornament', {
      y: -18,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
    gsap.to('.hero-badge', {
      y: -10,
      rotation: 3,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1,
    });
  }, []);

  /* Animated line grows in */
  useEffect(() => {
    if (!mounted) return;
    gsap.fromTo('.hero-line', { scaleX: 0 }, { scaleX: 1, duration: 1.5, delay: 2.2, ease: 'power3.out', transformOrigin: 'left' });
    gsap.fromTo('.hero-tagline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 2.8, ease: 'power3.out' });
    gsap.fromTo('.hero-buttons', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 3.2, ease: 'power3.out' });
    gsap.fromTo('.scroll-indicator', { opacity: 0, y: 10 }, { opacity: 0.7, y: 0, duration: 0.8, delay: 4, ease: 'power2.out' });
    gsap.fromTo('.hero-meta', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, delay: 1.5, ease: 'power3.out' });
  }, [mounted]);

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '640px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#0d0500',
      }}
    >
      {/* BG image */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-8%',
          backgroundImage: `url('${heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          transform: 'scale(1.1)',
          willChange: 'transform',
          zIndex: 0,
        }}
      />

      {/* Cinematic overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(13,5,0,0.95) 0%, rgba(13,5,0,0.65) 55%, rgba(13,5,0,0.25) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,5,0,1) 0%, transparent 45%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, transparent 35%, rgba(13,5,0,0.65) 100%)', zIndex: 1 }} />

      {/* Light leak */}
      <div style={{
        position: 'absolute', top: 0, right: '25%', width: '180px', height: '100%',
        background: 'linear-gradient(to bottom, rgba(212,146,42,0.06) 0%, rgba(196,98,45,0.03) 50%, transparent 100%)',
        transform: 'skewX(-18deg)',
        zIndex: 1, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: '18%', width: '60px', height: '60%',
        background: 'linear-gradient(to bottom, rgba(230,184,74,0.08), transparent)',
        transform: 'skewX(-18deg)',
        zIndex: 1, pointerEvents: 'none',
      }} />

      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        <ParticleCanvas />
      </div>

      {/* Jali corner */}
      <div style={{ position: 'absolute', right: 0, top: 0, zIndex: 2, pointerEvents: 'none', opacity: 0.09 }}>
        <svg width="380" height="380" viewBox="0 0 200 200">
          <defs>
            <pattern id="jaliHero" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="none" stroke="#e6b84a" strokeWidth="0.35"/>
              <circle cx="10" cy="10" r="3.2" fill="none" stroke="#e6b84a" strokeWidth="0.35"/>
              <line x1="10" y1="0" x2="10" y2="6.8" stroke="#e6b84a" strokeWidth="0.35"/>
              <line x1="10" y1="13.2" x2="10" y2="20" stroke="#e6b84a" strokeWidth="0.35"/>
              <line x1="0" y1="10" x2="6.8" y2="10" stroke="#e6b84a" strokeWidth="0.35"/>
              <line x1="13.2" y1="10" x2="20" y2="10" stroke="#e6b84a" strokeWidth="0.35"/>
              <circle cx="0" cy="0" r="1.5" fill="#e6b84a" opacity="0.4"/>
              <circle cx="20" cy="0" r="1.5" fill="#e6b84a" opacity="0.4"/>
              <circle cx="0" cy="20" r="1.5" fill="#e6b84a" opacity="0.4"/>
              <circle cx="20" cy="20" r="1.5" fill="#e6b84a" opacity="0.4"/>
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#jaliHero)"/>
        </svg>
      </div>

      {/* Glowing orb */}
      <div style={{
        position: 'absolute', top: '15%', right: '12%',
        width: '320px', height: '320px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,146,42,0.1) 0%, rgba(196,98,45,0.04) 50%, transparent 70%)',
        animation: 'glowPulse 4s ease-in-out infinite',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: '820px',
        padding: '0 2rem',
        marginLeft: '5vw',
      }}>
        {/* Meta row */}
        <div className="hero-meta" style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          marginBottom: '1.8rem', opacity: 0,
        }}>
          <div style={{ width: '36px', height: '1px', background: 'linear-gradient(to right, #d4922a, transparent)' }} />
          <span style={{ fontFamily: "'DM Sans'", fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#d4922a' }}>
            Est. 2024 · Bandra West · Mumbai
          </span>
          <div style={{ width: '36px', height: '1px', background: 'linear-gradient(to left, #d4922a, transparent)' }} />
        </div>

        {/* Title with char animation */}
        <div style={{ lineHeight: 0.88, marginBottom: '0.3rem' }}>
          {mounted && (
            <AnimatedWord
              text="Kesar"
              color="#f5ede0"
              size="clamp(3.5rem, 9vw, 8rem)"
              delay={0.4}
            />
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.3rem' }}>
          <div className="hero-line" style={{
            height: '1px',
            width: '80px',
            background: 'linear-gradient(to right, #d4922a, #e6b84a)',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }} />
          {mounted && (
            <AnimatedWord
              text="&"
              color="#d4922a"
              size="clamp(2rem, 4.5vw, 3.5rem)"
              italic
              delay={1.0}
            />
          )}
        </div>
        <div>
          {mounted && (
            <AnimatedWord
              text="Kahani"
              color="#d4922a"
              size="clamp(2rem, 5.5vw, 4.5rem)"
              italic
              delay={1.4}
            />
          )}
        </div>

        {/* Tagline */}
        <div className="hero-tagline" style={{ opacity: 0, marginTop: '2rem' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.05rem, 2.2vw, 1.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#f0e6d3',
            lineHeight: 1.55,
            maxWidth: '440px',
          }}>
            "A little taste of India,<br />a lot of heart."
          </p>
        </div>

        {/* Star ornament */}
        <div className="hero-ornament" style={{ marginTop: '1.5rem', marginBottom: '2rem', opacity: 0, animation: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            {[1, 2, 3].map(i => (
              <svg key={i} width="14" height="14" viewBox="0 0 14 14" style={{ opacity: 0.6 + i * 0.1 }}>
                <path d="M7 1 L8.4 5.2 L13 7 L8.4 8.8 L7 13 L5.6 8.8 L1 7 L5.6 5.2 Z" fill="#d4922a"/>
              </svg>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hero-buttons" style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', opacity: 0 }}>
          <a href="#cafe-tour" className="btn-primary">
            Explore Our Café
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#menu" className="btn-outline">
            Discover the Menu
          </a>
        </div>
      </div>

      {/* Floating badge */}
      <div className="hero-badge" style={{
        position: 'absolute',
        right: '5vw',
        bottom: '12vh',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
      }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          border: '1px solid rgba(212,146,42,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          animation: 'spinSlow 12s linear infinite',
        }}>
          {/* Rotating text */}
          <svg viewBox="0 0 80 80" width="80" height="80" style={{ position: 'absolute' }}>
            <path id="circle-path" d="M 40 40 m -28 0 a 28 28 0 1 1 56 0 a 28 28 0 1 1 -56 0" fill="none"/>
            <text style={{ fontSize: '7px', fill: '#d4922a', letterSpacing: '2.5px', fontFamily: "'DM Sans'" }}>
              <textPath href="#circle-path">PREMIUM CHAI · FILTER COFFEE · </textPath>
            </text>
          </svg>
          <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '0.7rem', color: '#e6b84a', textAlign: 'center', lineHeight: 1.2 }}>
            🍵
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        opacity: 0, animation: 'scrollPulse 2s ease-in-out infinite',
        zIndex: 10,
      }}>
        <span style={{ fontFamily: "'DM Sans'", fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4922a' }}>Scroll</span>
        <div style={{
          width: '22px', height: '36px',
          border: '1px solid rgba(212,146,42,0.4)', borderRadius: '12px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '4px', left: '50%', transform: 'translateX(-50%)',
            width: '3px', height: '8px', borderRadius: '2px',
            background: '#d4922a',
            animation: 'scrollPulse 1.6s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
