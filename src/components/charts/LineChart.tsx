import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const LineChart = (props: any) => {
  const { chartData, chartOptions } = props;

  // Add a check to ensure chartData and chartOptions are not undefined
  if (!chartData || !chartOptions) {
    console.error('Missing chartData or chartOptions');
    return <div>Loading...</div>;
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
