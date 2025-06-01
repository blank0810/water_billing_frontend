type RateDetail = {
  description: string;
  rate: number;
};

type RowObj = {
  id: number;
  name: string;
  meterNo: string;
  accountNo: string;
  rateName: string;
  vat: string;
  penalty: string;
  period: string;
  startDate: string;
  endDate: string;
  rateBreakdowns: RateDetail[];
};

export function exportToCSV(data: RowObj[], filename = 'rate-details.csv') {
  const csvContent = [
    ['Name', 'Meter No', 'Rate Name', 'VAT', 'Penalty', 'Period', 'Start Date', 'End Date'],
    ...data.map((row) => [
      row.name,
      row.meterNo,
      row.rateName,
      row.vat,
      row.penalty,
      row.period,
      row.startDate,
      row.endDate,
    ]),
  ]
    .map((e) => e.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
