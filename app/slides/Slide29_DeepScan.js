'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

function DeepScanDiagram() {
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
    const blocks = [
      { label:'Block #100', txs:[{hash:'tx_A', out:5.0}] },
      { label:'Block #200', txs:[{hash:'tx_B', out:3.2}] },
      { label:'Block #473100', txs:[{hash:'tx_C (spends tx_A)', fee:'?'},{hash:'tx_D (spends tx_B)', fee:'?'}] },
    ];
    function rr(ctx,x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r); ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r); ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r); ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r); ctx.closePath(); }
    function render() {
      const W = c.width, H = c.height;
      if (W === 0 || H === 0) {
        animId = requestAnimationFrame(render);
        return;
      }
      ctx.clearRect(0,0,W,H);
      const bw=180, bh=70, gap=60, sy=(H-bh)/2 + 25;
      const totalW = blocks.length*(bw+gap)-gap;
      const sx = (W-totalW)/2;
      blocks.forEach((b,i) => {
        const bx = sx+i*(bw+gap);
        ctx.fillStyle='rgba(20,20,40,0.9)'; ctx.strokeStyle=`rgba(240,180,41,${0.3+Math.sin(t+i)*0.1})`; ctx.lineWidth=1.5;
        rr(ctx,bx,sy,bw,bh,8); ctx.fill(); ctx.stroke();
        ctx.fillStyle='rgba(240,180,41,0.8)'; ctx.font='bold 9px DM Mono,monospace'; ctx.fillText(b.label, bx+10, sy+18);
        b.txs.forEach((tx,j)=>{ ctx.fillStyle='rgba(200,195,180,0.5)'; ctx.font='8px DM Mono,monospace'; ctx.fillText(tx.hash.slice(0,22), bx+10, sy+34+j*14); });
        if (i<blocks.length-1){ ctx.beginPath(); ctx.moveTo(bx+bw+6,sy+bh/2); ctx.lineTo(bx+bw+gap-6,sy+bh/2); ctx.strokeStyle='rgba(240,180,41,0.4)'; ctx.lineWidth=2; ctx.setLineDash([4,6]); ctx.stroke(); ctx.setLineDash([]); }
      });
      // UTXO map box
      const mx=W*0.5-90, my=sy-80, mw=180, mh=60;
      ctx.fillStyle='rgba(240,180,41,0.08)'; ctx.strokeStyle='rgba(240,180,41,0.4)'; ctx.lineWidth=1;
      rr(ctx,mx,my,mw,mh,8); ctx.fill(); ctx.stroke();
      ctx.fillStyle='rgba(240,180,41,0.9)'; ctx.font='bold 8px DM Mono,monospace'; ctx.textAlign='center';
      ctx.fillText('UTXO MAP (in memory)',W*0.5,my+16);
      ctx.fillStyle='rgba(200,195,180,0.6)'; ctx.font='7.5px DM Mono,monospace';
      ctx.fillText('tx_A[0] → 5.0 BTC',W*0.5,my+30);
      ctx.fillText('tx_B[0] → 3.2 BTC',W*0.5,my+43);
      ctx.textAlign='left';
      // Arrows from map to last block
      const lbx = sx+2*(bw+gap);
      ctx.beginPath(); ctx.moveTo(W*0.5,my+mh); ctx.lineTo(lbx+bw*0.3,sy); ctx.strokeStyle=`rgba(240,180,41,${0.3+Math.sin(t*2)*0.15})`; ctx.lineWidth=1.5; ctx.setLineDash([3,5]); ctx.stroke(); ctx.setLineDash([]);
      t+=0.02; animId=requestAnimationFrame(render);
    }
    render();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  },[]);
  return <canvas ref={ref} style={{ width:'100%', height:'250px', display:'block' }}/>;
}

export default function Slide29_DeepScan() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Technical Deep Dive</SectionTag>
      <SlideTitle>The Deep Scan Mechanism</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'24px' }}>
        Computing transaction fees requires tracking every unspent output across the entire blockchain history.
      </SlideSubtitle>
      <div style={{ width:'100%', maxWidth:'1060px' }}>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
          style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'20px', padding:'20px', marginBottom:'20px' }}>
          <DeepScanDiagram/>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'14px' }}>
          {[
            { title:'The Problem', desc:'Input values are NOT stored in transactions — only the previous tx hash and output index are referenced. To compute fees, you need the value of the referenced output.', color:'#f0b429' },
            { title:'The Solution', desc:'The library maintains a HashMap from (txHash, outIndex) → Long (satoshis). Updated as each block is scanned. Inputs look up this map to retrieve their value.', color:'#e87c2a' },
            { title:'Coinbase Edge Case', desc:'Coinbase transactions (mining rewards) have no previous output. Their value is computed from the block\'s height (reward halving schedule) plus total fees in that block.', color:'#c9940a' },
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
