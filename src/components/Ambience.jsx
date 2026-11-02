import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const spaces = [
  {
    id: 'indoor',
    label: 'Indoor Seating',
    title: 'Warm & Intimate',
    description: 'Candlelit tables, warm wooden interiors and the soft hum of conversation — perfect for a chai date or a quiet afternoon.',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1400&q=85&auto=format&fit=crop',
    accent: '#d4922a',
  },
  {
    id: 'outdoor',
    label: 'Outdoor Courtyard',
    title: 'Under Open Skies',
    description: 'Our open courtyard with jasmine-draped pergolas and string lights creates the most magical evening setting in the city.',
    image: 'https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?w=1400&q=85&auto=format&fit=crop',
    accent: '#c4622d',
  },
  {
    id: 'cozy',
    label: 'Cozy Corners',
    title: 'Just for You',
    description: 'Tucked away reading nooks with plush cushions and bookshelves filled with Indian literature. Bring your journal.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1400&q=85&auto=format&fit=crop',
    accent: '#e6b84a',
  },
  {
    id: 'group',
    label: 'Group Seating',
    title: 'Celebrate Together',
    description: 'Large round tables with lazy susans, perfect for family gatherings, office meet-ups and birthday brunches.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85&auto=format&fit=crop',
    accent: '#a0522d',
  },
];

const Ambience = () => {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const sectionRef = useRef(null);
  const mainImgRef = useRef(null);
  const contentRef = useRef(null);
  const autoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ambience-header',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.ambience-header', start: 'top 78%' },
        }
      );
      gsap.fromTo('.ambience-main-wrap',
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.ambience-main-wrap', start: 'top 75%' },
        }
      );
      gsap.fromTo('.space-tab',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.space-tabs', start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Auto-advance
  useEffect(() => {
    autoRef.current = setInterval(() => {
      switchScene((prev) => (prev + 1) % spaces.length);
    }, 5000);
    return () => clearInterval(autoRef.current);
  }, []);

  const switchScene = (nextIdxOrFn) => {
    const nextIdx = typeof nextIdxOrFn === 'function'
      ? nextIdxOrFn(active)
      : nextIdxOrFn;

    if (nextIdx === active || transitioning) return;
    setTransitioning(true);
    clearInterval(autoRef.current);

    // Animate out
    gsap.to(mainImgRef.current, {
      scale: 1.05, opacity: 0, duration: 0.4, ease: 'power2.in',
    });
    gsap.to(contentRef.current, {
      x: -30, opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        setPrev(active);
        setActive(nextIdx);
        setTransitioning(false);

        // Animate in
        gsap.fromTo(mainImgRef.current,
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out' }
        );
        gsap.fromTo(contentRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        );
      },
    });

    // Restart auto
    autoRef.current = setInterval(() => {
      switchScene(prev => (prev + 1) % spaces.length);
    }, 5000);
  };

  const space = spaces[active];

  return (
    <section
      id="ambience"
      ref={sectionRef}
      style={{
        padding: '9rem 0',
        background: 'linear-gradient(180deg, #0d0500, #1a0a00 40%, #1a0a00 60%, #0d0500)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="ambience-header" style={{ textAlign: 'center', marginBottom: '5rem', opacity: 0 }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4922a', display: 'block', marginBottom: '1.2rem' }}>
            The Ambience
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, color: '#f5ede0', lineHeight: 1.05 }}>
            Spaces Crafted<br /><em style={{ color: '#d4922a' }}>With Soul</em>
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '1.8rem 0' }}>
            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to right, transparent, #d4922a)' }} />
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 1L11 7L17 9L11 11L9 17L7 11L1 9L7 7Z" fill="#d4922a" opacity="0.8"/></svg>
            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to left, transparent, #d4922a)' }} />
          </div>
        </div>

        {/* Tab buttons */}
        <div className="space-tabs" style={{
          display: 'flex', gap: '0', justifyContent: 'center',
          marginBottom: '3rem', flexWrap: 'wrap',
          border: '1px solid rgba(212,146,42,0.15)',
          borderRadius: '4px', overflow: 'hidden',
          maxWidth: '700px', margin: '0 auto 3rem',
        }}>
          {spaces.map((s, i) => (
            <button
              key={s.id}
              className="space-tab"
              onClick={() => switchScene(i)}
              style={{
                flex: '1 1 auto', padding: '0.9rem 1.2rem',
                fontFamily: "'DM Sans'", fontSize: '0.7rem', fontWeight: 400,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: i === active ? '#1a0a00' : '#8a6a4a',
                background: i === active ? `linear-gradient(135deg, ${s.accent}, #c4622d)` : 'transparent',
                border: 'none',
                borderRight: i < spaces.length - 1 ? '1px solid rgba(212,146,42,0.12)' : 'none',
                cursor: 'none',
                transition: 'all 0.4s ease',
                position: 'relative', overflow: 'hidden',
                opacity: 0,
              }}
              onMouseEnter={e => { if (i !== active) { e.currentTarget.style.background = 'rgba(212,146,42,0.08)'; e.currentTarget.style.color = '#e6b84a'; } }}
              onMouseLeave={e => { if (i !== active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8a6a4a'; } }}
            >
              {s.label}
              {/* Active indicator */}
              {i === active && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                  background: '#e6b84a', animation: 'lineExpand 5s linear',
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Main showcase */}
        <div
          className="ambience-main-wrap"
          style={{
            display: 'grid', gridTemplateColumns: '1.4fr 1fr',
            gap: '3.5rem', alignItems: 'center', opacity: 0,
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                ref={mainImgRef}
                style={{
                  aspectRatio: '4/3',
                  backgroundImage: `url('${space.image}')`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  borderRadius: '4px',
                  willChange: 'transform, opacity',
                  position: 'relative',
                }}
              >
                {/* Overlay */}
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, rgba(13,5,0,0.35) 0%, transparent 60%)` }} />
                {/* Corner accents */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', width: '40px', height: '40px', borderLeft: `2px solid ${space.accent}`, borderTop: `2px solid ${space.accent}`, opacity: 0.7 }} />
                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', width: '40px', height: '40px', borderRight: `2px solid ${space.accent}`, borderBottom: `2px solid ${space.accent}`, opacity: 0.7 }} />
              </div>
            </div>

            {/* Thumbnail strip */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.8rem' }}>
              {spaces.map((s, i) => (
                <div
                  key={s.id}
                  onClick={() => switchScene(i)}
                  style={{
                    flex: 1, height: '60px',
                    backgroundImage: `url('${s.image}')`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    borderRadius: '2px', cursor: 'none',
                    opacity: i === active ? 1 : 0.35,
                    border: i === active ? `2px solid ${space.accent}` : '2px solid transparent',
                    transition: 'all 0.4s ease',
                    boxShadow: i === active ? `0 0 20px ${space.accent}50` : 'none',
                  }}
                  onMouseEnter={e => { if (i !== active) e.currentTarget.style.opacity = 0.6; }}
                  onMouseLeave={e => { if (i !== active) e.currentTarget.style.opacity = 0.35; }}
                />
              ))}
            </div>

            {/* Auto-progress bar */}
            <div style={{ marginTop: '0.8rem', height: '1px', background: 'rgba(212,146,42,0.1)', borderRadius: '1px', overflow: 'hidden' }}>
              <div key={active} style={{
                height: '100%',
                background: `linear-gradient(to right, ${space.accent}, #e6b84a)`,
                animation: 'lineExpand 5s linear',
                transformOrigin: 'left',
                boxShadow: `0 0 8px ${space.accent}80`,
              }} />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              fontFamily: "'DM Sans'", fontSize: '0.62rem', fontWeight: 500,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: space.accent, marginBottom: '1.2rem',
            }}>
              <span style={{ width: '20px', height: '1px', background: space.accent, display: 'inline-block' }} />
              {space.label}
            </span>
            <h3 style={{
              fontFamily: "'Cormorant Garamond'",
              fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 400,
              color: '#f5ede0', lineHeight: 1.1, marginBottom: '1.5rem',
            }}>
              {space.title}
            </h3>
            <p style={{
              fontFamily: "'DM Sans'", fontSize: '0.95rem', fontWeight: 300,
              color: '#9a7a5a', lineHeight: 1.9, marginBottom: '2.5rem',
            }}>
              {space.description}
            </p>

            {/* Scene counter */}
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem' }}>
              {spaces.map((_, i) => (
                <div
                  key={i}
                  onClick={() => switchScene(i)}
                  style={{
                    width: i === active ? '28px' : '8px',
                    height: '3px', borderRadius: '2px',
                    background: i === active ? space.accent : 'rgba(212,146,42,0.2)',
                    transition: 'all 0.4s ease', cursor: 'none',
                  }}
                />
              ))}
            </div>

            <a
              href="#visit"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
                fontFamily: "'DM Sans'", fontSize: '0.75rem', fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: space.accent, border: `1px solid ${space.accent}40`,
                padding: '0.8rem 1.8rem', borderRadius: '2px',
                transition: 'all 0.35s ease', position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${space.accent}18`;
                e.currentTarget.style.borderColor = space.accent;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 30px ${space.accent}30`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = `${space.accent}40`;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Reserve This Space
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #ambience .ambience-main-wrap { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Ambience;
