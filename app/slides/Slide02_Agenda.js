'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle } from '../components/SlideLayout';

const SECTIONS = [
  {
    num: '01',
    title: 'Background',
    items: ['What is Blockchain?', 'Bitcoin & Ethereum Mechanics', 'Transaction Anatomy', 'Mining & Consensus'],
    color: '#c9940a',
  },
  {
    num: '02',
    title: 'Research Context',
    items: ['Research Landscape', 'Data Sources', 'Existing Tools & Limitations', 'The Problem Statement'],
    color: '#e87c2a',
  },
  {
    num: '03',
    title: 'The Framework',
    items: ['Architecture Overview', 'Two-Step Workflow', 'Scala Library APIs', 'Database Integration'],
    color: '#f0b429',
  },
  {
    num: '04',
    title: 'Case Studies',
    items: ['Basic Blockchain View', 'OP_RETURN Metadata', 'Exchange Rates', 'Transaction Fees & Address Tags'],
    color: '#fac87c',
  },
  {
    num: '05',
    title: 'Evaluation',
    items: ['SQL vs NoSQL Performance', 'Comparative Analysis', 'Scalability Experiments', 'Tool Comparison'],
    color: '#c9940a',
  },
  {
    num: '06',
    title: 'Conclusions',
    items: ['Limitations & Future Work', 'Open Source Impact', 'Key Contributions', 'Q & A'],
    color: '#e87c2a',
  },
];

export default function Slide02_Agenda() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      {/* Ambient background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(240,180,41,0.04) 0%, transparent 70%)',
      }} />

      <SectionTag>Presentation Structure</SectionTag>
      <SlideTitle>Agenda</SlideTitle>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        width: '100%',
        maxWidth: '1100px',
        marginTop: '16px',
      }}>
        {SECTIONS.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-mid)',
              borderRadius: '16px',
              padding: '20px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top accent line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: `linear-gradient(90deg, ${section.color}80, ${section.color}30, transparent)`,
            }} />

            {/* Number */}
            <div style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '2.5rem',
              fontWeight: 800,
              color: section.color,
              opacity: 0.2,
              lineHeight: 1,
              marginBottom: '12px',
            }}>
              {section.num}
            </div>

            {/* Title */}
            <div style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--ivory-100)',
              marginBottom: '14px',
              letterSpacing: '-0.01em',
            }}>
              {section.title}
            </div>

            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {section.items.map((item, j) => (
                <div key={j} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <div style={{
                    width: '4px', height: '4px',
                    borderRadius: '50%',
                    background: section.color,
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-space)',
                    fontSize: '0.75rem',
                    color: 'var(--ivory-600)',
                    lineHeight: 1.4,
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{
          display: 'flex',
          gap: '32px',
          marginTop: '24px',
          padding: '14px 28px',
          background: 'rgba(240,180,41,0.04)',
          border: '1px solid rgba(240,180,41,0.12)',
          borderRadius: '12px',
        }}
      >
        {[
          { v: '48', l: 'Slides' },
          { v: '40+', l: 'Minutes' },
          { v: '5', l: 'Case Studies' },
          { v: '2', l: 'Blockchains' },
          { v: '33', l: 'References' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-syne)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold-bright)' }}>{s.v}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.l}</div>
          </div>
        ))}
      </motion.div>
    </SlideLayout>
  );
}
