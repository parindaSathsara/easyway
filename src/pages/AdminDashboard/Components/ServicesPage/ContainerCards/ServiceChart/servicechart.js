

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';
import axios from 'axios';

function ServiceChart() {
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

    const [services, setServices] = useState([]);
    const [servicesData, setServicesData] = useState([]);
    const [allServicesData, setAllServicesData] = useState([]);

    const getOrdersList = () => {
        axios.get('/api/administration/getServicesOrders').then(res => {

            if (res.data.status === 200) {
                setAllServicesData(res.data.orders);

                res.data.services.forEach(element => {
                    setServices(oldArray => [...oldArray, element.servicename]);
                });

                res.data.services.forEach(element => {
                    setServicesData(oldArray => [...oldArray, element.total]);
                });

            }
            console.log("first");

        })
    }


    useEffect(() => {

        getOrdersList()

    }, [])
    


    const state = {
        labels: services,
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: [
                    '#AB46D2',
                    '#FF6FB5',
                    '#55D8C1',
                    '#FCF69C',
                    '#B4FF9F',
                    '#F9FFA4',
                    '#FFD59E',
                    '#FFA1A1',
                    '#FFD36E',
                    '#FFD36E',
                    '#FFD36E',
                    '#FFD36E',
                    '#FFD36E',
                ],

                data: servicesData
            }
        ]
    }
    return (
        <div className="col-xl-5 mx-auto mt-5">
            <div className="col-md-12 containerbox">
                <div className="containerbox-title">
                    <h5>
                        Services Orders
                    </h5>
                </div>
                <Pie
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Services Order Count',
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

export default ServiceChart