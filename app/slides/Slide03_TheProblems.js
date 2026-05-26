'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';
import { AlertTriangle, Database, Code2, GitBranch, RefreshCw, Shield } from 'lucide-react';

const PROBLEMS = [
  {
    icon: AlertTriangle,
    title: 'Ad-Hoc Engineering',
    desc: 'Every research team implements their own custom blockchain scanner from scratch, duplicating effort across dozens of papers.',
    stat: '30+',
    statLabel: 'papers, same code rewritten',
    color: '#e87c2a',
  },
  {
    icon: Database,
    title: 'Fixed Database Choice',
    desc: 'Existing tools lock users into a single database type, either SQL or NoSQL, offering no flexibility for diverse analysis needs.',
    stat: '0',
    statLabel: 'tools with dual DB support',
    color: '#c9940a',
  },
  {
    icon: Code2,
    title: 'No External Data',
    desc: 'Blockchain data alone is insufficient. Exchange rates, address tags, and IP addresses from external sources are rarely integrated.',
    stat: '8+',
    statLabel: 'external data sources needed',
    color: '#f0b429',
  },
  {
    icon: GitBranch,
    title: 'Single Blockchain',
    desc: 'Tools are built specifically for Bitcoin or Ethereum, not both. Comparative analysis across blockchains requires separate tools.',
    stat: '2',
    statLabel: 'blockchains, 0 unified tools',
    color: '#e87c2a',
  },
  {
    icon: RefreshCw,
    title: 'No Reuse Practices',
    desc: 'The absence of a standard library means that improvements and bug fixes made in one project rarely benefit the broader community.',
    stat: '~0%',
    statLabel: 'code reuse across projects',
    color: '#c9940a',
  },
  {
    icon: Shield,
    title: 'Not Extensible',
    desc: 'Closed-source or rigid architectures make it impossible for researchers to add new analytics without rewriting the entire tool.',
    stat: 'Closed',
    statLabel: 'source in most tools',
    color: '#f0b429',
  },
];

export default function Slide03_TheProblems() {
  const [hovered, setHovered] = useState(null);

  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 40% at 50% 20%, rgba(232,124,42,0.04) 0%, transparent 70%)',
      }} />

      <SectionTag>Motivation</SectionTag>
      <SlideTitle style={{ fontSize: '2.9rem', maxWidth: '1100px' }}>The Problem with Blockchain Analytics Today</SlideTitle>
      <SlideSubtitle>
        Researchers keep reinventing the wheel. A unified, general-purpose framework has been missing.
      </SlideSubtitle>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '14px',
        width: '100%',
        maxWidth: '1100px',
      }}>
        {PROBLEMS.map((p, i) => {
          const Icon = p.icon;
          const isHov = hovered === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: isHov ? 'rgba(26,26,46,0.9)' : 'var(--bg-elevated)',
                border: `1px solid ${isHov ? p.color + '60' : 'var(--border-mid)'}`,
                borderRadius: '16px',
                padding: '20px',
                cursor: 'default',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent */}
              {isHov && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, ${p.color}, transparent)`,
                    transformOrigin: 'left',
                  }}
                />
              )}

              {/* Icon */}
              <div style={{
                width: '36px', height: '36px',
                background: `${p.color}15`,
                border: `1px solid ${p.color}30`,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
                transition: 'all 0.3s',
                boxShadow: isHov ? `0 0 16px ${p.color}30` : 'none',
              }}>
                <Icon size={18} color={p.color} />
              </div>

              {/* Title */}
              <div style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: isHov ? p.color : 'var(--ivory-200)',
                marginBottom: '8px',
                transition: 'color 0.3s',
              }}>
                {p.title}
              </div>

              {/* Description */}
              <div style={{
                fontFamily: 'var(--font-space)',
                fontSize: '0.75rem',
                color: 'var(--ivory-600)',
                lineHeight: 1.6,
                marginBottom: '16px',
              }}>
                {p.desc}
              </div>

              {/* Stat */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '6px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: p.color,
                }}>
                  {p.stat}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--ivory-600)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>
                  {p.statLabel}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideLayout>
  );
}
