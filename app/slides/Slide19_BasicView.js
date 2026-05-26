'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const CODE = `object MyBlockchain {
  def main(args: Array[String]): Unit = {

    val blockchain = BlockchainLib.getBitcoinBlockchain(
      new BitcoinSettings("user", "password", "8332", MainNet))

    val mongo = new DatabaseSettings(
      "myDatabase", MongoDB, "user", "password")

    val myBlockchain = new Collection("myBlockchain", mongo)

    blockchain.end(473100).foreach { block =>
      block.bitcoinTxs.foreach { tx =>
        myBlockchain.append(List(
          ("txHash",   tx.hash),
          ("blockHash", block.hash),
          ("date",     block.date),
          ("inputs",   tx.inputs),
          ("outputs",  tx.outputs)
        ))
      }
    }
  }
}`;

const FIELDS = [
  { field: 'txHash', type: 'String', desc: 'SHA-256 transaction identifier', color: '#f0b429' },
  { field: 'blockHash', type: 'String', desc: 'Hash of the enclosing block', color: '#e87c2a' },
  { field: 'date', type: 'Date', desc: 'Block timestamp (UTC)', color: '#c9940a' },
  { field: 'inputs', type: 'List[Input]', desc: 'List of transaction inputs', color: '#fac87c' },
  { field: 'outputs', type: 'List[Output]', desc: 'List of transaction outputs', color: '#f0b429' },
];

export default function Slide19_BasicView() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Case Study 01</SectionTag>
      <SlideTitle>A Basic View of the Bitcoin Blockchain</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '20px' }}>
        Blocks 0–473,100 (Jan 2009 – Jul 2017) scanned into MongoDB. Foundation for all subsequent analyses.
      </SlideSubtitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', width: '100%', maxWidth: '1100px', alignItems: 'flex-start' }}>
        {/* Code */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          style={{ background: 'var(--bg-deep)', border: '1px solid var(--border-mid)', borderRadius: '16px', overflow: 'hidden' }}
        >
          <div style={{ background: 'rgba(240,180,41,0.06)', borderBottom: '1px solid var(--border-mid)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#e87c2a','#f0b429','#6dcc6d'].map((c,i) => <div key={i} style={{ width:'8px',height:'8px',borderRadius:'50%',background:c,opacity:0.7 }} />)}
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', marginLeft: '8px' }}>Figure 1 — MyBlockchain.scala</span>
          </div>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', lineHeight: 1.75, color: 'var(--ivory-400)', padding: '20px 24px', margin: 0, overflowX: 'auto' }}>
            {CODE}
          </pre>
        </motion.div>

        {/* Document schema */}
        <div style={{ minWidth: '240px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Document Schema
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {FIELDS.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '10px', padding: '10px 14px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: f.color }}>{f.field}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)' }}>{f.type}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.68rem', color: 'var(--ivory-600)' }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ background: 'rgba(240,180,41,0.06)', border: '1px solid rgba(240,180,41,0.2)', borderRadius: '12px', padding: '14px' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold-bright)', marginBottom: '6px' }}>DATASET</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {[['Blocks scanned','473,100'],['Time range','Jan 2009 – Jul 2017'],['Total transactions','~250M'],['Blockchain size','~130 GB']].map(([l,v],i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.7rem', color: 'var(--ivory-600)' }}>{l}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold-pale)' }}>{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
}
