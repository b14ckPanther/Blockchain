'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const CONTRIBS = [
  { num:'C1', title:'Literature Survey', desc:'Exhaustive survey of 30+ blockchain analytics papers, cataloguing data sources and analysis goals (Table 1). Reveals the ubiquitous need for a unified framework.', color:'#f0b429' },
  { num:'C2', title:'Framework Design', desc:'Design of a two-step workflow separating data extraction (view construction) from analysis (query). This separation enables reuse of views across multiple analytics.', color:'#e87c2a' },
  { num:'C3', title:'Scala Library', desc:'Implementation of BlockchainLib — the first open-source Scala library supporting both Bitcoin and Ethereum with unified API, external data integration, and dual-DB support.', color:'#c9940a' },
  { num:'C4', title:'Five Case Studies', desc:'Five concrete analytics case studies on Bitcoin (blocks 0-473100) demonstrating the framework\'s expressiveness and validating its correctness against known results.', color:'#fac87c' },
  { num:'C5', title:'SQL vs NoSQL Evaluation', desc:'Empirical benchmark comparing MySQL and MongoDB for blockchain analytics workloads. First systematic comparison in this domain.', color:'#f0b429' },
  { num:'C6', title:'Tool Comparison', desc:'Qualitative comparison with BlockSci, Bitiodine, and other tools. First systematic evaluation of general-purpose blockchain analytics tools.', color:'#e87c2a' },
];

export default function Slide44_Contributions() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Paper Contributions</SectionTag>
      <SlideTitle>Key Contributions</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'28px' }}>
        Six concrete, independently valuable contributions to the blockchain analytics research community.
      </SlideSubtitle>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'14px', width:'100%', maxWidth:'1100px' }}>
        {CONTRIBS.map((c,i)=>(
          <motion.div key={i} initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2+i*0.09, ease:[0.22,1,0.36,1] }}
            style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'16px', padding:'20px', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(90deg, ${c.color}, transparent)` }}/>
            <div style={{ fontFamily:'var(--font-syne)', fontSize:'2.2rem', fontWeight:800, color:c.color, opacity:0.15, lineHeight:1, marginBottom:'12px' }}>{c.num}</div>
            <div style={{ fontFamily:'var(--font-syne)', fontSize:'0.9rem', fontWeight:700, color:'var(--ivory-100)', marginBottom:'10px' }}>{c.title}</div>
            <div style={{ fontFamily:'var(--font-space)', fontSize:'0.75rem', color:'var(--ivory-600)', lineHeight:1.65 }}>{c.desc}</div>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  );
}
