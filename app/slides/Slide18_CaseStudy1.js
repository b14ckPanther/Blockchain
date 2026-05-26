'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const STUDIES = [
  { num: '01', title: 'Basic Blockchain View', desc: 'Transaction graph with inputs, outputs, timestamps. Foundation for all other analyses.', tag: 'Section 3.1', color: '#f0b429' },
  { num: '02', title: 'OP_RETURN Metadata', desc: 'Analyzing embedded protocol metadata in Bitcoin transaction outputs (Colu, Omni, Blockstore…)', tag: 'Section 3.2', color: '#e87c2a' },
  { num: '03', title: 'Exchange Rates', desc: 'Correlating BTC transaction values with USD/BTC exchange rate from Coindesk APIs.', tag: 'Section 3.3', color: '#c9940a' },
  { num: '04', title: 'Transaction Fees', desc: 'Deep-scan analysis to compute fees, whale detection: x̄ + 2σ threshold = 242K whales found.', tag: 'Section 3.4', color: '#fac87c' },
  { num: '05', title: 'Address Tags', desc: 'Associating outputs with tagged addresses from blockchain.info. SatoshiDice case study.', tag: 'Section 3.5', color: '#f0b429' },
];

export default function Slide18_CaseStudy1() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(240,180,41,0.04) 0%, transparent 70%)' }} />
      <SectionTag>Case Studies</SectionTag>
      <SlideTitle>Five Analytics Case Studies</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '32px' }}>
        All developed for Bitcoin (Sections 3.1–3.5). Ethereum examples available on GitHub.
      </SlideSubtitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '900px' }}>
        {STUDIES.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22,1,0.36,1] }}
            style={{
              background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '16px',
              padding: '18px 24px', display: 'flex', alignItems: 'center', gap: '20px',
            }}
          >
            <div style={{ fontFamily: 'var(--font-syne)', fontSize: '2rem', fontWeight: 800, color: s.color, opacity: 0.3, minWidth: '60px', lineHeight: 1 }}>{s.num}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '1rem', fontWeight: 700, color: 'var(--ivory-100)', marginBottom: '5px' }}>{s.title}</div>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.78rem', color: 'var(--ivory-600)', lineHeight: 1.5 }}>{s.desc}</div>
            </div>
            <div style={{ padding: '5px 14px', background: `${s.color}15`, border: `1px solid ${s.color}30`, borderRadius: '100px', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: s.color, whiteSpace: 'nowrap' }}>
              {s.tag}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        style={{ marginTop: '20px', fontFamily: 'var(--font-space)', fontSize: '0.78rem', color: 'var(--ivory-600)', textAlign: 'center' }}>
        Each case study: (1) defines the view, (2) provides Scala code, (3) shows query and result visualization.
      </motion.div>
    </SlideLayout>
  );
}
