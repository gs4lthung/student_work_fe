
import { useLinkListener } from "@/hooks/use-link-listener";

interface PersistStoreBridgeProps<T> {
  values: T;
  saveDraft: (data: T) => void;
}

export function PersistStoreBridge<T>({
  values,
  saveDraft,
}: PersistStoreBridgeProps<T>) {
  useLinkListener<T>(() => values, saveDraft, true);
  return null;
}
