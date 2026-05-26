'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const LIMITS = [
  { title:'P2P Network Data', desc:'Analyses requiring peer-to-peer network data (propagation, forks, DDoS attacks) cannot be performed with our current framework. These require running a customized full node that intercepts raw messages.', severity:'High', color:'#e87c2a' },
  { title:'Real-Time Updates', desc:'Our framework performs batch analysis on static blockchain snapshots. On-the-fly streaming of new blocks and real-time query execution is not currently supported.', severity:'Medium', color:'#f0b429' },
  { title:'Scalability Ceiling', desc:'All experiments run on consumer hardware (i7 laptop). For blockchain sizes beyond ~1TB, or for sub-minute query latency, distributed computing infrastructure would be required.', severity:'Medium', color:'#f0b429' },
  { title:'Ethereum Coverage', desc:'While the paper provides Bitcoin case studies in detail, Ethereum analytics examples are limited to the GitHub repository. Smart contract event decoding (ABI parsing) is not fully integrated.', severity:'Low', color:'#c9940a' },
  { title:'Dynamic Tag Sources', desc:'Address tag data must be manually downloaded and updated. Automated live syncing with blockchain.info or similar registries is not implemented.', severity:'Low', color:'#c9940a' },
];

export default function Slide41_Limitations() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Evaluation — Limitations</SectionTag>
      <SlideTitle>Known Limitations</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'24px' }}>
        Our framework is general enough to cover most analyses in Table 1, but some categories require future extensions.
      </SlideSubtitle>
      <div style={{ display:'flex', flexDirection:'column', gap:'12px', width:'100%', maxWidth:'950px' }}>
        {LIMITS.map((l,i)=>(
          <motion.div key={i} initial={{ opacity:0, x:-24 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2+i*0.09, ease:[0.22,1,0.36,1] }}
            style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'14px', padding:'16px 20px', display:'flex', alignItems:'flex-start', gap:'16px' }}>
            <div style={{ padding:'4px 10px', background:`${l.color}15`, border:`1px solid ${l.color}30`, borderRadius:'100px', fontFamily:'var(--font-mono)', fontSize:'0.58rem', color:l.color, whiteSpace:'nowrap', flexShrink:0, marginTop:'2px' }}>{l.severity}</div>
            <div>
              <div style={{ fontFamily:'var(--font-syne)', fontSize:'0.88rem', fontWeight:700, color:'var(--ivory-200)', marginBottom:'6px' }}>{l.title}</div>
              <div style={{ fontFamily:'var(--font-space)', fontSize:'0.76rem', color:'var(--ivory-600)', lineHeight:1.6 }}>{l.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  );
}
