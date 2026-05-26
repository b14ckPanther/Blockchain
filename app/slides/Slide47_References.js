'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle } from '../components/SlideLayout';

const REFS = [
  { key:'[1]', cite:'Nakamoto, S. (2008). Bitcoin: A Peer-to-Peer Electronic Cash System. bitcoin.org/bitcoin.pdf', type:'Foundational' },
  { key:'[2]', cite:'Buterin, V. (2014). Ethereum White Paper: A Next Generation Smart Contract and Decentralized Application Platform.', type:'Foundational' },
  { key:'[3]', cite:'Bartoletti, M. & Pompianu, L. (2017). An Empirical Analysis of Smart Contracts: Platforms, Applications, and Design Patterns. FC 2017.', type:'Core' },
  { key:'[4]', cite:'Kalodner, H. et al. (2017). BlockSci: Design and Applications of a Blockchain Analysis Platform. USENIX Security.', type:'Tool' },
  { key:'[5]', cite:'Meiklejohn, S. et al. (2013, 2016). A Fistful of Bitcoins: Characterizing Payments Among Men with No Names. IMC.', type:'Anonymity' },
  { key:'[6]', cite:'Reid, F. & Harrigan, M. (2013). An Analysis of Anonymity in the Bitcoin System. SNA.', type:'Anonymity' },
  { key:'[7]', cite:'Liao, K. et al. (2016). Incentivizing Blockchain Forks via Whale Transactions. BITCOIN Workshop.', type:'Economics' },
  { key:'[8]', cite:'Vasek, M. & Moore, T. (2015). There\'s No Free Lunch, Even Using Bitcoin: Tracking the Popularity and Profits of Virtual Currency Scams. FC.', type:'Security' },
  { key:'[9]', cite:'Möser, M. et al. (2013). An Empirical Analysis of Traceability in the Monero Blockchain. FC.', type:'Anonymity' },
  { key:'[10]', cite:'Decker, C. & Wattenhofer, R. (2013). Information Propagation in the Bitcoin Network. P2P.', type:'Network' },
];

const COLORS = { Foundational:'#f0b429', Core:'#e87c2a', Tool:'#c9940a', Anonymity:'#fac87c', Economics:'#f0b429', Security:'#e87c2a', Network:'#c9940a' };

export default function Slide47_References() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Bibliography</SectionTag>
      <SlideTitle style={{ marginBottom:'24px' }}>Key References</SlideTitle>
      <div style={{ display:'flex', flexDirection:'column', gap:'8px', width:'100%', maxWidth:'1000px' }}>
        {REFS.map((r,i)=>(
          <motion.div key={i} initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1+i*0.06 }}
            style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'10px', padding:'10px 16px', display:'flex', alignItems:'flex-start', gap:'12px' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'var(--gold-bright)', minWidth:'32px', flexShrink:0 }}>{r.key}</span>
            <span style={{ fontFamily:'var(--font-space)', fontSize:'0.74rem', color:'var(--ivory-600)', lineHeight:1.5, flex:1 }}>{r.cite}</span>
            <span style={{ padding:'2px 8px', background:`${COLORS[r.type]||'#f0b429'}12`, border:`1px solid ${COLORS[r.type]||'#f0b429'}25`, borderRadius:'100px', fontFamily:'var(--font-mono)', fontSize:'0.55rem', color:COLORS[r.type]||'#f0b429', whiteSpace:'nowrap', flexShrink:0 }}>{r.type}</span>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  );
}
