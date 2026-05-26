'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const ROWS = [
  { op:'Basic View (Blocks 0-473100)', createMongo:'4h 12m', createSQL:'4h 49m', queryMongo:'0.8s', querySQL:'1.2s' },
  { op:'OP_RETURN Metadata (290000-473100)', createMongo:'2h 06m', createSQL:'2h 21m', queryMongo:'0.3s', querySQL:'0.5s' },
  { op:'Exchange Rates (0-473100)', createMongo:'5h 04m', createSQL:'5h 35m', queryMongo:'1.1s', querySQL:'1.8s' },
  { op:'Transaction Fees (deep scan)', createMongo:'18h 12m', createSQL:'22h 41m', queryMongo:'2.3s', querySQL:'8.4s', highlight:true },
  { op:'Address Tags (0-473100)', createMongo:'6h 18m', createSQL:'6h 54m', queryMongo:'0.4s', querySQL:'1.1s' },
];

export default function Slide32_PerformanceTable() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Evaluation — Table 2</SectionTag>
      <SlideTitle>Creation & Query Times</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'24px' }}>
        Empirical benchmark on consumer hardware. Deep scan shows the largest SQL/NoSQL divergence due to JOIN operations.
      </SlideSubtitle>
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
        style={{ width:'100%', maxWidth:'1060px', background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'20px', overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', background:'rgba(240,180,41,0.06)', borderBottom:'1px solid var(--border-mid)' }}>
          {['Operation','Create (MongoDB)','Create (MySQL)','Query (MongoDB)','Query (MySQL)'].map((h,i)=>(
            <div key={i} style={{ padding:'12px 16px', fontFamily:'var(--font-mono)', fontSize:'0.58rem', color:'var(--ivory-600)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{h}</div>
          ))}
        </div>
        {ROWS.map((r,i)=>(
          <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4+i*0.08 }}
            style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', borderBottom: i<ROWS.length-1 ? '1px solid var(--border-subtle)' : 'none',
              background: r.highlight ? 'rgba(232,124,42,0.06)' : 'transparent' }}>
            <div style={{ padding:'14px 16px', fontFamily:'var(--font-space)', fontSize:'0.78rem', color: r.highlight ? 'var(--ivory-100)' : 'var(--ivory-400)' }}>{r.op}</div>
            <div style={{ padding:'14px 16px', fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'#6dcc6d' }}>{r.createMongo}</div>
            <div style={{ padding:'14px 16px', fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'#5fb8f0' }}>{r.createSQL}</div>
            <div style={{ padding:'14px 16px', fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'#6dcc6d' }}>{r.queryMongo}</div>
            <div style={{ padding:'14px 16px', fontFamily:'var(--font-mono)', fontSize:'0.75rem', color: r.highlight ? '#e87c2a' : '#5fb8f0' }}>{r.querySQL}</div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
        style={{ marginTop:'16px', padding:'14px 20px', background:'rgba(232,124,42,0.06)', border:'1px solid rgba(232,124,42,0.2)', borderRadius:'12px', maxWidth:'1060px', fontFamily:'var(--font-space)', fontSize:'0.78rem', color:'var(--ivory-600)', lineHeight:1.6 }}>
        <strong style={{ color:'#e87c2a' }}>Key finding:</strong> The deep scan fee query takes 8.4s in MySQL vs 2.3s in MongoDB due to JOIN operations resolving UTXO values. For all other operations, performance is comparable as order of magnitude.
      </motion.div>
    </SlideLayout>
  );
}
