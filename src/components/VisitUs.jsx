import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OrnamentalDivider } from './UIElements';

gsap.registerPlugin(ScrollTrigger);

const hours = [
  { day: 'Monday – Friday', time: '8:00 AM – 10:00 PM' },
  { day: 'Saturday', time: '7:30 AM – 11:00 PM' },
  { day: 'Sunday', time: '7:30 AM – 10:30 PM' },
  { day: 'Public Holidays', time: '9:00 AM – 9:00 PM' },
];

const VisitUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.visit-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.visit-cards', start: 'top 70%' },
        }
      );
      gsap.fromTo('.visit-header > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.visit-header', start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="visit"
      ref={sectionRef}
      style={{
        padding: '8rem 0 0',
        background: 'linear-gradient(180deg, #1a0a00, #0d0500)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top border */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent, #d4922a 30%, #d4922a 70%, transparent)',
      }} />

      <div className="container">
        {/* Header */}
        <div className="visit-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="section-label">Visit Us</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 300,
            color: '#f5ede0',
            lineHeight: 1.05,
          }}>
            Come Find Us<br />
            <em style={{ color: '#d4922a' }}>We're Waiting</em>
          </h2>
          <OrnamentalDivider />
        </div>

        {/* Info cards grid */}
        <div
          className="visit-cards"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          {/* Address */}
          <div
            className="visit-card"
            style={{
              background: 'linear-gradient(145deg, rgba(61,31,10,0.5), rgba(44,21,3,0.7))',
              border: '1px solid rgba(212,146,42,0.15)',
              borderRadius: '4px',
              padding: '2rem',
            }}
          >
            <div style={{ marginBottom: '1.2rem' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 3C11.03 3 7 7.03 7 12c0 7.5 9 17 9 17s9-9.5 9-17c0-4.97-4.03-9-9-9z" stroke="#d4922a" strokeWidth="1.5"/>
                <circle cx="16" cy="12" r="3" stroke="#d4922a" strokeWidth="1.5"/>
              </svg>
            </div>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4922a', fontFamily: "'DM Sans', sans-serif" }}>Address</span>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: '#f5ede0', margin: '0.5rem 0', fontWeight: 400 }}>
              Kesar &amp; Kahani Café
            </h4>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 300, color: '#c4a47a', lineHeight: 1.7 }}>
              Shop 12, Pali Hill Road,<br />
              Bandra West,<br />
              Mumbai – 400050,<br />
              Maharashtra, India
            </p>
          </div>

          {/* Hours */}
          <div
            className="visit-card"
            style={{
              background: 'linear-gradient(145deg, rgba(61,31,10,0.5), rgba(44,21,3,0.7))',
              border: '1px solid rgba(212,146,42,0.15)',
              borderRadius: '4px',
              padding: '2rem',
            }}
          >
            <div style={{ marginBottom: '1.2rem' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="#d4922a" strokeWidth="1.5"/>
                <path d="M16 9v7l4 4" stroke="#d4922a" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4922a', fontFamily: "'DM Sans', sans-serif" }}>Opening Hours</span>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {hours.map(h => (
                <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid rgba(212,146,42,0.1)', paddingBottom: '0.5rem' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', fontWeight: 300, color: '#c4a47a' }}>{h.day}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', fontWeight: 400, color: '#f5ede0', whiteSpace: 'nowrap' }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div
            className="visit-card"
            style={{
              background: 'linear-gradient(145deg, rgba(61,31,10,0.5), rgba(44,21,3,0.7))',
              border: '1px solid rgba(212,146,42,0.15)',
              borderRadius: '4px',
              padding: '2rem',
            }}
          >
            <div style={{ marginBottom: '1.2rem' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M6 6h20v20H6z" stroke="#d4922a" strokeWidth="1.5" rx="2"/>
                <path d="M6 10l10 7 10-7" stroke="#d4922a" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4922a', fontFamily: "'DM Sans', sans-serif" }}>Get in Touch</span>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a
                href="tel:+919876543210"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.7rem',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem',
                  fontWeight: 300, color: '#c4a47a',
                  textDecoration: 'none', transition: 'color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#e6b84a'}
                onMouseLeave={e => e.currentTarget.style.color = '#c4a47a'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2h3l1.5 4-2 1.2A10 10 0 0 0 8.8 10.5L10 8.5l4 1.5v3A1 1 0 0 1 13 14 11 11 0 0 1 2 3a1 1 0 0 1 1-1z" stroke="#d4922a" strokeWidth="1.2"/>
                </svg>
                +91 98765 43210
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.8rem',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem',
                  fontWeight: 500, letterSpacing: '0.1em',
                  color: '#1a0a00',
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  padding: '0.7rem 1.2rem', borderRadius: '2px',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.535 5.845L.057 23.5a.5.5 0 0 0 .623.624l5.755-1.469A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.65-.52-5.153-1.424l-.37-.22-3.813.975.994-3.731-.24-.383A10 10 0 1 1 12 22z"/>
                </svg>
                Chat on WhatsApp
              </a>
              <a
                href="https://instagram.com/kesarandkahani"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.8rem',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem',
                  fontWeight: 400, letterSpacing: '0.1em',
                  color: '#f5ede0',
                  background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                  padding: '0.7rem 1.2rem', borderRadius: '2px',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(220,39,67,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                @kesarandkahani
              </a>
            </div>
          </div>
        </div>

        {/* Google Maps embed */}
        <div style={{
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid rgba(212,146,42,0.2)',
          marginBottom: '0',
          position: 'relative',
        }}>
          {/* Map overlay label */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            zIndex: 1,
            background: 'linear-gradient(135deg, rgba(26,10,0,0.95), rgba(44,21,3,0.95))',
            border: '1px solid rgba(212,146,42,0.3)',
            borderRadius: '4px',
            padding: '0.8rem 1.2rem',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: '#e6b84a', fontWeight: 500 }}>
              Kesar &amp; Kahani
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#c4a47a', marginTop: '0.2rem' }}>
              Bandra West, Mumbai
            </div>
          </div>
          <iframe
            title="Kesar & Kahani Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4!2d72.8311!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzM0LjYiTiA3MsKwNDknNTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="420"
            style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg) saturate(0.6) brightness(0.8)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default VisitUs;

