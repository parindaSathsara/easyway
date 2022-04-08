import './DPMasterPartner.css';

import TotalOrdersPartner from '../StatusCards/TotalOrdersPartners/TotalOrdersPartners';
import TotalSales from '../StatusCards/TotalSales/TotalSales';
import TotalListings from '../StatusCards/TotalListings/TotalListings';
import RecentOrders from '../ContainersCards/RecentOrders/recentorders';
import RiderPerformance from '../ContainersCards/RiderPerformance/riderperformance';

import SalesChart from '../ContainersCards/SalesChart/saleschart';

function DPMasterPartner() {
    return (
        <div className="DPMaster">
            <div className="col-12">
                <div className='container'>
                    <div className="row">
                        <TotalOrdersPartner></TotalOrdersPartner>
                        <TotalListings></TotalListings>
                        <TotalSales></TotalSales>
                        
                    </div>
                </div>
            </div>

            <div className="col-xl-12 mt-3">
                <div className='container'>
                    <div className="row">
                        <RecentOrders></RecentOrders>
                        <RiderPerformance></RiderPerformance>
                    </div>

                    <div className="row">
                        <SalesChart></SalesChart>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default DPMasterPartner;