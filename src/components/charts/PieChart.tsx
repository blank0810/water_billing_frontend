'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const PieChart = ({ chartData, chartOptions }: any) => {
  if (!chartData || !chartOptions) return <div>Loading chart...</div>;

  return (
    <Chart
      options={chartOptions}
      type="pie"
      width="100%"
      height="100%"
      series={chartData}
    />
  );
};

export default PieChart;
