'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Slides — imported dynamically to avoid SSR issues with Three.js
const Slide01_Hero = dynamic(() => import('./slides/Slide01_Hero'), { ssr: false });
const Slide02_Agenda = dynamic(() => import('./slides/Slide02_Agenda'), { ssr: false });
const Slide03_TheProblems = dynamic(() => import('./slides/Slide03_TheProblems'), { ssr: false });
const Slide04_WhatIsBlockchain = dynamic(() => import('./slides/Slide04_WhatIsBlockchain'), { ssr: false });
const Slide05_BitcoinMechanics = dynamic(() => import('./slides/Slide05_BitcoinMechanics'), { ssr: false });
const Slide06_TransactionAnatomy = dynamic(() => import('./slides/Slide06_TransactionAnatomy'), { ssr: false });
const Slide07_MiningConsensus = dynamic(() => import('./slides/Slide07_MiningConsensus'), { ssr: false });
const Slide08_Ethereum = dynamic(() => import('./slides/Slide08_Ethereum'), { ssr: false });
const Slide09_ResearchLandscape = dynamic(() => import('./slides/Slide09_ResearchLandscape'), { ssr: false });
const Slide10_DataSources = dynamic(() => import('./slides/Slide10_DataSources'), { ssr: false });
const Slide11_ExistingTools = dynamic(() => import('./slides/Slide11_ExistingTools'), { ssr: false });
const Slide12_FrameworkVision = dynamic(() => import('./slides/Slide12_FrameworkVision'), { ssr: false });
const Slide13_Architecture = dynamic(() => import('./slides/Slide13_Architecture'), { ssr: false });
const Slide14_TwoStepWorkflow = dynamic(() => import('./slides/Slide14_TwoStepWorkflow'), { ssr: false });
const Slide15_ScalaLibrary = dynamic(() => import('./slides/Slide15_ScalaLibrary'), { ssr: false });
const Slide16_APIDesign = dynamic(() => import('./slides/Slide16_APIDesign'), { ssr: false });
const Slide17_DatabaseChoice = dynamic(() => import('./slides/Slide17_DatabaseChoice'), { ssr: false });
const Slide18_CaseStudy1 = dynamic(() => import('./slides/Slide18_CaseStudy1'), { ssr: false });
const Slide19_BasicView = dynamic(() => import('./slides/Slide19_BasicView'), { ssr: false });
const Slide20_InputsOutputs = dynamic(() => import('./slides/Slide20_InputsOutputs'), { ssr: false });
const Slide21_OPReturn = dynamic(() => import('./slides/Slide21_OPReturn'), { ssr: false });
const Slide22_OPReturnProtocols = dynamic(() => import('./slides/Slide22_OPReturnProtocols'), { ssr: false });
const Slide23_ExchangeRates = dynamic(() => import('./slides/Slide23_ExchangeRates'), { ssr: false });
const Slide24_ExchangeRateVis = dynamic(() => import('./slides/Slide24_ExchangeRateVis'), { ssr: false });
const Slide25_TransactionFees = dynamic(() => import('./slides/Slide25_TransactionFees'), { ssr: false });
const Slide26_WhaleTransactions = dynamic(() => import('./slides/Slide26_WhaleTransactions'), { ssr: false });
const Slide27_AddressTags = dynamic(() => import('./slides/Slide27_AddressTags'), { ssr: false });
const Slide28_SatoshiDice = dynamic(() => import('./slides/Slide28_SatoshiDice'), { ssr: false });
const Slide29_DeepScan = dynamic(() => import('./slides/Slide29_DeepScan'), { ssr: false });
const Slide30_SQLvsNoSQL = dynamic(() => import('./slides/Slide30_SQLvsNoSQL'), { ssr: false });
const Slide31_Performance = dynamic(() => import('./slides/Slide31_Performance'), { ssr: false });
const Slide32_PerformanceTable = dynamic(() => import('./slides/Slide32_PerformanceTable'), { ssr: false });
const Slide33_Implementation = dynamic(() => import('./slides/Slide33_Implementation'), { ssr: false });
const Slide34_BlockSci = dynamic(() => import('./slides/Slide34_BlockSci'), { ssr: false });
const Slide35_Comparison = dynamic(() => import('./slides/Slide35_Comparison'), { ssr: false });
const Slide36_Anonymity = dynamic(() => import('./slides/Slide36_Anonymity'), { ssr: false });
const Slide37_CyberCrime = dynamic(() => import('./slides/Slide37_CyberCrime'), { ssr: false });
const Slide38_MarketAnalytics = dynamic(() => import('./slides/Slide38_MarketAnalytics'), { ssr: false });
const Slide39_TransactionGraph = dynamic(() => import('./slides/Slide39_TransactionGraph'), { ssr: false });
const Slide40_NetworkSim = dynamic(() => import('./slides/Slide40_NetworkSim'), { ssr: false });
const Slide41_Limitations = dynamic(() => import('./slides/Slide41_Limitations'), { ssr: false });
const Slide42_FutureWork = dynamic(() => import('./slides/Slide42_FutureWork'), { ssr: false });
const Slide43_OpenSource = dynamic(() => import('./slides/Slide43_OpenSource'), { ssr: false });
const Slide44_Contributions = dynamic(() => import('./slides/Slide44_Contributions'), { ssr: false });
const Slide45_Impact = dynamic(() => import('./slides/Slide45_Impact'), { ssr: false });
const Slide46_Conclusions = dynamic(() => import('./slides/Slide46_Conclusions'), { ssr: false });
const Slide47_References = dynamic(() => import('./slides/Slide47_References'), { ssr: false });
const Slide48_ThankYou = dynamic(() => import('./slides/Slide48_ThankYou'), { ssr: false });

const SLIDES = [
  { id: 1, component: Slide01_Hero, label: 'Title' },
  { id: 2, component: Slide02_Agenda, label: 'Agenda' },
  { id: 3, component: Slide03_TheProblems, label: 'The Problem' },
  { id: 4, component: Slide04_WhatIsBlockchain, label: 'What is Blockchain' },
  { id: 5, component: Slide05_BitcoinMechanics, label: 'Bitcoin Mechanics' },
  { id: 6, component: Slide06_TransactionAnatomy, label: 'Transaction Anatomy' },
  { id: 7, component: Slide07_MiningConsensus, label: 'Mining & Consensus' },
  { id: 8, component: Slide08_Ethereum, label: 'Ethereum' },
  { id: 9, component: Slide09_ResearchLandscape, label: 'Research Landscape' },
  { id: 10, component: Slide10_DataSources, label: 'Data Sources' },
  { id: 11, component: Slide11_ExistingTools, label: 'Existing Tools' },
  { id: 12, component: Slide12_FrameworkVision, label: 'Framework Vision' },
  { id: 13, component: Slide13_Architecture, label: 'Architecture' },
  { id: 14, component: Slide14_TwoStepWorkflow, label: '2-Step Workflow' },
  { id: 15, component: Slide15_ScalaLibrary, label: 'Scala Library' },
  { id: 16, component: Slide16_APIDesign, label: 'API Design' },
  { id: 17, component: Slide17_DatabaseChoice, label: 'Database Choice' },
  { id: 18, component: Slide18_CaseStudy1, label: 'Case Study 1' },
  { id: 19, component: Slide19_BasicView, label: 'Basic View' },
  { id: 20, component: Slide20_InputsOutputs, label: 'Inputs & Outputs' },
  { id: 21, component: Slide21_OPReturn, label: 'OP_RETURN' },
  { id: 22, component: Slide22_OPReturnProtocols, label: 'OP_RETURN Protocols' },
  { id: 23, component: Slide23_ExchangeRates, label: 'Exchange Rates' },
  { id: 24, component: Slide24_ExchangeRateVis, label: 'Rate Analysis' },
  { id: 25, component: Slide25_TransactionFees, label: 'Transaction Fees' },
  { id: 26, component: Slide26_WhaleTransactions, label: 'Whale Transactions' },
  { id: 27, component: Slide27_AddressTags, label: 'Address Tags' },
  { id: 28, component: Slide28_SatoshiDice, label: 'SatoshiDice Analysis' },
  { id: 29, component: Slide29_DeepScan, label: 'Deep Scan' },
  { id: 30, component: Slide30_SQLvsNoSQL, label: 'SQL vs NoSQL' },
  { id: 31, component: Slide31_Performance, label: 'Performance' },
  { id: 32, component: Slide32_PerformanceTable, label: 'Performance Table' },
  { id: 33, component: Slide33_Implementation, label: 'Implementation' },
  { id: 34, component: Slide34_BlockSci, label: 'BlockSci' },
  { id: 35, component: Slide35_Comparison, label: 'Comparison' },
  { id: 36, component: Slide36_Anonymity, label: 'Anonymity Analysis' },
  { id: 37, component: Slide37_CyberCrime, label: 'Cyber-Crime' },
  { id: 38, component: Slide38_MarketAnalytics, label: 'Market Analytics' },
  { id: 39, component: Slide39_TransactionGraph, label: 'Transaction Graph' },
  { id: 40, component: Slide40_NetworkSim, label: 'Network Simulation' },
  { id: 41, component: Slide41_Limitations, label: 'Limitations' },
  { id: 42, component: Slide42_FutureWork, label: 'Future Work' },
  { id: 43, component: Slide43_OpenSource, label: 'Open Source' },
  { id: 44, component: Slide44_Contributions, label: 'Contributions' },
  { id: 45, component: Slide45_Impact, label: 'Impact' },
  { id: 46, component: Slide46_Conclusions, label: 'Conclusions' },
  { id: 47, component: Slide47_References, label: 'References' },
  { id: 48, component: Slide48_ThankYou, label: 'Thank You' },
];

const TOTAL_SLIDES = SLIDES.length;

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (dir) => ({
    x: dir < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.97,
    transition: {
      duration: 0.5,
      ease: [0.55, 0, 0.1, 1],
    },
  }),
};

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showNav, setShowNav] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentSlide) return;
    if (index < 0 || index >= TOTAL_SLIDES) return;
    setDirection(index > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 750);
  }, [currentSlide, isTransitioning]);

  const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [goToSlide, currentSlide]);
  const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [goToSlide, currentSlide]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        setShowNav(v => !v);
      } else if (e.key >= '0' && e.key <= '9') {
        // Number shortcuts don't work well for 48 slides
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      dx > 0 ? nextSlide() : prevSlide();
    }
    touchStartX.current = null;
  };

  const SlideComponent = SLIDES[currentSlide].component;
  const progress = ((currentSlide + 1) / TOTAL_SLIDES) * 100;

  return (
    <div
      style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: '#050508' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background grid */}
      <div className="bg-grid" />

      {/* Slide area */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ position: 'absolute', inset: 0, willChange: 'transform, opacity' }}
        >
          <SlideComponent
            currentSlide={currentSlide}
            totalSlides={TOTAL_SLIDES}
            goToSlide={goToSlide}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
          />
        </motion.div>
      </AnimatePresence>

      {/* Top progress bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '2px',
        background: 'rgba(255,255,255,0.05)', zIndex: 1000
      }}>
        <motion.div
          className="progress-bar"
          style={{ height: '100%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Bottom navigation bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        padding: '16px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(to top, rgba(5,5,8,0.95) 0%, transparent 100%)',
        zIndex: 1000,
      }}>
        {/* Slide counter */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--ivory-600)',
          letterSpacing: '0.1em',
        }}>
          <span style={{ color: 'var(--gold-bright)' }}>{String(currentSlide + 1).padStart(2, '0')}</span>
          <span style={{ margin: '0 6px', opacity: 0.4 }}>/</span>
          <span>{String(TOTAL_SLIDES).padStart(2, '0')}</span>
        </div>



        {/* Nav controls */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => setShowNav(v => !v)}
            style={{
              background: 'rgba(240,180,41,0.08)',
              border: '1px solid rgba(240,180,41,0.2)',
              borderRadius: '8px',
              padding: '6px 12px',
              color: 'var(--gold-bright)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              cursor: 'pointer',
              letterSpacing: '0.08em',
            }}
          >
            {showNav ? 'CLOSE' : 'OVERVIEW'}
          </button>
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-mid)',
              borderRadius: '8px',
              padding: '6px 14px',
              color: currentSlide === 0 ? 'var(--ivory-600)' : 'var(--ivory-200)',
              cursor: currentSlide === 0 ? 'default' : 'pointer',
              fontSize: '0.8rem',
            }}
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === TOTAL_SLIDES - 1}
            style={{
              background: currentSlide === TOTAL_SLIDES - 1
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(240,180,41,0.15)',
              border: '1px solid',
              borderColor: currentSlide === TOTAL_SLIDES - 1 ? 'var(--border-mid)' : 'rgba(240,180,41,0.4)',
              borderRadius: '8px',
              padding: '6px 14px',
              color: currentSlide === TOTAL_SLIDES - 1 ? 'var(--ivory-600)' : 'var(--gold-bright)',
              cursor: currentSlide === TOTAL_SLIDES - 1 ? 'default' : 'pointer',
              fontSize: '0.8rem',
            }}
          >
            →
          </button>
        </div>
      </div>



      {/* Overview panel */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5,5,8,0.95)',
              backdropFilter: 'blur(20px)',
              zIndex: 2000,
              overflowY: 'auto',
              padding: '60px 40px 100px',
            }}
          >
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
            }}>
              <div style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--gold-bright)',
                marginBottom: '8px',
              }}>
                Presentation Overview
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--ivory-600)',
                marginBottom: '40px',
              }}>
                {TOTAL_SLIDES} slides — Press ESC to close
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '12px',
              }}>
                {SLIDES.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => { goToSlide(i); setShowNav(false); }}
                    style={{
                      background: i === currentSlide
                        ? 'rgba(240,180,41,0.15)'
                        : 'rgba(255,255,255,0.03)',
                      border: i === currentSlide
                        ? '1px solid rgba(240,180,41,0.4)'
                        : '1px solid var(--border-mid)',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      color: i === currentSlide ? 'var(--gold-bright)' : 'var(--ivory-600)',
                      marginBottom: '6px',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-space)',
                      fontSize: '0.75rem',
                      color: i === currentSlide ? 'var(--ivory-50)' : 'var(--ivory-400)',
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}>
                      {slide.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowNav(false)}
              style={{
                position: 'fixed',
                top: '24px',
                right: '24px',
                background: 'rgba(240,180,41,0.1)',
                border: '1px solid rgba(240,180,41,0.3)',
                borderRadius: '10px',
                padding: '10px 20px',
                color: 'var(--gold-bright)',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
              }}
            >
              CLOSE ESC
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
