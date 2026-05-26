'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle } from '../components/SlideLayout';

const TAKEAWAYS = [
  { title:'The Problem is Real', body:'30+ research papers each reinvent blockchain scanning. The cost of this duplication is enormous in research hours and inconsistent results.', color:'#f0b429' },
  { title:'Generality Matters', body:'Supporting both Bitcoin and Ethereum, SQL and NoSQL, and external data — all in one unified API — is not a luxury, it is the minimum viable toolkit.', color:'#e87c2a' },
  { title:'Two Steps Win', body:'Separating view construction from analysis enables reuse: build once, query many times. This pattern reduces total analytics cost dramatically.', color:'#c9940a' },
  { title:'SQL ≈ NoSQL', body:'For blockchain analytics workloads, both databases perform comparably. The choice should be driven by researcher familiarity, not performance dogma.', color:'#fac87c' },
  { title:'Community Over Solo', body:'An open-source library in a mainstream language (Scala/JVM) is infinitely more valuable than a closed, specialized tool. Community validation and extension are priceless.', color:'#f0b429' },
];

export default function Slide46_Conclusions() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(240,180,41,0.05) 0%, transparent 70%)' }}/>
      <SectionTag>Conclusions</SectionTag>
      <SlideTitle style={{ marginBottom:'30px' }}>Key Takeaways</SlideTitle>
      <div style={{ display:'flex', flexDirection:'column', gap:'12px', width:'100%', maxWidth:'900px' }}>
        {TAKEAWAYS.map((t,i)=>(
          <motion.div key={i} initial={{ opacity:0, x:-28 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.15+i*0.1, ease:[0.22,1,0.36,1] }}
            style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'14px', padding:'16px 22px', display:'flex', alignItems:'center', gap:'16px' }}>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:t.color, boxShadow:`0 0 12px ${t.color}60`, flexShrink:0 }}/>
            <div>
              <span style={{ fontFamily:'var(--font-syne)', fontSize:'0.9rem', fontWeight:700, color:t.color, marginRight:'10px' }}>{t.title}.</span>
              <span style={{ fontFamily:'var(--font-space)', fontSize:'0.8rem', color:'var(--ivory-600)', lineHeight:1.5 }}>{t.body}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8 }}
        style={{ marginTop:'24px', background:'linear-gradient(135deg, rgba(240,180,41,0.1), rgba(201,148,10,0.05))', border:'1px solid rgba(240,180,41,0.3)', borderRadius:'16px', padding:'20px 32px', maxWidth:'700px', textAlign:'center' }}>
        <div style={{ fontFamily:'var(--font-syne)', fontSize:'1.1rem', fontWeight:700, color:'var(--ivory-100)', lineHeight:1.5, letterSpacing:'-0.01em' }}>
          "An open-source Scala library for general-purpose blockchain analytics — validated on Bitcoin, supporting Ethereum, flexible on databases."
        </div>
        <div style={{ marginTop:'10px', fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--gold-mid)' }}>Bartoletti et al. · Financial Cryptography 2017</div>
      </motion.div>
    </SlideLayout>
  );
}
