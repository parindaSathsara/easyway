
import AllCustomerOrders from "../ContainerCards/AllCustomerOrders/AllCustomerOrders";
import NewOrdersToGet from "../ContainerCards/NewOrdersToGet/NewOrdersToGet";
import PendingToDeliver from "../ContainerCards/PendingToDeliver/PendingToDeliver";
import AcceptedOrders from "../ContainerCards/PendingToPickup/AcceptedOrders";

function CustomerOrdersMaster() {


    return (
        <div className="DPMaster">
            <div className="col-12">
                <div className='container'>
                    <div className="row">
                        <NewOrdersToGet></NewOrdersToGet>
                        <AllCustomerOrders></AllCustomerOrders>
                        <AcceptedOrders></AcceptedOrders>
                        
                        <PendingToDeliver></PendingToDeliver>

                    </div>

                </div>
            </div>
        </div>

    );
}

export default CustomerOrdersMaster;