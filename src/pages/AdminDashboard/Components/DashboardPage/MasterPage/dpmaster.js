import './dpmaster.css';


import TotalOrders from '../StatusCards/TotalOrders/totalorders';
import TotalRiders from '../StatusCards/TotalRiders/totalriders';
import TotalPartners from '../StatusCards/TotalPartners/totalpartners';
import TotalEmployees from '../StatusCards/TotalEmployees/totalemployees';
import RecentOrders from '../ContainersCards/RecentOrders/recentorders';
import RiderPerformance from '../ContainersCards/RiderPerformance/riderperformance';

import SalesChart from '../ContainersCards/SalesChart/saleschart';


function DPMaster() {
    return (
        <div className="DPMaster">
            <div className="col-12">
                <div className='container'>
                    <div className="row">
                        <TotalOrders></TotalOrders>
                        <TotalRiders></TotalRiders>
                        <TotalPartners></TotalPartners>
                        <TotalEmployees></TotalEmployees>
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

export default DPMaster;