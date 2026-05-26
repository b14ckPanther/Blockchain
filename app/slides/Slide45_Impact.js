'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const IMPACTS = [
  { area:'Academic Research', points:['Eliminates repeated ad-hoc tool development','Enables reproducible analytics','Standard benchmark for future tool comparison','Foundation for cross-chain research'], color:'#f0b429' },
  { area:'Law Enforcement', points:['Forensic trace of ransomware payments','Tracking dark market revenue flows','Real-time suspicious transaction flagging','De-anonymization for fraud investigation'], color:'#e87c2a' },
  { area:'Financial Industry', points:['Market cap and volume analytics','Whale activity monitoring','Exchange rate correlation studies','DeFi protocol risk assessment'], color:'#c9940a' },
  { area:'Regulators & Policy', points:['AML compliance analytics','Tax evasion detection patterns','Systemic risk measurement','Stablecoin flow monitoring'], color:'#fac87c' },
];

export default function Slide45_Impact() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 50% 40% at 50% 60%, rgba(240,180,41,0.04) 0%, transparent 70%)' }}/>
      <SectionTag>Impact</SectionTag>
      <SlideTitle>Who Benefits?</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'28px' }}>
        The framework serves a broad ecosystem of stakeholders — from academics to financial regulators.
      </SlideSubtitle>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'14px', width:'100%', maxWidth:'1100px' }}>
        {IMPACTS.map((item,i)=>(
          <motion.div key={i} initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2+i*0.1, ease:[0.22,1,0.36,1] }}
            style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'16px', padding:'20px' }}>
            <div style={{ width:'100%', height:'3px', background:`linear-gradient(90deg, ${item.color}, transparent)`, borderRadius:'2px', marginBottom:'16px' }}/>
            <div style={{ fontFamily:'var(--font-syne)', fontSize:'0.9rem', fontWeight:700, color:item.color, marginBottom:'14px' }}>{item.area}</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              {item.points.map((p,j)=>(
                <div key={j} style={{ display:'flex', gap:'8px', alignItems:'flex-start' }}>
                  <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:item.color, marginTop:'6px', flexShrink:0 }}/>
                  <span style={{ fontFamily:'var(--font-space)', fontSize:'0.73rem', color:'var(--ivory-600)', lineHeight:1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
        style={{ marginTop:'22px', padding:'14px 28px', background:'rgba(240,180,41,0.05)', border:'1px solid rgba(240,180,41,0.15)', borderRadius:'14px', maxWidth:'900px', textAlign:'center', fontFamily:'var(--font-space)', fontSize:'0.8rem', color:'var(--ivory-600)', lineHeight:1.6 }}>
        With blockchain data surpassing <strong style={{ color:'var(--ivory-300)' }}>1TB</strong> (Ethereum) and transactions reaching <strong style={{ color:'var(--ivory-300)' }}>1M/day</strong>, general-purpose analytics infrastructure is no longer optional — it is essential.
      </motion.div>
    </SlideLayout>
  );
}
