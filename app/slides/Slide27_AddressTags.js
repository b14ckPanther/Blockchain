'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const TAGS = [
  { tag: 'SatoshiDice *', category: 'Gambling', txs: '1.2M+', color: '#f0b429' },
  { tag: 'WikiLeaks', category: 'Donation', txs: '12K', color: '#e87c2a' },
  { tag: 'Silk Road', category: 'Dark Market', txs: '8K', color: '#c9940a' },
  { tag: 'BitcoinFaucet.tk', category: 'Faucet', txs: '45K', color: '#fac87c' },
  { tag: 'MtGox Exchange', category: 'Exchange', txs: '200K+', color: '#f0b429' },
  { tag: 'Linux Mint Donations', category: 'Donation', txs: '3K', color: '#e87c2a' },
];

const CODE = `val tags = new Tag("src/main/scala/tcs/custom/input.txt")
val outTable = new Table(sql"""
  create table if not exists tagsoutputs (
    id serial not null primary key,
    transactionHash varchar(256) not null,
    txdate TIMESTAMP not null,
    outvalue bigint unsigned,
    address varchar(256),
    tag varchar(256)
  )""", mySQL)

blockchain.end(473100).foreach { block =>
  block.bitcoinTxs.foreach { tx =>
    tx.outputs.foreach { out =>
      out.getAddress(MainNet) match {
        case Some(add) =>
          tags.getValue(add) match {
            case Some(tag) =>
              outTable.insert(sql"insert into tagsoutputs
                values (\${tx.hash}, \${block.date},
                        \${out.value}, \${add}, \${tag})")
            case None =>
          }
        case None =>
      }
    }
  }
}`;

export default function Slide27_AddressTags() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Case Study 05</SectionTag>
      <SlideTitle style={{ fontSize: '3.1rem' }}>Address Tag Analysis</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '20px', fontSize: '1.25rem', maxWidth: '1100px' }}>
        blockchain.info/tags provides address → label mappings. We enrich outputs with business-level context.
      </SlideSubtitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', width: '100%', maxWidth: '1060px' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          style={{ background: 'var(--bg-deep)', border: '1px solid var(--border-mid)', borderRadius: '16px', overflow: 'hidden' }}
        >
          <div style={{ background: 'rgba(240,180,41,0.06)', borderBottom: '1px solid var(--border-mid)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#e87c2a','#f0b429','#6dcc6d'].map((c,i) => <div key={i} style={{ width:'8px',height:'8px',borderRadius:'50%',background:c,opacity:0.7 }} />)}
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', marginLeft: '8px' }}>Figure 10 — Address Tags (SQL version)</span>
          </div>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', lineHeight: 1.75, color: 'var(--ivory-400)', padding: '16px 20px', margin: 0, overflowX: 'auto' }}>
            {CODE}
          </pre>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ivory-600)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
            Example Tagged Addresses
          </div>
          {TAGS.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.07 }}
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: t.color, marginBottom: '3px' }}>{t.tag}</div>
                <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.68rem', color: 'var(--ivory-600)' }}>{t.category}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ivory-400)', textAlign: 'right' }}>
                {t.txs} txs
              </div>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ background: 'rgba(240,180,41,0.05)', border: '1px solid rgba(240,180,41,0.15)', borderRadius: '12px', padding: '14px', marginTop: '4px' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold-bright)', marginBottom: '6px' }}>USE CASES</div>
            <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.74rem', color: 'var(--ivory-600)', lineHeight: 1.6 }}>
              Anonymity studies, cyber-crime tracking, market analysis at business level, geographic distribution of services.
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
}
