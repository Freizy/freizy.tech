import { useEffect, useState, type FC } from 'react';
import {
  MonitorShell,
  Kpi,
  Meter,
  useLiveFeed,
  usePrefersReducedMotion,
  nowTime,
  type FeedItem,
} from './monitor';

type TabId = 'appointments' | 'checkins' | 'reminders';

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

const INITIAL: FeedItem[] = [
  { id: 3, text: 'Appointment confirmed — Akosua D.', detail: 'Today 14:00 · Dental review', time: nowTime() },
  { id: 2, text: 'SMS reminder sent — 22 patients', detail: 'Today evening queue', time: nowTime() },
  { id: 1, text: 'Patient checked in — Kwame S.', detail: 'Reception · waiting ~5 min', time: nowTime() },
];

const QUEUES = [
  { name: 'Room 1 — General', status: 'With doctor · 2 waiting', pct: 68 },
  { name: 'Room 2 — Dental', status: 'On schedule', pct: 42 },
  { name: 'Lab queue', status: '4 samples pending', pct: 55 },
];

export const LavidaTelemetryMonitor: FC = () => {
  const [tab, setTab] = useState<TabId>('appointments');
  const [paused, setPaused] = useState(false);
  const [todayCount, setTodayCount] = useState(24);
  const [checkedIn, setCheckedIn] = useState(11);
  const [reminders, setReminders] = useState(186);
  const reduced = usePrefersReducedMotion();
  const feed = useLiveFeed(FEED_POOL, INITIAL, paused, reduced, 3800);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => {
      if (Math.random() > 0.6) setTodayCount((v) => Math.min(32, v + 1));
      if (Math.random() > 0.5) setCheckedIn((v) => Math.min(todayCount, v + 1));
      setReminders((v) => v + Math.floor(1 + Math.random() * 4));
    }, 2600);
    return () => clearInterval(t);
  }, [paused, reduced, todayCount]);

  const checkinPct = Math.min(100, Math.round((checkedIn / Math.max(1, todayCount)) * 100));

  return (
    <MonitorShell
      title="lavida2.netlify.app — live overview"
      tabs={TABS}
      tab={tab}
      onTab={setTab}
      paused={paused}
      onTogglePause={() => setPaused((p) => !p)}
      feed={feed}
    >
      {tab === 'appointments' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Kpi label="Appointments · today" value={todayCount} sub="Across 2 consulting rooms" />
          <Kpi
            label="Checked in so far"
            value={checkedIn}
            sub={<Meter value={checkinPct} />}
          />
          <Kpi label="Waiting now" value={3} sub="Longest wait ~15 min" />
        </div>
      )}

      {tab === 'checkins' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {QUEUES.map((r, i) => (
            <Kpi
              key={r.name}
              label={r.name}
              value={r.status}
              sub={<Meter value={r.pct} delay={i * 0.08} />}
            />
          ))}
        </div>
      )}

      {tab === 'reminders' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Kpi label="Reminders sent · this week" value={reminders} sub="SMS · delivery ~98%" />
          <Kpi label="Confirmations" value="71%" sub="Rest get a follow-up call" />
        </div>
      )}
    </MonitorShell>
  );
};
