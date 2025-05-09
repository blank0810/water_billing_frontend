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

  rateId?: string;
  basicRate?: string;
  subsidy?: string;
  periodDate?: string;

  address?: string;
  contact?: string;

  meterBrand?: string;
  meterSize?: string;
  sealNumber?: string;
  location?: string;
  remarks?: string;

  dueDate?: string;
  penalty?: string | number;
  disconnectionDate?: string;
  reconnectionDate?: string;

  invoiceNumber?: string;
  officialReceipt?: string;
  orDate?: string;

  connectionType?: string;
  billingPeriod?: string;
  lastRateChangeDate?: string;

  notes?: string;
  zone?: string;
  barangay?: string;

  action?: string;
};
