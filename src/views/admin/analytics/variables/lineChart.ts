export const lineChartDataTrend = [
  {
    name: 'Rate per Cubic Meter (2023)',
    data: [22, 16, 12, 16, 19, 22, 13, 15, 17, 21, 15, 15],
  },
  {
    name: 'Rate per Cubic Meter (2024)',
    data: [30, 25, 25, 15, 14, 25, 15, 25, 19, 18, 17, 15.75],
  },
  {
    name: 'Rate per Cubic Meter (2025)',
    data: [13.5, 13.75, 14.0, 14.25, 14.5, 14.75, 15.0, 15.25, 15.5, 15.75, 16.0, 16.25],
  },
]

import { ApexOptions } from 'apexcharts'

export const lineChartOptionsTrend: ApexOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  colors: ['#3182CE'],
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  xaxis: {
    categories: [ // Default to 2023 data for now
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
    title: { text: 'Month' },
  },
  yaxis: {
    title: { text: 'Rate (₱ / m³)' },
  },
  tooltip: {
    y: {
      formatter: (val: number) => `₱${val.toFixed(2)} / m³`,
    },
  },
}
