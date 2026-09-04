import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import { WindowControls } from './WindowControls';

type TabId = 'bookings' | 'workshop' | 'parts';

interface FeedItem {
  id: number;
  text: string;
  detail: string;
  time: string;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'bookings', label: 'Bookings' },
  { id: 'workshop', label: 'Workshop' },
  { id: 'parts', label: 'Parts' },
];

const FEED_POOL = [
  { text: 'Booking created — oil service', detail: 'Toyota Hilux · Sat 09:00' },
  { text: 'Job completed — brake pads', detail: 'Honda CR-V · ready for pickup' },
  { text: 'Service reminder sent — 6 cars', detail: 'Due mileage · SMS' },
  { text: 'Parts ordered — oil filters ×20', detail: 'Supplier · ETA Thursday' },
  { text: 'Booking confirmed — inspection', detail: 'Kia Sportage · Fri 14:30' },
  { text: 'Invoice paid — GH₵ 2,850', detail: 'Full service + alignment' },
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

export const KsmTelemetryMonitor: React.FC = () => {
  const [tab, setTab] = useState<TabId>('bookings');
  const [paused, setPaused] = useState(false);
  const [bookings, setBookings] = useState(11);
  const [inShop, setInShop] = useState(6);
  const [doneWeek, setDoneWeek] = useState(28);
  const [feed, setFeed] = useState<FeedItem[]>([
    { id: 3, text: 'Booking created — tyre rotation', detail: 'Nissan Navara · Sat 11:00', time: nowTime() },
    { id: 2, text: 'Job completed — battery swap', detail: 'Toyota Corolla · picked up', time: nowTime() },
    { id: 1, text: 'Service reminder sent — 4 cars', detail: 'Due this month · SMS', time: nowTime() },
  ]);
  const idRef = useRef(4);
  const poolRef = useRef(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => {
      if (Math.random() > 0.6) setBookings((v) => Math.min(18, v + 1));
      if (Math.random() > 0.65) setDoneWeek((v) => v + 1);
      setInShop(() => 4 + Math.floor(Math.random() * 4));
    }, 2800);
    return () => clearInterval(t);
  }, [paused, reduced]);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => {
      const tpl = FEED_POOL[poolRef.current % FEED_POOL.length];
      poolRef.current += 1;
      const item: FeedItem = { id: idRef.current++, text: tpl.text, detail: tpl.detail, time: nowTime() };
      setFeed((prev) => [item, ...prev].slice(0, 5));
    }, 3800);
    return () => clearInterval(t);
  }, [paused, reduced]);

  return (
    <div className="apple-panel rounded-2xl overflow-hidden">
      <div className="px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-black/5 dark:border-white/10">
        <div className="flex items-center gap-2">
          <WindowControls />
          <span className="ml-2 text-[12px] text-[#6e6e73] dark:text-neutral-500 font-mono">
            ksm.autos — live overview
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
          {tab === 'bookings' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Bookings · today</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">{bookings}</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">2 slots left Saturday</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Next available</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white">Sat 13:00</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Online booking open</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Confirmations</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">92%</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">SMS reminders on</div>
              </div>
            </motion.div>
          )}

          {tab === 'workshop' && (
            <motion.div
              key="workshop"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Cars in workshop</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">{inShop}</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Across 4 bays</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Jobs done · this week</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">{doneWeek}</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Avg turnaround 1.2 days</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Bay occupancy</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">
                  {Math.round((inShop / 8) * 100)}%
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#1d1d1f] dark:bg-white"
                    animate={{ width: `${(inShop / 8) * 100}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {tab === 'parts' && (
            <motion.div
              key="parts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {[
                { name: 'Engine oil 5W-30', left: '9 drums', pct: 45 },
                { name: 'Brake pads (mixed)', left: '22 sets', pct: 70 },
                { name: 'Oil filters', left: '6 left · order placed', pct: 15 },
              ].map((p, i) => (
                <div key={p.name} className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                  <div className="text-[13px] font-medium text-[#1d1d1f] dark:text-white">{p.name}</div>
                  <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mt-0.5">{p.left}</div>
                  <div className="mt-3 h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.pct}%` }}
                      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full rounded-full ${p.pct < 25 ? 'bg-amber-500' : 'bg-[#1d1d1f] dark:bg-white'}`}
                    />
                  </div>
                </div>
              ))}
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
