import { PRELANDING_STORAGE_KEY } from "./constants";

/**
 * Decide whether to show the pre-landing overlay.
 * Clears the session flag on full page reload (F5, Cmd+R, hard refresh)
 * so the doorway experience plays again.
 */
export function resolvePreLandingVisibility(): boolean {
  if (typeof window === "undefined") return false;

  const navEntry = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;

  if (navEntry?.type === "reload") {
    sessionStorage.removeItem(PRELANDING_STORAGE_KEY);
    return true;
  }

  return !sessionStorage.getItem(PRELANDING_STORAGE_KEY);
}

export function markPreLandingEntered(): void {
  sessionStorage.setItem(PRELANDING_STORAGE_KEY, "1");
}
