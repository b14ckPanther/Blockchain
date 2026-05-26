'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const CODE = `// ─── Main Library Classes ───────────────────────────────
object BlockchainLib {
  def getBitcoinBlockchain(settings: BitcoinSettings): Blockchain
  def getEthereumBlockchain(settings: EthereumSettings): Blockchain
}

// ─── Blockchain Traversal ────────────────────────────────
trait Blockchain {
  def start(block: Int): Blockchain    // scan from block N
  def end(block: Int): Blockchain      // scan up to block N
  def foreach(f: Block => Unit): Unit  // iterate blocks
}

// ─── Block ───────────────────────────────────────────────
trait Block {
  val hash:       String
  val height:     Int
  val date:       Date
  def bitcoinTxs: List[BitcoinTransaction]
}

// ─── Transaction ─────────────────────────────────────────
trait BitcoinTransaction {
  val hash:     String
  val inputs:   List[Input]
  val outputs:  List[Output]
  def getInputsSum():  Long   // requires deep scan
  def getOutputsSum(): Long
}`;

const CLASSES = [
  { name: 'BlockchainLib', role: 'Entry point', desc: 'getBlockchain(settings)', color: '#f0b429' },
  { name: 'Block', role: 'Block entity', desc: 'hash, height, date, txs', color: '#e87c2a' },
  { name: 'BitcoinTransaction', role: 'Tx entity', desc: 'hash, inputs, outputs, fees', color: '#c9940a' },
  { name: 'Input/Output', role: 'UTXO primitives', desc: 'value, script, address', color: '#fac87c' },
  { name: 'Collection/Table', role: 'DB abstraction', desc: 'append(), MongoDB or MySQL', color: '#f0b429' },
  { name: 'Exchange/Tag', role: 'External data', desc: 'getRate(date), getValue(addr)', color: '#e87c2a' },
];

export default function Slide15_ScalaLibrary() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Framework Implementation</SectionTag>
      <SlideTitle>The Scala Library API</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '20px', maxWidth: '1000px' }}>
        A clean, idiomatic Scala API wrapping complex blockchain operations behind simple abstractions.
      </SlideSubtitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', width: '100%', maxWidth: '1100px', alignItems: 'flex-start' }}>
        {/* Code block */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
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
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', marginLeft: '8px', whiteSpace: 'nowrap' }}>
              BlockchainLib API — Scala
            </span>
          </div>
          <pre style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            lineHeight: 1.75,
            color: 'var(--ivory-400)',
            padding: '16px 20px',
            margin: 0,
            overflowX: 'auto',
          }}>
            {CODE}
          </pre>
        </motion.div>

        {/* Classes panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '260px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
            Core Classes
          </div>
          {CLASSES.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-mid)',
                borderRadius: '12px',
                padding: '12px 14px',
                borderLeft: `3px solid ${c.color}50`,
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: c.color, fontWeight: 500, marginBottom: '3px' }}>
                {c.name}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {c.role}
              </div>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.7rem', color: 'var(--ivory-600)' }}>
                {c.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
