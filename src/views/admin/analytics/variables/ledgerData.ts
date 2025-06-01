import { ApexOptions } from 'apexcharts'

export const ledgerChartData = [
  {
    name: '2025 Ledger',
    data: [1200, 1400, 1100, 1800, 1600, 2000, 2200, 1900, 1750, 2100, 2300, 2400],
  },
  {
    name: '2024 Ledger',
    data: [1000, 1300, 1250, 1500, 1400, 1700, 1900, 1800, 1650, 2000, 2200, 2300],
  },
  {
    name: '2023 Ledger',
    data: [900, 1100, 1050, 1300, 1200, 1500, 1600, 1500, 1450, 1800, 1950, 2100],
  },
]

// ✅ Properly typed chart options
export const ledgerChartOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    type: 'area', // ✅ This now satisfies the union type
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  xaxis: {
    categories: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
    labels: {
      style: {
        colors: '#A3AED0',
        fontSize: '12px',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#A3AED0',
        fontSize: '12px',
      },
    },
  },
  tooltip: {
    theme: 'dark',
  },
  grid: {
    borderColor: '#56577A',
    strokeDashArray: 4,
    yaxis: {
      lines: { show: true },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.1,
      stops: [0, 95, 100],
    },
  },
  colors: ['#6AD2FF'],
}
