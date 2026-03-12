import type { MouseEvent } from "react";

import {
  DEFAULT_LOADING_DURATION_MS,
  startTimedGlobalLoading,
} from "../../hooks/useGlobalLoading";

export function shouldHandleNavigationClick(
  event: MouseEvent<HTMLElement>,
): boolean {
  return !(
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

interface NavigateToPathOptions {
  withLoading?: boolean;
  loadingDurationMs?: number;
}

export function navigateToPath(
  pathname: string,
  {
    withLoading = true,
    loadingDurationMs = DEFAULT_LOADING_DURATION_MS,
  }: NavigateToPathOptions = {},
): void {
  if (window.location.pathname === pathname) {
    return;
  }

  if (withLoading) {
    startTimedGlobalLoading("navigation", loadingDurationMs);
  }

  window.history.pushState({}, "", pathname);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
