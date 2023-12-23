export const calculatePrecie = (kwh: string): number => {
  const consumption = parseFloat(kwh);
  let totalToPay = 0;

  const ranges = [
    100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 1000, 1800, 2600,
    3400, 4200, 5000,
  ];

  const tariffs = [
    0.33, 1.07, 1.43, 2.46, 3.0, 4.0, 5.0, 6.0, 7.0, 9.2, 9.45, 9.85, 10.8,
    11.8, 12.9, 13.95, 15.0, 20.0,
  ];

  let rest = consumption;
  for (let i = 0; i < ranges.length; i++) {
    const currentRange = ranges[i];
    const prevRange = ranges[i - 1];

    if (i === 0) {
      totalToPay = Math.min(currentRange, consumption) * tariffs[i];

      rest = rest - ranges[i];
    } else if (rest > 0) {
      const valueRange = currentRange - prevRange;

      const value = Math.min(valueRange, rest);

      totalToPay = totalToPay + value * tariffs[i];

      rest = rest - valueRange;
    }
  }

  if (consumption > ranges[ranges.length - 1]) {
    const extra = consumption - ranges[ranges.length - 1];

    totalToPay = totalToPay + extra * tariffs[tariffs.length - 1];
  }

  return Number(totalToPay.toFixed(2));
};
