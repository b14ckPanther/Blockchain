'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const STEPS = [
  {
    num: 1,
    title: 'Construct a View',
    subtitle: 'Scala Script + BlockchainLib',
    desc: 'Scan the blockchain block by block. For each block and transaction, extract the needed fields and optionally enrich with external data.',
    code: `val blockchain = BlockchainLib
  .getBitcoinBlockchain(settings)

blockchain.end(473100).foreach { block =>
  block.bitcoinTxs.foreach { tx =>
    myCollection.append(List(
      ("txHash",  tx.hash),
      ("date",    block.date),
      ("outputs", tx.outputs),
      ("rate",    Exchange.getRate(block.date))
    ))
  }
}`,
    outputs: ['Blockchain View', 'Collection / Table', 'With External Data'],
    color: '#f0b429',
  },
  {
    num: 2,
    title: 'Analyse the View',
    subtitle: 'SQL or MongoDB Queries',
    desc: 'Once the view is stored in the database, run any SQL query or MongoDB aggregation pipeline to extract insights. No blockchain access needed.',
    code: `db.myBlockchain.aggregate([
  { $group: {
      _id: {
        year:  { $year:  "$date" },
        month: { $month: "$date" }
      },
      avgOutputs: { $avg: { $size: "$outputs" }},
      totalTxs:   { $sum: 1 }
  }},
  { $sort: { _id: 1 }}
])`,
    outputs: ['Analytical Results', 'Charts / Tables', 'Statistical Insights'],
    color: '#e87c2a',
  },
];

export default function Slide14_TwoStepWorkflow() {
  const [active, setActive] = useState(0);

  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Framework Design</SectionTag>
      <SlideTitle>The Two-Step Workflow</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '24px' }}>
        Build a view once, query it many times — decoupling data extraction from analysis.
      </SlideSubtitle>

      {/* Step selector */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
        {STEPS.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: active === i ? `${s.color}15` : 'rgba(255,255,255,0.03)',
              border: `2px solid ${active === i ? s.color + '60' : 'var(--border-mid)'}`,
              borderRadius: '14px',
              padding: '14px 24px',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            <div style={{
              width: '32px', height: '32px',
              borderRadius: '50%',
              background: active === i ? `${s.color}25` : 'rgba(255,255,255,0.05)',
              border: `2px solid ${active === i ? s.color : 'var(--border-mid)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-syne)',
              fontSize: '0.9rem',
              fontWeight: 800,
              color: active === i ? s.color : 'var(--ivory-600)',
              flexShrink: 0,
            }}>
              {s.num}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '0.9rem', fontWeight: 700, color: active === i ? 'var(--ivory-100)' : 'var(--ivory-600)' }}>
                {s.title}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: active === i ? s.color : 'var(--ivory-600)' }}>
                {s.subtitle}
              </div>
            </div>
          </button>
        ))}
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(240,180,41,0.3), transparent)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', width: '100%', maxWidth: '1100px' }}>
        {/* Left: description */}
        <motion.div
          key={active + '-desc'}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-mid)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '16px',
          }}>
            <div style={{
              fontFamily: 'var(--font-space)',
              fontSize: '0.88rem',
              color: 'var(--ivory-400)',
              lineHeight: 1.7,
              marginBottom: '20px',
            }}>
              {STEPS[active].desc}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {STEPS[active].outputs.map((o, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: `${STEPS[active].color}08`,
                  border: `1px solid ${STEPS[active].color}20`,
                  borderRadius: '8px',
                  padding: '8px 14px',
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: STEPS[active].color, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.8rem', color: 'var(--ivory-300, #d0ccbc)' }}>{o}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Advantage */}
          <div style={{
            background: 'rgba(240,180,41,0.04)',
            border: '1px solid rgba(240,180,41,0.15)',
            borderRadius: '14px',
            padding: '16px',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold-bright)', letterSpacing: '0.1em', marginBottom: '8px' }}>
              KEY ADVANTAGE
            </div>
            <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.78rem', color: 'var(--ivory-600)', lineHeight: 1.6 }}>
              {active === 0
                ? 'The view is built once but can serve multiple different queries. External data is captured at scan time, ensuring consistency.'
                : 'Standard SQL or MongoDB skills apply directly. No proprietary query language to learn. Researchers retain full flexibility.'}
            </div>
          </div>
        </motion.div>

        {/* Right: code */}
        <motion.div
          key={active + '-code'}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background: 'var(--bg-deep)',
            border: '1px solid var(--border-mid)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <div style={{
            background: 'rgba(240,180,41,0.06)',
            borderBottom: '1px solid var(--border-mid)',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#e87c2a', '#f0b429', '#6dcc6d'].map((c, i) => (
                <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c, opacity: 0.7 }} />
              ))}
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', marginLeft: '8px' }}>
              {active === 0 ? 'BlockchainView.scala' : 'AnalysisQuery.js'}
            </span>
          </div>
          <pre style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            lineHeight: 1.8,
            color: 'var(--ivory-400)',
            padding: '20px 24px',
            margin: 0,
            overflowX: 'auto',
            whiteSpace: 'pre',
          }}>
            {STEPS[active].code}
          </pre>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
