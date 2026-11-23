import { useSyncExternalStore } from "react";

// Each page is pre-built as HTML without knowing the visitor's link (?category=…) or motion settings.
// On the very first load, React must first draw exactly that HTML, then apply those details.
// This returns false while React attaches to the pre-built HTML and true afterwards
// (and always true on later page changes).
const subscribe = () => () => {};

export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
