'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const MONGO_Q = `// MongoDB — Group by date, compute averages
db.myBlockchain.aggregate([
  { $group: {
      _id: {
        year:  { $year:  "$date" },
        month: { $month: "$date" },
        day:   { $dayOfMonth: "$date" },
      },
      avgIn:  { $avg: { $size: "$inputs"  }},
      avgOut: { $avg: { $size: "$outputs" }}
  }},
  { $sort: { _id: 1 }}
]);`;

const SQL_Q = `-- MySQL — Same query in SQL
SELECT
  YEAR(date)       AS yr,
  MONTH(date)      AS mo,
  DAYOFMONTH(date) AS dy,
  AVG(JSON_LENGTH(inputs))  AS avgIn,
  AVG(JSON_LENGTH(outputs)) AS avgOut
FROM myBlockchain
GROUP BY yr, mo, dy
ORDER BY yr, mo, dy ASC;`;

const POINTS = [
  { mongo: 'Schema-less: no CREATE TABLE needed', sql: 'Schema required upfront (DDL)' },
  { mongo: 'Documents map naturally to blockchain objects', sql: 'Must flatten nested objects to columns' },
  { mongo: 'Aggregation pipeline is expressive', sql: 'Standard SQL widely known' },
  { mongo: 'No JOINs needed for embedded data', sql: 'JOINs for relational data (but slower at scale)' },
  { mongo: 'Horizontal scaling (sharding)', sql: 'Vertical scaling, mature transactions' },
];

export default function Slide30_SQLvsNoSQL() {
  const [active, setActive] = useState('mongo');
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Evaluation</SectionTag>
      <SlideTitle>SQL vs NoSQL — Queries Compared</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'20px' }}>
        The same analysis — grouped by date, averaging inputs/outputs — in both query languages.
      </SlideSubtitle>
      <div style={{ width:'100%', maxWidth:'1060px' }}>
        <div style={{ display:'flex', gap:'10px', marginBottom:'20px' }}>
          {[{id:'mongo',label:'MongoDB Query'},{id:'sql',label:'MySQL Query'}].map(b=>(
            <button key={b.id} onClick={()=>setActive(b.id)} style={{
              background: active===b.id ? 'rgba(240,180,41,0.12)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${active===b.id ? 'rgba(240,180,41,0.4)' : 'var(--border-mid)'}`,
              borderRadius:'10px', padding:'8px 22px', cursor:'pointer',
              color: active===b.id ? 'var(--gold-bright)' : 'var(--ivory-600)',
              fontFamily:'var(--font-space)', fontSize:'0.82rem', fontWeight: active===b.id ? 600 : 400,
              transition:'all 0.25s',
            }}>{b.label}</button>
          ))}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', alignItems:'flex-start' }}>
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:12 }}
              transition={{ duration:0.3 }}
              style={{ background:'var(--bg-deep)', border:'1px solid var(--border-mid)', borderRadius:'16px', overflow:'hidden' }}
            >
              <div style={{ background:'rgba(240,180,41,0.06)', borderBottom:'1px solid var(--border-mid)', padding:'10px 16px', display:'flex', alignItems:'center', gap:'8px' }}>
                <div style={{ display:'flex', gap:'6px' }}>{['#e87c2a','#f0b429','#6dcc6d'].map((c,i)=><div key={i} style={{ width:'8px',height:'8px',borderRadius:'50%',background:c,opacity:0.7 }}/>)}</div>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--ivory-600)', marginLeft:'8px' }}>{active==='mongo' ? 'MongoDB Aggregation' : 'MySQL Query'}</span>
              </div>
              <pre style={{ fontFamily:'var(--font-mono)', fontSize:'0.67rem', lineHeight:1.75, color:'var(--ivory-400)', padding:'18px 22px', margin:0, overflowX:'auto' }}>
                {active==='mongo' ? MONGO_Q : SQL_Q}
              </pre>
            </motion.div>
          </AnimatePresence>
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--ivory-600)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'4px' }}>
              Head-to-Head Comparison
            </div>
            {POINTS.map((p,i)=>(
              <motion.div key={i} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1+i*0.07 }}
                style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'12px', padding:'12px 16px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                <div style={{ display:'flex', gap:'8px', alignItems:'flex-start' }}>
                  <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#6dcc6d', marginTop:'6px', flexShrink:0 }}/>
                  <span style={{ fontFamily:'var(--font-space)', fontSize:'0.72rem', color:'var(--ivory-600)', lineHeight:1.5 }}>{p.mongo}</span>
                </div>
                <div style={{ display:'flex', gap:'8px', alignItems:'flex-start' }}>
                  <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#5fb8f0', marginTop:'6px', flexShrink:0 }}/>
                  <span style={{ fontFamily:'var(--font-space)', fontSize:'0.72rem', color:'var(--ivory-600)', lineHeight:1.5 }}>{p.sql}</span>
                </div>
              </motion.div>
            ))}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
              style={{ background:'rgba(240,180,41,0.05)', border:'1px solid rgba(240,180,41,0.15)', borderRadius:'12px', padding:'14px' }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--gold-bright)', marginBottom:'6px' }}>PAPER CONCLUSION</div>
              <div style={{ fontFamily:'var(--font-space)', fontSize:'0.75rem', color:'var(--ivory-600)', lineHeight:1.6 }}>
                No significant difference in query <strong style={{ color:'var(--ivory-300)' }}>complexity</strong>. Performance is comparable as order of magnitude. Join operations cause SQL slowdowns on deep scan queries.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
