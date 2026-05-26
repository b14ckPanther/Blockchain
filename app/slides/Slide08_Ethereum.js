'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

const TABS = ['Overview', 'Smart Contracts', 'vs Bitcoin'];

const CONTENT = {
  Overview: {
    points: [
      'Ethereum is a decentralized platform that runs smart contracts — self-executing code stored on the blockchain.',
      'Launched in 2015 by Vitalik Buterin, Ethereum extends Bitcoin\'s concept with a Turing-complete scripting language (Solidity/EVM).',
      'The state of Ethereum consists of accounts (both user accounts and contract accounts) with persistent storage.',
      'As of 2024, Ethereum uses Proof-of-Stake (The Merge, Sep 2022), consuming ~99.95% less energy than PoW.',
      'Blockchain data size: ~1.5TB+ for full archive nodes, making analytics even more challenging than Bitcoin.',
    ],
    stats: [
      { v: '~1M', l: 'Daily Txs' },
      { v: '300GB+', l: 'Blockchain Size' },
      { v: '~12s', l: 'Block Time' },
      { v: 'PoS', l: 'Consensus' },
    ],
  },
  'Smart Contracts': {
    points: [
      'Smart contracts are autonomous programs deployed to the Ethereum blockchain that execute deterministically.',
      'Written in Solidity (or Vyper), compiled to EVM bytecode. Each instruction costs "gas" — paid in ETH.',
      'Applications include DeFi protocols, NFTs (ERC-721), tokens (ERC-20), DAOs, and prediction markets.',
      'The EVM (Ethereum Virtual Machine) is a sandboxed, stack-based virtual machine with 256-bit word size.',
      'Analytics on smart contract interactions reveals usage patterns, financial flows, and security vulnerabilities.',
    ],
    stats: [
      { v: '10K+', l: 'DApps deployed' },
      { v: 'Solidity', l: 'Primary language' },
      { v: 'EVM', l: 'Runtime' },
      { v: 'Gas', l: 'Execution cost' },
    ],
  },
  'vs Bitcoin': {
    points: [
      'Bitcoin: payments-focused, simple UTXO model, limited scripting. Ethereum: general-purpose computation, account model.',
      'Bitcoin block time: ~10 min. Ethereum: ~12 seconds. Higher throughput enables different analytics patterns.',
      'Bitcoin has ~130GB of data (2017 snapshot), Ethereum ~300GB+ — both growing continuously.',
      'Our framework abstracts both behind a unified API, enabling comparative cross-chain analytics.',
      'External data needs differ: Ethereum requires ABI decoding for smart contract events, Bitcoin uses address clustering.',
    ],
    stats: [
      { v: '~130GB', l: 'Bitcoin (2017)' },
      { v: '~300GB+', l: 'Ethereum (2017)' },
      { v: 'UTXO', l: 'Bitcoin model' },
      { v: 'Account', l: 'Ethereum model' },
    ],
  },
};

export default function Slide08_Ethereum() {
  const [tab, setTab] = useState('Overview');
  const content = CONTENT[tab];

  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Blockchain Background</SectionTag>
      <SlideTitle>Ethereum — The World Computer</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '24px' }}>
        The second blockchain in our framework: general-purpose, smart-contract-enabled
      </SlideSubtitle>

      {/* Tab navigation */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: tab === t ? 'rgba(240,180,41,0.12)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${tab === t ? 'rgba(240,180,41,0.4)' : 'var(--border-mid)'}`,
              borderRadius: '10px',
              padding: '8px 20px',
              color: tab === t ? 'var(--gold-bright)' : 'var(--ivory-600)',
              cursor: 'pointer',
              fontFamily: 'var(--font-space)',
              fontSize: '0.8rem',
              fontWeight: tab === t ? 600 : 400,
              transition: 'all 0.25s',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: '1050px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'flex-start' }}
          >
            {/* Points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {content.points.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-start',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-mid)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                  }}
                >
                  <div style={{
                    width: '20px', height: '20px',
                    background: 'rgba(240,180,41,0.12)',
                    border: '1px solid rgba(240,180,41,0.3)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'var(--gold-bright)',
                    fontWeight: 600,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.8rem', color: 'var(--ivory-400)', lineHeight: 1.6 }}>
                    {point}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '160px' }}>
              {content.stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  style={{
                    background: 'rgba(240,180,41,0.06)',
                    border: '1px solid rgba(240,180,41,0.2)',
                    borderRadius: '14px',
                    padding: '16px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-syne)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--gold-bright)' }}>
                    {s.v}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--ivory-600)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px' }}>
                    {s.l}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SlideLayout>
  );
}
