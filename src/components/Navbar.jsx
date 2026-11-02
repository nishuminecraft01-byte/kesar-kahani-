import React, { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Tour', href: '#cafe-tour' },
    { label: 'Menu', href: '#menu' },
    { label: 'Ambience', href: '#ambience' },
    { label: 'Our Story', href: '#story' },
    { label: 'Visit Us', href: '#visit' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '0.8rem 2rem' : '1.4rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled
            ? 'rgba(26,10,0,0.92)'
            : 'linear-gradient(to bottom, rgba(26,10,0,0.7) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,146,42,0.15)' : 'none',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Logo */}
        <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0' }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: '#e6b84a',
            lineHeight: 1,
          }}>
            KESAR
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.55rem',
            fontWeight: 400,
            letterSpacing: '0.35em',
            color: '#d4922a',
            textTransform: 'uppercase',
          }}>
            &amp; KAHANI
          </span>
        </a>

        {/* Desktop links */}
        <ul style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center',
        }}
          className="nav-links-desktop"
        >
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#f5ede0',
                  opacity: 0.8,
                  transition: 'opacity 0.3s, color 0.3s',
                  position: 'relative',
                }}
                onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.color = '#e6b84a'; }}
                onMouseLeave={e => { e.target.style.opacity = 0.8; e.target.style.color = '#f5ede0'; }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Reserve CTA */}
        <a
          href="#visit"
          className="nav-cta"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#1a0a00',
            background: 'linear-gradient(135deg, #e6b84a, #d4922a)',
            padding: '0.65rem 1.5rem',
            borderRadius: '2px',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(212,146,42,0.4)'; }}
          onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
        >
          Reserve a Table
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
          className="nav-hamburger"
          aria-label="Toggle menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: '24px',
              height: '1.5px',
              background: '#e6b84a',
              transition: 'all 0.3s',
              transform: menuOpen
                ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                : i === 1 ? 'scaleX(0)'
                : 'translateY(-6.5px) rotate(-45deg)'
                : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(26,10,0,0.97)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2.5rem',
              fontWeight: 300,
              color: '#f5ede0',
              letterSpacing: '0.05em',
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;

