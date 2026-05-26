'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const CODE = `val opReturnOutputs = new Collection("opReturn", mongo)

blockchain.start(290000).end(473100).foreach { block =>
  block.bitcoinTxs.foreach { tx =>
    tx.outputs.foreach { out =>
      if (out.isOpreturn()) {
        opReturnOutputs.append(List(
          ("txHash",   tx.hash),
          ("date",     block.date),
          ("protocol", OpReturn.getApplication(
                         out.outScript.toString)),
          ("metadata", out.getMetadata())
        ))
      }
    }
  }
}`;

export default function Slide21_OPReturn() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Case Study 02</SectionTag>
      <SlideTitle>OP_RETURN Metadata Analysis</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '20px' }}>
        Bitcoin outputs can embed up to 80 bytes of metadata via OP_RETURN. Dozens of protocols exploit this.
      </SlideSubtitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', width: '100%', maxWidth: '1060px' }}>
        {/* Code */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          style={{ background: 'var(--bg-deep)', border: '1px solid var(--border-mid)', borderRadius: '16px', overflow: 'hidden' }}
        >
          <div style={{ background: 'rgba(240,180,41,0.06)', borderBottom: '1px solid var(--border-mid)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#e87c2a','#f0b429','#6dcc6d'].map((c,i) => <div key={i} style={{ width:'8px',height:'8px',borderRadius:'50%',background:c,opacity:0.7 }} />)}
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', marginLeft: '8px' }}>Figure 4 — OP_RETURN Metadata Collection</span>
          </div>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', lineHeight: 1.75, color: 'var(--ivory-400)', padding: '20px 24px', margin: 0, overflowX: 'auto' }}>
            {CODE}
          </pre>
        </motion.div>

        {/* Explanation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { title: 'What is OP_RETURN?', content: 'A special Bitcoin script opcode that marks an output as unspendable and allows embedding arbitrary data. Standardized in Bitcoin Core 0.9.0 (March 2014) — hence the start block 290,000.', color: '#f0b429' },
            { title: 'Protocol Detection', content: 'OpReturn.getApplication() identifies the protocol from the metadata structure. Results are based on the analysis in Bartoletti & Pompianu (Financial Cryptography 2017).', color: '#e87c2a' },
            { title: 'Use Cases', content: 'Digital asset certification (Colu), key-value stores (Blockstore), asset transfer (OpenAssets), notarization (Factom, ProofOfExistence), and more.', color: '#c9940a' },
            { title: 'Data View', content: 'Each document contains: tx hash, date, protocol name, and raw metadata bytes. Enables per-protocol transaction volume analysis.', color: '#fac87c' },
          ].map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '14px', padding: '16px', borderLeft: `3px solid ${item.color}50` }}
            >
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '0.82rem', fontWeight: 700, color: item.color, marginBottom: '6px' }}>{item.title}</div>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.75rem', color: 'var(--ivory-600)', lineHeight: 1.6 }}>{item.content}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
