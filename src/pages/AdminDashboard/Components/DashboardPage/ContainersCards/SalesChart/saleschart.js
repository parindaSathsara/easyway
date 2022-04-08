

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import '../containercards.css'

function SalesChart() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Easy Way Monthly Performance'
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Main Services',
                data: [33, 53, 85, 41, 44, 65, 85, 80, 23, 55, 66, 76],
                borderColor: '#FFB600',
                backgroundColor: '#FFB600',
            },
            {
                label: 'Easy Services',
                data: [85, 80, 23, 55, 66, 76, 33, 25, 35, 51, 54, 65],
                borderColor: '#0822A6',
                backgroundColor: '#0822A6',
            },
        ],
    };
    return (
        <div className="col-xl-12 mx-auto mt-5">
            <div className="col-md-12 containerbox">
                <div className="containerbox-title">
                    <h5>
                        Monthly Performance
                    </h5>
                </div>
                <Line options={options} data={data} />
            </div>
        </div>
    );
}

export default SalesChart