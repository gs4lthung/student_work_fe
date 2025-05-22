"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ApplicationStatus() {
  const data = [
    { name: "Đã ứng tuyển", value: 42, color: "#0ea5e9" },
    { name: "Phỏng vấn", value: 8, color: "#4ade80" },
    { name: "Từ chối", value: 12, color: "#dc2626" },
    { name: "Nhận offer", value: 3, color: "#facc15" },
  ]

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hồ sơ xin việc</CardTitle>
        <CardDescription>Chi tiết về trạng thái các đơn ứng tuyển</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
