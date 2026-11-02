import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: '#0d0500',
      borderTop: '1px solid rgba(212,146,42,0.15)',
      padding: '4rem 0 2rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '4rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '1.2rem' }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.8rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: '#e6b84a',
                display: 'block',
                lineHeight: 1,
              }}>
                KESAR
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.55rem',
                letterSpacing: '0.4em',
                color: '#d4922a',
                textTransform: 'uppercase',
              }}>
                &amp; KAHANI
              </span>
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 300,
              color: '#8a6a4a',
              lineHeight: 1.8,
              maxWidth: '260px',
              marginBottom: '1.5rem',
            }}>
              A premium Indian café experience rooted in tradition, crafted for the modern soul. Bandra West, Mumbai.
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1rem',
              fontStyle: 'italic',
              color: '#d4922a',
              opacity: 0.7,
            }}>
              "A little taste of India, a lot of heart."
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h5 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4922a', marginBottom: '1.2rem' }}>
              Explore
            </h5>
            {['Café Tour', 'Our Menu', 'Ambience', 'Our Story', 'Visit Us'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s/g, '-').replace('café-', 'cafe-')}`}
                style={{
                  display: 'block', marginBottom: '0.7rem',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.85rem', fontWeight: 300,
                  color: '#8a6a4a', transition: 'color 0.3s',
                }}
                onMouseEnter={e => e.target.style.color = '#d4922a'}
                onMouseLeave={e => e.target.style.color = '#8a6a4a'}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Menu highlights */}
          <div>
            <h5 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4922a', marginBottom: '1.2rem' }}>
              Fan Favourites
            </h5>
            {['Masala Chai', 'Filter Coffee', 'Vada Pav', 'Bun Maska', 'Cheese Maggi', 'Paneer Sandwich'].map(item => (
              <a
                key={item}
                href="#menu"
                style={{
                  display: 'block', marginBottom: '0.7rem',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.85rem', fontWeight: 300,
                  color: '#8a6a4a', transition: 'color 0.3s',
                }}
                onMouseEnter={e => e.target.style.color = '#d4922a'}
                onMouseLeave={e => e.target.style.color = '#8a6a4a'}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social & contact */}
          <div>
            <h5 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4922a', marginBottom: '1.2rem' }}>
              Connect
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                { label: 'Instagram', href: 'https://instagram.com/kesarandkahani', icon: '📷' },
                { label: 'WhatsApp', href: 'https://wa.me/919876543210', icon: '💬' },
                { label: 'Phone', href: 'tel:+919876543210', icon: '📞' },
                { label: 'Email', href: 'mailto:hello@kesarkahani.in', icon: '✉️' },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.85rem', fontWeight: 300,
                    color: '#8a6a4a', transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#d4922a'}
                  onMouseLeave={e => e.currentTarget.style.color = '#8a6a4a'}
                >
                  <span style={{ fontSize: '1rem' }}>{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,146,42,0.2) 30%, rgba(212,146,42,0.2) 70%, transparent)', marginBottom: '1.5rem' }} />

        {/* Copyright */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 300,
            color: '#5a3a2a',
          }}>
            © {currentYear} Kesar &amp; Kahani. All rights reserved.
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '0.85rem',
            fontStyle: 'italic',
            color: '#5a3a2a',
          }}>
            Crafted with chai &amp; care. Made in Mumbai. 🍵
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer [style*="grid-template-columns: 2fr"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          footer [style*="grid-template-columns: 2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

