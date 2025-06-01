import { ApexOptions } from 'apexcharts';

type ApexGeneric = ApexOptions & any;

// New dummy data for "Total Consumers Paid"
export const barChartDataTotalConsumersPaid = [
  {
    name: 'Total Consumers Paid',
    data: [1200, 1500, 1300, 1700, 1600, 1800, 1200, 1500, 1300, 1700, 1600, 1800],  // Example data for 6 months
  },
];

export const barChartOptionsTotalConsumersPaid: ApexGeneric = {
  chart: {
    stacked: false, 
    toolbar: {
      show: false,
    },
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
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    labels: {
      show: true,
      style: {
        colors: '#CBD5E0',
        fontSize: '14px',
      },
    },
  },
  grid: {
    borderColor: 'rgba(163, 174, 208, 0.3)',
    show: true,
    yaxis: {
      lines: {
        show: true,
        opacity: 0.5,
      },
    },
    row: {
      opacity: 0.5,
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: '#4318FF',
            opacity: 1,
          },
          {
            offset: 100,
            color: 'rgba(67, 24, 255, 1)',
            opacity: 0.28,
          },
        ],
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: '40px',
    },
  },
  colors: ['#5E37FF'],
  legend: {
    show: false,
  },
};


export const pieChartOptions = {
  labels: ['Collected', 'Uncollected', 'Pending', 'Error'],
  colors: ['#00308F', '#4169E1', '#87CEFA', '#FF0000'],
  chart: {
    width: '50px',
    type: 'donut',
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      expandOnClick: true,
    },
  },
  fill: {
    colors: ['#00308F', '#4169E1', '#87CEFA', '#FF0000'],
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
  },
};

export const pieChartData = [63, 25, 12, 1];


// recent.ts
// recent.ts
export const recentActivities = [
  {
    id: 1,
    date: 'April 20, 2025',
    user: 'Enan',
    action: 'Pay Bill',
    status: 'Success',
    meterNo: 'MN-001234',
  },
  {
    id: 2,
    date: 'April 19, 2025',
    user: 'JanTan',
    action: 'Checked Rate',
    status: 'Success',
    meterNo: 'MN-001235',
  },
  {
    id: 3,
    date: 'April 18, 2025',
    user: 'Klent',
    action: 'Payment',
    status: 'Failure',
    meterNo: 'MN-001236',
  },
  {
    id: 4,
    date: 'April 17, 2025',
    user: 'Mayora',
    action: 'Sign the contract',
    status: 'Pending',
    meterNo: 'MN-001237',
  },
  {
    id: 5,
    date: 'April 20, 2025',
    user: 'Meedo',
    action: 'Meeting',
    status: 'Pending',
    meterNo: 'MN-001237',
  },
];
