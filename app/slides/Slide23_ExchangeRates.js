'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const CODE = `val txWithRates = new Collection("txWithRates", mongo)

blockchain.end(473100).foreach { block =>
  block.bitcoinTxs.foreach { tx =>
    txWithRates.append(List(
      ("txHash",    tx.hash),
      ("date",      block.date),
      ("outputSum", tx.getOutputsSum()),
      ("rate",      Exchange.getRate(block.date))  // Coindesk API
    ))
  }
}`;

export default function Slide23_ExchangeRates() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Case Study 03</SectionTag>
      <SlideTitle>Exchange Rate Integration</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '20px' }}>
        Enriching blockchain data with BTC/USD exchange rates from Coindesk APIs — in real time at scan.
      </SlideSubtitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', width: '100%', maxWidth: '1060px' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          style={{ background: 'var(--bg-deep)', border: '1px solid var(--border-mid)', borderRadius: '16px', overflow: 'hidden' }}
        >
          <div style={{ background: 'rgba(240,180,41,0.06)', borderBottom: '1px solid var(--border-mid)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#e87c2a','#f0b429','#6dcc6d'].map((c,i) => <div key={i} style={{ width:'8px',height:'8px',borderRadius:'50%',background:c,opacity:0.7 }} />)}
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', marginLeft: '8px' }}>Figure 6 — Exchange Rate Collection</span>
          </div>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', lineHeight: 1.75, color: 'var(--ivory-400)', padding: '20px 24px', margin: 0 }}>
            {CODE}
          </pre>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { title: 'Why Exchange Rates?', content: 'Many analyses need USD values: cyber-crime losses, fee amounts, market cap, whale detection thresholds. Raw BTC values are meaningless without context.', color: '#f0b429' },
            { title: 'Coindesk API', content: 'Exchange.getRate(date) retrieves the BTC/USD rate for a given date from Coindesk. The method is built into our library and handles caching automatically.', color: '#e87c2a' },
            { title: 'View Schema', content: 'Each document: txHash, date, outputSum (BTC), rate (USD/BTC). From this, compute: daily volume in USD, market cap, richest addresses, and more.', color: '#c9940a' },
            { title: 'Key Insight', content: 'External data is fetched once at scan time and stored permanently in the view — no repeated API calls for queries. This is the power of the two-step approach.', color: '#fac87c' },
          ].map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '14px', padding: '14px', borderLeft: `3px solid ${item.color}50` }}
            >
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '0.82rem', fontWeight: 700, color: item.color, marginBottom: '5px' }}>{item.title}</div>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.74rem', color: 'var(--ivory-600)', lineHeight: 1.55 }}>{item.content}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
