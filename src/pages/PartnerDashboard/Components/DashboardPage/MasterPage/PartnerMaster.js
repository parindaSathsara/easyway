import './PartnerMaster.css';

import TotalOrdersPartner from '../StatusCards/TotalOrdersPartners/TotalOrdersPartners';
import TotalSales from '../StatusCards/TotalSales/TotalSales';
import TotalListings from '../StatusCards/TotalListings/TotalListings';
import RecentOrders from '../ContainersCards/RecentOrders/recentorders';

import { useEffect, useState } from 'react';
import axios from 'axios';
import SalesBarChart from '../ContainersCards/SalesBarChart/SalesBarChart';
import SalesLineChart from '../ContainersCards/SalesLineChart/SalesLineChart';

function PartnerMasterPage() {

    const [dataCount, setDataCount] = useState({
        totalOrders: '',
        servicesListings: '',
        totalSales: '',
    })


    useEffect(() => {
        axios.get(`/api/partners/getPartnerDataCount/${localStorage.getItem("PartnerID")}`).then(res => {

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
                        <TotalOrdersPartner count={dataCount.totalOrders}></TotalOrdersPartner>
                        <TotalListings count={dataCount.servicesListings}></TotalListings>
                        <TotalSales count={dataCount.totalSales['TotPrice']}></TotalSales>
                        
                    </div>
                </div>
            </div>

            <div className="col-xl-12 mt-3">
                <div className='container'>
                    <div className="row">
                        
                    <SalesBarChart></SalesBarChart>
                        <SalesLineChart></SalesLineChart>
                    </div>

                    <div className="row">

                        <RecentOrders></RecentOrders>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PartnerMasterPage;