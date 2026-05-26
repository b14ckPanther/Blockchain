'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SlideLayout({
  children,
  style = {},
  className = '',
  noPadding = false,
}) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Base resolution for the presentation
      const baseWidth = 1440;
      const baseHeight = 810;
      
      const scaleX = window.innerWidth / baseWidth;
      const scaleY = window.innerHeight / baseHeight;
      // Use 98% to ensure a tiny safe margin
      setScale(Math.min(scaleX, scaleY) * 0.98);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { background, ...innerStyle } = style;

  return (
    <div
      className={className}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: background || 'transparent',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '1440px',
          height: '810px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: noPadding ? 0 : '40px 60px 60px',
          position: 'relative',
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function SectionTag({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="tag-pill"
      style={{ marginBottom: '20px' }}
    >
      {children}
    </motion.div>
  );
}

export function SlideTitle({ children, style = {} }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontFamily: 'var(--font-syne)',
        fontSize: '3.4rem',
        fontWeight: 800,
        color: 'var(--ivory-100)',
        lineHeight: 1.15,
        letterSpacing: '-0.03em',
        textAlign: 'center',
        maxWidth: '1000px',
        marginBottom: '16px',
        ...style,
      }}
    >
      {children}
    </motion.h2>
  );
}

export function SlideSubtitle({ children, style = {} }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontFamily: 'var(--font-space)',
        fontSize: '1.4rem',
        fontWeight: 400,
        color: 'var(--ivory-600)',
        lineHeight: 1.6,
        textAlign: 'center',
        maxWidth: '850px',
        marginBottom: '40px',
        ...style,
      }}
    >
      {children}
    </motion.p>
  );
}

export function GoldAccent() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '800px',
      height: '800px',
      background: 'radial-gradient(circle, rgba(240,180,41,0.04) 0%, transparent 70%)',
      pointerEvents: 'none',
    }} />
  );
}

export function CornerAccent({ position = 'top-right' }) {
  const styles = {
    'top-right': { top: 0, right: 0 },
    'top-left': { top: 0, left: 0 },
    'bottom-right': { bottom: 0, right: 0 },
    'bottom-left': { bottom: 0, left: 0 },
  };
  return (
    <div style={{
      position: 'absolute',
      width: '300px',
      height: '300px',
      ...styles[position],
      background: `radial-gradient(circle at ${position.includes('right') ? '100%' : '0%'} ${position.includes('bottom') ? '100%' : '0%'}, rgba(240,180,41,0.08) 0%, transparent 60%)`,
      pointerEvents: 'none',
    }} />
  );
}

export function AnimatedLine({ delay = 0 }) {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold-bright), transparent)',
        margin: '32px 0',
        opacity: 0.4,
      }}
    />
  );
}

export function staggerContainer(staggerChildren = 0.1, delayChildren = 0.3) {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}

export function staggerItem() {
  return {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };
}
