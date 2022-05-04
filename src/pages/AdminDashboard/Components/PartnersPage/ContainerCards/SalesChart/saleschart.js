

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

import axios from 'axios';

function PartnerSalesChart() {
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
    const [partners, setPartners] = useState([]);



    const getOrdersList = () => {
        axios.get('/api/administration/getAllPartnersAdmins/').then(res => {

            if (res.data.status === 200) {
                setPartners(res.data.partners);

                // res.data.partners.forEach(element => {
                //     setDates(oldArray => [...oldArray, element.orderdate]);
                // });

                // res.data.partners.forEach(element => {
                //     setMainServices(oldArray => [...oldArray, element.MainServices]);
                // });

                // res.data.partners.forEach(element => {
                //     setEasyServices(oldArray => [...oldArray, element.EasyServices]);
                // });
            }


        })
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

    const labels = [1,2,3];

    const data = {
        labels,
        // datasets: [
        //     {
        //         label: 'Main Services',
        //         data: mainServices,
        //         borderColor: '#FFB600',
        //         backgroundColor: '#FFB600',
        //     },
        //     {
        //         label: 'Easy Services',
        //         data: easyServices,
        //         borderColor: '#0822A6',
        //         backgroundColor: '#0822A6',
        //     },
        // ],
        datasets: partners.map(partner => {
            return {
                label: partner.partnername,
                data: [10,10,10],
                borderColor: '#0822A6',
                backgroundColor: '#0822A6',
            }
        }),



    };




    return (
        <div className="col-xl-12 mx-auto mt-5">
            <div className="col-md-12 containerbox">
                <div className="containerbox-title">
                    <h5>
                        Daily Performance
                    </h5>
                </div>
                <Line options={options} data={data} />
            </div>
        </div>
    );
}


export default PartnerSalesChart



