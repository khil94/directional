export interface CoffeeDataPoint {
  cups: number;
  bugs: number;
  productivity: number;
}

export interface CoffeeTeam {
  team: string;
  series: CoffeeDataPoint[];
}

export interface CoffeeConsumptionResponse {
  teams: CoffeeTeam[];
}

export interface WeeklyMoodItem {
  week: string;
  happy: number;
  tired: number;
  stressed: number;
}

export type WeeklyMoodTrendResponse = WeeklyMoodItem[];

export interface TopCoffeeBrandItem {
  brand: string;
  popularity: number;
}

export type TopCoffeeBrandsResponse = TopCoffeeBrandItem[];
