'use client';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Data from Figure 5 — protocols with >1000 transactions
const DATA = [
  { protocol: 'Colu', txs: 248000, color: '#f0b429' },
  { protocol: 'Omni', txs: 89000, color: '#e87c2a' },
  { protocol: 'Blockstore', txs: 72000, color: '#c9940a' },
  { protocol: 'CoinSpark', txs: 51000, color: '#fac87c' },
  { protocol: 'OpenAssets', txs: 41000, color: '#f0b429' },
  { protocol: 'Factom', txs: 35000, color: '#e87c2a' },
  { protocol: 'Stampery', txs: 28000, color: '#c9940a' },
  { protocol: 'ProofOfExist.', txs: 22000, color: '#fac87c' },
  { protocol: 'BlockSign', txs: 18000, color: '#f0b429' },
  { protocol: 'Monegraph', txs: 14000, color: '#e87c2a' },
  { protocol: 'Ascribe', txs: 11000, color: '#c9940a' },
  { protocol: 'Eternity Wall', txs: 8000, color: '#fac87c' },
  { protocol: 'SmartBit', txs: 4000, color: '#f0b429' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '10px', padding: '10px 14px' }}>
        <div style={{ fontFamily: 'var(--font-syne)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--ivory-100)', marginBottom: '4px' }}>{payload[0].payload.protocol}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold-bright)' }}>{payload[0].value.toLocaleString()} transactions</div>
      </div>
    );
  }
  return null;
};

export default function Slide22_OPReturnProtocols() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Case Study 02 — Results</SectionTag>
      <SlideTitle>OP_RETURN Protocol Distribution</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '24px' }}>
        Figure 5: Number of transactions per protocol (only protocols with &gt;1,000 transactions shown).
      </SlideSubtitle>

      <div style={{ width: '100%', maxWidth: '1060px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '20px', padding: '24px', marginBottom: '20px', height: '260px' }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top: 5, right: 10, left: 10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="protocol" tick={{ fontFamily: 'DM Mono', fontSize: 9, fill: 'rgba(200,195,180,0.5)' }} angle={-35} textAnchor="end" interval={0} />
              <YAxis tick={{ fontFamily: 'DM Mono', fontSize: 10, fill: 'rgba(200,195,180,0.5)' }} tickFormatter={v => v >= 1000 ? `${v/1000}K` : v} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(240,180,41,0.05)' }} />
              <Bar dataKey="txs" radius={[4, 4, 0, 0]}>
                {DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} fillOpacity={0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {[
            { title: '#1 Colu', desc: '~248K transactions. Used to certify and transfer the ownership of physical assets on the blockchain.', color: '#f0b429' },
            { title: '#2 Omni', desc: '~89K transactions. A platform for creating and trading custom digital currencies (Omni Layer Protocol).', color: '#e87c2a' },
            { title: '#3 Blockstore', desc: '~72K transactions. A key-value store built on Bitcoin, upon which other protocols (like Namecoin-style DNS) are based.', color: '#c9940a' },
          ].map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08 }}
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: '14px', padding: '16px', borderTop: `2px solid ${item.color}60` }}
            >
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '0.88rem', fontWeight: 700, color: item.color, marginBottom: '8px' }}>{item.title}</div>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.74rem', color: 'var(--ivory-600)', lineHeight: 1.6 }}>{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
