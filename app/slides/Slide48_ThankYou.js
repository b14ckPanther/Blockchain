'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';

function FinalCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    c.width = c.offsetWidth; c.height = c.offsetHeight;
    const ctx = c.getContext('2d');
    const W = c.width, H = c.height;
    const particles = Array.from({length:60}, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3,
      r: Math.random()*2+0.5, op: Math.random()*0.4+0.1,
    }));
    let animId;
    function render() {
      ctx.clearRect(0,0,W,H);
      particles.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if (p.x<0) p.x=W; if (p.x>W) p.x=0;
        if (p.y<0) p.y=H; if (p.y>H) p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(240,180,41,${p.op})`; ctx.fill();
      });
      particles.forEach((a,i) => particles.slice(i+1).forEach(b => {
        const dx=a.x-b.x, dy=a.y-b.y, d=Math.sqrt(dx*dx+dy*dy);
        if (d<100) { ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle=`rgba(240,180,41,${0.08*(1-d/100)})`; ctx.lineWidth=0.5; ctx.stroke(); }
      }));
      animId=requestAnimationFrame(render);
    }
    render();
    return ()=>cancelAnimationFrame(animId);
  },[]);
  return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}/>;
}

export default function Slide48_ThankYou() {
  return (
    <SlideLayout style={{ background:'var(--bg-deep)', justifyContent:'center', alignItems:'center' }}>
      <FinalCanvas/>
      <div style={{ position:'relative', zIndex:2, textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'20px' }}>
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.7 }}
          style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--gold-bright)', letterSpacing:'0.2em', textTransform:'uppercase' }}>
          Financial Cryptography and Data Security 2017
        </motion.div>
        <motion.h1 initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.5, duration:0.8 }}
          style={{ fontFamily:'var(--font-syne)', fontSize:'4.2rem', fontWeight:800, color:'var(--ivory-100)', letterSpacing:'-0.03em', lineHeight:1.1, margin:0, maxWidth:'800px' }}>
          A General Framework for Blockchain Analytics
        </motion.h1>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
          style={{ width:'80px', height:'2px', background:'linear-gradient(90deg, transparent, var(--gold-bright), transparent)' }}/>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.0 }}
          style={{ fontFamily:'var(--font-space)', fontSize:'1.1rem', color:'var(--gold-bright)', maxWidth:'560px', lineHeight:1.7, textTransform:'uppercase', letterSpacing:'0.1em' }}>
          Thank you for your attention.
        </motion.div>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.2 }}
          style={{ display:'flex', gap:'16px', marginTop:'12px' }}>
          {[
            { label:'5 Case Studies', v:'Bitcoin 0–473,100' },
            { label:'2 Databases', v:'MySQL · MongoDB' },
            { label:'Open Source', v:'github.com/bitbart' },
          ].map((s,i)=>(
            <div key={i} style={{ background:'rgba(240,180,41,0.08)', border:'1px solid rgba(240,180,41,0.2)', borderRadius:'14px', padding:'14px 22px', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-syne)', fontSize:'0.8rem', fontWeight:700, color:'var(--gold-bright)', marginBottom:'4px' }}>{s.label}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--ivory-600)' }}>{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </SlideLayout>
  );
}
