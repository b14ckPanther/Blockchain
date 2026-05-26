'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle } from '../components/SlideLayout';

function ArchDiagram() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0;
    let animId;

    const ro = new ResizeObserver(entries => {
      for (let e of entries) {
        if (e.contentRect.width > 0 && e.contentRect.height > 0) {
          canvas.width = e.contentRect.width;
          canvas.height = e.contentRect.height;
        }
      }
    });
    ro.observe(canvas);

    const layers = [
      {
        label: 'BLOCKCHAIN LAYER',
        sublabel: 'Bitcoin Core (RPC) · Parity / web3j (Ethereum)',
        y: 0.12,
        color: '#c9940a',
        nodes: ['Bitcoin Core', 'Parity/Ethereum'],
      },
      {
        label: 'SCALA LIBRARY (BlockchainLib)',
        sublabel: 'BlockchainLib · Block · Transaction · Input · Output',
        y: 0.38,
        color: '#f0b429',
        nodes: ['BlockchainLib', 'Block', 'Transaction'],
      },
      {
        label: 'EXTERNAL DATA LAYER',
        sublabel: 'Exchange · Tag · OpReturn',
        y: 0.6,
        color: '#e87c2a',
        nodes: ['Exchange Rates', 'Address Tags', 'OP_RETURN IDs'],
        side: true,
      },
      {
        label: 'DATABASE LAYER',
        sublabel: 'MySQL (relational) · MongoDB (document)',
        y: 0.76,
        color: '#fac87c',
        nodes: ['MySQL', 'MongoDB'],
      },
      {
        label: 'ANALYTICS / QUERY LAYER',
        sublabel: 'SQL queries · MongoDB aggregation pipelines',
        y: 0.92,
        color: '#f0b429',
        nodes: ['SQL Queries', 'NoSQL Pipelines'],
      },
    ];

    function drawLayer(layer, alpha = 1) {
      const W = canvas.width, H = canvas.height;
      if (W === 0 || H === 0) return;
      const lh = 36;
      const lw = W * 0.7;
      const lx = (W - lw) / 2;
      const ly = layer.y * H - lh / 2;

      // Layer box
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `${layer.color}18`;
      ctx.strokeStyle = `${layer.color}60`;
      ctx.lineWidth = 1.5;
      roundRect(ctx, lx, ly, lw, lh, 10);
      ctx.fill();
      ctx.stroke();

      // Label
      ctx.fillStyle = layer.color;
      ctx.font = `bold 10px "DM Mono", monospace`;
      ctx.textAlign = 'left';
      ctx.fillText(layer.label, lx + 14, ly + 14);

      ctx.fillStyle = 'rgba(200,195,180,0.5)';
      ctx.font = `9px "DM Mono", monospace`;
      ctx.fillText(layer.sublabel, lx + 14, ly + 27);
      ctx.globalAlpha = 1;
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

    function drawConnector(y1, y2, color, animated = true) {
      const W = canvas.width, H = canvas.height;
      const cx = W / 2;
      const progress = animated ? (Math.sin(t + y1 * 10) + 1) / 2 : 1;

      ctx.beginPath();
      ctx.moveTo(cx, y1 * H + 18);
      ctx.lineTo(cx, y2 * H - 18);
      ctx.strokeStyle = `${color}50`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Flowing dot
      const dotY = y1 * H + 18 + (y2 * H - 18 - y1 * H - 18) * progress;
      ctx.beginPath();
      ctx.arc(cx, dotY, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    function render() {
      const W = canvas.width, H = canvas.height;
      if (W === 0 || H === 0) {
        animId = requestAnimationFrame(render);
        return;
      }
      ctx.clearRect(0, 0, W, H);

      // Connections
      drawConnector(layers[0].y, layers[1].y, layers[0].color);
      drawConnector(layers[1].y, layers[3].y, layers[2].color);
      drawConnector(layers[3].y, layers[4].y, layers[3].color);

      // External data connector (side)
      const ex = W * 0.85;
      const ey = layers[2].y * H;
      ctx.beginPath();
      ctx.moveTo(ex, ey - 14);
      ctx.lineTo(ex, ey + 14);
      ctx.strokeStyle = `${layers[2].color}50`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // External data box (side)
      ctx.fillStyle = `${layers[2].color}15`;
      ctx.strokeStyle = `${layers[2].color}50`;
      ctx.lineWidth = 1;
      roundRect(ctx, W * 0.78, layers[2].y * H - 20, W * 0.18, 40, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = layers[2].color;
      ctx.font = `bold 8px "Ubuntu Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('EXT. DATA', W * 0.87, layers[2].y * H - 6);
      ctx.fillStyle = 'rgba(200,195,180,0.5)';
      ctx.font = `7px "Ubuntu Mono", monospace`;
      ctx.fillText('Exchange · Tags', W * 0.87, layers[2].y * H + 8);
      ctx.textAlign = 'left';

      // Horizontal connector to ext
      ctx.beginPath();
      ctx.moveTo(W * 0.5 + W * 0.35, layers[1].y * H);
      ctx.lineTo(W * 0.78, layers[2].y * H);
      ctx.strokeStyle = `${layers[2].color}40`;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Layers
      layers.slice(0, 2).forEach(l => drawLayer(l));
      layers.slice(3).forEach(l => drawLayer(l));

      t += 0.02;
      animId = requestAnimationFrame(render);
    }

    render();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '340px', display: 'block' }}
    />
  );
}

export default function Slide13_Architecture() {
  return (
    <SlideLayout style={{ background: 'var(--bg-deep)' }}>
      <SectionTag>Framework Design</SectionTag>
      <SlideTitle>System Architecture</SlideTitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '28px', width: '100%', maxWidth: '1100px', marginTop: '16px', alignItems: 'flex-start' }}>
        {/* Canvas diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-mid)',
            borderRadius: '20px',
            overflow: 'hidden',
            padding: '20px',
          }}
        >
          <ArchDiagram />
        </motion.div>

        {/* Legend / details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { layer: 'Blockchain Layer', desc: 'Bitcoin Core (RPC) for Bitcoin. Parity queried via web3j for Ethereum. Direct block access via indices.', color: '#c9940a' },
            { layer: 'Scala Library', desc: 'Core APIs: BlockchainLib, Block, Transaction, Input, Output. BitcoinJ for Bitcoin object representation.', color: '#f0b429' },
            { layer: 'External Data', desc: 'Exchange rates, address tags, protocol identifiers. Fetched on-demand or from local cache files.', color: '#e87c2a' },
            { layer: 'Database Layer', desc: 'User chooses MySQL (relational) or MongoDB (document). Collection/Table abstraction hides the difference.', color: '#fac87c' },
            { layer: 'Query Layer', desc: 'Standard SQL or MongoDB aggregation pipelines. No proprietary query language needed.', color: '#f0b429' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-mid)',
                borderRadius: '12px',
                padding: '14px',
                borderLeft: `3px solid ${item.color}60`,
              }}
            >
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '0.78rem', fontWeight: 700, color: item.color, marginBottom: '6px' }}>
                {item.layer}
              </div>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '0.72rem', color: 'var(--ivory-600)', lineHeight: 1.55 }}>
                {item.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
