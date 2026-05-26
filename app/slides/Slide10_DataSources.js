'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const DATA_GROUPS = [
  {
    category: 'Internal Blockchain Data',
    color: '#f0b429',
    icon: '◈',
    items: [
      { name: 'Transaction Graph', desc: 'Inputs, outputs, hashes, timestamps', size: '~500GB (Bitcoin full)' },
      { name: 'OP_RETURN Metadata', desc: 'Embedded protocol data in outputs', size: 'Up to 80 bytes/tx' },
      { name: 'Block Metadata', desc: 'Block hash, height, timestamp, size', size: 'Every block' },
      { name: 'Smart Contract State', desc: 'Ethereum account storage and events', size: 'Variable per contract' },
    ],
  },
  {
    category: 'External Data Sources',
    color: '#e87c2a',
    icon: '◎',
    items: [
      { name: 'Exchange Rates', desc: 'BTC/USD from Coindesk APIs', size: 'Daily snapshots' },
      { name: 'Address Tags', desc: 'blockchain.info tag registry', size: '500K+ tagged addresses' },
      { name: 'IP Addresses', desc: 'Node geolocation, blockchain.info', size: 'Per connection' },
      { name: 'Mining Pools', desc: 'Pool identity from block coinbase', size: 'Per block' },
    ],
  },
  {
    category: 'Derived / Computed Data',
    color: '#c9940a',
    icon: '◇',
    items: [
      { name: 'Transaction Fees', desc: 'Derived from input/output value delta', size: 'Deep scan required' },
      { name: 'Address Clusters', desc: 'Heuristic-based entity grouping', size: 'Multi-input heuristic' },
      { name: 'Protocol Identifiers', desc: 'From OP_RETURN opreturn.org data', size: 'Known protocol DB' },
      { name: 'Whale Transactions', desc: 'Statistical outlier detection (x̄ + 2σ)', size: '242K identified' },
    ],
  },
];

export default function Slide10_DataSources() {
  const [active, setActive] = useState(0);

  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Research Context</SectionTag>
      <SlideTitle>Data Sources for Blockchain Analytics</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '24px' }}>
        Analytics requires both on-chain and off-chain data — our framework integrates them seamlessly.
      </SlideSubtitle>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        {DATA_GROUPS.map((g, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: active === i ? `${g.color}15` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${active === i ? g.color + '50' : 'var(--border-mid)'}`,
              borderRadius: '12px',
              padding: '10px 18px',
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
          >
            <span style={{ color: g.color, fontSize: '1rem' }}>{g.icon}</span>
            <span style={{
              fontFamily: 'var(--font-space)',
              fontSize: '0.78rem',
              color: active === i ? 'var(--ivory-100)' : 'var(--ivory-600)',
              fontWeight: active === i ? 600 : 400,
            }}>
              {g.category}
            </span>
          </button>
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: '1050px' }}>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '14px',
          }}
        >
          {DATA_GROUPS[active].items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-mid)',
                borderRadius: '16px',
                padding: '20px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, ${DATA_GROUPS[active].color}, transparent)`,
              }} />
              <div style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--ivory-100)',
                marginBottom: '8px',
              }}>
                {item.name}
              </div>
              <div style={{
                fontFamily: 'var(--font-space)',
                fontSize: '0.78rem',
                color: 'var(--ivory-600)',
                lineHeight: 1.6,
                marginBottom: '14px',
              }}>
                {item.desc}
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: `${DATA_GROUPS[active].color}10`,
                border: `1px solid ${DATA_GROUPS[active].color}25`,
                borderRadius: '100px',
                padding: '4px 12px',
              }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: DATA_GROUPS[active].color }} />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: DATA_GROUPS[active].color,
                  letterSpacing: '0.06em',
                }}>
                  {item.size}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: '16px',
            padding: '12px 20px',
            background: 'rgba(240,180,41,0.04)',
            border: '1px solid rgba(240,180,41,0.12)',
            borderRadius: '12px',
            fontFamily: 'var(--font-space)',
            fontSize: '0.75rem',
            color: 'var(--ivory-600)',
            textAlign: 'center',
          }}
        >
          Our framework provides a unified API to access all three data categories through a single Scala library interface.
        </motion.div>
      </div>
    </SlideLayout>
  );
}
