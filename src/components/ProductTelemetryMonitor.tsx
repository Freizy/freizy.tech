import { useEffect, useMemo, useState, type FC } from 'react';
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

type TabId = 'finance' | 'stock' | 'sales';

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

const INITIAL: FeedItem[] = [
  { id: 3, text: 'Invoice INV-2040 matched', detail: '3-way match · no review needed', time: nowTime() },
  { id: 2, text: 'Sales order SO-880 packed', detail: '8 items · ready for dispatch', time: nowTime() },
  { id: 1, text: 'Payment received — GH₵ 9,800', detail: 'MTN MoMo · reconciled', time: nowTime() },
];

const STOCK = [
  { name: 'USB-C cables', left: 14, total: 100, note: 'reorder point 20' },
  { name: 'A4 paper boxes', left: 62, total: 100, note: 'ok' },
  { name: 'HP toner 58A', left: 8, total: 40, note: 'order placed' },
];

const SPARK = [14, 18, 15, 22, 19, 26, 24, 31, 28, 34];

export const ProductTelemetryMonitor: FC = () => {
  const [tab, setTab] = useState<TabId>('finance');
  const [paused, setPaused] = useState(false);
  const [revenue, setRevenue] = useState(48250);
  const [matched, setMatched] = useState(94.2);
  const [orders, setOrders] = useState(37);
  const reduced = usePrefersReducedMotion();
  const feed = useLiveFeed(FEED_POOL, INITIAL, paused, reduced);

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
    <MonitorShell
      title="omnia.freizy.com — live overview"
      tabs={TABS}
      tab={tab}
      onTab={setTab}
      paused={paused}
      onTogglePause={() => setPaused((p) => !p)}
      feed={feed}
    >
      {tab === 'finance' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Kpi
            label="Revenue · today"
            value={
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={revenue}
                  initial={{ opacity: 0.4, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  GH₵ {revenue.toLocaleString()}
                </motion.div>
              </AnimatePresence>
            }
            sub={<span className="text-[#008009] dark:text-emerald-400">+8% vs yesterday</span>}
          />
          <Kpi
            label="Invoices auto-matched"
            value={`${matched.toFixed(1)}%`}
            sub={<Meter value={matched} />}
          />
          <Kpi label="Due this week" value="GH₵ 64,200" sub="9 invoices · reminders on" />
        </div>
      )}

      {tab === 'stock' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {STOCK.map((s, i) => {
            const pct = Math.round((s.left / s.total) * 100);
            return (
              <Kpi
                key={s.name}
                label={s.name}
                value={`${s.left} left`}
                sub={
                  <>
                    <span className="block mb-1">{pct < 25 ? 'reorder soon' : s.note}</span>
                    <Meter value={pct} delay={i * 0.08} color={pct < 25 ? 'bg-amber-500' : undefined} />
                  </>
                }
              />
            );
          })}
        </div>
      )}

      {tab === 'sales' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Kpi label="Orders · today" value={orders} sub="Across Accra + Kumasi stores" />
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
        </div>
      )}
    </MonitorShell>
  );
};
