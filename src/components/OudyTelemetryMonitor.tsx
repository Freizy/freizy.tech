import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import { WindowControls } from './WindowControls';

type TabId = 'events' | 'tickets' | 'checkins';

interface FeedItem {
  id: number;
  text: string;
  detail: string;
  time: string;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'events', label: 'Events' },
  { id: 'tickets', label: 'Tickets' },
  { id: 'checkins', label: 'Check-ins' },
];

const FEED_POOL = [
  { text: 'Ticket purchased — AfroFuture Friday ×2', detail: 'MoMo · GH₵ 300 confirmed' },
  { text: 'Event published — Art & Wine Accra', detail: 'Sat 18:00 · 200 capacity' },
  { text: 'Check-in burst — 40 in 5 min', detail: 'Gate B · Jamestown Food Fest' },
  { text: 'Event sold out — Rooftop Cinema', detail: '150 / 150 tickets' },
  { text: 'Payout sent — GH₵ 12,400', detail: 'Organizer · settled T+1' },
  { text: 'Ticket transferred — 1 seat', detail: 'Buyer verified via SMS' },
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

export const OudyTelemetryMonitor: React.FC = () => {
  const [tab, setTab] = useState<TabId>('events');
  const [paused, setPaused] = useState(false);
  const [soldToday, setSoldToday] = useState(312);
  const [revenue, setRevenue] = useState(24600);
  const [checkedIn, setCheckedIn] = useState(428);
  const [feed, setFeed] = useState<FeedItem[]>([
    { id: 3, text: 'Ticket purchased — Highlife Night ×4', detail: 'Card · GH₵ 480 confirmed', time: nowTime() },
    { id: 2, text: 'Event published — Startup Mixer Kumasi', detail: 'Fri 17:00 · 120 capacity', time: nowTime() },
    { id: 1, text: 'Check-in burst — 25 in 5 min', detail: 'Gate A · main entrance', time: nowTime() },
  ]);
  const idRef = useRef(4);
  const poolRef = useRef(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => {
      const n = Math.floor(1 + Math.random() * 5);
      setSoldToday((v) => v + n);
      setRevenue((v) => v + n * 75);
      if (Math.random() > 0.5) setCheckedIn((v) => v + Math.floor(3 + Math.random() * 12));
    }, 2500);
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
            Oudy — demo overview
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
          {tab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Happening now</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">4</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Across Accra tonight</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Upcoming this week</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">17</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Concerts, markets, meetups</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Active organizers</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">63</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Verified accounts</div>
              </div>
            </motion.div>
          )}

          {tab === 'tickets' && (
            <motion.div
              key="tickets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Tickets sold today</div>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={soldToday}
                    initial={{ opacity: 0.4, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums"
                  >
                    {soldToday}
                  </motion.div>
                </AnimatePresence>
                <div className="text-[13px] text-[#008009] dark:text-emerald-400 mt-1">Weekend rush building</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Revenue today</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">
                  GH₵ {revenue.toLocaleString()}
                </div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">MoMo + cards settled T+1</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Refund rate</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">1.2%</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Transfers are free instead</div>
              </div>
            </motion.div>
          )}

          {tab === 'checkins' && (
            <motion.div
              key="checkins"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Checked in tonight</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">{checkedIn}</div>
                <div className="mt-2 h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#1d1d1f] dark:bg-white"
                    animate={{ width: `${Math.min(100, (checkedIn / 600) * 100)}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Gate throughput</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">~8/min</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">QR scan at 2 gates</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">No-show rate</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">6%</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Reminders go out day-before</div>
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
