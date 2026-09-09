import { useEffect, useState, type FC } from 'react';
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

type TabId = 'listings' | 'bookings' | 'payments';

const TABS: { id: TabId; label: string }[] = [
  { id: 'listings', label: 'Listings' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'payments', label: 'Payments' },
];

const FEED_POOL = [
  { text: 'Booking confirmed — Room B12', detail: '2-bed · East Legon · 2 terms' },
  { text: 'Rent received — GH₵ 4,800', detail: 'Bank transfer · receipt sent' },
  { text: 'New listing — 6-bed annex', detail: 'Adenta · photos pending review' },
  { text: 'Viewing booked — Saturday 10:00', detail: '2 rooms · agent assigned' },
  { text: 'Payment reminder sent — 9 tenants', detail: 'Due in 5 days · SMS' },
  { text: 'Maintenance logged — plumbing', detail: 'Block C · caretaker notified' },
];

const INITIAL: FeedItem[] = [
  { id: 3, text: 'Booking confirmed — Room A04', detail: 'Single · Legon · 1 term', time: nowTime() },
  { id: 2, text: 'Rent received — GH₵ 3,600', detail: 'MoMo · receipt sent', time: nowTime() },
  { id: 1, text: 'Viewing booked — Sunday 14:00', detail: '4-bed · Madina · agent assigned', time: nowTime() },
];

export const HostelTelemetryMonitor: FC = () => {
  const [tab, setTab] = useState<TabId>('listings');
  const [paused, setPaused] = useState(false);
  const [occupancy, setOccupancy] = useState(87);
  const [bookingsWeek, setBookingsWeek] = useState(36);
  const [collected, setCollected] = useState(182000);
  const reduced = usePrefersReducedMotion();
  const feed = useLiveFeed(FEED_POOL, INITIAL, paused, reduced, 3800);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => {
      setOccupancy((v) => {
        const next = v + (Math.random() - 0.45) * 0.8;
        return Math.min(94, Math.max(80, Math.round(next * 10) / 10));
      });
      if (Math.random() > 0.6) setBookingsWeek((v) => v + 1);
      setCollected((v) => v + Math.floor(800 + Math.random() * 3200));
    }, 2600);
    return () => clearInterval(t);
  }, [paused, reduced]);

  return (
    <MonitorShell
      title="Freizy Hostel Hub — demo overview"
      tabs={TABS}
      tab={tab}
      onTab={setTab}
      paused={paused}
      onTogglePause={() => setPaused((p) => !p)}
      feed={feed}
    >
      {tab === 'listings' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Kpi label="Rooms listed" value={214} sub="Legon · Kumasi · Cape Coast" />
          <Kpi
            label="Occupancy"
            value={`${occupancy.toFixed(1)}%`}
            sub={<Meter value={occupancy} />}
          />
          <Kpi label="Vacant rooms" value={28} sub="Viewing slots open" />
        </div>
      )}

      {tab === 'bookings' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Kpi label="Bookings this week" value={bookingsWeek} sub="Peak letting season" />
          <Kpi label="Pending approval" value={5} sub="Managers notified" />
          <Kpi label="Average stay" value="8 mo" sub="Full academic terms" />
        </div>
      )}

      {tab === 'payments' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Kpi
            label="Collected this month"
            value={
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={collected}
                  initial={{ opacity: 0.4, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  GH₵ {collected.toLocaleString()}
                </motion.div>
              </AnimatePresence>
            }
            sub={<span className="text-[#008009] dark:text-emerald-400">Receipts auto-sent</span>}
          />
          <Kpi label="Overdue tenants" value={7} sub="Reminders scheduled" />
          <Kpi label="Due next week" value="GH₵ 21,300" sub="Across 11 rooms" />
        </div>
      )}
    </MonitorShell>
  );
};
