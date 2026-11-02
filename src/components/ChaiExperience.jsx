import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const drinks = [
  {
    name: 'Masala Chai',
    hindi: 'मसाला चाय',
    description: 'Hand-ground spices, full-bodied Assam tea, boiled slowly over the flame with fresh ginger and cardamom pods.',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=900&q=90&auto=format&fit=crop',
    tag: 'Our Signature',
    tagColor: '#d4922a',
    glow: 'rgba(212,146,42,0.2)',
  },
  {
    name: 'Filter Coffee',
    hindi: 'फिल्टर कॉफ़ी',
    description: 'Authentic South Indian filter coffee — strong decoction poured into a traditional brass tumbler and dabarah.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&q=90&auto=format&fit=crop',
    tag: 'South Indian',
    tagColor: '#7a3b1e',
    glow: 'rgba(122,59,30,0.2)',
  },
  {
    name: 'Saffron Milk',
    hindi: 'केसर दूध',
    description: 'Warm, soothing milk infused with the finest Kashmiri saffron strands, crushed pistachios and a hint of rose water.',
    image: 'https://images.unsplash.com/photo-1572715376701-98568319fd0b?w=900&q=90&auto=format&fit=crop',
    tag: 'House Special',
    tagColor: '#c4622d',
    glow: 'rgba(196,98,45,0.2)',
  },
];

/* ── Animated steam SVG paths ────────────────────────────────── */
function SteamEffect({ color = '#ffffff' }) {
  return (
    <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '70px', pointerEvents: 'none' }}>
      {[
        { left: '20%', delay: '0s', dur: '2.4s', path: 'M10,60 Q15,45 10,30 Q5,15 12,5' },
        { left: '50%', delay: '0.8s', dur: '2s', path: 'M20,60 Q25,42 20,28 Q15,14 22,2' },
        { left: '75%', delay: '1.5s', dur: '2.7s', path: 'M30,60 Q35,44 30,30 Q25,16 32,4' },
      ].map((s, i) => (
        <svg key={i} style={{
          position: 'absolute',
          left: s.left,
          bottom: 0,
          width: '40px',
          height: '70px',
          overflow: 'visible',
          opacity: 0,
          animation: `steamPathRise ${s.dur} ease-in-out ${s.delay} infinite`,
        }} viewBox="0 0 40 65">
          <path d={s.path} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
        </svg>
      ))}
      <style>{`
        @keyframes steamPathRise {
          0%   { opacity: 0; transform: translateY(10px) scaleX(0.8); }
          20%  { opacity: 0.6; }
          80%  { opacity: 0.2; }
          100% { opacity: 0; transform: translateY(-50px) scaleX(1.3); }
        }
      `}</style>
    </div>
  );
}

const ChaiExperience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header reveal */
      gsap.fromTo('.chai-head',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.chai-head', start: 'top 78%' },
        }
      );

      /* Cards stagger + glow-in */
      gsap.fromTo('.chai-card',
        { y: 80, opacity: 0, scale: 0.94, rotateX: 12 },
        {
          y: 0, opacity: 1, scale: 1, rotateX: 0,
          duration: 1.1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.chai-cards', start: 'top 72%' },
        }
      );

      /* Parallax on images */
      document.querySelectorAll('.chai-img-inner').forEach(el => {
        gsap.fromTo(el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('.chai-card'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      /* BG text reveal */
      gsap.fromTo('.chai-bg-text',
        { x: '-5%', opacity: 0 },
        {
          x: '0%', opacity: 1, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: '.chai-bg-text', start: 'top 80%' },
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '9rem 0',
        background: 'linear-gradient(180deg, #0d0500 0%, #0a0300 50%, #0d0500 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glows */}
      {['12%', '50%', '88%'].map((left, i) => (
        <div key={i} style={{
          position: 'absolute', top: '40%', left,
          transform: 'translate(-50%, -50%)',
          width: '300px', height: '300px', borderRadius: '50%',
          background: `radial-gradient(circle, ${drinks[i]?.glow || 'rgba(212,146,42,0.1)'} 0%, transparent 70%)`,
          pointerEvents: 'none', zIndex: 0,
          animation: `floatSlow ${4 + i}s ease-in-out ${i * 1.3}s infinite`,
        }} />
      ))}

      {/* Giant bg text */}
      <div className="chai-bg-text" style={{
        position: 'absolute', top: '50%', left: '-2%',
        transform: 'translateY(-50%)',
        fontFamily: "'Cormorant Garamond'",
        fontSize: 'clamp(10rem, 22vw, 22rem)',
        fontWeight: 700,
        color: 'rgba(212,146,42,0.025)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '-0.04em',
        opacity: 0,
      }}>
        CHAI
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="chai-head" style={{ textAlign: 'center', marginBottom: '6rem', opacity: 0 }}>
          <span style={{
            fontFamily: "'DM Sans'", fontSize: '0.65rem', fontWeight: 500,
            letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4922a',
            display: 'block', marginBottom: '1.2rem',
          }}>
            The Chai &amp; Coffee Experience
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 300, color: '#f5ede0', lineHeight: 1.05,
          }}>
            Brewed With <em style={{ color: '#d4922a' }}>Love & Legacy</em>
          </h2>

          {/* Animated ornament */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '1.8rem 0 1.5rem' }}>
            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to right, transparent, #d4922a)' }} />
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path d="M9 1L11 7L17 9L11 11L9 17L7 11L1 9L7 7Z" fill="#d4922a" opacity="0.8"/>
            </svg>
            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to left, transparent, #d4922a)' }} />
          </div>

          <p style={{
            fontFamily: "'DM Sans'", fontSize: '0.95rem', fontWeight: 300,
            color: '#8a6a4a', maxWidth: '460px', margin: '0 auto', lineHeight: 1.85,
          }}>
            Every cup tells the story of a recipe passed down through generations — prepared with the finest ingredients.
          </p>
        </div>

        {/* Cards */}
        <div className="chai-cards" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '2.5rem',
          perspective: '1000px',
        }}>
          {drinks.map((drink, i) => (
            <div
              key={drink.name}
              className="chai-card"
              style={{
                position: 'relative',
                borderRadius: '6px',
                overflow: 'hidden',
                background: 'linear-gradient(145deg, rgba(44,21,3,0.7), rgba(26,10,0,0.9))',
                border: '1px solid rgba(212,146,42,0.12)',
                opacity: 0,
                transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease, border-color 0.5s ease',
                cursor: 'none',
                willChange: 'transform',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px ${drink.tagColor}50, 0 0 60px ${drink.glow}`;
                e.currentTarget.style.borderColor = `${drink.tagColor}50`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(212,146,42,0.12)';
              }}
            >
              {/* Tag */}
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem', zIndex: 4,
                fontFamily: "'DM Sans'", fontSize: '0.58rem', fontWeight: 500,
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff',
                background: drink.tagColor,
                padding: '0.3rem 0.8rem', borderRadius: '1px',
                boxShadow: `0 4px 20px ${drink.glow}`,
              }}>
                {drink.tag}
              </div>

              {/* Image with parallax */}
              <div style={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                <div
                  className="chai-img-inner"
                  style={{
                    position: 'absolute', inset: '-15%',
                    backgroundImage: `url('${drink.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    willChange: 'transform',
                  }}
                />
                {/* Vignette */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(to top, rgba(26,10,0,0.95) 0%, rgba(26,10,0,0.3) 50%, transparent 100%)`,
                }} />
                {/* Steam */}
                <SteamEffect color={drink.tagColor} />
              </div>

              {/* Glowing divider */}
              <div style={{
                height: '1px',
                background: `linear-gradient(to right, transparent, ${drink.tagColor}, transparent)`,
                opacity: 0.4,
              }} />

              {/* Content */}
              <div style={{ padding: '1.8rem 1.8rem 2rem' }}>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond'",
                  fontSize: '1.7rem', fontWeight: 500,
                  color: '#f5ede0', lineHeight: 1.1, marginBottom: '0.2rem',
                }}>
                  {drink.name}
                </h3>
                <span style={{
                  fontFamily: "'Cormorant Garamond'",
                  fontSize: '0.95rem', fontStyle: 'italic',
                  color: drink.tagColor, opacity: 0.85, display: 'block', marginBottom: '1rem',
                }}>
                  {drink.hindi}
                </span>
                <p style={{
                  fontFamily: "'DM Sans'", fontSize: '0.85rem', fontWeight: 300,
                  color: '#9a7a5a', lineHeight: 1.85,
                }}>
                  {drink.description}
                </p>

                {/* Order now */}
                <div style={{
                  marginTop: '1.5rem',
                  paddingTop: '1.2rem',
                  borderTop: '1px solid rgba(212,146,42,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontFamily: "'DM Sans'", fontSize: '0.65rem', fontWeight: 500,
                    letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a4a2a',
                  }}>
                    Always Fresh
                  </span>
                  <a href="#menu" style={{
                    fontFamily: "'DM Sans'", fontSize: '0.7rem', fontWeight: 500,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: drink.tagColor,
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    transition: 'gap 0.3s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.gap = '0.7rem'}
                  onMouseLeave={e => e.currentTarget.style.gap = '0.4rem'}
                  >
                    Order
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Bottom glow */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(to right, transparent, ${drink.tagColor}, transparent)`,
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChaiExperience;
