"use client";

import { WeeklyMoodTrendResponse } from "@/types/coffee";
import {
  Bar,
  BarChart,
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

export default function StackChart({ target }: props) {
  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <BarChart
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
        <Bar dataKey="happy" stackId="a" fill="#F5DD27" background />
        <Bar dataKey="tired" stackId="a" fill="#8884d8" background />
        <Bar dataKey="stressed" stackId="a" fill="#F54927" background />
      </BarChart>
    </ResponsiveContainer>
  );
}
