import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  MonitorShell,
  Kpi,
  Meter,
  useLiveFeed,
  usePrefersReducedMotion,
  nowTime,
  type FeedItem,
} from './monitor';

type TabId = 'events' | 'tickets' | 'checkins';

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

const INITIAL: FeedItem[] = [
  { id: 3, text: 'Ticket purchased — Highlife Night ×4', detail: 'Card · GH₵ 480 confirmed', time: nowTime() },
  { id: 2, text: 'Event published — Startup Mixer Kumasi', detail: 'Fri 17:00 · 120 capacity', time: nowTime() },
  { id: 1, text: 'Check-in burst — 25 in 5 min', detail: 'Gate A · main entrance', time: nowTime() },
];

export const OudyTelemetryMonitor: React.FC = () => {
  const [tab, setTab] = useState<TabId>('events');
  const [paused, setPaused] = useState(false);
  const [soldToday, setSoldToday] = useState(312);
  const [revenue, setRevenue] = useState(24600);
  const [checkedIn, setCheckedIn] = useState(428);
  const reduced = usePrefersReducedMotion();
  const feed = useLiveFeed(FEED_POOL, INITIAL, paused, reduced, 3700);

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

  return (
    <MonitorShell
      title="Oudy — demo overview"
      tabs={TABS}
      tab={tab}
      onTab={setTab}
      paused={paused}
      onTogglePause={() => setPaused((p) => !p)}
      feed={feed}
    >
      {tab === 'events' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Kpi label="Happening now" value={4} sub="Across Accra tonight" />
          <Kpi label="Upcoming this week" value={17} sub="Concerts, markets, meetups" />
          <Kpi label="Active organizers" value={63} sub="Verified accounts" />
        </div>
      )}

      {tab === 'tickets' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Kpi
            label="Tickets sold today"
            value={
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={soldToday}
                  initial={{ opacity: 0.4, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {soldToday}
                </motion.div>
              </AnimatePresence>
            }
            sub={<span className="text-[#008009] dark:text-emerald-400">Weekend rush building</span>}
          />
          <Kpi label="Revenue today" value={`GH₵ ${revenue.toLocaleString()}`} sub="MoMo + cards settled T+1" />
          <Kpi label="Refund rate" value="1.2%" sub="Transfers are free instead" />
        </div>
      )}

      {tab === 'checkins' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Kpi
            label="Checked in tonight"
            value={checkedIn}
            sub={<Meter value={Math.min(100, (checkedIn / 600) * 100)} />}
          />
          <Kpi label="Gate throughput" value="~8/min" sub="QR scan at 2 gates" />
          <Kpi label="No-show rate" value="6%" sub="Reminders go out day-before" />
        </div>
      )}
    </MonitorShell>
  );
};
