export interface Register {
  id: number;
  day: number;
  month: number;
  year: number;
  date: number;
  read: number;
  image?: string;
  cost?: number;
}

export type RateTariff = {
  limit: number;
  rate: number;
  index: number;
};
