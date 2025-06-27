import { useDraftJobPostStore } from "@/stores/job-store";
import React from "react";
import { toast } from "sonner";

export function useLinkListener<T>(
  getData: () => T,
  setData: (data: T) => void,
  enabled = true,
  avoidRefs: React.RefObject<HTMLElement>[] = []
) {
  const { data } = useDraftJobPostStore(); // Data previously saved in the store
  React.useEffect(() => {
    if (!enabled) return;

    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("a") || target.closest("button")) {
        if (avoidRefs.some((ref) => ref.current?.contains(target))) {
          return; // Ignore clicks on elements within avoidRefs
        }
        const currentData = getData();
        if (JSON.stringify(currentData) === JSON.stringify(data)) {
          return; // No changes to save
        }
        toast.info("Đã lưu dữ liệu tạm thời trước khi rời trang.");
        setData(currentData); // Save before navigating away
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [getData, setData, enabled, avoidRefs, data]);
}
