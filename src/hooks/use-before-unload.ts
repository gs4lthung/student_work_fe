import React from "react";

export function useBeforeUnload(
  callback: (event: BeforeUnloadEvent) => string | void,
  enabled = true
) {
  React.useEffect(() => {
    if (!enabled) return;

    const handler = (event: BeforeUnloadEvent) => {
      const message = callback(event);
      if (message) {
        event.preventDefault();
        return message; // For some browsers
      }
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [callback, enabled]);
}
