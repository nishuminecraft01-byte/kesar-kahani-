import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '2018', text: 'The idea was born in a small Mumbai kitchen, brewing chai for the neighbourhood.' },
  { year: '2020', text: 'Our first pop-up stall at Bandra drew queues around the block every Sunday.' },
  { year: '2022', text: 'First full café opened — a reclaimed warehouse with 60 hand-picked seats.' },
  { year: '2024', text: 'Expanded with an outdoor courtyard and a curated reading library.' },
];

const stats = [
  { num: 6, suffix: '+', label: 'Years of Craft' },
  { num: 500, suffix: '+', label: 'Daily Cups' },
  { num: 4, suffix: '', label: 'Café Spaces' },
  { num: 12, suffix: 'K+', label: 'Happy Guests' },
];

/* ── Animated counter ───────────────────────────────────────── */
function Counter({ target, suffix }) {
  const elRef = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val) + suffix;
          },
        });
      },
    });
    return () => st.kill();
  }, [target, suffix]);

  return (
    <span ref={elRef} style={{ display: 'inline-block' }}>0{suffix}</span>
  );
}

const OurStory = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Section header */
      gsap.fromTo('.story-heading',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.story-heading', start: 'top 78%' },
        }
      );

      /* Quote reveal */
      gsap.fromTo('.story-quote',
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.story-quote', start: 'top 78%' },
        }
      );

      /* Body text */
      gsap.fromTo('.story-body p',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.2, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.story-body', start: 'top 80%' },
        }
      );

      /* Image reveal */
      gsap.fromTo('.story-img-wrap',
        { clipPath: 'inset(0 100% 0 0)', scale: 1.06 },
        {
          clipPath: 'inset(0 0% 0 0)', scale: 1,
          duration: 1.4, ease: 'power4.inOut',
          scrollTrigger: { trigger: '.story-img-wrap', start: 'top 75%' },
        }
      );

      /* Timeline items */
      gsap.fromTo('.milestone-item',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.milestones', start: 'top 78%' },
        }
      );

      /* Timeline line draw */
      gsap.fromTo('.timeline-line',
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.5, ease: 'power3.inOut', transformOrigin: 'left',
          scrollTrigger: { trigger: '.milestones', start: 'top 78%' },
        }
      );

      /* Stats cards */
      gsap.fromTo('.stat-card',
        { y: 40, opacity: 0, scale: 0.94 },
        {
          y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.stats-row', start: 'top 80%' },
        }
      );

      /* Image parallax */
      gsap.to('.story-img-inner', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.story-img-wrap',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      style={{
        padding: '9rem 0',
        background: 'linear-gradient(180deg, #0d0500, #080200 40%, #0d0500)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Jali BG */}
      <div style={{
        position: 'absolute', right: 0, top: '10%', opacity: 0.055, pointerEvents: 'none',
      }}>
        <svg width="450" height="450" viewBox="0 0 200 200">
          <defs>
            <pattern id="jaliStory" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="none" stroke="#e6b84a" strokeWidth="0.3"/>
              <circle cx="10" cy="10" r="3" fill="none" stroke="#e6b84a" strokeWidth="0.3"/>
              <line x1="10" y1="0" x2="10" y2="7" stroke="#e6b84a" strokeWidth="0.3"/>
              <line x1="10" y1="13" x2="10" y2="20" stroke="#e6b84a" strokeWidth="0.3"/>
              <line x1="0" y1="10" x2="7" y2="10" stroke="#e6b84a" strokeWidth="0.3"/>
              <line x1="13" y1="10" x2="20" y2="10" stroke="#e6b84a" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#jaliStory)"/>
        </svg>
      </div>

      <div className="container">
        {/* Header */}
        <div className="story-heading" style={{ textAlign: 'center', marginBottom: '6rem', opacity: 0 }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4922a', display: 'block', marginBottom: '1.2rem' }}>
            Our Story
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, color: '#f5ede0', lineHeight: 1.05 }}>
            Born From a<br /><em style={{ color: '#d4922a' }}>Love for India</em>
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '1.8rem 0 1.5rem' }}>
            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to right, transparent, #d4922a)' }} />
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 1L11 7L17 9L11 11L9 17L7 11L1 9L7 7Z" fill="#d4922a" opacity="0.8"/></svg>
            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to left, transparent, #d4922a)' }} />
          </div>
        </div>

        {/* Main block */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center', marginBottom: '7rem' }}>
          {/* Text */}
          <div>
            <blockquote
              className="story-quote"
              style={{
                fontFamily: "'Cormorant Garamond'",
                fontSize: 'clamp(1.2rem, 2.2vw, 1.75rem)',
                fontWeight: 300, fontStyle: 'italic',
                color: '#f5ede0', lineHeight: 1.6,
                borderLeft: '2px solid #d4922a',
                paddingLeft: '1.5rem',
                marginBottom: '2rem', opacity: 0,
              }}
            >
              "It started with a grandmother's chai recipe, shared over stories that felt bigger than life."
            </blockquote>

            <div className="story-body">
              <p style={{ fontFamily: "'DM Sans'", fontSize: '0.95rem', fontWeight: 300, color: '#9a7a5a', lineHeight: 1.9, marginBottom: '1.4rem' }}>
                Kesar & Kahani was built on the belief that a café can be more than a place for coffee. It can be a living archive of Indian culture — where every cup of chai carries a decade of memory.
              </p>
              <p style={{ fontFamily: "'DM Sans'", fontSize: '0.95rem', fontWeight: 300, color: '#9a7a5a', lineHeight: 1.9 }}>
                We source our teas from small Assam gardens, our coffee from Coorg estates, and our spices from the same markets our grandmothers walked through. Every ingredient has a story.
              </p>
            </div>
          </div>

          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div
              className="story-img-wrap"
              style={{
                aspectRatio: '3/4',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
                clipPath: 'inset(0 100% 0 0)',
              }}
            >
              <div
                className="story-img-inner"
                style={{
                  position: 'absolute',
                  inset: '-12%',
                  backgroundImage: "url('https://images.unsplash.com/photo-1571167430149-6dbef3f6e5de?w=900&q=85&auto=format&fit=crop')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  willChange: 'transform',
                }}
              />
            </div>

            {/* Offset border */}
            <div style={{
              position: 'absolute', top: '1.5rem', left: '1.5rem', right: '-1.5rem', bottom: '-1.5rem',
              border: '1px solid rgba(212,146,42,0.2)', borderRadius: '4px', zIndex: -1,
              animation: 'glowPulse 5s ease-in-out infinite',
            }} />
          </div>
        </div>

        {/* Stats row */}
        <div className="stats-row" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem', marginBottom: '7rem',
        }}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="stat-card"
              style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                background: 'linear-gradient(145deg, rgba(44,21,3,0.5), rgba(26,10,0,0.7))',
                border: '1px solid rgba(212,146,42,0.12)',
                borderRadius: '4px',
                opacity: 0,
                transition: 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
                animation: 'cardBreathe 5s ease-in-out infinite',
                animationDelay: `${i * 0.8}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
                e.currentTarget.style.borderColor = 'rgba(212,146,42,0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(212,146,42,0.12)';
              }}
            >
              <div style={{
                fontFamily: "'Cormorant Garamond'",
                fontSize: '2.8rem', fontWeight: 400, color: '#e6b84a', lineHeight: 1,
              }}>
                <Counter target={s.num} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: '0.7rem', fontWeight: 300, color: '#8a6a4a', letterSpacing: '0.08em', marginTop: '0.5rem' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Horizontal connecting line */}
          <div style={{
            position: 'absolute', top: '10px', left: '12.5%', right: '12.5%', height: '1px',
            background: 'rgba(212,146,42,0.15)', overflow: 'hidden',
          }}>
            <div className="timeline-line" style={{
              height: '100%',
              background: 'linear-gradient(to right, #7a3b1e, #d4922a, #e6b84a)',
              transformOrigin: 'left', transform: 'scaleX(0)',
            }} />
          </div>

          <div className="milestones" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {milestones.map((m, i) => (
              <div key={m.year} className="milestone-item" style={{ textAlign: 'center', padding: '0 0.5rem', opacity: 0 }}>
                {/* Node */}
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e6b84a, #d4922a)',
                  margin: '0 auto 1.2rem',
                  position: 'relative', zIndex: 1,
                  boxShadow: '0 0 20px rgba(212,146,42,0.4)',
                }} />
                <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.8rem', fontWeight: 600, color: '#d4922a', marginBottom: '0.5rem' }}>
                  {m.year}
                </div>
                <p style={{ fontFamily: "'DM Sans'", fontSize: '0.8rem', fontWeight: 300, color: '#8a6a4a', lineHeight: 1.75 }}>
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #story [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 3rem !important; }
          #story .stats-row { grid-template-columns: 1fr 1fr !important; }
          #story .milestones { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          #story .stats-row { grid-template-columns: 1fr 1fr !important; }
          #story .milestones { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default OurStory;
