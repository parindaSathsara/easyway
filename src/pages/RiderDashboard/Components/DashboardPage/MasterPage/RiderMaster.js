import './RiderMaster.css';


import RecentOrders from '../ContainersCards/RecentOrders/recentorders';

import { useEffect, useState } from 'react';
import axios from 'axios';
import PendingOrders from '../StatusCards/PendingOrders/PendingOrders';
import TotalOrdersRider from '../StatusCards/TotalOrdersRiders/TotalOrdersRider';
import TotalSalesRider from '../StatusCards/TotalSales/TotalSales';
import AllCustomerOrders from '../../CustomerOrders/ContainerCards/AllCustomerOrders/AllCustomerOrders';
import RiderSalesBarChart from '../../SalesBarChart/SalesBarChart';
import RiderSalesLineChart from '../../SalesLineChart/SalesLineChart';


function RiderMasterPage() {

    const [dataCount, setDataCount] = useState({
        totalOrders: '',
        pendingOrders: '',
        totalSales: '',
    })


    useEffect(() => {
        axios.get(`/api/riders/getRiderDataCount/${localStorage.getItem("RiderID")}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data.count.totalSales['TotPrice'])
                setDataCount(res.data.count);
            }

        })
    }, [])




    return (
        <div className="DPMaster">
            <div className="col-12">
                <div className='container'>
                    <div className="row">
                        <TotalOrdersRider count={dataCount.totalOrders}></TotalOrdersRider>
                        <PendingOrders count={dataCount.pendingOrders}></PendingOrders>
                        <TotalSalesRider count={dataCount.totalSales['TotPrice']}></TotalSalesRider>
                    </div>
                </div>
            </div>

            <div className="col-xl-12 mt-3">
                <div className='container'>
                    <div className="row">
                        <RiderSalesLineChart></RiderSalesLineChart>
                        <RiderSalesBarChart></RiderSalesBarChart>
                        <AllCustomerOrders></AllCustomerOrders>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default RiderMasterPage;