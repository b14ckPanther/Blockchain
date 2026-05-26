'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';
import { Check, X } from 'lucide-react';

const TOOLS = [
  {
    name: 'BitcoinJ',
    type: 'Java Library',
    year: 2011,
    features: {
      'Bitcoin': true, 'Ethereum': false, 'MySQL': false, 'MongoDB': false,
      'External Data': false, 'Open Source': true, 'Extensible': true,
    },
    desc: 'Lightweight Bitcoin client library. Used as a basis in our framework for Bitcoin object representation. No analytics features.',
    color: '#f59e0b',
  },
  {
    name: 'BlockSci',
    type: 'C++ Library',
    year: 2017,
    features: {
      'Bitcoin': true, 'Ethereum': false, 'MySQL': false, 'MongoDB': false,
      'External Data': false, 'Open Source': true, 'Extensible': false,
    },
    desc: 'High-performance Bitcoin analytics. Custom binary format for maximum speed. No database flexibility or external data support.',
    color: '#6366f1',
  },
  {
    name: 'Bitiodine',
    type: 'Python Tool',
    year: 2014,
    features: {
      'Bitcoin': true, 'Ethereum': false, 'MySQL': true, 'MongoDB': false,
      'External Data': false, 'Open Source': true, 'Extensible': false,
    },
    desc: 'Focused on address clustering and intelligence extraction from the Bitcoin network. Fixed analytics scope.',
    color: '#10b981',
  },
  {
    name: 'Our Framework',
    type: 'Scala Library',
    year: 2017,
    features: {
      'Bitcoin': true, 'Ethereum': true, 'MySQL': true, 'MongoDB': true,
      'External Data': true, 'Open Source': true, 'Extensible': true,
    },
    desc: 'General-purpose, supports Bitcoin & Ethereum, SQL & NoSQL databases, external data integration, community-extensible.',
    color: '#f0b429',
    highlight: true,
  },
];

const FEATURE_KEYS = ['Bitcoin', 'Ethereum', 'MySQL', 'MongoDB', 'External Data', 'Open Source', 'Extensible'];

export default function Slide11_ExistingTools() {
  const [selected, setSelected] = useState(null);

  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Research Context</SectionTag>
      <SlideTitle>Existing Tools & Their Limitations</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '24px' }}>
        Prior work offers specialized tools — none provides the generality we need.
      </SlideSubtitle>

      <div style={{ width: '100%', maxWidth: '1100px' }}>
        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-mid)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          {/* Header row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '180px repeat(7, 1fr)',
            background: 'rgba(240,180,41,0.06)',
            borderBottom: '1px solid var(--border-mid)',
          }}>
            <div style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Tool
            </div>
            {FEATURE_KEYS.map(k => (
              <div key={k} style={{
                padding: '12px 8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                color: 'var(--ivory-600)',
                letterSpacing: '0.06em',
                textAlign: 'center',
                textTransform: 'uppercase',
              }}>
                {k}
              </div>
            ))}
          </div>

          {/* Tool rows */}
          {TOOLS.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px repeat(7, 1fr)',
                borderBottom: i < TOOLS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                background: tool.highlight ? 'rgba(240,180,41,0.06)' : (selected === i ? 'rgba(255,255,255,0.02)' : 'transparent'),
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              <div style={{ padding: '14px 16px' }}>
                <div style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: '0.85rem',
                  fontWeight: tool.highlight ? 700 : 500,
                  color: tool.highlight ? tool.color : 'var(--ivory-200)',
                  marginBottom: '2px',
                }}>
                  {tool.name}
                  {tool.highlight && (
                    <span style={{
                      marginLeft: '8px',
                      fontSize: '0.55rem',
                      background: 'rgba(240,180,41,0.15)',
                      border: '1px solid rgba(240,180,41,0.3)',
                      borderRadius: '4px',
                      padding: '1px 6px',
                      color: 'var(--gold-bright)',
                      verticalAlign: 'middle',
                    }}>
                      OURS
                    </span>
                  )}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)' }}>
                  {tool.type} · {tool.year}
                </div>
              </div>

              {FEATURE_KEYS.map(k => (
                <div key={k} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px 8px',
                }}>
                  {tool.features[k] ? (
                    <Check size={16} color={tool.highlight ? '#f0b429' : '#6dcc6d'} />
                  ) : (
                    <X size={16} color="rgba(255,255,255,0.15)" />
                  )}
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Selected tool detail */}
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '14px',
              background: `${TOOLS[selected].color}08`,
              border: `1px solid ${TOOLS[selected].color}30`,
              borderRadius: '12px',
              padding: '14px 18px',
              fontFamily: 'var(--font-space)',
              fontSize: '0.8rem',
              color: 'var(--ivory-400)',
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: TOOLS[selected].color }}>{TOOLS[selected].name}:</strong>{' '}
            {TOOLS[selected].desc}
          </motion.div>
        )}

        <div style={{
          marginTop: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          color: 'var(--ivory-600)',
          textAlign: 'center',
        }}>
          Click a row to see details
        </div>
      </div>
    </SlideLayout>
  );
}
