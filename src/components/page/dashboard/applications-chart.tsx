"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";

interface ApplicationsChartProps {
  className?: string;
}

export function ApplicationsChart({ className }: ApplicationsChartProps) {
  // Sample data
  const monthlyData = [
    { name: "Jan", Applied: 8, Interviews: 2, Offers: 0 },
    { name: "Feb", Applied: 12, Interviews: 4, Offers: 1 },
    { name: "Mar", Applied: 15, Interviews: 6, Offers: 2 },
    { name: "Apr", Applied: 10, Interviews: 3, Offers: 0 },
    { name: "May", Applied: 18, Interviews: 7, Offers: 1 },
    { name: "Jun", Applied: 14, Interviews: 5, Offers: 2 },
  ];

  const weeklyData = [
    { name: "Week 1", Applied: 5, Interviews: 1, Offers: 0 },
    { name: "Week 2", Applied: 7, Interviews: 2, Offers: 0 },
    { name: "Week 3", Applied: 4, Interviews: 3, Offers: 1 },
    { name: "Week 4", Applied: 6, Interviews: 2, Offers: 0 },
  ];

  const chartConfig = {
    Applied: {
      label: "Ứng tuyển",
      color: "#0ea5e9",
    },
    Interviews: {
      label: "Phỏng vấn",
      color: "#4ade80",
    },
    Offers: {
      label: "Nhận offer",
      color: "#facc15",
    },
  } satisfies ChartConfig;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Ứng tuyển công việc</CardTitle>
        <CardDescription>Theo dỡi các chỉ số ứng tuyển của bạn</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="mb-4">
            <TabsTrigger value="monthly">Tháng</TabsTrigger>
            <TabsTrigger value="weekly">Tuần</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={monthlyData}>
                  <CartesianGrid vertical={false} horizontal={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis />
                  <ChartLegend content={<ChartLegendContent />} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="Applied"
                    fill="var(--color-Applied)"
                    radius={4}
                  />
                  <Bar
                    dataKey="Interviews"
                    fill="var(--color-Interviews)"
                    radius={4}
                  />
                  <Bar dataKey="Offers" fill="var(--color-Offers)" radius={4} />
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="weekly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={weeklyData}>
                  <CartesianGrid vertical={false} horizontal={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis />
                  <ChartLegend content={<ChartLegendContent />} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="Applied"
                    fill="var(--color-Applied)"
                    radius={4}
                  />
                  <Bar
                    dataKey="Interviews"
                    fill="var(--color-Interviews)"
                    radius={4}
                  />
                  <Bar dataKey="Offers" fill="var(--color-Offers)" radius={4} />
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
