'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DATA = [
  { op:'Basic View', mongo:4.2, mysql:4.8 },
  { op:'OP_RETURN', mongo:2.1, mysql:2.4 },
  { op:'Exchange Rates', mongo:5.1, mysql:5.6 },
  { op:'Tx Fees (deep)', mongo:18.2, mysql:22.7 },
  { op:'Address Tags', mongo:6.3, mysql:6.9 },
];

export default function Slide31_Performance() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Evaluation</SectionTag>
      <SlideTitle>Performance Benchmarks</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'24px' }}>
        View creation time (hours) on consumer hardware — Intel i7, 16GB RAM, SSD. Both DBs comparable except deep-scan joins.
      </SlideSubtitle>
      <div style={{ width:'100%', maxWidth:'1060px' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
          style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'20px', padding:'28px 24px', height:'260px', marginBottom:'20px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top:5, right:20, left:0, bottom:5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
              <XAxis dataKey="op" tick={{ fontFamily:'DM Mono', fontSize:9, fill:'rgba(200,195,180,0.5)' }}/>
              <YAxis tick={{ fontFamily:'DM Mono', fontSize:9, fill:'rgba(200,195,180,0.5)' }} label={{ value:'Hours', angle:-90, position:'insideLeft', fill:'rgba(200,195,180,0.4)', fontSize:10, fontFamily:'DM Mono' }}/>
              <Tooltip contentStyle={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'10px', fontFamily:'DM Mono', fontSize:'12px' }} labelStyle={{ color:'var(--gold-bright)' }}/>
              <Legend wrapperStyle={{ fontFamily:'DM Mono', fontSize:'11px', color:'rgba(200,195,180,0.7)' }}/>
              <Bar dataKey="mongo" name="MongoDB" fill="#f0b429" fillOpacity={0.7} radius={[4,4,0,0]}/>
              <Bar dataKey="mysql" name="MySQL" fill="#5fb8f0" fillOpacity={0.7} radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'14px' }}>
          {[
            { title:'Comparable Performance', desc:'For most operations, MongoDB and MySQL are in the same order of magnitude. The choice of database does not significantly impact overall throughput.', color:'#f0b429' },
            { title:'Deep Scan Overhead', desc:'Transaction fee collection requires deep scan mode — MySQL shows ~25% higher time due to JOIN operations when resolving input values from the UTXO table.', color:'#e87c2a' },
            { title:'Consumer Hardware', desc:'All experiments on an Intel i7 consumer laptop with 16GB RAM and SSD. No distributed computing required. Validates practical usability.', color:'#c9940a' },
          ].map((item,i)=>(
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
