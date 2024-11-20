import { Tariff } from "../lib/interfaces";

const tariffs: Tariff[] = [
  { limit: 100, rate: 0.33 },
  { limit: 150, rate: 1.07 },
  { limit: 200, rate: 1.43 },
  { limit: 250, rate: 2.46 },
  { limit: 300, rate: 3.0 },
  { limit: 350, rate: 4.0 },
  { limit: 400, rate: 5.0 },
  { limit: 450, rate: 6.0 },
  { limit: 500, rate: 7.0 },
  { limit: 600, rate: 9.2 },
  { limit: 700, rate: 9.45 },
  { limit: 1000, rate: 9.85 },
  { limit: 1800, rate: 10.8 },
  { limit: 2600, rate: 11.8 },
  { limit: 3400, rate: 12.9 },
  { limit: 4200, rate: 13.95 },
  { limit: 5000, rate: 15.9 },
  { limit: Infinity, rate: 20.0 },
];

export const calculateElectricityCost = (kwh: number): number => {
  let cost = 0;
  let remainingKwh = kwh;

  for (let index = 0; index < tariffs.length; index++) {
    const current = tariffs[index];
    const prev = tariffs[index - 1];

    if (index === 0) {
      cost += Math.min(current.limit, kwh) * current.rate;
      remainingKwh -= current.limit;
    } else if (remainingKwh > 0) {
      const range = current.limit - prev.limit;
      const currentCost = Math.min(range, remainingKwh) * current.rate;

      if (current.limit > 500) {
        cost += currentCost + (currentCost / 100) * 25;
      } else {
        cost += currentCost;
      }
      remainingKwh -= range;
    }
  }

  return Number(cost.toFixed(2));
};
