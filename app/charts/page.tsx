import {
  getCoffeeConsumption,
  getTopCofeeBrands,
  getWeeklyMoodTrend,
} from "../api/lib/serverAPI";
import StackChart from "./components/stackChart";

export default async function ChartsPage() {
  const [CC, WMT, TCB] = await Promise.all([
    getCoffeeConsumption(),
    getWeeklyMoodTrend(),
    getTopCofeeBrands(),
  ]);

  return (
    <div className="w-full min-h-screen">
      <StackChart target={WMT} />
    </div>
  );
}
