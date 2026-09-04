import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import { WindowControls } from './WindowControls';

type TabId = 'appointments' | 'checkins' | 'reminders';

interface FeedItem {
  id: number;
  text: string;
  detail: string;
  time: string;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'appointments', label: 'Appointments' },
  { id: 'checkins', label: 'Check-ins' },
  { id: 'reminders', label: 'Reminders' },
];

const FEED_POOL = [
  { text: 'Appointment confirmed — Ama K.', detail: 'Tue 09:30 · General consult' },
  { text: 'SMS reminder sent — 14 patients', detail: 'Tomorrow morning queue' },
  { text: 'Patient checked in — Kofi M.', detail: 'Reception · waiting ~10 min' },
  { text: 'Follow-up booked — Efua A.', detail: '2 weeks · auto-reminder on' },
  { text: 'Appointment rescheduled — Yaw O.', detail: 'Thu 11:00 · SMS confirmed' },
  { text: 'No-show flagged — 1 slot freed', detail: 'Waitlist notified' },
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

export const LavidaTelemetryMonitor: React.FC = () => {
  const [tab, setTab] = useState<TabId>('appointments');
  const [paused, setPaused] = useState(false);
  const [todayCount, setTodayCount] = useState(24);
  const [checkedIn, setCheckedIn] = useState(11);
  const [reminders, setReminders] = useState(186);
  const [feed, setFeed] = useState<FeedItem[]>([
    { id: 3, text: 'Appointment confirmed — Akosua D.', detail: 'Today 14:00 · Dental review', time: nowTime() },
    { id: 2, text: 'SMS reminder sent — 22 patients', detail: 'Today evening queue', time: nowTime() },
    { id: 1, text: 'Patient checked in — Kwame S.', detail: 'Reception · waiting ~5 min', time: nowTime() },
  ]);
  const idRef = useRef(4);
  const poolRef = useRef(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => {
      if (Math.random() > 0.6) setTodayCount((v) => Math.min(32, v + 1));
      if (Math.random() > 0.5) setCheckedIn((v) => Math.min(todayCount, v + 1));
      setReminders((v) => v + Math.floor(1 + Math.random() * 4));
    }, 2600);
    return () => clearInterval(t);
  }, [paused, reduced, todayCount]);

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

  const checkinPct = Math.min(100, Math.round((checkedIn / Math.max(1, todayCount)) * 100));

  return (
    <div className="apple-panel rounded-2xl overflow-hidden">
      <div className="px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-black/5 dark:border-white/10">
        <div className="flex items-center gap-2">
          <WindowControls />
          <span className="ml-2 text-[12px] text-[#6e6e73] dark:text-neutral-500 font-mono">
            lavida2.netlify.app — live overview
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
          {tab === 'appointments' && (
            <motion.div
              key="appointments"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Appointments · today</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">{todayCount}</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Across 2 consulting rooms</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Checked in so far</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">{checkedIn}</div>
                <div className="mt-2 h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#1d1d1f] dark:bg-white"
                    animate={{ width: `${checkinPct}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Waiting now</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">3</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Longest wait ~15 min</div>
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
              {[
                { name: 'Room 1 — General', status: 'With doctor · 2 waiting', pct: 68 },
                { name: 'Room 2 — Dental', status: 'On schedule', pct: 42 },
                { name: 'Lab queue', status: '4 samples pending', pct: 55 },
              ].map((r, i) => (
                <div key={r.name} className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                  <div className="text-[13px] font-medium text-[#1d1d1f] dark:text-white">{r.name}</div>
                  <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mt-0.5">{r.status}</div>
                  <div className="mt-3 h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${r.pct}%` }}
                      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-[#1d1d1f] dark:bg-white"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {tab === 'reminders' && (
            <motion.div
              key="reminders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Reminders sent · this week</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">{reminders}</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">SMS · delivery ~98%</div>
              </div>
              <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-black/5 dark:border-white/10 p-5">
                <div className="text-[12px] text-[#6e6e73] dark:text-neutral-500 mb-1">Confirmations</div>
                <div className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white tabular-nums">71%</div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Rest get a follow-up call</div>
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
