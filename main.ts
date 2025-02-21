import { tariffs } from "./src/utils/tariff";
import { RateTariff } from "./src/lib/interfaces";

export const calculate = (kwh: number, initRate?: RateTariff) => {
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
      rate = structuredClone(current);
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

      rate = structuredClone(current);
    }
  }

  if (remainingKwh === 0) {
    // set next tariff
    rate = structuredClone(tariffs[rate.index + 1]);
  } else if (remainingKwh < 0) {
    rate.limit = remainingKwh * -1;
  }

  return {
    cost: totalCost / 100,
    rate,
  };
};

// (500 kw)1531 ,  2681
const consumes = [
  100,
  50,
  50,
  50,
  50,
  50,
  50,
  50,
  50, // 500 - 1531$
  100, // 1150 ,
  100,
];

let initRate: RateTariff;
consumes.forEach((consume) => {
  const { rate, cost } = calculate(consume, initRate);
  console.log("------RESULT--------");
  console.log("Cost:", cost);
  console.log("--------------");
  initRate = rate;
});
