"use client";

import { dynamicColors } from "@/lib/utils";
import { TopCoffeeBrandsResponse } from "@/types/coffee";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  PieLabelRenderProps,
  ResponsiveContainer,
} from "recharts";

interface props {
  target: TopCoffeeBrandsResponse;
}
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function TopCoffeDonutChart({ target }: props) {
  const data = target.map((v) => ({ ...v, fill: dynamicColors() }));
  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <PieChart
        responsive
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 5,
        }}
        data={target}
      >
        <Pie
          label={renderCustomizedLabel}
          data={data}
          dataKey={"popularity"}
          nameKey={"brand"}
          stroke="none"
          strokeWidth={0}
          innerRadius={"30%"}
        />
        {data.map((v, i) => (
          <Cell key={`cell-${v.brand}`} fill={v.fill} />
        ))}
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
