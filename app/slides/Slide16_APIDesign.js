'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const APIS = [
  { category: 'Bitcoin Settings', code: `new BitcoinSettings(
  "user", "password",
  "8332",          // RPC port
  MainNet,         // or TestNet
  true             // deep scan mode
)`, color: '#f0b429' },
  { category: 'Database Settings', code: `// MongoDB
new DatabaseSettings(
  "myDatabase", MongoDB,
  "user", "password"
)
// MySQL
new DatabaseSettings(
  "myDatabase", MySQL,
  "user", "password"
)`, color: '#e87c2a' },
  { category: 'Collection Append', code: `myCollection.append(List(
  ("txHash",  tx.hash),
  ("date",    block.date),
  ("inputs",  tx.inputs.size),
  ("outputs", tx.outputs.size),
  ("fee",     tx.getInputsSum()
              - tx.getOutputsSum())
))`, color: '#c9940a' },
  { category: 'External Data', code: `// Exchange rate
Exchange.getRate(block.date)
// BTC → USD at block time

// Address tag
tags.getValue(address) match {
  case Some(tag) => // tagged
  case None      => // untagged
}`, color: '#fac87c' },
];

export default function Slide16_APIDesign() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Framework API</SectionTag>
      <SlideTitle>API Design Patterns</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '24px' }}>
        Composable, type-safe Scala APIs that hide blockchain complexity.
      </SlideSubtitle>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px', width: '100%', maxWidth: '1060px' }}>
        {APIS.map((api, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '16px', overflow: 'hidden' }}
          >
            <div style={{ background: `${api.color}10`, borderBottom: '1px solid var(--border-subtle)', padding: '10px 16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: api.color, letterSpacing: '0.08em' }}>{api.category}</span>
            </div>
            <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', lineHeight: 1.7, color: 'var(--ivory-400)', padding: '16px 18px', margin: 0, overflowX: 'auto' }}>
              {api.code}
            </pre>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        style={{ marginTop: '20px', padding: '14px 24px', background: 'rgba(240,180,41,0.05)', border: '1px solid rgba(240,180,41,0.15)', borderRadius: '12px', maxWidth: '900px', textAlign: 'center', fontFamily: 'var(--font-space)', fontSize: '0.8rem', color: 'var(--ivory-600)' }}>
        All APIs follow Scala idioms — functional composition, Option types for nullable values, type-safe DSLs for SQL.
      </motion.div>
    </SlideLayout>
  );
}
