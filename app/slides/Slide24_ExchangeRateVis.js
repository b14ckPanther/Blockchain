'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Figure 7 data: avg output value (BTC) by exchange rate interval
const DATA = [
  { range: '0–300', btc: 28.4, highlight: false },
  { range: '300–600', btc: 21.2, highlight: false },
  { range: '600–900', btc: 16.8, highlight: false },
  { range: '900–1200', btc: 12.1, highlight: false },
  { range: '1200–1500', btc: 8.9, highlight: false },
  { range: '1500–1800', btc: 15.3, highlight: true },
  { range: '1800–2100', btc: 22.7, highlight: true },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '10px', padding: '10px 14px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold-bright)', marginBottom: '4px' }}>Rate: ${payload[0].payload.range}</div>
        <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.75rem', color: 'var(--ivory-200)' }}>{payload[0].value} BTC avg output</div>
      </div>
    );
  }
  return null;
};

export default function Slide24_ExchangeRateVis() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Case Study 03 — Results</SectionTag>
      <SlideTitle>Output Value vs. Exchange Rate</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '24px' }}>
        Figure 7: Average output value (BTC) by exchange rate interval. A surprising reversal above $1,500.
      </SlideSubtitle>

      <div style={{ width: '100%', maxWidth: '1060px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '20px', padding: '28px 24px', marginBottom: '20px', height: '260px' }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="range" tick={{ fontFamily: 'DM Mono', fontSize: 9, fill: 'rgba(200,195,180,0.5)' }}
                label={{ value: 'USD/BTC Exchange Rate', position: 'insideBottom', offset: -2, fill: 'rgba(200,195,180,0.4)', fontSize: 10, fontFamily: 'DM Mono' }} />
              <YAxis tick={{ fontFamily: 'DM Mono', fontSize: 10, fill: 'rgba(200,195,180,0.5)' }}
                label={{ value: 'Avg Output (BTC)', angle: -90, position: 'insideLeft', fill: 'rgba(200,195,180,0.4)', fontSize: 10, fontFamily: 'DM Mono' }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(240,180,41,0.05)' }} />
              <Bar dataKey="btc" radius={[4, 4, 0, 0]}>
                {DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.highlight ? '#e87c2a' : '#f0b429'} fillOpacity={entry.highlight ? 0.85 : 0.6} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
          {[
            { title: 'Expected Behaviour (0–$1,500)', desc: 'As BTC/USD rises, users send smaller BTC amounts to maintain similar USD value. Classic inverse relationship confirms market rationality.', color: '#f0b429' },
            { title: 'Surprising Reversal (>$1,500)', desc: 'Above $1,500/BTC, average output value increases instead of decreasing. Large BTC transfers emerge despite high prices.', color: '#e87c2a' },
            { title: 'Speculative Explanation', desc: 'The paper attributes this reversal to speculative activity — large investors moving significant BTC quantities as the market surges past $1,500 in mid-2017.', color: '#c9940a' },
          ].map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08 }}
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '14px', padding: '16px', borderTop: `2px solid ${item.color}60` }}
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
