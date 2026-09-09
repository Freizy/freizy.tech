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

type TabId = 'exams' | 'candidates' | 'results';

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

const INITIAL: FeedItem[] = [
  { id: 3, text: 'Mock completed — JHS English', detail: '38 questions · scored instantly', time: nowTime() },
  { id: 2, text: 'New exam published — SHS Chemistry', detail: '50 questions · timed 75 min', time: nowTime() },
  { id: 1, text: 'Results released — 120 scripts', detail: 'SMS summaries sent', time: nowTime() },
];

export const ExamsTelemetryMonitor: FC = () => {
  const [tab, setTab] = useState<TabId>('exams');
  const [paused, setPaused] = useState(false);
  const [gradedToday, setGradedToday] = useState(212);
  const [activeToday, setActiveToday] = useState(96);
  const [passRate, setPassRate] = useState(74);
  const reduced = usePrefersReducedMotion();
  const feed = useLiveFeed(FEED_POOL, INITIAL, paused, reduced, 3700);

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

  return (
    <MonitorShell
      title="Freizy Exams Suite — demo overview"
      tabs={TABS}
      tab={tab}
      onTab={setTab}
      paused={paused}
      onTogglePause={() => setPaused((p) => !p)}
      feed={feed}
    >
      {tab === 'exams' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Kpi label="Active exams" value={18} sub="JHS & SHS · timed + practice" />
          <Kpi label="Questions banked" value="4,280" sub="Across 9 subjects" />
          <Kpi label="Scripts graded today" value={gradedToday} sub="Instant scoring" />
        </div>
      )}

      {tab === 'candidates' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Kpi label="Registered candidates" value="1,240" sub="Across 6 schools" />
          <Kpi label="Active today" value={activeToday} sub="Practising now" />
          <Kpi label="Average mock score" value="68%" sub="Up 4 pts this term" />
        </div>
      )}

      {tab === 'results' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Kpi
            label="Pass rate"
            value={`${passRate.toFixed(1)}%`}
            sub={<Meter value={passRate} />}
          />
          <Kpi label="Top score this week" value="98%" sub="English mock leaderboard" />
          <Kpi label="Result SMS sent" value={460} sub="Delivery ~99%" />
        </div>
      )}
    </MonitorShell>
  );
};
