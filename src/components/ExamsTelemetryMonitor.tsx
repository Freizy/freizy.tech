import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import { WindowControls } from './WindowControls';

type TabId = 'exams' | 'candidates' | 'results';

interface FeedItem {
  id: number;
  text: string;
  detail: string;
  time: string;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'exams', label: 'Exams' },
  { id: 'candidates', label: 'Candidates' },
  { id: 'results', label: 'Results' },
];

const FEED_POOL = [
  { text: 'Mock completed — SHS Integrated Science', detail: '42 questions · scored instantly' },
  { text: 'New exam published — JHS Maths Paper 2', detail: '60 questions · timed 90 min' },
  { text: 'Top scorer — 98% in English Language', detail: 'Mock leaderboard updated' },
  { text: '12 candidates registered', detail: 'Accra Academy pilot group' },
  { text: 'Results released — 340 scripts', detail: 'SMS summaries sent' },
  { text: 'Question flagged for review', detail: 'Q17 · Physics Paper 1' },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(q.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    q.addEventListener('change', onChange);
    return () => q.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export const ExamsTelemetryMonitor: React.FC = () => {
  const [tab, setTab] = useState<TabId>('exams');
  const [paused, setPaused] = useState(false);
  const [gradedToday, setGradedToday] = useState(212);
  const [activeToday, setActiveToday] = useState(96);
  const [passRate, setPassRate] = useState(74);
  const [feed, setFeed] = useState<FeedItem[]>([
    { id: 3, text: 'Mock completed — JHS English', detail: '38 questions · scored instantly', time: nowTime() },
    { id: 2, text: 'New exam published — SHS Chemistry', detail: '50 questions · timed 75 min', time: nowTime() },
    { id: 1, text: 'Results released — 120 scripts', detail: 'SMS summaries sent', time: nowTime() },
  ]);
  const idRef = useRef(4);
  const poolRef = useRef(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => {
      setGradedToday((v) => v + Math.floor(2 + Math.random() * 6));
      if (Math.random() > 0.5) setActiveToday((v) => Math.min(140, v + 1));
      setPassRate((v) => {
        const next = v + (Math.random() - 0.5) * 0.6;
        return Math.min(82, Math.max(68, Math.round(next * 10) / 10));
      });
    }, 2400);
    return () => clearInterval(t);
  }, [paused, reduced]);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => {
      const tpl = FEED_POOL[poolRef.current % FEED_POOL.length];
      poolRef.current += 1;
      const item: FeedItem = { id: idRef.current++, text: tpl.text, detail: tpl.detail, time: nowTime() };
      setFeed((prev) => [item, ...prev].slice(0, 5));
    }, 3700);
    return () => clearInterval(t);
  }, [paused, reduced]);

  return (
    <div className="apple-panel rounded-2xl overflow-hidden">
      <div className="px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-black/5 dark:border-white/10">
        <div className="flex items-center gap-2">
          <WindowControls />
          <span className="ml-2 text-[12px] text-[#6e6e73] dark:text-neutral-500 font-mono">
            Freizy Exams Suite — demo overview
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[12px] text-[#6e6e73] dark:text-neutral-400">
            <span className="relative flex h-2 w-2">
              {!paused && !reduced && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${paused ? 'bg-neutral-400' : 'bg-emerald-500'}`} />
            </span>
            {paused ? 'Paused' : 'Demo feed'}
          </span>
          <button
            onClick={() => setPaused((p) => !p)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#1d1d1f] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-pressed={paused}
          >
            {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            {paused ? 'Resume' : 'Pause'}
          </button>
        </div>
      </div>

      <div className="px-5 pt-4 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
              tab === t.id
                ? 'bg-[#1d1d1f] text-white dark:bg-white dark:text-black'
                : 'bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#424245] dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/10'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-5">
        <AnimatePresence mode="wait">
          {tab === 'exams' && (
            <motion.div
              key="exams"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Active exams</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">18</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">JHS & SHS · timed + practice</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Questions banked</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">4,280</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Across 9 subjects</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Scripts graded today</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">{gradedToday}</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Instant scoring</div>
              </div>
            </motion.div>
          )}

          {tab === 'candidates' && (
            <motion.div
              key="candidates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Registered candidates</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">1,240</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Across 6 schools</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Active today</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">{activeToday}</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Practising now</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Average mock score</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">68%</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Up 4 pts this term</div>
              </div>
            </motion.div>
          )}

          {tab === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Pass rate</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">{passRate.toFixed(1)}%</div>
                <div className="mt-2 h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#1d1d1f] dark:bg-white"
                    animate={{ width: `${passRate}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Top score this week</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">98%</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">English mock leaderboard</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Result SMS sent</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">460</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Delivery ~99%</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-3 bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-black/5 dark:border-white/10 text-[12px] font-medium text-[#6e6e73] dark:text-neutral-400">
            Live activity
          </div>
          <ul className="divide-y divide-black/5 dark:divide-white/5">
            <AnimatePresence initial={false}>
              {feed.map((f) => (
                <motion.li
                  key={f.id}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="px-4 py-2.5 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-[#1d1d1f] dark:text-white truncate">{f.text}</div>
                    <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 truncate">{f.detail}</div>
                  </div>
                  <div className="text-[11px] font-mono text-[#6e6e73] dark:text-neutral-500 flex-shrink-0 tabular-nums">{f.time}</div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
};
