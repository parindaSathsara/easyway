import './OrdersMaster.css';


import { useEffect, useState } from 'react';
import axios from 'axios';
import OrdersToProcess from '../ContainerCards/OrdersToProcess/OrdersToProcess';
import ProcessingCompletedOrders from '../ContainerCards/ProcessingCompletedOrders/ProcessingCompletedOrders';

function OrdersMasterPage() {
    return (
        <div className="DPMaster">
            <div className="col-xl-12 mt-3">
                <div className='container'>
                    <div className="row">
                        <OrdersToProcess></OrdersToProcess>
                        <ProcessingCompletedOrders></ProcessingCompletedOrders>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default OrdersMasterPage;