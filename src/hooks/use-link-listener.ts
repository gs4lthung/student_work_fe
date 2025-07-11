import React from "react";

export function useLinkListener<T>(
  getData: () => T,
  setData: (data: T) => void,
  enabled = true,
  avoidRefs: React.RefObject<HTMLElement>[] = []
) {
  React.useEffect(() => {
    if (!enabled) return;

    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("a") || target.closest("button")) {
        if (avoidRefs.some((ref) => ref.current?.contains(target))) {
          return; // Ignore clicks on elements within avoidRefs
        }
        const currentData = getData();
        setData(currentData); // Save before navigating away
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [getData, setData, enabled, avoidRefs]);
}
