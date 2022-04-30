

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import '../containercards.css'
import axios from 'axios';

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


    const [dates, setDates] = useState([]);
    const [mainServices, setMainServices] = useState([]);
    const [easyServices, setEasyServices] = useState([]);
    const [ordersList, setOrders] = useState([]);



    const getOrdersList = () => {
        axios.get('/api/administration/getOrderCounts').then(res => {

            if (res.data.status === 200) {
                setOrders(res.data.orders);

                res.data.orders.forEach(element => {
                    setDates(oldArray => [...oldArray, element.orderdate]);
                });
        
                res.data.orders.forEach(element => {
                    setMainServices(oldArray => [...oldArray, element.MainServices]);
                });
        
                res.data.orders.forEach(element => {
                    setEasyServices(oldArray => [...oldArray, element.EasyServices]);
                });
            }
            console.log("first");

        })
    }

    const handleOnClick = () => {


    }



    useEffect(() => {
        getOrdersList()
    }, [])


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

    const labels = dates;

    const data = {
        labels,
        datasets: [
            {
                label: 'Main Services',
                data: mainServices,
                borderColor: '#FFB600',
                backgroundColor: '#FFB600',
            },
            {
                label: 'Easy Services',
                data: easyServices,
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