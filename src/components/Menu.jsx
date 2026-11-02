import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OrnamentalDivider } from './UIElements';

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  {
    id: 1,
    name: 'Cutting Chai',
    hindi: 'कटिंग चाय',
    category: 'Chai',
    price: '₹40',
    description: 'The classic Mumbai street-style half-cup of strong, sweet tea. Served piping hot in a small glass.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80&auto=format&fit=crop',
    badge: 'Street Classic',
    badgeColor: '#c4622d',
  },
  {
    id: 2,
    name: 'Masala Chai',
    hindi: 'मसाला चाय',
    category: 'Chai',
    price: '₹70',
    description: 'Full-bodied Assam tea with hand-ground ginger, cardamom, cinnamon and black pepper. Our bestseller.',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80&auto=format&fit=crop',
    badge: 'Best Seller',
    badgeColor: '#d4922a',
  },
  {
    id: 3,
    name: 'Filter Coffee',
    hindi: 'फिल्टर कॉफ़ी',
    category: 'Coffee',
    price: '₹90',
    description: 'Authentic South Indian coffee with strong decoction, served in a traditional brass tumbler & dabarah.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80&auto=format&fit=crop',
    badge: 'South Indian',
    badgeColor: '#7a3b1e',
  },
  {
    id: 4,
    name: 'Bun Maska',
    hindi: 'बन मस्का',
    category: 'Bites',
    price: '₹60',
    description: 'Soft Irani-style bun generously slathered with white butter. The perfect companion for chai.',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&q=80&auto=format&fit=crop',
    badge: 'Irani Classic',
    badgeColor: '#7a3b1e',
  },
  {
    id: 5,
    name: 'Samosa',
    hindi: 'समोसा',
    category: 'Bites',
    price: '₹50',
    description: 'Flaky, golden pastry filled with spiced potatoes and green peas. Served with mint chutney and tamarind.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80&auto=format&fit=crop',
    badge: 'Freshly Fried',
    badgeColor: '#c4622d',
  },
  {
    id: 6,
    name: 'Paneer Tikka Sandwich',
    hindi: 'पनीर टिक्का सैंडविच',
    category: 'Mains',
    price: '₹180',
    description: 'Chargrilled paneer tikka, onion rings, green chutney and masala mayo in toasted multigrain bread.',
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=600&q=80&auto=format&fit=crop',
    badge: 'Chef\'s Pick',
    badgeColor: '#d4922a',
  },
  {
    id: 7,
    name: 'Mumbai Vada Pav',
    hindi: 'वड़ा पाव',
    category: 'Mains',
    price: '₹60',
    description: 'Mumbai\'s beloved street food — spiced potato vada in a pav, with three chutneys and fried green chilli.',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80&auto=format&fit=crop',
    badge: 'Mumbai Soul',
    badgeColor: '#c4622d',
  },
  {
    id: 8,
    name: 'Cheese Maggi',
    hindi: 'चीज़ मैगी',
    category: 'Mains',
    price: '₹120',
    description: 'The ultimate comfort food — Maggi noodles cooked with masala, veggies and smothered in melted cheese.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80&auto=format&fit=crop',
    badge: 'Comfort Food',
    badgeColor: '#7a3b1e',
  },
];

const categories = ['All', 'Chai', 'Coffee', 'Bites', 'Mains'];

const Menu = () => {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(i => i.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.menu-header > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.menu-header', start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate cards when category changes
  useEffect(() => {
    gsap.fromTo('.menu-card-item',
      { y: 30, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out' }
    );
  }, [activeCategory]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      style={{
        padding: '8rem 0',
        background: 'linear-gradient(180deg, #1a0a00, #0d0500 40%, #1a0a00)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative brass motif */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent, #d4922a 30%, #d4922a 70%, transparent)',
      }} />

      <div className="container">
        {/* Header */}
        <div className="menu-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label">Signature Menu</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 300,
            color: '#f5ede0',
            lineHeight: 1.05,
            marginBottom: '1rem',
          }}>
            Flavours That<br />
            <em style={{ color: '#d4922a' }}>Tell Stories</em>
          </h2>
          <OrnamentalDivider />
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            fontWeight: 300,
            color: '#c4a47a',
            maxWidth: '460px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.8,
          }}>
            From the lanes of Mumbai to your cup — each item is crafted with love and the freshest ingredients.
          </p>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '0.55rem 1.4rem',
                  borderRadius: '2px',
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  borderColor: activeCategory === cat ? '#d4922a' : 'rgba(212,146,42,0.25)',
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, #e6b84a, #d4922a)'
                    : 'transparent',
                  color: activeCategory === cat ? '#1a0a00' : '#c4a47a',
                }}
                onMouseEnter={e => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.borderColor = 'rgba(212,146,42,0.6)';
                    e.currentTarget.style.color = '#e6b84a';
                  }
                }}
                onMouseLeave={e => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.borderColor = 'rgba(212,146,42,0.25)';
                    e.currentTarget.style.color = '#c4a47a';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              className="menu-card-item"
              style={{
                background: 'linear-gradient(145deg, rgba(61,31,10,0.5), rgba(44,21,3,0.7))',
                border: '1px solid rgba(212,146,42,0.12)',
                borderRadius: '4px',
                overflow: 'hidden',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 24px 50px rgba(0,0,0,0.5)';
                e.currentTarget.style.borderColor = 'rgba(212,146,42,0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(212,146,42,0.12)';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  height: '200px',
                  backgroundImage: `url('${item.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.6s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                {/* Badge */}
                <span style={{
                  position: 'absolute',
                  top: '0.8rem',
                  left: '0.8rem',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#f5ede0',
                  background: item.badgeColor,
                  padding: '0.25rem 0.7rem',
                  borderRadius: '1px',
                }}>
                  {item.badge}
                </span>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '60px',
                  background: 'linear-gradient(to top, rgba(44,21,3,0.95), transparent)',
                }} />
              </div>

              {/* Content */}
              <div style={{ padding: '1.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                  <div>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.35rem',
                      fontWeight: 500,
                      color: '#f5ede0',
                      lineHeight: 1.1,
                    }}>
                      {item.name}
                    </h3>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '0.85rem',
                      fontStyle: 'italic',
                      color: '#d4922a',
                      opacity: 0.7,
                    }}>
                      {item.hindi}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#e6b84a',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.price}
                  </span>
                </div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.82rem',
                  fontWeight: 300,
                  color: '#c4a47a',
                  lineHeight: 1.75,
                  marginBottom: '1rem',
                }}>
                  {item.description}
                </p>

                {/* Order button */}
                <button style={{
                  width: '100%',
                  padding: '0.6rem',
                  background: 'transparent',
                  border: '1px solid rgba(212,146,42,0.3)',
                  borderRadius: '2px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#d4922a',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(230,184,74,0.15), rgba(212,146,42,0.1))';
                  e.currentTarget.style.borderColor = '#d4922a';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(212,146,42,0.3)';
                }}
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View full menu CTA */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a
            href="#visit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#1a0a00',
              background: 'linear-gradient(135deg, #e6b84a, #d4922a)',
              padding: '1rem 2.5rem',
              borderRadius: '2px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 4px 20px rgba(212,146,42,0.25)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(212,146,42,0.45)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,146,42,0.25)';
            }}
          >
            View Full Menu &amp; Visit Us
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          #menu [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Menu;

