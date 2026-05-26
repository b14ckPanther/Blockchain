'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';
import { Shield, AlertTriangle, Lock, TrendingDown } from 'lucide-react';

const CASES = [
  { icon: Shield, title:'DDoS Attack Analysis', desc:'Baqer et al. (2016) and Vasek et al. (2014) identified Bitcoin network stress events and DDoS attacks by analyzing transaction mempool behavior and block confirmation times.', data:'Analyzed: mempool, unconfirmed txs, mining pool data', color:'#f0b429' },
  { icon: Lock, title:'Ransomware Tracking', desc:'Liao et al. (2016) analyzed CryptoLocker ransom payments by tracing Bitcoin addresses on dark-web forums and computing ransoms in USD using our exchange-rate integration pattern.', data:'Traced: $1.1M+ in CryptoLocker payments (2013-2014)', color:'#e87c2a' },
  { icon: AlertTriangle, title:'Money Laundering', desc:'Möser et al. (2013) studied Bitcoin mixing services and money laundering tools. Transaction graph analysis reveals suspicious clustering patterns.', data:'Identified: 3 major mixing services, anonymity effectiveness', color:'#c9940a' },
  { icon: TrendingDown, title:'Scam & Fraud Detection', desc:'Vasek & Moore (2015) catalogued 192 scams by combining Bitcoin address tags from forums (bitcointalk.org) with transaction data to compute profits.', data:'Found: 192 confirmed scams, $11M+ estimated losses', color:'#fac87c' },
];

export default function Slide37_CyberCrime() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Analytics Category — Cyber-Crime</SectionTag>
      <SlideTitle>Blockchain for Cyber-Crime Investigation</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'24px' }}>
        The immutability and transparency of blockchains makes them powerful forensic tools — all transactions are permanently recorded.
      </SlideSubtitle>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'16px', width:'100%', maxWidth:'1060px' }}>
        {CASES.map((c,i)=>{
          const Icon = c.icon;
          return (
            <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2+i*0.1 }}
              style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'16px', padding:'22px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px' }}>
                <div style={{ width:'38px', height:'38px', background:`${c.color}15`, border:`1px solid ${c.color}30`, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={18} color={c.color}/>
                </div>
                <div style={{ fontFamily:'var(--font-syne)', fontSize:'0.9rem', fontWeight:700, color:c.color }}>{c.title}</div>
              </div>
              <div style={{ fontFamily:'var(--font-space)', fontSize:'0.76rem', color:'var(--ivory-600)', lineHeight:1.65, marginBottom:'12px' }}>{c.desc}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:`${c.color}`, background:`${c.color}08`, border:`1px solid ${c.color}20`, borderRadius:'8px', padding:'6px 12px' }}>{c.data}</div>
            </motion.div>
          );
        })}
      </div>
    </SlideLayout>
  );
}
