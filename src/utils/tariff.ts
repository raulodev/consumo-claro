import { RateTariff } from "../lib/interfaces";

export const tariffs: RateTariff[] = [
  { index: 0, limit: 100, rate: 33 },
  { index: 1, limit: 150, rate: 107 },
  { index: 2, limit: 200, rate: 143 },
  { index: 3, limit: 250, rate: 246 },
  { index: 4, limit: 300, rate: 300 },
  { index: 5, limit: 350, rate: 400 },
  { index: 6, limit: 400, rate: 500 },
  { index: 7, limit: 450, rate: 600 },
  { index: 8, limit: 500, rate: 700 },
  { index: 9, limit: 600, rate: 920 },
  { index: 10, limit: 700, rate: 945 },
  { index: 11, limit: 1000, rate: 985 },
  { index: 12, limit: 1800, rate: 1080 },
  { index: 13, limit: 2600, rate: 1180 },
  { index: 14, limit: 3400, rate: 1290 },
  { index: 15, limit: 4200, rate: 1395 },
  { index: 16, limit: 5000, rate: 1590 },
  { index: 17, limit: Infinity, rate: 2000 },
];

export const calculateElectricityCost = (kwh: number, initRate?: RateTariff) => {
  let totalCost = 0;
  let remainingKwh = kwh;
  let rate: RateTariff = tariffs[0];

  for (let index = !initRate ? 0 : initRate.index; index < tariffs.length; index++) {
    const current = !initRate ? tariffs[index] : initRate;
    const prev = tariffs[index - 1];

    initRate = undefined; // restart , only take this value one time

    if (remainingKwh <= 0) break;

    if (index === 0) {
      const currentCost = Math.min(current.limit, kwh) * current.rate;

      totalCost += currentCost;
      remainingKwh -= current.limit;
      rate = clone(current);
    } else if (remainingKwh > 0) {
      const range = current.limit > prev.limit ? current.limit - prev.limit : current.limit;

      const currentCost = Math.min(range, remainingKwh) * current.rate;

      if (current.limit > 500) {
        // Add 25% if consume exceeds to 500 kwh
        const changeCost = currentCost + (currentCost / 100) * 25;
        totalCost += changeCost;
      } else {
        totalCost += currentCost;
      }

      remainingKwh -= range;

      rate = clone(current);
    }
  }

  if (remainingKwh === 0) {
    // set next tariff
    rate = clone(tariffs[rate.index + 1]);
  } else if (remainingKwh < 0) {
    rate.limit = remainingKwh * -1;
  }

  return {
    cost: Number((totalCost / 100).toFixed(2)),
    rate,
  };
};

const clone = (object: object) => {
  return JSON.parse(JSON.stringify(object));
};
