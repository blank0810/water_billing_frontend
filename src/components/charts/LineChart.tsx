'use client';
import dynamic from 'next/dynamic';

const Chart = dynamic<typeof import('react-apexcharts')>(
  () => import('react-apexcharts') as Promise<any>,
  { ssr: false }
);

interface LineChartProps {
  chartData: ApexAxisChartSeries;
  chartOptions: ApexCharts.ApexOptions;
}

const LineChart = ({ chartData, chartOptions }: LineChartProps) => {
  if (!chartData || !chartOptions) {
    console.error('Missing chartData or chartOptions');
    return <div>Loading chart...</div>;
  }

  return (
    <Chart
      options={chartOptions}
      type="line"
      width="100%"
      height="100%"
      series={chartData}
    />
  );
};

export default LineChart;
