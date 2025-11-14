"use client";

import { dynamicColors } from "@/lib/utils";
import { TopCoffeeBrandsResponse } from "@/types/coffee";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface props {
  target: TopCoffeeBrandsResponse;
}

export default function TopCoffeBarChart({ target }: props) {
  return (
    <ResponsiveContainer width={700} height={400}>
      <BarChart
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
        <XAxis dataKey="brand" />
        <YAxis width="auto">
          <Label value="인기" position="bottom" offset={10} />
        </YAxis>
        <Tooltip />
        <Bar dataKey="popularity" stackId="a" background>
          {target.map((v, i) => {
            return <Cell key={v.brand} fill={dynamicColors()} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
