'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const FUTURE = [
  { num:'01', title:'P2P Network Extension', desc:'Running a customized Bitcoin/Ethereum node to intercept and log peer-to-peer messages. Would enable propagation analysis, eclipse attack detection, and fork monitoring.', impact:'High', color:'#f0b429' },
  { num:'02', title:'Real-Time Streaming', desc:'Integrating Apache Kafka or similar stream processing to support continuous ingestion of new blocks and real-time query updates against evolving blockchain views.', impact:'High', color:'#e87c2a' },
  { num:'03', title:'Ethereum Smart Contract Decoding', desc:'Full ABI decoding of contract events and function calls, enabling rich analytics on DeFi, NFT, and DAO activity on Ethereum without manual ABI handling.', impact:'High', color:'#c9940a' },
  { num:'04', title:'Distributed Computing', desc:'Integration with Apache Spark or Hadoop to enable parallel blockchain scanning across multiple machines — reducing analysis time from days to hours for the full chain.', impact:'Medium', color:'#fac87c' },
  { num:'05', title:'Additional Blockchains', desc:'Extending the library to support Litecoin, Monero, Solana, and other blockchains through standardized adapter interfaces — enabling true cross-chain comparative analytics.', impact:'Medium', color:'#f0b429' },
  { num:'06', title:'Visual Analytics Dashboard', desc:'A web-based frontend for non-technical researchers to configure and run standard analytics pipelines without writing Scala code — democratizing blockchain analytics.', impact:'Medium', color:'#e87c2a' },
];

export default function Slide42_FutureWork() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Future Directions</SectionTag>
      <SlideTitle>Future Work</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'24px' }}>
        Six concrete directions for extending the framework — from P2P support to cross-chain analytics.
      </SlideSubtitle>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'14px', width:'100%', maxWidth:'1100px' }}>
        {FUTURE.map((f,i)=>(
          <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2+i*0.08, ease:[0.22,1,0.36,1] }}
            style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'16px', padding:'20px', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(90deg, ${f.color}, transparent)` }}/>
            <div style={{ fontFamily:'var(--font-syne)', fontSize:'2rem', fontWeight:800, color:f.color, opacity:0.15, lineHeight:1, marginBottom:'10px' }}>{f.num}</div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
              <div style={{ fontFamily:'var(--font-syne)', fontSize:'0.88rem', fontWeight:700, color:'var(--ivory-100)', flex:1 }}>{f.title}</div>
              <div style={{ padding:'3px 9px', background:`${f.color}15`, border:`1px solid ${f.color}30`, borderRadius:'100px', fontFamily:'var(--font-mono)', fontSize:'0.55rem', color:f.color, whiteSpace:'nowrap' }}>{f.impact}</div>
            </div>
            <div style={{ fontFamily:'var(--font-space)', fontSize:'0.74rem', color:'var(--ivory-600)', lineHeight:1.6 }}>{f.desc}</div>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  );
}
