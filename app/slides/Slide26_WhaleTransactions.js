'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

// Top 5 whale transactions from Figure 9
const WHALES = [
  { fee: '$136,243.37', date: '2016-04-26', hash: 'cc455ae8...1c570d', rank: 1 },
  { fee: '$56,493.50', date: '2017-01-04', hash: 'd38bd671...e6380', rank: 2 },
  { fee: '$39,502.15', date: '2017-05-31', hash: 'cb95ab3a...a00c4', rank: 3 },
  { fee: '$25,095.71', date: '2017-05-31', hash: '8e12a1ab...d9b75', rank: 4 },
  { fee: '$23,518.00', date: '2013-08-28', hash: '4ed20e07...4537', rank: 5 },
];

export default function Slide26_WhaleTransactions() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Case Study 04 — Whale Detection</SectionTag>
      <SlideTitle>Whale Transactions</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '24px' }}>
        Transactions with fee &gt; x̄ + 2σ = $24.58 USD. 242,839 whale transactions identified across the dataset.
      </SlideSubtitle>

      <div style={{ width: '100%', maxWidth: '1060px' }}>
        {/* Statistical formula */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: '20px', marginBottom: '24px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {[
            { label: 'Mean Fee (x̄)', value: '$0.41 USD', color: '#f0b429' },
            { label: 'Std Dev (σ)', value: '$12.09 USD', color: '#e87c2a' },
            { label: 'Whale Threshold', value: 'x̄ + 2σ = $24.58', color: '#c9940a' },
            { label: 'Whales Detected', value: '242,839', color: '#f0b429' },
          ].map((s, i) => (
            <div key={i} style={{
              background: `${s.color}10`, border: `1px solid ${s.color}30`, borderRadius: '16px',
              padding: '16px 24px', textAlign: 'center', minWidth: '160px',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', letterSpacing: '0.08em', marginBottom: '6px' }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '1.2rem', fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Whale table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '20px', overflow: 'hidden', marginBottom: '20px' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 1fr', background: 'rgba(240,180,41,0.06)', borderBottom: '1px solid var(--border-mid)' }}>
            {['#', 'Fee (USD)', 'Date', 'Transaction Hash'].map((h,i) => (
              <div key={i} style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</div>
            ))}
          </div>
          {WHALES.map((w, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }}
              style={{
                display: 'grid', gridTemplateColumns: '60px 1fr 1fr 1fr',
                borderBottom: i < WHALES.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                background: i === 0 ? 'rgba(240,180,41,0.05)' : 'transparent',
              }}
            >
              <div style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold-bright)', fontWeight: 700 }}>#{w.rank}</div>
              <div style={{ padding: '14px 16px', fontFamily: 'var(--font-syne)', fontSize: '0.9rem', fontWeight: 700, color: i === 0 ? 'var(--gold-bright)' : 'var(--ivory-200)' }}>{w.fee}</div>
              <div style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ivory-600)' }}>{w.date}</div>
              <div style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ivory-600)' }}>{w.hash}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          style={{ background: 'rgba(232,124,42,0.06)', border: '1px solid rgba(232,124,42,0.2)', borderRadius: '14px', padding: '14px 20px', fontFamily: 'var(--font-space)', fontSize: '0.78rem', color: 'var(--ivory-600)', lineHeight: 1.6 }}
        >
          <strong style={{ color: '#e87c2a' }}>Liao & Katz (2017)</strong> — referenced in the paper — studied whale transactions as a mechanism for incentivizing blockchain forks. Our framework reproduces and extends their dataset trivially.
        </motion.div>
      </div>
    </SlideLayout>
  );
}
