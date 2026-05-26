'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const ANALYSES = [
  { goal: 'Anonymity', techniques: ['De-anonymisation', 'Tx clustering', 'Address tagging'], refs: 12, color: '#c9940a' },
  { goal: 'Cyber-Crime', techniques: ['DoS attacks', 'Ransomware', 'Financial fraud'], refs: 9, color: '#e87c2a' },
  { goal: 'Market Analytics', techniques: ['Economic indicators', 'Tx fees', 'Volume stats'], refs: 8, color: '#f0b429' },
  { goal: 'Metadata', techniques: ['OP_RETURN analysis', 'Protocol detection'], refs: 4, color: '#fac87c' },
  { goal: 'Security', techniques: ['Double-spending', 'Fork incentives', 'PoW analysis'], refs: 6, color: '#c9940a' },
  { goal: 'Network', techniques: ['P2P propagation', 'Node behaviour', 'Mining pools'], refs: 5, color: '#e87c2a' },
];

const SOURCES = [
  { name: 'bitcoind / Bitcoin Core', role: 'Full node RPC access', usage: 28 },
  { name: 'blockchain.info', role: 'Address tags, mempool', usage: 18 },
  { name: 'Coindesk APIs', role: 'Exchange rates BTC/USD', usage: 12 },
  { name: 'bitcoincharts.com', role: 'Historical price data', usage: 8 },
  { name: 'bitcointalk.org', role: 'Forum data, scam lists', usage: 7 },
  { name: 'web3j / Parity', role: 'Ethereum node access', usage: 6 },
];

export default function Slide09_ResearchLandscape() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(240,180,41,0.03) 0%, transparent 70%)' }} />

      <SectionTag>Research Context</SectionTag>
      <SlideTitle>The Research Landscape</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '24px' }}>
        A survey of 30+ papers reveals recurring patterns — and a critical gap.
      </SlideSubtitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', width: '100%', maxWidth: '1100px' }}>
        {/* Analysis areas */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--ivory-600)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}>
            Analysis Categories in Literature
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ANALYSES.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-mid)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div style={{
                  width: '8px', height: '8px',
                  borderRadius: '50%',
                  background: a.color,
                  boxShadow: `0 0 8px ${a.color}60`,
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-syne)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ivory-200)', marginBottom: '3px' }}>
                    {a.goal}
                  </div>
                  <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.7rem', color: 'var(--ivory-600)' }}>
                    {a.techniques.join(' · ')}
                  </div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: a.color,
                  background: `${a.color}15`,
                  padding: '4px 10px',
                  borderRadius: '100px',
                  border: `1px solid ${a.color}30`,
                  flexShrink: 0,
                }}>
                  {a.refs} papers
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data sources */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--ivory-600)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}>
            Common Data Sources (from Table 1)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {SOURCES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-mid)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gold-bright)', fontWeight: 500 }}>
                    {s.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ivory-600)' }}>
                    {s.usage} uses
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.7rem', color: 'var(--ivory-600)', marginBottom: '8px' }}>
                  {s.role}
                </div>
                <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.usage / 28) * 100}%` }}
                    transition={{ delay: 0.6 + i * 0.07, duration: 0.8 }}
                    style={{ height: '100%', background: 'linear-gradient(90deg, var(--gold-bright), var(--amber-300))', borderRadius: '2px' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key insight */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              background: 'rgba(240,180,41,0.06)',
              border: '1px solid rgba(240,180,41,0.2)',
              borderRadius: '12px',
              padding: '14px',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold-bright)', letterSpacing: '0.1em', marginBottom: '6px' }}>
              KEY INSIGHT
            </div>
            <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.78rem', color: 'var(--ivory-400)', lineHeight: 1.6 }}>
              Despite sharing common data sources and operations, researchers consistently build ad-hoc tools. 
              A reusable abstraction layer is the missing piece.
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
}
