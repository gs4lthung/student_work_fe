import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface RecentActivityProps {
  className?: string;
}

export function RecentActivity({ className }: RecentActivityProps) {
  const activities = [
    {
      id: 1,
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      action: "Ứng tuyển",
      date: "Hôm nay",
      time: "10:30 AM",
    },
    {
      id: 2,
      company: "InnovateSoft",
      position: "Full Stack Engineer",
      action: "Phỏng vấn",
      date: "Hôm nay",
      time: "9:15 AM",
    },
    {
      id: 3,
      company: "DataViz Solutions",
      position: "UI/UX Developer",
      action: "Nhận offer",
      date: "Hôm qua",
      time: "4:45 PM",
    },
    {
      id: 4,
      company: "CloudNine Systems",
      position: "React Developer",
      action: "Đã xem hồ sơ",
      date: "Hôm qua",
      time: "11:20 AM",
    },
    {
      id: 5,
      company: "Quantum Software",
      position: "Frontend Architect",
      action: "Ứng tuyển",
      date: "12 tháng 10",
      time: "2:30 PM",
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Hoạt động gần đây</CardTitle>
        <CardDescription>
          Theo dõi hoạt động gần đây của bạn trên nền tảng
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="relative mt-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.company}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.date} lúc {activity.time}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.position}
                </p>
                <p className="text-xs font-medium">{activity.action}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href="/dashboard/recent-activity">
          <Button variant="link" className="w-full text-sm">
            Xem tất cả hoạt động
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
