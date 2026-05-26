'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DATA = [
  { date: 'Oct-12', txs: 120 },{ date: 'Jan-13', txs: 850 },{ date: 'Apr-13', txs: 2400 },
  { date: 'Jul-13', txs: 3100 },{ date: 'Nov-13', txs: 2800 },{ date: 'Mar-14', txs: 2100 },
  { date: 'Jul-14', txs: 1600 },{ date: 'Jan-15', txs: 280 },{ date: 'Jul-15', txs: 90 },
  { date: 'Jan-16', txs: 45 },{ date: 'Jul-16', txs: 30 },
];

export default function Slide28_SatoshiDice() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Case Study 05 — Results</SectionTag>
      <SlideTitle>SatoshiDice Daily Transactions</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '24px' }}>
        Figure 11: Daily transactions to addresses tagged SatoshiDice*. A dramatic drop in 2015 reveals a platform shift.
      </SlideSubtitle>
      <div style={{ width: '100%', maxWidth: '1060px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '20px', padding: '28px 24px', height: '240px', marginBottom: '20px' }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA}>
              <defs>
                <linearGradient id="sdGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f0b429" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f0b429" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={{ fontFamily:'DM Mono', fontSize:9, fill:'rgba(200,195,180,0.5)' }}/>
              <YAxis tick={{ fontFamily:'DM Mono', fontSize:9, fill:'rgba(200,195,180,0.5)' }} tickFormatter={v=>`${v}`}/>
              <Tooltip contentStyle={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'10px', fontFamily:'DM Mono', fontSize:'12px' }} labelStyle={{ color:'var(--gold-bright)' }} itemStyle={{ color:'var(--ivory-200)' }}/>
              <Area type="monotone" dataKey="txs" name="Daily Txs" stroke="#f0b429" strokeWidth={2} fill="url(#sdGrad)"/>
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'14px' }}>
          {[
            { title:'Peak Period (2013)', desc:'SatoshiDice was the most popular Bitcoin gambling site in 2013, generating up to 3,100 daily transactions and at times comprising >50% of all Bitcoin transactions.', color:'#f0b429' },
            { title:'Dramatic Drop (2015)', desc:'Daily transaction count collapses from ~2000 to <300. The paper attributes this to SatoshiDice switching to untagged addresses — demonstrating the fragility of tag-based analytics.', color:'#e87c2a' },
            { title:'Analytics Lesson', desc:'Address tag analysis is powerful but incomplete — if a service changes addresses, the signal is lost. Our framework makes it easy to update the tag file and re-run the analysis.', color:'#c9940a' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5+i*0.08 }}
              style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'14px', padding:'16px', borderTop:`2px solid ${item.color}60` }}>
              <div style={{ fontFamily:'var(--font-syne)', fontSize:'0.82rem', fontWeight:700, color:item.color, marginBottom:'8px' }}>{item.title}</div>
              <div style={{ fontFamily:'var(--font-space)', fontSize:'0.74rem', color:'var(--ivory-600)', lineHeight:1.6 }}>{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
