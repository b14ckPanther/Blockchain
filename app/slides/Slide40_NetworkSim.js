'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SlideLayout, { SectionTag, SlideTitle, SlideSubtitle } from '../components/SlideLayout';

function P2PNetwork() {
  const ref = useRef(null);
  const stateRef = useRef({ nodes:[], edges:[], t:0, animId:null });
  const [stats, setStats] = useState({ nodes:0, edges:0, tx:0 });

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    const ro = new ResizeObserver(entries => {
      for (let e of entries) {
        if (e.contentRect.width > 0 && e.contentRect.height > 0) {
          c.width = e.contentRect.width;
          c.height = e.contentRect.height;
          // Trigger nodes regeneration since W/H changed
          initNodes(e.contentRect.width, e.contentRect.height);
        }
      }
    });
    ro.observe(c);

    const nodeCount = 18;
    function initNodes(W, H) {
      if (stateRef.current.nodes.length > 0) return; // Only init once or handle dynamic resize
      const nodes = Array.from({length:nodeCount}, (_,i) => {
        const angle = (i/nodeCount)*Math.PI*2;
        const r = Math.min(W,H)*0.36 + (Math.random()-0.5)*50;
        return {
          id:i, x:W/2+Math.cos(angle)*r, y:H/2+Math.sin(angle)*r,
          vx:(Math.random()-0.5)*0.2, vy:(Math.random()-0.5)*0.2,
          isMiner: i<4, txFlash:0, color: i<4 ? '#f0b429' : '#e87c2a'
        };
      });
      const edges = [];
      nodes.forEach((n,i) => {
        const k = 3 + Math.floor(Math.random()*3);
        for (let j=0; j<k; j++) {
          const t2 = (i + 1 + Math.floor(Math.random()*(nodeCount-1))) % nodeCount;
          if (!edges.find(e=>(e.a===i&&e.b===t2)||(e.a===t2&&e.b===i))) edges.push({a:i,b:t2,pulse:0,active:false});
        }
      });
      stateRef.current = { nodes, edges, t:0, animId:null };
      setStats({ nodes:nodeCount, edges:edges.length, tx:0 });
    }


    let txCount = 0;
    const triggerTx = () => {
      const sender = Math.floor(Math.random()*nodeCount);
      stateRef.current.nodes[sender].txFlash = 40;
      const adj = stateRef.current.edges.filter(e=>e.a===sender||e.b===sender);
      adj.forEach(e=>{ e.pulse=1; e.active=true; });
      txCount++;
      setStats(s=>({...s, tx:txCount}));
    };
    const iv = setInterval(triggerTx, 1200);

    function render() {
      const W = c.width, H = c.height;
      if (W === 0 || H === 0 || stateRef.current.nodes.length === 0) {
        stateRef.current.animId = requestAnimationFrame(render);
        return;
      }
      const {nodes, edges, t} = stateRef.current;
      ctx.clearRect(0,0,W,H);
      // Bg glow
      const g = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.min(W,H)*0.5);
      g.addColorStop(0,'rgba(240,180,41,0.03)'); g.addColorStop(1,'transparent');
      ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
      // Edges
      edges.forEach(e=>{
        const a=nodes[e.a], b=nodes[e.b];
        e.pulse = Math.max(0,e.pulse-0.025);
        if (e.pulse<0.01) e.active=false;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=e.active ? `rgba(240,180,41,${0.2+e.pulse*0.6})` : 'rgba(255,255,255,0.05)';
        ctx.lineWidth = e.active ? 1.5+e.pulse : 0.5; ctx.stroke();
      });
      // Nodes
      nodes.forEach(n=>{
        n.txFlash=Math.max(0,n.txFlash-1);
        const glow = n.txFlash>0 ? 0.8 : (n.isMiner ? 0.4 : 0.2);
        // Glow
        if (n.txFlash>0 || n.isMiner) {
          const ng=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.isMiner?22:18);
          ng.addColorStop(0,`${n.color}${Math.round(glow*255).toString(16).padStart(2,'0')}`); ng.addColorStop(1,'transparent');
          ctx.fillStyle=ng; ctx.beginPath(); ctx.arc(n.x,n.y,n.isMiner?22:18,0,Math.PI*2); ctx.fill();
        }
        ctx.beginPath(); ctx.arc(n.x,n.y,n.isMiner?9:6,0,Math.PI*2);
        ctx.fillStyle=n.txFlash>0 ? '#fff' : n.color; ctx.fill();
        ctx.strokeStyle=n.color; ctx.lineWidth=1; ctx.stroke();
        if (n.isMiner) { ctx.fillStyle=n.color; ctx.font='7px DM Mono,monospace'; ctx.textAlign='center'; ctx.fillText('MINER',n.x,n.y+18); }
      });
      stateRef.current.t += 0.02;
      stateRef.current.animId = requestAnimationFrame(render);
    }
    render();
    return () => { 
      clearInterval(iv); 
      if (stateRef.current.animId) cancelAnimationFrame(stateRef.current.animId); 
      ro.disconnect();
    };
  },[]);

  return (
    <div>
      <canvas ref={ref} style={{ width:'100%', height:'260px', display:'block', borderRadius:'16px', background:'rgba(9,9,15,0.5)', border:'1px solid var(--border-mid)' }}/>
      <div style={{ display:'flex', gap:'24px', marginTop:'12px', justifyContent:'center' }}>
        {[{l:'Nodes',v:stats.nodes},{l:'Connections',v:stats.edges},{l:'Tx Propagated',v:stats.tx}].map((s,i)=>(
          <div key={i} style={{ textAlign:'center' }}>
            <div style={{ fontFamily:'var(--font-syne)', fontSize:'1.2rem', fontWeight:700, color:'var(--gold-bright)' }}>{s.v}</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--ivory-600)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Slide40_NetworkSim() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)' }}>
      <SectionTag>Live Simulation</SectionTag>
      <SlideTitle>Bitcoin P2P Network Propagation</SlideTitle>
      <SlideSubtitle style={{ marginBottom:'24px' }}>
        Transactions propagate through the peer-to-peer network — reaching miners for inclusion in blocks.
      </SlideSubtitle>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:'24px', width:'100%', maxWidth:'1060px', alignItems:'flex-start' }}>
        <P2PNetwork/>
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {[
            { title:'P2P Propagation', desc:'When a wallet broadcasts a transaction, it floods through the network peer-to-peer. Decker & Wattenhofer (2013) showed 95% of nodes receive it within 40 seconds.', color:'#f0b429' },
            { title:'Miners (Gold nodes)', desc:'4 miner nodes collect transactions from the mempool. They compete to find a valid proof-of-work. The winner adds the block and earns the reward.', color:'#e87c2a' },
            { title:'P2P Data Analytics', desc:'Analyzing P2P network behavior requires running a customized node — a limitation our paper acknowledges as a future extension to the framework.', color:'#c9940a' },
          ].map((item,i)=>(
            <motion.div key={i} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3+i*0.1 }}
              style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-mid)', borderRadius:'14px', padding:'16px', borderLeft:`3px solid ${item.color}50` }}>
              <div style={{ fontFamily:'var(--font-syne)', fontSize:'0.82rem', fontWeight:700, color:item.color, marginBottom:'7px' }}>{item.title}</div>
              <div style={{ fontFamily:'var(--font-space)', fontSize:'0.73rem', color:'var(--ivory-600)', lineHeight:1.55 }}>{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
