'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';
import { Check, X } from 'lucide-react';

const ROWS = [
  { feat:'Multi-blockchain (BTC+ETH)', ours:true, blocksci:false, bitiodine:false },
  { feat:'SQL Database Support', ours:true, blocksci:false, bitiodine:true },
  { feat:'NoSQL Database Support', ours:true, blocksci:false, bitiodine:false },
  { feat:'External Data Integration', ours:true, blocksci:false, bitiodine:false },
  { feat:'Open Source', ours:true, blocksci:true, bitiodine:true },
  { feat:'Deep Scan (fees)', ours:true, blocksci:true, bitiodine:false },
  { feat:'Mainstream Language', ours:true, blocksci:false, bitiodine:true },
  { feat:'Community Extensible', ours:true, blocksci:false, bitiodine:false },
];

export default function Slide34_BlockSci() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Comparison — Section 5</SectionTag>
      <SlideTitle>Head-to-Head: BlockSci & Bitiodine</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'24px' }}>
        BlockSci (Kalodner et al. 2017) is the closest prior work — high-performance but limited flexibility.
      </SlideSubtitle>
      <div style={{ width:'100%', maxWidth:'900px' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
          style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'20px', overflow:'hidden', marginBottom:'20px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', background:'rgba(240,180,41,0.06)', borderBottom:'1px solid var(--border-mid)' }}>
            {['Feature','Our Framework','BlockSci','Bitiodine'].map((h,i)=>(
              <div key={i} style={{ padding:'12px 16px', fontFamily:'var(--font-mono)', fontSize:'0.6rem', color: i===1 ? 'var(--gold-bright)' : 'var(--ivory-600)', letterSpacing:'0.08em', textTransform:'uppercase', fontWeight: i===1 ? 700 : 400 }}>{h}</div>
            ))}
          </div>
          {ROWS.map((r,i)=>(
            <motion.div key={i} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4+i*0.07 }}
              style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', borderBottom: i<ROWS.length-1 ? '1px solid var(--border-subtle)' : 'none' }}>
              <div style={{ padding:'13px 16px', fontFamily:'var(--font-space)', fontSize:'0.8rem', color:'var(--ivory-400)' }}>{r.feat}</div>
              {[r.ours, r.blocksci, r.bitiodine].map((v,j)=>(
                <div key={j} style={{ padding:'13px 16px', display:'flex', alignItems:'center', justifyContent:'center', background: j===0 && v ? 'rgba(240,180,41,0.03)' : 'transparent' }}>
                  {v ? <Check size={16} color={j===0 ? '#f0b429' : '#6dcc6d'}/> : <X size={16} color="rgba(255,255,255,0.12)"/>}
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
          style={{ background:'rgba(240,180,41,0.05)', border:'1px solid rgba(240,180,41,0.2)', borderRadius:'14px', padding:'16px 20px' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--gold-bright)', marginBottom:'8px', letterSpacing:'0.1em' }}>ADVANTAGE OF OUR APPROACH</div>
          <div style={{ fontFamily:'var(--font-space)', fontSize:'0.8rem', color:'var(--ivory-600)', lineHeight:1.6 }}>
            Our framework overcomes prior proposals in its built-in support for external data and multiple database backends. Being an open-source library in a mainstream language enables community validation and extension.
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
