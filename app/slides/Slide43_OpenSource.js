'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';
import { Globe, Code2, Users, BookOpen } from 'lucide-react';

const ITEMS = [
  { icon:Globe, title:'Open Source on GitHub', desc:'The full library source code, case study scripts, and documentation are publicly available at github.com/bitbart/blockchain-analytics-api under an open-source license.', color:'#f0b429' },
  { icon:Code2, title:'Community Extensibility', desc:'New blockchains, databases, and external data sources can be added by implementing simple adapter interfaces. No changes to the core library required.', color:'#e87c2a' },
  { icon:Users, title:'Reuse Best Practices', desc:'The framework follows software engineering reuse principles — documented APIs, versioned releases, and a test suite ensure that community contributions are reliable and interoperable.', color:'#c9940a' },
  { icon:BookOpen, title:'Academic Validation', desc:'Released alongside the paper, enabling other researchers to reproduce all five case studies and validate the results independently — a key requirement for scientific credibility.', color:'#fac87c' },
];

export default function Slide43_OpenSource() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(240,180,41,0.04) 0%, transparent 70%)' }}/>
      <SectionTag>Open Source</SectionTag>
      <SlideTitle>Released as Open Source</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'32px' }}>
        The framework is publicly available — enabling community validation, extension, and academic reproduction.
      </SlideSubtitle>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'16px', width:'100%', maxWidth:'1060px', marginBottom:'24px' }}>
        {ITEMS.map((item,i)=>{
          const Icon=item.icon;
          return (
            <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2+i*0.1 }}
              style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'18px', padding:'24px', display:'flex', gap:'16px' }}>
              <div style={{ width:'44px', height:'44px', background:`${item.color}15`, border:`1px solid ${item.color}30`, borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon size={22} color={item.color}/>
              </div>
              <div>
                <div style={{ fontFamily:'var(--font-syne)', fontSize:'0.92rem', fontWeight:700, color:'var(--ivory-100)', marginBottom:'8px' }}>{item.title}</div>
                <div style={{ fontFamily:'var(--font-space)', fontSize:'0.76rem', color:'var(--ivory-600)', lineHeight:1.65 }}>{item.desc}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.7 }}
        style={{ background:'rgba(240,180,41,0.06)', border:'1px solid rgba(240,180,41,0.25)', borderRadius:'16px', padding:'18px 28px', display:'flex', alignItems:'center', gap:'20px', maxWidth:'700px' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:'1rem', color:'var(--gold-bright)' }}>&#60;/&#62;</div>
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.78rem', color:'var(--gold-bright)', marginBottom:'4px' }}>github.com/bitbart/blockchain-analytics-api</div>
          <div style={{ fontFamily:'var(--font-space)', fontSize:'0.74rem', color:'var(--ivory-600)' }}>Full source · Case studies · Ethereum examples · Open-source license</div>
        </div>
      </motion.div>
    </SlideLayout>
  );
}
