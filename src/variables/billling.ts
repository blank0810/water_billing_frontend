import { ApexOptions } from 'apexcharts';

type ApexGeneric = ApexOptions & any;

export const barChartDataBillingHistory = [
  {
    name: 'Total Billing Amount',
    data: [10000, 10500, 18700, 11800, 14750, 10820, 17650, 10690, 15000, 10800, 18500, 19200], 
  },
];

export const barChartOptionsBillingHistory: ApexGeneric = {
  chart: {
    stacked: false,
    toolbar: {
      show: false,
    },
    type: 'bar',
  },
  tooltip: {
    style: {
      fontSize: '12px',
    },
    onDatasetHover: {
      style: {
        fontSize: '12px',
      },
    },
    theme: 'dark',
  },
  xaxis: {
    categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'], 
    labels: {
      show: true,
      style: {
        colors: '#A3AED0',
        fontSize: '14px',
        fontWeight: '500',
      },
    },
    axisBorder: {
      show: true,
      color: '#D1D5DB',
    },
    axisTicks: {
      show: true,
    },
  },
  yaxis: {
    title: {
      text: 'Total Billing Amount ($)',
      style: {
        color: '#CBD5E0',
        fontSize: '14px',
      },
    },
    labels: {
      show: true,
      style: {
        colors: '#CBD5E0',
        fontSize: '14px',
      },
    },
  },
  grid: {
    show: true,
    borderColor: 'rgba(163, 174, 208, 0.3)',
    xaxis: {
      lines: {
        show: true,
        opacity: 0.1,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  fill: {
    type: 'solid',
    colors: ['#3498db'], 
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: '20px',
    },
  },
  colors: ['#3498db'],
  legend: {
    show: false,
  },
};
