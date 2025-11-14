import TabLayout from "@/layout/tabLayout";
import {
  AreaChart,
  BarChart,
  ChartColumnBig,
  Donut,
  LineChart,
} from "lucide-react";
import {
  getCoffeeConsumption,
  getTopCofeeBrands,
  getWeeklyMoodTrend,
} from "../api/lib/serverAPI";
import StackedAreaChart from "./components/areaChart";
import TopCoffeBarChart from "./components/barChart";
import TopCoffeDonutChart from "./components/donutChart";
import MultiLineChart from "./components/multiLineChart";
import StackChart from "./components/stackChart";

export default async function ChartsPage() {
  const [CC, WMT, TCB] = await Promise.all([
    getCoffeeConsumption(),
    getWeeklyMoodTrend(),
    getTopCofeeBrands(),
  ]);

  return (
    <div className="-mt-20 w-full min-h-svh content-center">
      <div className="max-w-5xl mx-auto ">
        <TabLayout
          tabList={[
            {
              name: "주간 기분 트렌드(스택)",
              content: <StackChart target={WMT} />,
              icon: ChartColumnBig,
            },
            {
              name: "주간 기분 트렌드(영역)",
              content: <StackedAreaChart target={WMT} />,
              icon: AreaChart,
            },
            {
              name: "커피당 생산성/버그(스택)",
              content: <MultiLineChart target={CC} />,
              icon: LineChart,
            },
            {
              name: "최고의 커피 브랜드(도넛)",
              content: <TopCoffeDonutChart target={TCB} />,
              icon: Donut,
            },
            {
              name: "최고의 커피 브랜드(바)",
              content: <TopCoffeBarChart target={TCB} />,
              icon: BarChart,
            },
          ]}
        />
      </div>
    </div>
  );
}
