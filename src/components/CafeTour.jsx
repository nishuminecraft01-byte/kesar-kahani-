import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tourScenes = [
  {
    id: 'entrance',
    label: '01 / Entrance',
    title: 'Step\nInside',
    subtitle: 'Where Every Visit Feels Like Coming Home',
    description: 'Warm brass door handles, hand-carved wooden arches and the first waft of cardamom — welcome to Kesar & Kahani.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1400&q=85&auto=format&fit=crop',
    color: '#d4922a',
  },
  {
    id: 'seating',
    label: '02 / Seating',
    title: 'Settle\nIn',
    subtitle: 'Traditional Craft Meets Modern Comfort',
    description: 'Teak tables aged to perfection, woven cane chairs and walls adorned with vintage Indian prints.',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1400&q=85&auto=format&fit=crop',
    color: '#c4622d',
  },
  {
    id: 'counter',
    label: '03 / Chai Counter',
    title: 'The\nHeart',
    subtitle: 'Where the Magic Happens',
    description: 'Our brass-fitted chai counter is the soul of Kesar & Kahani — watch our chai-wallahs brew masala chai with decades of craft.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85&auto=format&fit=crop',
    color: '#e6b84a',
  },
  {
    id: 'courtyard',
    label: '04 / Courtyard',
    title: 'Open\nSky',
    subtitle: 'An Urban Garden Escape',
    description: 'Jasmine vines trace the lattice above, marigold blooms line the tables. Sip your chai under the open sky.',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1400&q=85&auto=format&fit=crop',
    color: '#a0522d',
  },
];

const CafeTour = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth - track.clientWidth;

      /* ── Horizontal scroll pin ─────────────────────────────── */
      const hScroll = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth * 1.4}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = (self.progress * 100) + '%';
            }
            // Activate scene labels
            const idx = Math.floor(self.progress * tourScenes.length);
            document.querySelectorAll('.scene-dot').forEach((d, i) => {
              d.style.background = i === Math.min(idx, tourScenes.length - 1) ? '#d4922a' : 'rgba(212,146,42,0.2)';
              d.style.transform = i === Math.min(idx, tourScenes.length - 1) ? 'scale(1.6)' : 'scale(1)';
            });
          },
        },
      });

      /* ── Per-scene animations (triggered by horizontal position) */
      document.querySelectorAll('.scene-card').forEach((card, i) => {
        const img = card.querySelector('.scene-img');
        const label = card.querySelector('.scene-label');
        const title = card.querySelector('.scene-title');
        const body = card.querySelector('.scene-body');

        gsap.fromTo(img,
          { scale: 1.15, filter: 'brightness(0.6)' },
          {
            scale: 1, filter: 'brightness(1)',
            scrollTrigger: {
              trigger: card,
              start: 'left right',
              end: 'center center',
              scrub: true,
              containerAnimation: hScroll,
            },
          }
        );

        gsap.fromTo([label, title, body],
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: hScroll,
              start: 'left 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ── Section header ─────────────────────────────────────── */
      gsap.fromTo('.tour-intro',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.tour-intro', start: 'top 80%' },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cafe-tour"
      ref={sectionRef}
      style={{
        background: '#0d0500',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section intro (above the pin) */}
      <div className="tour-intro" style={{
        textAlign: 'center',
        padding: '7rem 2rem 4rem',
        position: 'relative',
        zIndex: 1,
        opacity: 0,
      }}>
        <span style={{
          fontFamily: "'DM Sans'", fontSize: '0.65rem', fontWeight: 500,
          letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4922a', display: 'block',
          marginBottom: '1.2rem',
        }}>
          Virtual Café Tour
        </span>
        <h2 style={{
          fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 300, color: '#f5ede0', lineHeight: 1.05,
        }}>
          Walk Through <em style={{ color: '#d4922a' }}>Our World</em>
        </h2>
        <p style={{
          fontFamily: "'DM Sans'", fontSize: '0.9rem', fontWeight: 300,
          color: '#8a6a4a', marginTop: '1rem',
          letterSpacing: '0.05em',
        }}>
          Scroll to explore each space →
        </p>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem' }}>
          {tourScenes.map((_, i) => (
            <div
              key={i}
              className="scene-dot"
              style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: i === 0 ? '#d4922a' : 'rgba(212,146,42,0.2)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div style={{ overflow: 'hidden' }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            width: `${tourScenes.length * 100}vw`,
            willChange: 'transform',
          }}
        >
          {tourScenes.map((scene, i) => (
            <div
              key={scene.id}
              className="scene-card"
              style={{
                width: '100vw',
                height: '100vh',
                flexShrink: 0,
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                overflow: 'hidden',
              }}
            >
              {/* Background image */}
              <div
                className="scene-img"
                style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url('${scene.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transformOrigin: 'center',
                  willChange: 'transform, filter',
                }}
              />

              {/* Dark gradient from bottom */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(13,5,0,0.97) 0%, rgba(13,5,0,0.4) 45%, transparent 70%)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse at 20% 80%, ${scene.color}0a 0%, transparent 60%)`,
              }} />

              {/* Scene number large */}
              <div style={{
                position: 'absolute', top: '8vh', right: '6vw',
                fontFamily: "'Cormorant Garamond'",
                fontSize: 'clamp(6rem, 14vw, 12rem)',
                fontWeight: 700,
                color: `${scene.color}18`,
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Gold corner accents */}
              <div style={{
                position: 'absolute', top: '2rem', left: '2rem',
                width: '50px', height: '50px',
                borderTop: `2px solid ${scene.color}60`,
                borderLeft: `2px solid ${scene.color}60`,
              }} />
              <div style={{
                position: 'absolute', bottom: '2rem', right: '2rem',
                width: '50px', height: '50px',
                borderBottom: `2px solid ${scene.color}60`,
                borderRight: `2px solid ${scene.color}60`,
              }} />

              {/* Content */}
              <div style={{
                position: 'relative', zIndex: 5,
                padding: '0 6vw 8vh',
                maxWidth: '700px',
              }}>
                <span
                  className="scene-label"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                    fontFamily: "'DM Sans'", fontSize: '0.65rem', fontWeight: 500,
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: scene.color, marginBottom: '1.2rem',
                    opacity: 0,
                  }}
                >
                  <span style={{ width: '20px', height: '1px', background: scene.color, display: 'inline-block' }} />
                  {scene.label}
                </span>

                <h3
                  className="scene-title"
                  style={{
                    fontFamily: "'Cormorant Garamond'",
                    fontSize: 'clamp(3rem, 7vw, 6rem)',
                    fontWeight: 300,
                    color: '#f5ede0',
                    lineHeight: 0.95,
                    marginBottom: '1.5rem',
                    whiteSpace: 'pre-line',
                    opacity: 0,
                  }}
                >
                  {scene.title}
                </h3>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '2px', background: `linear-gradient(to bottom, ${scene.color}, transparent)`, alignSelf: 'stretch', flexShrink: 0, minHeight: '60px' }} />
                  <div className="scene-body" style={{ opacity: 0 }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond'",
                      fontSize: '1.15rem', fontStyle: 'italic',
                      color: scene.color, marginBottom: '0.6rem',
                    }}>
                      {scene.subtitle}
                    </p>
                    <p style={{
                      fontFamily: "'DM Sans'",
                      fontSize: '0.9rem', fontWeight: 300,
                      color: '#c4a47a', lineHeight: 1.85,
                      maxWidth: '400px',
                    }}>
                      {scene.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '2px', background: 'rgba(212,146,42,0.1)',
        zIndex: 20,
      }}>
        <div
          ref={progressRef}
          style={{
            height: '100%',
            background: 'linear-gradient(to right, #7a3b1e, #d4922a, #e6b84a)',
            width: '0%',
            transition: 'width 0.1s',
            boxShadow: '0 0 12px #d4922a',
          }}
        />
      </div>
    </section>
  );
};

export default CafeTour;
