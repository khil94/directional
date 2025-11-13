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
    <ResponsiveContainer width={700} height={400}>
      <AreaChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
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
        <XAxis dataKey="week" />
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
