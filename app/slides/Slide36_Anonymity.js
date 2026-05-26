'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const TECHNIQUES = [
  { name:'Transaction Graph Analysis', desc:'The transaction graph links inputs to outputs. Tracing value flows can de-anonymize users even without knowing real identities.', refs:['Nakamoto (2008)','Reid & Harrigan (2013)'], color:'#f0b429' },
  { name:'Address Clustering (Multi-Input Heuristic)', desc:'If multiple addresses appear as inputs to the same transaction, they likely belong to the same entity. This simple heuristic is surprisingly effective.', refs:['Harrigan & Fretter (2016)','Meiklejohn et al. (2013/2016)'], color:'#e87c2a' },
  { name:'OP_RETURN De-anonymization', desc:'Metadata in OP_RETURN outputs can link blockchain activity to real-world identities, especially for protocol-specific transactions.', refs:['Bartoletti & Pompianu (2017)'], color:'#c9940a' },
  { name:'CoinJoin Effectiveness', desc:'CoinJoin mixes multiple users\' transactions to obscure the payment trail. Our framework can quantify peaks in input counts that correlate with CoinJoin usage.', refs:['Möser & Böhme (2017)'], color:'#fac87c' },
];

export default function Slide36_Anonymity() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Analytics Category — Anonymity</SectionTag>
      <SlideTitle>Anonymity Analysis in Blockchain</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'24px' }}>
        Blockchain's transparency is a double-edged sword — all transactions are public and traceable.
      </SlideSubtitle>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'16px', width:'100%', maxWidth:'1060px' }}>
        {TECHNIQUES.map((t,i)=>(
          <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2+i*0.1 }}
            style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'16px', padding:'22px', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(90deg, ${t.color}, transparent)` }}/>
            <div style={{ fontFamily:'var(--font-syne)', fontSize:'0.92rem', fontWeight:700, color:t.color, marginBottom:'10px' }}>{t.name}</div>
            <div style={{ fontFamily:'var(--font-space)', fontSize:'0.78rem', color:'var(--ivory-600)', lineHeight:1.65, marginBottom:'14px' }}>{t.desc}</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
              {t.refs.map((r,j)=>(
                <span key={j} style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:`${t.color}`, background:`${t.color}12`, border:`1px solid ${t.color}25`, borderRadius:'100px', padding:'3px 10px' }}>{r}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
        style={{ marginTop:'20px', padding:'14px 24px', background:'rgba(240,180,41,0.04)', border:'1px solid rgba(240,180,41,0.12)', borderRadius:'12px', maxWidth:'1060px', fontFamily:'var(--font-space)', fontSize:'0.78rem', color:'var(--ivory-600)', textAlign:'center' }}>
        Our framework enables all these analyses from a unified codebase — researchers can combine multiple techniques in a single Scala script.
      </motion.div>
    </SlideLayout>
  );
}
