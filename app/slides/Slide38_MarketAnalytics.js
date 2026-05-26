'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DATA = [
  {y:'2009',cap:0.001},{y:'2010',cap:0.01},{y:'2011',cap:0.3},{y:'2012',cap:0.7},
  {y:'2013',cap:9.8},{y:'2014',cap:4.2},{y:'2015',cap:3.5},{y:'2016',cap:7.1},{y:'2017',cap:100},
];

export default function Slide38_MarketAnalytics() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Analytics Category — Market</SectionTag>
      <SlideTitle>Market & Economic Analytics</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'24px' }}>
        Blockchain data combined with exchange rates and address tags enables sophisticated economic analysis.
      </SlideSubtitle>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px', width:'100%', maxWidth:'1060px' }}>
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--ivory-600)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'10px' }}>Bitcoin Market Cap 2009-2017 (Billions USD)</div>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
            style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'16px', padding:'20px', height:'220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="y" tick={{ fontFamily:'DM Mono', fontSize:9, fill:'rgba(200,195,180,0.5)' }}/>
                <YAxis tick={{ fontFamily:'DM Mono', fontSize:9, fill:'rgba(200,195,180,0.5)' }} tickFormatter={v=>`$${v}B`}/>
                <Tooltip contentStyle={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'10px', fontFamily:'DM Mono', fontSize:'12px' }} labelStyle={{ color:'var(--gold-bright)' }}/>
                <Line type="monotone" dataKey="cap" name="Market Cap" stroke="#f0b429" strokeWidth={2} dot={{ fill:'#f0b429', r:3 }}/>
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {[
            { title:'Daily Transaction Volume (USD)', desc:'Computed from our exchange-rate view: sum all outputSum × rate per day. Reveals economic activity trends, holiday effects, and market event reactions.', color:'#f0b429' },
            { title:'Richest Addresses', desc:'Sort transactions by (outputSum × rate) descending. Identifies whale wallets. Lischke & Fabian (2016) used this for Bitcoin wealth distribution analysis.', color:'#e87c2a' },
            { title:'Geographic Distribution', desc:'Combine address tags with ipinfo.io geolocation data to map Bitcoin service usage by country and region — revealing global adoption patterns.', color:'#c9940a' },
          ].map((item,i)=>(
            <motion.div key={i} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3+i*0.1 }}
              style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'14px', padding:'16px', borderLeft:`3px solid ${item.color}50` }}>
              <div style={{ fontFamily:'var(--font-syne)', fontSize:'0.82rem', fontWeight:700, color:item.color, marginBottom:'6px' }}>{item.title}</div>
              <div style={{ fontFamily:'var(--font-space)', fontSize:'0.74rem', color:'var(--ivory-600)', lineHeight:1.55 }}>{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
