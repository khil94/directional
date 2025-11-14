"use client";

import { WeeklyMoodTrendResponse } from "@/types/coffee";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface props {
  target: WeeklyMoodTrendResponse;
}

export default function StackedAreaChart({ target }: props) {
  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <AreaChart
        responsive
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 5,
        }}
        data={target}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis fontSize={"10px"} dataKey="week" />
        <YAxis width="auto">
          <Label value="%" position="bottom" offset={10} />
        </YAxis>
        <Tooltip />
        <Legend />
        <Area dataKey="happy" stackId="a" fill="#F5DD27" />
        <Area dataKey="tired" stackId="a" fill="#8884d8" />
        <Area dataKey="stressed" stackId="a" fill="#F54927" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
