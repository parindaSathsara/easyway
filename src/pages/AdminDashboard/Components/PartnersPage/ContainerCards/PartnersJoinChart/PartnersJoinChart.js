

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Scale, } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import axios from 'axios';

function CustomerJoinChart() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );



    const [customersList, setCustomersList] = useState([]);
    const [dates, setDates] = useState([])

    const getCustomersChart = () => {
        axios.get(`/api/administration/getAllCustomers`).then(res => {

            if (res.data.status === 200) {
                res.data.customersByDate.forEach(element => {
                    setDates(oldArray => [...oldArray, element.joineddate]);
                });
                res.data.customersByDate.forEach(element => {
                    setCustomersList(oldArray => [...oldArray, element.CustomerCount]);
                });
            }

        })
    }


    useEffect(() => {
        getCustomersChart()
    }, [])


    const options = {
        responsive: true,
        plugins: {

            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Customers Daily Joining'
            },
        },
    };

    const labels = dates

    const data = {
        labels,
        datasets: [
            {
                label: 'Customers',
                maxBarThickness: 50,
                data: customersList,
                borderColor: '#001D6E',
                backgroundColor: '#1E3163',
            },
        ],
    };

    return (
        
        <div className="col-xl-8 mx-auto mt-5">
            <div className="col-md-12 containerbox">
                <div className="containerbox-title">
                    <h5>
                        Customer Visiting Chart (This Month)
                    </h5>
                </div>
                <Bar options={options} data={data} />
            </div>
        </div>
        
    );
}

export default CustomerJoinChart