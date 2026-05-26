'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const STEPS = [
  {
    step: '01',
    label: 'Peer-to-Peer Network',
    desc: 'A decentralized network of nodes collectively maintain the Bitcoin ledger. No single server or authority controls it.',
    detail: 'Bitcoin\'s P2P network has ~10,000+ full nodes globally. Each node stores the full chain (~500GB) and validates every block independently.',
  },
  {
    step: '02',
    label: 'Transaction Broadcast',
    desc: 'A user signs a transaction with their private key and broadcasts it to the network. Miners pick it up from the mempool.',
    detail: 'Transactions propagate through ~8 hops on average, reaching most nodes within 10 seconds of broadcast.',
  },
  {
    step: '03',
    label: 'Block Assembly',
    desc: 'Miners collect unconfirmed transactions from the mempool, verify their validity, and assemble them into candidate blocks.',
    detail: 'A Bitcoin block can contain up to ~2700 transactions (depending on sizes). Miners prioritize higher-fee transactions.',
  },
  {
    step: '04',
    label: 'Proof of Work',
    desc: 'Miners compete to solve a cryptographic puzzle: find a nonce such that hash(block) < target. This requires ~10^20 computations.',
    detail: 'Target difficulty adjusts every 2016 blocks (~2 weeks) to maintain ~10 minute block intervals. As of 2024, the global hash rate exceeds 600 EH/s.',
  },
  {
    step: '05',
    label: 'Block Propagation',
    desc: 'The winning miner broadcasts the new block. Other miners verify it and immediately start mining on top of it.',
    detail: 'Block propagation to 95% of the network takes ~1 second with compact block relay (BIP 152).',
  },
  {
    step: '06',
    label: 'Confirmation',
    desc: 'With 6+ confirmations (blocks on top), a transaction is considered irreversible. The miner earns the block reward + fees.',
    detail: 'Block reward started at 50 BTC in 2009, halves every 210,000 blocks. After the 2024 halving: 3.125 BTC per block.',
  },
];

export default function Slide05_BitcoinMechanics() {
  const [active, setActive] = useState(0);

  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 40% 40% at 20% 60%, rgba(240,180,41,0.04) 0%, transparent 70%)' }} />

      <SectionTag>Bitcoin Background</SectionTag>
      <SlideTitle>How Bitcoin Works</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '28px' }}>
        The Bitcoin protocol — from transaction to confirmation
      </SlideSubtitle>

      <div style={{ display: 'flex', gap: '24px', width: '100%', maxWidth: '1100px', alignItems: 'flex-start' }}>
        {/* Step list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '280px' }}>
          {STEPS.map((s, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              onClick={() => setActive(i)}
              style={{
                background: active === i ? 'rgba(240,180,41,0.12)' : 'var(--bg-elevated)',
                border: `1px solid ${active === i ? 'rgba(240,180,41,0.4)' : 'var(--border-mid)'}`,
                borderRadius: '12px',
                padding: '12px 16px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.25s ease',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: active === i ? 'var(--gold-bright)' : 'var(--ivory-600)',
                fontWeight: 500,
                minWidth: '20px',
              }}>
                {s.step}
              </span>
              <span style={{
                fontFamily: 'var(--font-space)',
                fontSize: '0.8rem',
                color: active === i ? 'var(--ivory-100)' : 'var(--ivory-400)',
                fontWeight: active === i ? 600 : 400,
              }}>
                {s.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Detail panel */}
        <div style={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-mid)',
                borderRadius: '20px',
                padding: '32px',
                position: 'relative',
                overflow: 'hidden',
                height: '320px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Gold corner accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, var(--gold-bright), transparent)',
              }} />

              <div style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '3rem',
                fontWeight: 800,
                color: 'rgba(240,180,41,0.1)',
                lineHeight: 1,
                marginBottom: '16px',
              }}>
                {STEPS[active].step}
              </div>

              <div style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--ivory-100)',
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}>
                {STEPS[active].label}
              </div>

              <div style={{
                fontFamily: 'var(--font-space)',
                fontSize: '0.9rem',
                color: 'var(--ivory-400)',
                lineHeight: 1.7,
                marginBottom: '20px',
              }}>
                {STEPS[active].desc}
              </div>

              <div style={{
                marginTop: 'auto',
                background: 'rgba(240,180,41,0.06)',
                border: '1px solid rgba(240,180,41,0.15)',
                borderRadius: '12px',
                padding: '14px 18px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}>
                  Technical Detail
                </div>
                <div style={{
                  fontFamily: 'var(--font-space)',
                  fontSize: '0.78rem',
                  color: 'var(--ivory-600)',
                  lineHeight: 1.6,
                }}>
                  {STEPS[active].detail}
                </div>
              </div>

              {/* Step progress */}
              <div style={{
                position: 'absolute', bottom: '16px', right: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--ivory-600)',
              }}>
                {active + 1} / {STEPS.length}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SlideLayout>
  );
}
