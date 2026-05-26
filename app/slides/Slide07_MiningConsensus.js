'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

function MiningSimulation() {
  const [nonce, setNonce] = useState(0);
  const [found, setFound] = useState(false);
  const [mining, setMining] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const intervalRef = useRef(null);
  const targetRef = useRef('000');

  const startMining = () => {
    if (mining) return;
    setMining(true);
    setFound(false);
    setAttempts(0);
    let n = 0;
    intervalRef.current = setInterval(() => {
      n++;
      const hash = Math.random().toString(16).slice(2, 18);
      setNonce(n);
      setAttempts(a => a + 1);
      // Simulate finding a block (probability ~1/500)
      if (Math.random() < 0.005 || n > 2000) {
        clearInterval(intervalRef.current);
        setFound(true);
        setMining(false);
      }
    }, 20);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setNonce(0);
    setFound(false);
    setMining(false);
    setAttempts(0);
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const hashDisplay = found
    ? `000${Math.random().toString(16).slice(2, 16)}`
    : `${Math.random().toString(16).slice(2, 18)}`;

  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-mid)',
      borderRadius: '16px',
      padding: '20px',
      fontFamily: 'var(--font-mono)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ fontSize: '0.65rem', color: 'var(--gold-bright)', letterSpacing: '0.1em' }}>
          PROOF OF WORK SIMULATOR
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={startMining}
            disabled={mining}
            style={{
              background: mining ? 'rgba(255,255,255,0.05)' : 'rgba(240,180,41,0.12)',
              border: `1px solid ${mining ? 'var(--border-mid)' : 'rgba(240,180,41,0.4)'}`,
              borderRadius: '8px',
              padding: '6px 14px',
              color: mining ? 'var(--ivory-600)' : 'var(--gold-bright)',
              cursor: mining ? 'default' : 'pointer',
              fontSize: '0.65rem',
            }}
          >
            {mining ? 'MINING...' : 'START MINE'}
          </button>
          <button
            onClick={reset}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-mid)',
              borderRadius: '8px',
              padding: '6px 14px',
              color: 'var(--ivory-600)',
              cursor: 'pointer',
              fontSize: '0.65rem',
            }}
          >
            RESET
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '0.6rem', color: 'var(--ivory-600)', marginBottom: '4px' }}>CURRENT NONCE</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 500, color: 'var(--gold-pale)' }}>
            {nonce.toLocaleString()}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.6rem', color: 'var(--ivory-600)', marginBottom: '4px' }}>ATTEMPTS</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 500, color: 'var(--amber-300)' }}>
            {attempts.toLocaleString()}
          </div>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <div style={{ fontSize: '0.6rem', color: 'var(--ivory-600)', marginBottom: '4px' }}>HASH OUTPUT</div>
          <div style={{
            fontSize: '0.75rem',
            color: found ? '#6dcc6d' : (mining ? 'var(--ivory-400)' : 'var(--ivory-600)'),
            padding: '8px 12px',
            background: found ? 'rgba(109,204,109,0.08)' : 'rgba(0,0,0,0.3)',
            borderRadius: '8px',
            border: `1px solid ${found ? 'rgba(109,204,109,0.3)' : 'var(--border-subtle)'}`,
            transition: 'all 0.2s',
            wordBreak: 'break-all',
          }}>
            {found ? `000${Math.random().toString(16).slice(2, 13)}` : (mining ? `${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}${Math.random().toString(16).slice(2, 14)}` : '— awaiting hash —')}
          </div>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <div style={{ fontSize: '0.6rem', color: 'var(--ivory-600)', marginBottom: '6px' }}>TARGET: starts with 000...</div>
          <div style={{
            height: '6px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '3px',
            overflow: 'hidden',
          }}>
            <motion.div
              style={{
                height: '100%',
                background: found
                  ? 'linear-gradient(90deg, #6dcc6d, #3daa3d)'
                  : 'linear-gradient(90deg, var(--gold-bright), var(--amber-300))',
                borderRadius: '3px',
              }}
              animate={{ width: found ? '100%' : `${Math.min((attempts / 2000) * 100, 95)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          {found && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                marginTop: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: '#6dcc6d',
                letterSpacing: '0.08em',
              }}
            >
              BLOCK FOUND — {attempts} attempts — miner earns 3.125 BTC
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Slide07_MiningConsensus() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Bitcoin Background</SectionTag>
      <SlideTitle>Mining & Consensus</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '24px' }}>
        Proof-of-Work: the cryptographic lottery that secures Bitcoin
      </SlideSubtitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', width: '100%', maxWidth: '1060px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            {
              title: 'The Puzzle',
              content: 'Find nonce R such that:\nhash(B_{i-1} || Transactions || R) < Target',
              code: true,
            },
            {
              title: 'Difficulty Adjustment',
              content: 'Every 2016 blocks (~2 weeks), the difficulty adjusts to keep block time ~10 minutes. As more hash power joins, target decreases.',
              code: false,
            },
            {
              title: 'Nakamoto Consensus',
              content: 'The longest chain (most accumulated proof-of-work) is the canonical chain. A node always extends the heaviest chain it knows about.',
              code: false,
            },
            {
              title: 'Revenue Model',
              content: 'Block reward (currently 3.125 BTC) + sum of all transaction fees in the block. Halving occurs every 210,000 blocks.',
              code: false,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-mid)',
                borderRadius: '14px',
                padding: '16px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--gold-bright)', marginBottom: '8px' }}>
                {item.title}
              </div>
              {item.code ? (
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--ivory-300, #d0ccbc)',
                  background: 'var(--bg-deep)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  lineHeight: 1.6,
                  whiteSpace: 'pre',
                }}>
                  {item.content}
                </div>
              ) : (
                <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.78rem', color: 'var(--ivory-600)', lineHeight: 1.6 }}>
                  {item.content}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <MiningSimulation />

          <div style={{
            marginTop: '14px',
            background: 'rgba(240,180,41,0.04)',
            border: '1px solid rgba(240,180,41,0.15)',
            borderRadius: '14px',
            padding: '16px',
          }}>
            <div style={{ fontFamily: 'var(--font-syne)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--ivory-200)', marginBottom: '12px' }}>
              Global Hash Rate Context
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { v: '~600 EH/s', l: 'Network Hash Rate' },
                { v: '10 min', l: 'Avg Block Time' },
                { v: '3.125 BTC', l: 'Block Reward (2024)' },
                { v: '21M', l: 'Max BTC Supply' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--font-syne)', fontSize: '1rem', fontWeight: 700, color: 'var(--gold-pale)' }}>{s.v}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', textTransform: 'uppercase' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
