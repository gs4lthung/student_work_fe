import { useLinkListener } from "@/hooks/use-link-listener";

interface PersistStoreBridgeProps<T> {
  values: T;
  saveDraft: (data: T) => void;
  avoidRefs?: React.RefObject<HTMLElement>[];
}

export function PersistStoreBridge<T>({
  values,
  saveDraft,
  avoidRefs,
}: PersistStoreBridgeProps<T>) {
  useLinkListener<T>(() => values, saveDraft, true, avoidRefs);
  return null;
}
