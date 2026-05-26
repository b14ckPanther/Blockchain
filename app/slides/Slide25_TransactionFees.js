'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const CODE = `val txWithFees = new Collection("txWithFees", mongo)

// Note: requires deep scan mode (true parameter)
val blockchain = BlockchainLib.getBitcoinBlockchain(
  new BitcoinSettings("user","password","8332",MainNet,true))

blockchain.end(473100).foreach { block =>
  block.bitcoinTxs.foreach { tx =>
    txWithFees.append(List(
      ("blockHash", block.hash),
      ("txHash",   tx.hash),
      ("fee",      tx.getInputsSum() - tx.getOutputsSum()),
      ("date",     block.date),
      ("rate",     Exchange.getRate(block.date))
    ))
  }
}`;

export default function Slide25_TransactionFees() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Case Study 04</SectionTag>
      <SlideTitle>Transaction Fee Analysis</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '20px' }}>
        Fees require a "deep scan" — tracking UTXO values across the entire chain history.
      </SlideSubtitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', width: '100%', maxWidth: '1060px' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          style={{ background: 'var(--bg-deep)', border: '1px solid var(--border-mid)', borderRadius: '16px', overflow: 'hidden' }}
        >
          <div style={{ background: 'rgba(240,180,41,0.06)', borderBottom: '1px solid var(--border-mid)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#e87c2a','#f0b429','#6dcc6d'].map((c,i) => <div key={i} style={{ width:'8px',height:'8px',borderRadius:'50%',background:c,opacity:0.7 }} />)}
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', marginLeft: '8px' }}>Figure 8 — Transaction Fee Collection</span>
          </div>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.67rem', lineHeight: 1.75, color: 'var(--ivory-400)', padding: '20px 24px', margin: 0 }}>
            {CODE}
          </pre>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { title: 'The Deep Scan Problem', content: 'Transaction fee = sum(inputs) − sum(outputs). But input values are NOT stored in the transaction — they must be looked up from previous outputs. This requires maintaining a UTXO map during the scan.', color: '#f0b429' },
            { title: 'Deep Scan Mechanism', content: 'The library maintains an in-memory map from (txHash, outIndex) → value. When scanning, inputs are resolved by looking up this map. Coinbase inputs use block height to compute the mining reward.', color: '#e87c2a' },
            { title: 'Fee Statistics (2017)', content: 'Average fee (x̄) = $0.41 USD, Standard deviation (σ) = $12.09 USD. The whale threshold: x̄ + 2σ = $24.58 USD. 242,839 whale transactions identified.', color: '#c9940a' },
            { title: 'View Fields', content: 'blockHash, txHash, fee (satoshis), date (UTC), rate (USD/BTC). Enables: daily fee totals, miner revenue percentage, whale transaction detection.', color: '#fac87c' },
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
