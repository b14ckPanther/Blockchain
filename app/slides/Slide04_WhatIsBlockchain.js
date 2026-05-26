'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

// Interactive blockchain simulation
function BlockchainSim() {
  const canvasRef = useRef(null);
  const stateRef = useRef({ blocks: [], t: 0, animId: null });
  const [mined, setMined] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate initial blockchain
    const generateChain = () => {
      const chain = [];
      for (let i = 0; i < 5; i++) {
        chain.push({
          index: i,
          hash: `0x${Math.random().toString(16).slice(2, 10)}`,
          prevHash: i === 0 ? '0x0000...000' : chain[i - 1].hash,
          nonce: Math.floor(Math.random() * 100000),
          txCount: Math.floor(Math.random() * 2500) + 200,
          confirmed: true,
        });
      }
      return chain;
    };

    stateRef.current.blocks = generateChain();

    const BLOCK_W = 140;
    const BLOCK_H = 80;
    const BLOCK_GAP = 60;
    const CHAIN_Y = 0.5;

    function drawBlock(ctx, block, x, y, W, H, t, isNew = false) {
      const actualX = x;
      const actualY = H * CHAIN_Y - BLOCK_H / 2;

      // Glow for new blocks
      if (isNew) {
        const glow = ctx.createRadialGradient(
          actualX + BLOCK_W / 2, actualY + BLOCK_H / 2, 0,
          actualX + BLOCK_W / 2, actualY + BLOCK_H / 2, 80
        );
        glow.addColorStop(0, 'rgba(240,180,41,0.2)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(actualX - 40, actualY - 40, BLOCK_W + 80, BLOCK_H + 80);
      }

      // Block body
      ctx.fillStyle = isNew ? 'rgba(240,180,41,0.15)' : 'rgba(20,20,40,0.9)';
      ctx.strokeStyle = isNew ? 'rgba(240,180,41,0.8)' : 'rgba(240,180,41,0.3)';
      ctx.lineWidth = isNew ? 2 : 1;
      roundRect(ctx, actualX, actualY, BLOCK_W, BLOCK_H, 8);
      ctx.fill();
      ctx.stroke();

      // Block content
      ctx.fillStyle = 'rgba(240,180,41,0.9)';
      ctx.font = `bold 9px "DM Mono", monospace`;
      ctx.fillText(`BLOCK #${block.index}`, actualX + 10, actualY + 18);

      ctx.fillStyle = 'rgba(200,195,180,0.5)';
      ctx.font = `8px "DM Mono", monospace`;
      ctx.fillText(`Hash: ${block.hash.slice(0, 10)}...`, actualX + 10, actualY + 34);
      ctx.fillText(`Txs: ${block.txCount}`, actualX + 10, actualY + 48);
      ctx.fillText(`Nonce: ${block.nonce}`, actualX + 10, actualY + 62);
    }

    function roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    }

    function render() {
      const { blocks, t } = stateRef.current;
      const W = canvas.width;
      const H = canvas.height;

      if (W === 0 || H === 0) {
        stateRef.current.animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, 'rgba(9,9,15,0)');
      bg.addColorStop(1, 'rgba(5,5,8,0)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const totalW = blocks.length * (BLOCK_W + BLOCK_GAP) - BLOCK_GAP;
      const startX = (W - totalW) / 2;
      const chainY = H * CHAIN_Y;

      // Chain line
      ctx.strokeStyle = 'rgba(240,180,41,0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.moveTo(startX - 20, chainY);
      ctx.lineTo(startX + totalW + 20, chainY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw connections
      blocks.forEach((block, i) => {
        if (i > 0) {
          const x1 = startX + i * (BLOCK_W + BLOCK_GAP);
          const x0 = startX + (i - 1) * (BLOCK_W + BLOCK_GAP) + BLOCK_W;
          const y = chainY;

          // Arrow
          ctx.beginPath();
          ctx.moveTo(x0 + 4, y);
          ctx.lineTo(x1 - 4, y);
          ctx.strokeStyle = `rgba(240,180,41,${0.4 + Math.sin(t * 2 + i) * 0.2})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Arrowhead
          ctx.beginPath();
          ctx.moveTo(x1 - 10, y - 5);
          ctx.lineTo(x1 - 2, y);
          ctx.lineTo(x1 - 10, y + 5);
          ctx.strokeStyle = 'rgba(240,180,41,0.7)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Draw blocks
      blocks.forEach((block, i) => {
        const x = startX + i * (BLOCK_W + BLOCK_GAP);
        const isNew = i === blocks.length - 1 && stateRef.current.isNew;
        drawBlock(ctx, block, x, chainY, W, H, t, isNew);
      });

      // Genesis label
      if (blocks.length > 0) {
        ctx.fillStyle = 'rgba(240,180,41,0.4)';
        ctx.font = '8px "DM Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GENESIS', startX + BLOCK_W / 2, H * CHAIN_Y + BLOCK_H / 2 + 18);
        ctx.textAlign = 'left';
      }

      stateRef.current.t += 0.02;
      if (stateRef.current.isNew && stateRef.current.newTimer > 0) {
        stateRef.current.newTimer--;
      } else {
        stateRef.current.isNew = false;
      }

      stateRef.current.animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (stateRef.current.animId) cancelAnimationFrame(stateRef.current.animId);
    };
  }, []);

  const addBlock = () => {
    const chain = stateRef.current.blocks;
    const prev = chain[chain.length - 1];
    const newBlock = {
      index: prev.index + 1,
      hash: `0x${Math.random().toString(16).slice(2, 10)}`,
      prevHash: prev.hash,
      nonce: Math.floor(Math.random() * 100000),
      txCount: Math.floor(Math.random() * 2500) + 200,
      confirmed: true,
    };
    if (chain.length >= 7) {
      stateRef.current.blocks = chain.slice(1).concat(newBlock);
    } else {
      stateRef.current.blocks = [...chain, newBlock];
    }
    stateRef.current.isNew = true;
    stateRef.current.newTimer = 60;
    setMined(m => m + 1);
  };

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '160px', display: 'block', borderRadius: '12px', background: 'rgba(9,9,15,0.5)', border: '1px solid var(--border-mid)' }}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '12px' }}>
        <button
          onClick={addBlock}
          style={{
            background: 'rgba(240,180,41,0.12)',
            border: '1px solid rgba(240,180,41,0.4)',
            borderRadius: '10px',
            padding: '8px 20px',
            color: 'var(--gold-bright)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            cursor: 'pointer',
            letterSpacing: '0.08em',
          }}
        >
          + MINE BLOCK
        </button>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--ivory-600)',
        }}>
          {mined > 0 ? `${mined} block${mined !== 1 ? 's' : ''} mined in this session` : 'Click to simulate mining'}
        </span>
      </div>
    </div>
  );
}

const PROPERTIES = [
  { title: 'Decentralized', desc: 'No single authority controls the ledger. Thousands of nodes maintain identical copies.', icon: '◎' },
  { title: 'Immutable', desc: 'Once a block is appended, altering it requires recomputing all subsequent blocks — practically impossible.', icon: '◈' },
  { title: 'Transparent', desc: 'Every transaction is publicly verifiable. The full history is open for anyone to audit.', icon: '◇' },
  { title: 'Consensus-driven', desc: 'Participants agree on the canonical chain through cryptographic proof-of-work or proof-of-stake.', icon: '◉' },
];

export default function Slide04_WhatIsBlockchain() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)', padding: '40px 60px 80px', justifyContent: 'flex-start', paddingTop: '50px' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 40% at 80% 50%, rgba(240,180,41,0.03) 0%, transparent 70%)' }}
      />

      <SectionTag>Background</SectionTag>
      <SlideTitle style={{ marginBottom: '8px' }}>What is a Blockchain?</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '24px' }}>
        An append-only, cryptographically linked sequence of blocks — each containing a batch of transactions.
      </SlideSubtitle>

      {/* Interactive sim */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{ width: '100%', maxWidth: '1000px', marginBottom: '28px' }}
      >
        <BlockchainSim />
      </motion.div>

      {/* Properties */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        width: '100%',
        maxWidth: '1000px',
      }}>
        {PROPERTIES.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.08 }}
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-mid)',
              borderRadius: '14px',
              padding: '16px',
            }}
          >
            <div style={{
              fontSize: '1.2rem',
              color: 'var(--gold-bright)',
              marginBottom: '8px',
            }}>
              {p.icon}
            </div>
            <div style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--ivory-200)',
              marginBottom: '6px',
            }}>
              {p.title}
            </div>
            <div style={{
              fontFamily: 'var(--font-space)',
              fontSize: '0.72rem',
              color: 'var(--ivory-600)',
              lineHeight: 1.55,
            }}>
              {p.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  );
}
