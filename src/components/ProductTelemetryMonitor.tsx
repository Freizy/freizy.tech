import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import { WindowControls } from './WindowControls';

type TabId = 'finance' | 'stock' | 'sales';

interface FeedItem {
  id: number;
  text: string;
  detail: string;
  time: string;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'finance', label: 'Finance' },
  { id: 'stock', label: 'Stock' },
  { id: 'sales', label: 'Sales' },
];

const FEED_POOL = [
  { text: 'Invoice INV-2041 matched', detail: '3-way match · no review needed' },
  { text: 'Payment received — GH₵ 18,400', detail: 'Stanbic · reconciled' },
  { text: 'Sales order SO-881 created', detail: '12 items · Accra warehouse' },
  { text: 'Stock alert — USB-C cables', detail: '14 left · reorder point 20' },
  { text: 'Expense approved — fuel', detail: 'KSM fleet · GH₵ 1,250' },
  { text: 'Invoice INV-2042 sent', detail: 'Net 14 · auto-reminder on' },
];

const SPARK = [14, 18, 15, 22, 19, 26, 24, 31, 28, 34];

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

export const ProductTelemetryMonitor: React.FC = () => {
  const [tab, setTab] = useState<TabId>('finance');
  const [paused, setPaused] = useState(false);
  const [revenue, setRevenue] = useState(48250);
  const [matched, setMatched] = useState(94.2);
  const [orders, setOrders] = useState(37);
  const [feed, setFeed] = useState<FeedItem[]>([
    { id: 3, text: 'Invoice INV-2040 matched', detail: '3-way match · no review needed', time: nowTime() },
    { id: 2, text: 'Sales order SO-880 packed', detail: '8 items · ready for dispatch', time: nowTime() },
    { id: 1, text: 'Payment received — GH₵ 9,800', detail: 'MTN MoMo · reconciled', time: nowTime() },
  ]);
  const idRef = useRef(4);
  const poolRef = useRef(0);
  const reduced = usePrefersReducedMotion();

  // Live ticking numbers — small, believable drifts. Paused when user hits pause.
  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => {
      setRevenue((v) => v + Math.floor(120 + Math.random() * 780));
      setMatched((v) => {
        const next = v + (Math.random() - 0.5) * 0.2;
        return Math.min(96.5, Math.max(92.5, Math.round(next * 10) / 10));
      });
      if (Math.random() > 0.55) setOrders((v) => v + 1);
    }, 2200);
    return () => clearInterval(t);
  }, [paused, reduced]);

  // Live activity feed
  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => {
      const tpl = FEED_POOL[poolRef.current % FEED_POOL.length];
      poolRef.current += 1;
      const item: FeedItem = { id: idRef.current++, text: tpl.text, detail: tpl.detail, time: nowTime() };
      setFeed((prev) => [item, ...prev].slice(0, 5));
    }, 3600);
    return () => clearInterval(t);
  }, [paused, reduced]);

  const sparkPoints = useMemo(() => {
    const w = 220;
    const h = 56;
    const max = Math.max(...SPARK);
    return SPARK.map((v, i) => {
      const x = (i / (SPARK.length - 1)) * w;
      const y = h - (v / max) * (h - 8) - 4;
      return `${x},${y}`;
    }).join(' ');
  }, []);

  return (
    <div className="apple-panel rounded-2xl overflow-hidden">
      {/* Window bar */}
      <div className="px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-black/5 dark:border-white/10">
        <div className="flex items-center gap-2">
          <WindowControls />
          <span className="ml-2 text-[12px] text-[#6e6e73] dark:text-neutral-500 font-mono">
            omnia.freizy.tech — live overview
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

      {/* Tabs */}
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
          {tab === 'finance' && (
            <motion.div
              key="finance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Revenue · today</div>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={revenue}
                    initial={{ opacity: 0.4, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums"
                  >
                    GH₵ {revenue.toLocaleString()}
                  </motion.div>
                </AnimatePresence>
                <div className="text-[13px] text-[#008009] dark:text-emerald-400 mt-1">+8% vs yesterday</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Invoices auto-matched</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">
                  {matched.toFixed(1)}%
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-emerald-500"
                    animate={{ width: `${matched}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Due this week</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">GH₵ 64,200</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">9 invoices · reminders on</div>
              </div>
            </motion.div>
          )}

          {tab === 'stock' && (
            <motion.div
              key="stock"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {[
                { name: 'USB-C cables', left: 14, total: 100 },
                { name: 'A4 paper boxes', left: 62, total: 100 },
                { name: 'HP toner 58A', left: 8, total: 40 },
              ].map((s, i) => {
                const pct = Math.round((s.left / s.total) * 100);
                const low = pct < 25;
                return (
                  <div key={s.name} className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                    <div className="text-[13px] font-medium text-[#1d1d1f] dark:text-white">{s.name}</div>
                    <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mt-0.5 tabular-nums">
                      {s.left} left · {low ? 'reorder soon' : 'ok'}
                    </div>
                    <div className="mt-3 h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-full rounded-full ${low ? 'bg-amber-500' : 'bg-[#1d1d1f] dark:bg-white'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {tab === 'sales' && (
            <motion.div
              key="sales"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Orders · today</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">{orders}</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Across Accra + Kumasi stores</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-2">Last 10 days</div>
                <svg viewBox="0 0 220 56" className="w-full h-[56px]" role="img" aria-label="Sales trend, rising">
                  <motion.polyline
                    points={sparkPoints}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#1d1d1f] dark:text-white"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live feed */}
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
