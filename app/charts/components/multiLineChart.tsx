"use client";

import { dynamicColors } from "@/lib/utils";
import { CoffeeConsumptionResponse } from "@/types/coffee";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface props {
  target: CoffeeConsumptionResponse;
}

export default function MultiLineChart({ target }: props) {
  const { teams } = target;
  const teamColor: Record<string, string> = {};
  teams.forEach((v) => {
    teamColor[v.team] = dynamicColors();
  });

  const SquareDot = (props: any) => {
    const { cx, cy, fill, stroke } = props;
    return (
      <rect
        x={cx - 5}
        y={cy - 5}
        width={10}
        height={10}
        fill={fill}
        stroke={stroke}
      />
    );
  };

  return (
    <ResponsiveContainer width={700} height={400}>
      <LineChart
        style={{
          width: "100%",
          minWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        responsive
        margin={{
          top: 15,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="cups" allowDuplicatedCategory={false}>
          <Label value="커피 섭취량(잔/일)" position="bottom" offset={10} />
        </XAxis>
        <YAxis yAxisId="left" dataKey="bugs" width="auto">
          <Label value="버그" position="left" offset={20} />
        </YAxis>
        <YAxis
          yAxisId="right"
          dataKey="productivity"
          orientation="right"
          width="auto"
        >
          <Label value="생산성" position="right" offset={10} />
        </YAxis>
        <Tooltip labelFormatter={(v) => `커피 잔수: ${v}`} />
        <Legend
          align="center"
          wrapperStyle={{
            paddingTop: "40px",
            width: "100%",
          }}
        />
        {target.teams.map((v) => {
          return (
            <div key={`${v.team}-wrapper`}>
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="bugs"
                data={v.series}
                name={`${v.team}-버그`}
                key={`${v.team}-버그`}
                stroke={teamColor[v.team]}
                legendType="circle"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="productivity"
                stroke={teamColor[v.team]}
                data={v.series}
                name={`${v.team}-생산성`}
                key={`${v.team}-생산성`}
                strokeDasharray="5 5"
                legendType="square"
                dot={<SquareDot />}
              />
            </div>
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}
