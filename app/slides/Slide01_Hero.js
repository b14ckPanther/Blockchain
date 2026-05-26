'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GoldAccent } from '../components/SlideLayout';

// 3D floating block mesh using canvas + vanilla JS
function BlockchainCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const W = canvas.width;
    const H = canvas.height;

    // Blocks in 3D space
    const blocks = Array.from({ length: 8 }, (_, i) => ({
      x: W * 0.1 + (i % 4) * (W * 0.22),
      y: H * 0.3 + Math.floor(i / 4) * (H * 0.28),
      w: 120,
      h: 60,
      depth: 30,
      hash: `0x${Math.random().toString(16).slice(2, 8)}...`,
      txs: Math.floor(Math.random() * 3000) + 500,
      t: i * 0.3,
      speed: 0.003 + Math.random() * 0.002,
    }));

    // Flowing particles
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let t = 0;

    function draw3DBlock(ctx, block, t) {
      const floatY = Math.sin(t + block.t) * 6;
      const bx = block.x;
      const by = block.y + floatY;
      const w = block.w;
      const h = block.h;
      const d = block.depth;
      const dx = d * 0.6;
      const dy = -d * 0.4;

      // Top face
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + w, by);
      ctx.lineTo(bx + w + dx, by + dy);
      ctx.lineTo(bx + dx, by + dy);
      ctx.closePath();
      ctx.fillStyle = 'rgba(240,180,41,0.18)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(240,180,41,0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Front face
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + w, by);
      ctx.lineTo(bx + w, by + h);
      ctx.lineTo(bx, by + h);
      ctx.closePath();
      ctx.fillStyle = 'rgba(20,20,34,0.9)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(240,180,41,0.4)';
      ctx.stroke();

      // Right face
      ctx.beginPath();
      ctx.moveTo(bx + w, by);
      ctx.lineTo(bx + w + dx, by + dy);
      ctx.lineTo(bx + w + dx, by + dy + h);
      ctx.lineTo(bx + w, by + h);
      ctx.closePath();
      ctx.fillStyle = 'rgba(15,15,26,0.9)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(240,180,41,0.3)';
      ctx.stroke();

      // Hash text
      ctx.fillStyle = 'rgba(240,180,41,0.8)';
      ctx.font = '9px DM Mono, monospace';
      ctx.fillText(block.hash, bx + 8, by + 20);
      ctx.fillStyle = 'rgba(200,195,180,0.5)';
      ctx.font = '8px DM Mono, monospace';
      ctx.fillText(`${block.txs} txs`, bx + 8, by + 36);

      // Chain link to next block
      return { x: bx + w, y: by + h / 2, tx: bx + dx + w, ty: by + dy + h / 2 };
    }

    function render() {
      ctx.clearRect(0, 0, W, H);

      // Background glow
      const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7);
      grad.addColorStop(0, 'rgba(240,180,41,0.03)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,180,41,${p.alpha * 0.5})`;
        ctx.fill();
      });

      // Chain connections first
      blocks.forEach((block, i) => {
        if (i < blocks.length - 1 && i !== 3) {
          const floatY = Math.sin(t + block.t) * 6;
          const nextBlock = blocks[i + 1];
          const nextFloatY = Math.sin(t + nextBlock.t) * 6;
          const x1 = block.x + block.w;
          const y1 = block.y + floatY + block.h / 2;
          const x2 = nextBlock.x;
          const y2 = nextBlock.y + nextFloatY + nextBlock.h / 2;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.bezierCurveTo(x1 + 40, y1, x2 - 40, y2, x2, y2);
          ctx.strokeStyle = `rgba(240,180,41,${0.2 + Math.sin(t * 2 + i) * 0.1})`;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      // Draw blocks
      blocks.forEach((block) => {
        draw3DBlock(ctx, block, t);
      });

      t += 0.01;
      animRef.current = requestAnimationFrame(render);
    }

    render();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.7,
      }}
    />
  );
}

export default function Slide01_Hero() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #050508 0%, #09090f 50%, #050508 100%)',
    }}>
      {/* Animated blockchain canvas background */}
      <BlockchainCanvas />

      {/* Deep radial overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(5,5,8,0.2) 0%, rgba(5,5,8,0.85) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '900px', padding: '0 40px' }}>

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'rgba(240,180,41,0.08)',
            border: '1px solid rgba(240,180,41,0.3)',
            borderRadius: '100px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--gold-bright)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          <div style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: 'var(--gold-bright)',
            boxShadow: '0 0 8px var(--gold-bright)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }} />
          Blockchain Seminar — Mohammed Majdoub
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            marginBottom: '24px',
          }}
        >
          <span className="text-gold">A General Framework</span>
          <br />
          <span style={{ color: 'var(--ivory-100)' }}>for Blockchain</span>
          <br />
          <span style={{
            color: 'var(--ivory-400)',
            fontWeight: 300,
            fontSize: '0.7em',
            letterSpacing: '-0.01em',
          }}>Analytics</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--gold-mid), var(--gold-bright), var(--gold-mid), transparent)',
            margin: '28px auto',
            maxWidth: '400px',
            opacity: 0.6,
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          style={{
            fontFamily: 'var(--font-space)',
            fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
            color: 'var(--ivory-600)',
            lineHeight: 1.7,
            maxWidth: '640px',
            margin: '0 auto 40px',
          }}
        >
          An open-source Scala framework for general-purpose analytics on Bitcoin and Ethereum blockchains,
          supporting SQL and NoSQL databases with seamless external data integration.
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'Blockchains', value: 'Bitcoin + Ethereum' },
            { label: 'Databases', value: 'SQL & NoSQL' },
            { label: 'Language', value: 'Scala' },
            { label: 'License', value: 'Open Source' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--ivory-600)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}>
                {item.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-space)',
                fontSize: '0.85rem',
                color: 'var(--gold-pale)',
                fontWeight: 500,
              }}>
                {item.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'var(--ivory-600)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        Press → to begin
        <motion.div
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '1rem', color: 'var(--gold-bright)' }}
        >
          →
        </motion.div>
      </motion.div>
    </div>
  );
}
