import { Chart } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions
} from 'chart.js';
import type { DailyStats } from '../../../types/order.types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DailyStatsInterface {
    dailyStats: DailyStats[]
}

const DailyStatsChart = ({dailyStats}: DailyStatsInterface) => {

    const chartData: ChartData<'bar' | 'line'> = {
        labels: dailyStats.map(stat => 
            new Date(stat.date).toDateString()
        ),
        datasets: [
            {
                type: 'line' as const,
                label: 'Total Sum',
                data: dailyStats.map(stat => stat.totalSum),
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                yAxisID: 'y-total'
            },
            {
                type: 'bar' as const,
                label: 'Orders amount',
                data: dailyStats.map(stat => stat.ordersCount),
                backgroundColor: '#10b981',
                borderRadius: 6,
                borderWidth: 2,
                borderColor: '#059669',
                barPercentage: 0.5,
                maxBarThickness: 100,
                yAxisID: "y-count"
            }
        ]
    }

    const barChartOptions: ChartOptions<'bar' | 'line'> = {
        plugins: {
            title: { 
                display: true, 
                text: 'Orders per day',
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 20
                }
            }
        },
        scales: {
            'y-count': {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Orders Amount',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                ticks: {
                    stepSize: 1
                },
                beginAtZero: true
            },
            'y-total': {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Total Sum',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 12,
                        weight: 'bold'
                    }
                }
            }
        }
    };

    return (
        <div className='max-h-150'>
            <h1 className='text-center mb-4'>Charts</h1>
            <Chart
                type='bar'
                data={chartData} 
                options={barChartOptions}
            />
           
        </div>
    )
}

export default DailyStatsChart