import React, { useEffect, useState } from 'react';
import {
  MonitorShell,
  Kpi,
  Meter,
  useLiveFeed,
  usePrefersReducedMotion,
  nowTime,
  type FeedItem,
} from './monitor';

type TabId = 'bookings' | 'workshop' | 'parts';

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

const INITIAL: FeedItem[] = [
  { id: 3, text: 'Booking created — tyre rotation', detail: 'Nissan Navara · Sat 11:00', time: nowTime() },
  { id: 2, text: 'Job completed — battery swap', detail: 'Toyota Corolla · picked up', time: nowTime() },
  { id: 1, text: 'Service reminder sent — 4 cars', detail: 'Due this month · SMS', time: nowTime() },
];

const PARTS = [
  { name: 'Engine oil 5W-30', left: '9 drums', pct: 45 },
  { name: 'Brake pads (mixed)', left: '22 sets', pct: 70 },
  { name: 'Oil filters', left: '6 left · order placed', pct: 15 },
];

export const KsmTelemetryMonitor: React.FC = () => {
  const [tab, setTab] = useState<TabId>('bookings');
  const [paused, setPaused] = useState(false);
  const [bookings, setBookings] = useState(11);
  const [inShop, setInShop] = useState(6);
  const [doneWeek, setDoneWeek] = useState(28);
  const reduced = usePrefersReducedMotion();
  const feed = useLiveFeed(FEED_POOL, INITIAL, paused, reduced, 3800);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => {
      if (Math.random() > 0.6) setBookings((v) => Math.min(18, v + 1));
      if (Math.random() > 0.65) setDoneWeek((v) => v + 1);
      setInShop(() => 4 + Math.floor(Math.random() * 4));
    }, 2800);
    return () => clearInterval(t);
  }, [paused, reduced]);

  return (
    <MonitorShell
      title="ksm.autos — live overview"
      tabs={TABS}
      tab={tab}
      onTab={setTab}
      paused={paused}
      onTogglePause={() => setPaused((p) => !p)}
      feed={feed}
    >
      {tab === 'bookings' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Kpi label="Bookings · today" value={bookings} sub="2 slots left Saturday" />
          <Kpi label="Next available" value="Sat 13:00" sub="Online booking open" />
          <Kpi label="Confirmations" value="92%" sub="SMS reminders on" />
        </div>
      )}

      {tab === 'workshop' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Kpi label="Cars in workshop" value={inShop} sub="Across 4 bays" />
          <Kpi label="Jobs done · this week" value={doneWeek} sub="Avg turnaround 1.2 days" />
          <Kpi
            label="Bay occupancy"
            value={`${Math.round((inShop / 8) * 100)}%`}
            sub={<Meter value={(inShop / 8) * 100} />}
          />
        </div>
      )}

      {tab === 'parts' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PARTS.map((p, i) => (
            <Kpi
              key={p.name}
              label={p.name}
              value={p.left}
              sub={<Meter value={p.pct} delay={i * 0.08} color={p.pct < 25 ? 'bg-amber-500' : undefined} />}
            />
          ))}
        </div>
      )}
    </MonitorShell>
  );
};
