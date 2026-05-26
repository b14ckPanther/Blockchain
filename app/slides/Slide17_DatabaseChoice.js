'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';
import { Database } from 'lucide-react';

const DBS = [
  {
    name: 'MongoDB',
    type: 'NoSQL / Document',
    color: '#6dcc6d',
    strengths: ['Schema-less: no upfront table definition needed', 'Simpler Scala scripts (no DDL CREATE TABLE)', 'Nested documents map naturally to blockchain objects', 'Aggregation pipeline is expressive for analytics', 'Horizontal scaling via sharding'],
    weaknesses: ['Join operations are complex (manual lookup)', 'No foreign key constraints', 'Slightly slower for relational queries'],
    query: `db.myBlockchain.aggregate([
  { $group: {
    _id: { $year: "$date" },
    avgFee: { $avg: "$fee" },
    count: { $sum: 1 }
  }},
  { $sort: { _id: 1 }}
])`,
    icon: '◎',
  },
  {
    name: 'MySQL',
    type: 'SQL / Relational',
    color: '#5fb8f0',
    strengths: ['Standard SQL — widely known skill', 'JOIN operations for relational queries', 'Strong consistency guarantees', 'Foreign keys, constraints, transactions', 'Mature tooling and ecosystem'],
    weaknesses: ['Requires upfront schema definition (CREATE TABLE)', 'More verbose Scala scripts (DDL + DML)', 'Join performance can lag on large blockchain datasets', 'Less flexible for evolving data shapes'],
    query: `SELECT
  YEAR(date) AS yr,
  AVG(fee) AS avgFee,
  COUNT(*) AS txCount
FROM txWithFees
GROUP BY yr
ORDER BY yr ASC;`,
    icon: '◈',
  },
];

export default function Slide17_DatabaseChoice() {
  const [active, setActive] = useState(0);

  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Framework Design</SectionTag>
      <SlideTitle>Database Choice: SQL vs NoSQL</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '24px' }}>
        Our framework supports both — the user chooses based on their analytics needs.
      </SlideSubtitle>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {DBS.map((db, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: active === i ? `${db.color}15` : 'rgba(255,255,255,0.03)',
              border: `2px solid ${active === i ? db.color + '60' : 'var(--border-mid)'}`,
              borderRadius: '14px', padding: '12px 24px', cursor: 'pointer', transition: 'all 0.25s',
            }}
          >
            <span style={{ fontSize: '1.2rem', color: db.color }}>{db.icon}</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '0.9rem', fontWeight: 700, color: active === i ? 'var(--ivory-100)' : 'var(--ivory-600)' }}>{db.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: active === i ? db.color : 'var(--ivory-600)' }}>{db.type}</div>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', width: '100%', maxWidth: '1100px' }}
        >
          {/* Strengths */}
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#6dcc6d', letterSpacing: '0.1em', marginBottom: '14px' }}>STRENGTHS</div>
            {DBS[active].strengths.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'flex-start' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#6dcc6d', marginTop: '6px', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.75rem', color: 'var(--ivory-600)', lineHeight: 1.55 }}>{s}</span>
              </div>
            ))}
          </div>

          {/* Weaknesses */}
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#e87c2a', letterSpacing: '0.1em', marginBottom: '14px' }}>LIMITATIONS</div>
            {DBS[active].weaknesses.map((w, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'flex-start' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#e87c2a', marginTop: '6px', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.75rem', color: 'var(--ivory-600)', lineHeight: 1.55 }}>{w}</span>
              </div>
            ))}
          </div>

          {/* Sample query */}
          <div>
            <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--border-mid)', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ background: `${DBS[active].color}10`, borderBottom: '1px solid var(--border-subtle)', padding: '10px 14px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: DBS[active].color }}>Sample Query</span>
              </div>
              <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', lineHeight: 1.7, color: 'var(--ivory-400)', padding: '14px 16px', margin: 0, overflowX: 'auto' }}>
                {DBS[active].query}
              </pre>
            </div>
            <div style={{ marginTop: '12px', background: 'rgba(240,180,41,0.05)', border: '1px solid rgba(240,180,41,0.15)', borderRadius: '12px', padding: '14px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold-bright)', marginBottom: '6px' }}>PAPER FINDING</div>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.73rem', color: 'var(--ivory-600)', lineHeight: 1.6 }}>
                Experiments show no significant difference in query complexity between SQL and NoSQL for our analytics tasks. Schema-less NoSQL simplifies Scala scripts. Performance is comparable for most operations.
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </SlideLayout>
  );
}
