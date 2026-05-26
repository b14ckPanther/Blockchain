'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

function TxGraph() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    const ro = new ResizeObserver(entries => {
      for (let e of entries) {
        if (e.contentRect.width > 0 && e.contentRect.height > 0) {
          c.width = e.contentRect.width;
          c.height = e.contentRect.height;
        }
      }
    });
    ro.observe(c);

    let t = 0, animId;
    function getNodes(W, H) {
      return [
        { id:0, x:W*0.12, y:H*0.5, label:'Tariq', type:'wallet', color:'#f0b429' },
        { id:1, x:W*0.32, y:H*0.25, label:'Tx₁', type:'tx', color:'#e87c2a' },
        { id:2, x:W*0.32, y:H*0.75, label:'Tx₂', type:'tx', color:'#e87c2a' },
        { id:3, x:W*0.55, y:H*0.15, label:'Rami', type:'wallet', color:'#6dcc6d' },
        { id:4, x:W*0.55, y:H*0.45, label:'Change', type:'wallet', color:'#f0b429' },
        { id:5, x:W*0.55, y:H*0.75, label:'Tx₃', type:'tx', color:'#e87c2a' },
        { id:6, x:W*0.78, y:H*0.3, label:'Layla', type:'wallet', color:'#6dcc6d' },
        { id:7, x:W*0.78, y:H*0.6, label:'Pool', type:'wallet', color:'#5fb8f0' },
        { id:8, x:W*0.78, y:H*0.85, label:'Omar', type:'wallet', color:'#6dcc6d' },
      ];
    }

    const edges = [
      { from:0, to:1, val:'2.0 BTC' }, { from:0, to:2, val:'1.5 BTC' },
      { from:1, to:3, val:'1.8 BTC' }, { from:1, to:4, val:'0.2 BTC' },
      { from:2, to:5, val:'1.5 BTC' }, { from:4, to:5, val:'0.2 BTC' },
      { from:5, to:6, val:'1.0 BTC' }, { from:5, to:7, val:'0.5 BTC' }, { from:5, to:8, val:'0.2 BTC' },
    ];
    function render() {
      const W = c.width, H = c.height;
      if (W === 0 || H === 0) {
        animId = requestAnimationFrame(render);
        return;
      }
      const nodes = getNodes(W, H);
      ctx.clearRect(0,0,W,H);
      // Draw edges
      edges.forEach((e,i) => {
        const a = nodes[e.from], b = nodes[e.to];
        const pulse = (Math.sin(t*1.5+i*0.7)+1)/2;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=`rgba(240,180,41,${0.15+pulse*0.2})`; ctx.lineWidth=1.5; ctx.stroke();
        // Arrow head
        const dx=b.x-a.x, dy=b.y-a.y, len=Math.sqrt(dx*dx+dy*dy);
        const ux=dx/len, uy=dy/len;
        const mx=a.x+ux*(len*0.6), my=a.y+uy*(len*0.6);
        ctx.beginPath(); ctx.moveTo(mx-uy*4-ux*6,my+ux*4-uy*6);
        ctx.lineTo(mx+ux*8,my+uy*8); ctx.lineTo(mx+uy*4-ux*6,my-ux*4-uy*6);
        ctx.fillStyle=`rgba(240,180,41,${0.3+pulse*0.2})`; ctx.fill();
        // Label
        const lx=(a.x+b.x)/2, ly=(a.y+b.y)/2;
        ctx.fillStyle='rgba(200,195,180,0.5)'; ctx.font='7.5px DM Mono,monospace'; ctx.textAlign='center';
        ctx.fillText(e.val,lx,ly-5);
      });
      // Draw nodes
      nodes.forEach(n => {
        const r = n.type==='tx' ? 18 : 24;
        ctx.beginPath(); ctx.arc(n.x,n.y,r,0,Math.PI*2);
        ctx.fillStyle = n.type==='tx' ? 'rgba(20,20,40,0.95)' : `${n.color}20`;
        ctx.fill();
        ctx.strokeStyle = n.color; ctx.lineWidth = n.type==='tx' ? 2 : 1.5; ctx.stroke();
        ctx.fillStyle = n.color; ctx.font = `bold ${n.type==='tx'?9:8}px DM Mono,monospace`;
        ctx.textAlign='center';
        ctx.fillText(n.label, n.x, n.y+3);
        if (n.type!=='tx') {
          ctx.fillStyle='rgba(200,195,180,0.3)'; ctx.font='7px DM Mono,monospace';
          ctx.fillText('addr', n.x, n.y+14);
        }
      });
      t+=0.02; animId=requestAnimationFrame(render);
    }
    render();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  },[]);
  return <canvas ref={ref} style={{ width:'100%', height:'260px', display:'block' }}/>;
}

export default function Slide39_TransactionGraph() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Analytics Category</SectionTag>
      <SlideTitle>The Bitcoin Transaction Graph</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'20px' }}>
        Every BTC transfer is permanently recorded as a directed graph — wallets as nodes, transactions as hyperedges.
      </SlideSubtitle>
      <div style={{ width:'100%', maxWidth:'1060px' }}>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
          style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'20px', padding:'16px', marginBottom:'16px' }}>
          <TxGraph/>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px' }}>
          {[
            { title:'UTXO Hyperaraph', desc:'Inputs and outputs form a directed bipartite graph — addresses on one side, transactions on the other. Following value flows reveals entity relationships.', color:'#f0b429' },
            { title:'Multi-Input Heuristic', desc:'Addresses appearing together as inputs to the same transaction are assumed co-owned. This transitively clusters addresses into entity groups.', color:'#e87c2a' },
            { title:'Framework Support', desc:'Our basic view provides the complete transaction graph. Researchers can implement any graph algorithm on top using standard MongoDB or SQL graph queries.', color:'#c9940a' },
          ].map((item,i)=>(
            <motion.div key={i} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5+i*0.08 }}
              style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'14px', padding:'14px', borderTop:`2px solid ${item.color}60` }}>
              <div style={{ fontFamily:'var(--font-syne)', fontSize:'0.82rem', fontWeight:700, color:item.color, marginBottom:'7px' }}>{item.title}</div>
              <div style={{ fontFamily:'var(--font-space)', fontSize:'0.73rem', color:'var(--ivory-600)', lineHeight:1.55 }}>{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
