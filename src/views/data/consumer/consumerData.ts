export type RowObj = {
  consumerAllData: RowObj[];
  id: string;
  name: string;
  accountNo?: string;
  meterNo?: string;

  profile?: string;
  status?: string;
  createdAt?: string;

  billMonth?: string;
  billAmount?: number;
  consumption?: number;
  rateName?: string;
  rateCharge?: string;
  rate?: string;

  presentReading?: string;
  previousReading?: string;
  installedReading?: string;
  pulledOutReading?: string;
  date?: string;
  vat?: string | number;

  address?: string;
  contact?: string;

  action?: string;
};
