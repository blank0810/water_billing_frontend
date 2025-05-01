import { ApexOptions } from 'apexcharts';

type ApexGeneric = ApexOptions & any;

export const billingTrendChartData = [
  {
    name: 'Billing Amount',
    data: [10000, 10500, 18700, 11800, 14750, 10820, 17650, 10690, 15000, 10800, 18500, 19200],
  },
];

export const billingTrendChartOptions: ApexGeneric = {
  chart: {
    type: 'line',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  xaxis: {
    categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    labels: {
      style: {
        colors: '#A3AED0',
        fontSize: '13px',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Amount ($)',
      style: {
        color: '#CBD5E0',
        fontSize: '13px',
      },
    },
    labels: {
      style: {
        colors: '#CBD5E0',
        fontSize: '13px',
      },
    },
  },
  tooltip: {
    theme: 'dark',
    x: {
      format: 'MMM',
    },
  },
  grid: {
    borderColor: 'rgba(163, 174, 208, 0.2)',
  },
  colors: ['#4FD1C5'],
  markers: {
    size: 5,
    colors: ['#4FD1C5'],
    strokeWidth: 2,
    strokeColors: '#fff',
    hover: {
      size: 7,
    },
  },
  dataLabels: {
    enabled: false,
  },
};
