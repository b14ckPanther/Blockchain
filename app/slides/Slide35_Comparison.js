'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const TOOLS = [
  { name:'Our Framework', lang:'Scala', bitcoin:true, ethereum:true, sql:true, nosql:true, extData:true, fixedAnalytics:false, status:'Active', color:'#f0b429' },
  { name:'BlockSci', lang:'C++/Python', bitcoin:true, ethereum:false, sql:false, nosql:false, extData:false, fixedAnalytics:false, status:'Active', color:'#8b6914' },
  { name:'Bitiodine', lang:'Python', bitcoin:true, ethereum:false, sql:true, nosql:false, extData:false, fixedAnalytics:true, status:'Old', color:'#8b6914' },
  { name:'Bitcointools', lang:'Python', bitcoin:true, ethereum:false, sql:false, nosql:false, extData:false, fixedAnalytics:true, status:'Inactive', color:'#444' },
  { name:'Bitcoin Core RPC', lang:'Various', bitcoin:true, ethereum:false, sql:false, nosql:false, extData:false, fixedAnalytics:true, status:'Active', color:'#8b6914' },
];

const COLS = ['Tool','Language','Bitcoin','Ethereum','SQL','NoSQL','Ext. Data','Fixed Analytics','Status'];

export default function Slide35_Comparison() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Comparison — Section 5</SectionTag>
      <SlideTitle>Full Tool Comparison Landscape</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'24px' }}>Our framework is the only tool supporting all major requirements simultaneously.</SlideSubtitle>
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
        style={{ width:'100%', maxWidth:'1100px', background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'20px', overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'160px 100px repeat(6,1fr) 80px', background:'rgba(240,180,41,0.06)', borderBottom:'1px solid var(--border-mid)' }}>
          {COLS.map((h,i)=><div key={i} style={{ padding:'10px 10px', fontFamily:'var(--font-mono)', fontSize:'0.55rem', color:'var(--ivory-600)', letterSpacing:'0.07em', textTransform:'uppercase' }}>{h}</div>)}
        </div>
        {TOOLS.map((t,i)=>(
          <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4+i*0.09 }}
            style={{ display:'grid', gridTemplateColumns:'160px 100px repeat(6,1fr) 80px', borderBottom: i<TOOLS.length-1 ? '1px solid var(--border-subtle)' : 'none',
              background: i===0 ? 'rgba(240,180,41,0.05)' : 'transparent' }}>
            <div style={{ padding:'12px 10px', fontFamily:'var(--font-syne)', fontSize:'0.78rem', fontWeight: i===0 ? 700 : 400, color: t.color }}>{t.name}{i===0&&<span style={{ marginLeft:'6px', fontSize:'0.55rem', background:'rgba(240,180,41,0.15)', border:'1px solid rgba(240,180,41,0.3)', borderRadius:'4px', padding:'1px 5px', color:'var(--gold-bright)' }}>OURS</span>}</div>
            <div style={{ padding:'12px 10px', fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--ivory-600)' }}>{t.lang}</div>
            {[t.bitcoin,t.ethereum,t.sql,t.nosql,t.extData,!t.fixedAnalytics].map((v,j)=>(
              <div key={j} style={{ padding:'12px 10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: v ? (i===0?'#f0b429':'#6dcc6d') : 'rgba(255,255,255,0.1)' }}/>
              </div>
            ))}
            <div style={{ padding:'12px 10px', fontFamily:'var(--font-mono)', fontSize:'0.6rem', color: t.status==='Active' ? '#6dcc6d' : t.status==='Old' ? '#e87c2a' : 'rgba(255,255,255,0.2)' }}>{t.status}</div>
          </motion.div>
        ))}
      </motion.div>
    </SlideLayout>
  );
}
