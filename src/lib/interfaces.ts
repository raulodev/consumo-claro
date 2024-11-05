export interface Register {
  id: number;
  day: number;
  month: number;
  year: number;
  date: number;
  read: number;
  image?: string;
}

export type Tariff = {
  limit: number;
  rate: number;
};
