import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map((v: string, k: number) => Math.random() * k),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
        },
        {
            label: 'Dataset 2',
            data: labels.map((v: string, k: number) => Math.random() * k),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false
        },
    ],
};

const BarChart = () => {
    return (<Bar options={{
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    }} data={data} />);
};

export default BarChart;
