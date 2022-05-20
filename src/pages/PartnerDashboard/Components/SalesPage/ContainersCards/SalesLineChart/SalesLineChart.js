

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Scale, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../containercards.css'
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function SalesLineChart() {


    const [dates, setDates] = useState([]);
    const [ordersList, setOrders] = useState([]);
    const [totalSales, setTotalSales] = useState([]);

    const getOrdersList = () => {
        axios.get(`/api/partners/getPartnerSales/${localStorage.getItem("PartnerID")}`).then(res => {

            if (res.data.status === 200) {
                setOrders(res.data.orders);

                res.data.orders.forEach(element => {
                    setDates(oldArray => [...oldArray, element.orderdate]);
                });
                res.data.orders.forEach(element => {
                    setTotalSales(oldArray => [...oldArray, element.totalprice]);
                });
            }
            console.log("first");

        })
    }


    useEffect(() => {
        getOrdersList()
    }, [])


    const options = {
        responsive: true,
        plugins: {

            legend: {
                display:false
            },
            title: {
                display: true,
                text: 'Services Sales'
            },
        },
    };

    const labels = dates

    const data = {
        labels,
        datasets: [
            {
                label: 'Sales',
                lineTension: 0.5,
                data: totalSales,
                borderColor: '#FFB600',
                backgroundColor: '#FFB600',
            },
        ],
    };

    return (
        <div className="col-xl-6 mx-auto mt-5">
            <div className="col-md-12 containerbox">
                <div className="containerbox-title">
                    <h5>
                        Sales Bar Chart
                    </h5>
                </div>
                <Bar options={options} data={data} />
            </div>
        </div>
    );
}

export default SalesLineChart