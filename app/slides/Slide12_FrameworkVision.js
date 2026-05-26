'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const PILLARS = [
  { num: '01', title: 'Generality', desc: 'Supports multiple blockchains (Bitcoin & Ethereum) and multiple database backends (MySQL & MongoDB) through a unified API.', icon: '◈' },
  { num: '02', title: 'Extensibility', desc: 'Open-source Scala library designed for community contributions. New blockchains, databases, and data sources can be added without core changes.', icon: '◉' },
  { num: '03', title: 'Reusability', desc: 'Common operations (scanning, filtering, aggregating) are implemented once. Researchers build analytics by composing existing primitives.', icon: '◇' },
  { num: '04', title: 'External Data', desc: 'First-class support for enriching blockchain data with exchange rates, address tags, IP addresses, and other external sources.', icon: '◎' },
];

export default function Slide12_FrameworkVision() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(240,180,41,0.05) 0%, transparent 70%)',
      }} />

      <SectionTag>Our Framework</SectionTag>
      <SlideTitle>Framework Vision</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '36px' }}>
        A general-purpose abstraction layer for blockchain data analytics — built on software engineering best practices.
      </SlideSubtitle>

      {/* Central vision statement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{
          background: 'linear-gradient(135deg, rgba(240,180,41,0.1) 0%, rgba(201,148,10,0.05) 100%)',
          border: '1px solid rgba(240,180,41,0.3)',
          borderRadius: '20px',
          padding: '24px 36px',
          maxWidth: '750px',
          textAlign: 'center',
          marginBottom: '36px',
          position: 'relative',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '80%', height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--gold-bright), transparent)',
        }} />
        <div style={{
          fontFamily: 'var(--font-syne)',
          fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
          fontWeight: 600,
          color: 'var(--ivory-100)',
          lineHeight: 1.5,
          letterSpacing: '-0.01em',
        }}>
          "An efficient, modular, and general-purpose abstraction layer to manage internal and external information
          — key for blockchain data analytics."
        </div>
        <div style={{
          marginTop: '14px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--gold-mid)',
          letterSpacing: '0.08em',
        }}>
          — Bartoletti et al., 2017
        </div>
      </motion.div>

      {/* Four pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width: '100%', maxWidth: '1100px' }}>
        {PILLARS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-mid)',
              borderRadius: '18px',
              padding: '24px 20px',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            {/* Subtle top glow */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: '60%', height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(240,180,41,0.5), transparent)',
            }} />

            <div style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '1.8rem',
              color: 'rgba(240,180,41,0.2)',
              marginBottom: '12px',
            }}>
              {p.icon}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--gold-mid)',
              letterSpacing: '0.12em',
              marginBottom: '8px',
            }}>
              {p.num}
            </div>
            <div style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--gold-bright)',
              marginBottom: '12px',
              letterSpacing: '-0.01em',
            }}>
              {p.title}
            </div>
            <div style={{
              fontFamily: 'var(--font-space)',
              fontSize: '0.74rem',
              color: 'var(--ivory-600)',
              lineHeight: 1.65,
            }}>
              {p.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  );
}
