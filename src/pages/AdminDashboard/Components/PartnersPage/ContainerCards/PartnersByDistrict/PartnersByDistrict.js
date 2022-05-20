

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';

import axios from 'axios';

function PartnerByDistrict() {
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




    const [partnerCount, setPartnerCount] = useState([]);
    const [districts, setDistricts] = useState([])

    const getPartnerChart = () => {
        axios.get(`/api/administration/getAllPartnersAdmins`).then(res => {

            if (res.data.status === 200) {
                res.data.partnersGroupByDistrict.forEach(element => {
                    setDistricts(oldArray => [...oldArray, element.district]);
                });
                res.data.partnersGroupByDistrict.forEach(element => {
                    setPartnerCount(oldArray => [...oldArray, element.PartnerCount]);
                });
            }

        })
    }


    useEffect(() => {
        getPartnerChart()
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

                data: partnerCount
            }
        ]
    }

    return (

        <div className="col-xl-12 mx-auto mt-5">
            <div className="col-md-12 containerbox">
                <div className="containerbox-title">
                    <h5>
                        Partners By District
                    </h5>
                </div>
                <Pie
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Partners By District',
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

export default PartnerByDistrict