import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const initialData = () => ({
  labels: Array.from({ length: 10 }, (_, i) => `T${i + 1}`),
  datasets: [
    {
      label: 'Active Users',
      data: Array.from({ length: 10 }, () => getRandomInt(10, 100)),
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
});

function Analytics() {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [activeUsers, setActiveUsers] = useState(getRandomInt(50, 150));
  const [totalVisits, setTotalVisits] = useState(getRandomInt(1000, 5000));

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'line',
        data: initialData(),
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
            title: { display: true, text: 'Real-Time Active Users' },
          },
        },
      });
      setChartInstance(chart);
      return () => chart.destroy();
    }
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActive = getRandomInt(50, 150);
      setActiveUsers(newActive);
      setTotalVisits((prev) => prev + getRandomInt(5, 20));
      if (chartInstance) {
        const data = chartInstance.data.datasets[0].data;
        data.shift();
        data.push(newActive);
        chartInstance.update();
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [chartInstance]);

  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <h4>Active Users</h4>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{activeUsers}</div>
        </div>
        <div>
          <h4>Total Visits</h4>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalVisits}</div>
        </div>
      </div>
      <canvas ref={chartRef} height={100}></canvas>
    </div>
  );
}

export default Analytics;
