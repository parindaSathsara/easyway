

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';

import axios from 'axios';

function CustomerByDistrict() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        ArcElement
    );




    const [customerCount, setCustomerCount] = useState([]);
    const [districts, setDistricts] = useState([])

    const getCustomersChart = () => {
        axios.get(`/api/administration/getAllCustomers`).then(res => {

            if (res.data.status === 200) {
                res.data.customersByDistrict.forEach(element => {
                    setDistricts(oldArray => [...oldArray, element.customerdistrict]);
                });
                res.data.customersByDistrict.forEach(element => {
                    setCustomerCount(oldArray => [...oldArray, element.CustomerCount]);
                });
            }

        })
    }


    useEffect(() => {
        getCustomersChart()
    }, [])


    const state = {
        labels: districts,
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: [
                    '#143F6B',
                    '#F55353',
                    '#FEB139',
                    '#FFD36E',
                    '#FF6464',
                ],

                data: customerCount
            }
        ]
    }

    return (

        <div className="col-xl-4 mx-auto mt-5">
            <div className="col-md-12 containerbox">
                <div className="containerbox-title">
                    <h5>
                        Customers By District
                    </h5>
                </div>
                <Pie
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Customer By District',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'left'
                        }
                    }}
                />
            </div>
        </div>

    );
}

export default CustomerByDistrict