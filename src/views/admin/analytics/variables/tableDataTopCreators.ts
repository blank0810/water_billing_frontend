type RowObj = {
  area: string;
  totalConsumers: number;
  totalActive: number;
  totalInactive: number;
};

const tableColumnsTopAreas: RowObj[] = [
  {
    area: "North Zone",
    totalConsumers: 5000,
    totalActive: 4500,
    totalInactive: 500,
  },
  {
    area: "South Zone",
    totalConsumers: 4000,
    totalActive: 3500,
    totalInactive: 500,
  },
  {
    area: "East Zone",
    totalConsumers: 3200,
    totalActive: 2900,
    totalInactive: 300,
  },
  {
    area: "West Zone",
    totalConsumers: 2800,
    totalActive: 2500,
    totalInactive: 300,
  },
];

export default tableColumnsTopAreas;
