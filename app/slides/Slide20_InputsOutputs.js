'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Simulated data from Figure 3 — avg inputs/outputs over time
const DATA = [
  { date: '2009', inputs: 1.1, outputs: 1.2 },
  { date: '2010', inputs: 1.3, outputs: 1.5 },
  { date: '2011', inputs: 1.6, outputs: 1.9 },
  { date: '2012', inputs: 2.0, outputs: 2.2 },
  { date: '2013', inputs: 2.2, outputs: 2.5 },
  { date: '2014', inputs: 2.3, outputs: 2.4 },
  { date: '2014Q3', inputs: 4.8, outputs: 5.2 }, // CoinJoin peak
  { date: '2015', inputs: 2.1, outputs: 2.3 },
  { date: '2016', inputs: 2.2, outputs: 2.4 },
  { date: '2017', inputs: 2.3, outputs: 2.5 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '10px', padding: '12px 16px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold-bright)', marginBottom: '8px' }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ fontFamily: 'var(--font-space)', fontSize: '0.75rem', color: p.color, marginBottom: '3px' }}>
            {p.name}: {p.value.toFixed(2)}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Slide20_InputsOutputs() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Case Study 01 — Analysis</SectionTag>
      <SlideTitle>Avg. Inputs & Outputs Over Time</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '24px' }}>
        Figure 3 from the paper: the average number of inputs and outputs per transaction from 2009 to 2017.
      </SlideSubtitle>

      <div style={{ width: '100%', maxWidth: '1060px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '20px', padding: '28px 24px', marginBottom: '20px', height: '280px' }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorInputs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e87c2a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#e87c2a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOutputs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5fb8f0" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#5fb8f0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fontFamily: 'DM Mono', fontSize: 10, fill: 'rgba(200,195,180,0.5)' }} />
              <YAxis tick={{ fontFamily: 'DM Mono', fontSize: 10, fill: 'rgba(200,195,180,0.5)' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'rgba(200,195,180,0.7)' }} />
              <Area type="monotone" dataKey="inputs" name="Avg Inputs" stroke="#e87c2a" strokeWidth={2} fill="url(#colorInputs)" />
              <Area type="monotone" dataKey="outputs" name="Avg Outputs" stroke="#5fb8f0" strokeWidth={2} fill="url(#colorOutputs)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Insights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {[
            { title: 'Stabilization at 2–3', desc: 'After an initial phase, most transactions have 2–3 inputs and outputs. Standard wallets minimize inputs and produce 2 outputs (payment + change).', color: '#f0b429' },
            { title: 'CoinJoin Peaks', desc: 'Occasional spikes to 5+ in both inputs and outputs are likely due to CoinJoin — a privacy technique that combines multiple users\' transactions.', color: '#e87c2a' },
            { title: 'MongoDB Query', desc: 'A simple 3-stage aggregation: $group by date → compute $avg of input/output list sizes → $sort ascending. No joins needed.', color: '#c9940a' },
          ].map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08 }}
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '14px', padding: '16px', borderTop: `2px solid ${item.color}50` }}
            >
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '0.82rem', fontWeight: 700, color: item.color, marginBottom: '8px' }}>{item.title}</div>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.74rem', color: 'var(--ivory-600)', lineHeight: 1.6 }}>{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
