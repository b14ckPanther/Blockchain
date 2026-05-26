'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const TECHS = [
  { name:'BitcoinJ', role:'Bitcoin object representation', side:'Bitcoin', color:'#f0b429' },
  { name:'Parity', role:'Ethereum full node', side:'Ethereum', color:'#e87c2a' },
  { name:'web3j', role:'Parity RPC client library', side:'Ethereum', color:'#e87c2a' },
  { name:'Bitcoin Core', role:'Full node RPC for Bitcoin', side:'Bitcoin', color:'#f0b429' },
  { name:'MySQL JDBC', role:'SQL database connector', side:'Database', color:'#5fb8f0' },
  { name:'MongoDB Scala', role:'NoSQL driver for Scala', side:'Database', color:'#6dcc6d' },
  { name:'Coindesk API', role:'BTC/USD exchange rates', side:'External', color:'#fac87c' },
  { name:'blockchain.info', role:'Address tags (local cache)', side:'External', color:'#fac87c' },
];

export default function Slide33_Implementation() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Implementation</SectionTag>
      <SlideTitle>Technology Stack</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'24px' }}>
        Our framework is built on proven open-source components — no proprietary dependencies.
      </SlideSubtitle>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', width:'100%', maxWidth:'1100px', marginBottom:'24px' }}>
        {TECHS.map((t,i)=>(
          <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2+i*0.06 }}
            style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'14px', padding:'16px', textAlign:'center' }}>
            <div style={{ display:'inline-block', padding:'3px 10px', background:`${t.color}15`, border:`1px solid ${t.color}30`, borderRadius:'100px', fontFamily:'var(--font-mono)', fontSize:'0.58rem', color:t.color, marginBottom:'10px', textTransform:'uppercase', letterSpacing:'0.06em' }}>{t.side}</div>
            <div style={{ fontFamily:'var(--font-syne)', fontSize:'0.9rem', fontWeight:700, color:'var(--ivory-100)', marginBottom:'6px' }}>{t.name}</div>
            <div style={{ fontFamily:'var(--font-space)', fontSize:'0.72rem', color:'var(--ivory-600)', lineHeight:1.5 }}>{t.role}</div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
        style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', width:'100%', maxWidth:'1100px' }}>
        {[
          { title:'GitHub Repository', content:'Full source code, case study scripts, and usage examples available at github.com/bitbart/blockchain-analytics-api under an open-source license.', color:'#f0b429' },
          { title:'Scala Choice', content:'Scala provides a concise, type-safe, JVM-compatible language with excellent library support. The functional style enables composable, reusable analytics pipelines.', color:'#e87c2a' },
        ].map((item,i)=>(
          <div key={i} style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'14px', padding:'20px', borderLeft:`3px solid ${item.color}60` }}>
            <div style={{ fontFamily:'var(--font-syne)', fontSize:'0.9rem', fontWeight:700, color:item.color, marginBottom:'8px' }}>{item.title}</div>
            <div style={{ fontFamily:'var(--font-space)', fontSize:'0.8rem', color:'var(--ivory-600)', lineHeight:1.6 }}>{item.content}</div>
          </div>
        ))}
      </motion.div>
    </SlideLayout>
  );
}
