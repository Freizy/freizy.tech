import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * False during the hydration render, true immediately afterwards.
 *
 * Use this for widgets whose first paint is server-rendered but whose state
 * cannot be reproduced on the server (timers, randomness, stored values).
 * Unlike `useState(false)` + `useEffect(() => setMounted(true))`, this does
 * not trigger a cascading render from an effect.
 */
export function useHasHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
