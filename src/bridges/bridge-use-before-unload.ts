import { useBeforeUnload } from "@/hooks/use-before-unload";
import { JobInterface } from "@/interfaces/job-interface";

export default function UseBeforeUnloadBridge({
  data,
  setData,
}: {
  data: JobInterface | null;
  setData: (data: JobInterface | null) => void;
}) {
  useBeforeUnload((event) => {
    setData(data);
    event.preventDefault();
    return "Bạn có chắc chắn muốn rời khỏi trang này? Thông tin sẽ không được lưu.";
  }, true);
  return null;
}
