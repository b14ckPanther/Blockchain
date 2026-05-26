'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle } from '../components/SlideLayout';

export default function Slide06_TransactionAnatomy() {
  const [activeIn, setActiveIn] = useState(null);
  const [activeOut, setActiveOut] = useState(null);

  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 40% at 50% 80%, rgba(240,180,41,0.03) 0%, transparent 60%)' }} />

      <SectionTag>Bitcoin Mechanics</SectionTag>
      <SlideTitle>Transaction Anatomy</SlideTitle>

      <div style={{ width: '100%', maxWidth: '1050px', marginTop: '12px' }}>
        {/* Two transactions linked */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>

          {/* Transaction t0 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-mid)',
              borderRadius: '16px',
              padding: '24px',
              width: '280px',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--gold-bright)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '16px',
              paddingBottom: '10px',
              borderBottom: '1px solid var(--border-mid)',
            }}>
              Transaction t₀
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { field: 'in', value: '···', note: 'Previous tx reference' },
                { field: 'in-script', value: '···', note: 'Unlocking script σ₀' },
                { field: 'out-script', value: 'F₀(x)', note: 'Locking condition', highlight: true },
                { field: 'value', value: 'v₀ BTC', note: 'Output amount', highlight: false },
              ].map((row, i) => (
                <div key={i} style={{
                  background: row.highlight ? 'rgba(240,180,41,0.08)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${row.highlight ? 'rgba(240,180,41,0.25)' : 'var(--border-subtle)'}`,
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold-bright)' }}>
                      {row.field}:
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ivory-200)' }}>
                      {row.value}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.65rem', color: 'var(--ivory-600)', marginTop: '2px' }}>
                    {row.note}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', textAlign: 'center', maxWidth: '120px' }}>
              t₁ redeems t₀ when F₀(σ₁) = true
            </div>
            <div style={{ fontSize: '2rem', color: 'var(--gold-bright)' }}>⟶</div>
          </motion.div>

          {/* Transaction t1 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              background: 'rgba(240,180,41,0.06)',
              border: '1px solid rgba(240,180,41,0.3)',
              borderRadius: '16px',
              padding: '24px',
              width: '280px',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--gold-bright)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '16px',
              paddingBottom: '10px',
              borderBottom: '1px solid rgba(240,180,41,0.2)',
            }}>
              Transaction t₁ (redeems t₀)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { field: 'in', value: 'hash(t₀)', note: 'Cryptographic ref to t₀', highlight: true },
                { field: 'in-script', value: 'σ₁', note: 'Must satisfy F₀(σ₁) = true', highlight: true },
                { field: 'out-script', value: '···', note: 'New locking condition' },
                { field: 'value', value: 'v₁ BTC', note: 'v₁ ≤ v₀ (diff = fee)' },
              ].map((row, i) => (
                <div key={i} style={{
                  background: row.highlight ? 'rgba(240,180,41,0.1)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${row.highlight ? 'rgba(240,180,41,0.3)' : 'var(--border-subtle)'}`,
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold-bright)' }}>
                      {row.field}:
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ivory-200)' }}>
                      {row.value}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.65rem', color: 'var(--ivory-600)', marginTop: '2px' }}>
                    {row.note}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Key insight boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', maxWidth: '900px', margin: '0 auto' }}>
          {[
            {
              title: 'UTXO Model',
              desc: 'Bitcoin uses Unspent Transaction Outputs. Every output can only be spent once — no double-spending.',
              color: '#c9940a',
            },
            {
              title: 'Script Language',
              desc: 'Out-scripts are non-Turing-complete programs. The most common is P2PKH (Pay-to-Public-Key-Hash).',
              color: '#f0b429',
            },
            {
              title: 'Transaction Fee',
              desc: 'Fee = Sum(inputs) − Sum(outputs). Goes to the miner as incentive for including the transaction.',
              color: '#e87c2a',
            },
          ].map((box, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-mid)',
                borderRadius: '14px',
                padding: '16px',
                borderTop: `2px solid ${box.color}50`,
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: box.color, letterSpacing: '0.1em', marginBottom: '8px' }}>
                {box.title}
              </div>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.75rem', color: 'var(--ivory-600)', lineHeight: 1.55 }}>
                {box.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
