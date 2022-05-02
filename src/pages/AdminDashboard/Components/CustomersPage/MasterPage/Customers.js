import BestCustomers from "../ContainerCards/BestCustomers/BestCustomers";
import CustomerByDistrict from "../ContainerCards/CustomerByDistrict/CustomerByDistrict";
import CustomerJoinChart from "../ContainerCards/CustomerJoinChart/CustomerJoinChart";
import Customers from "../ContainerCards/ListOfCustomers/ListOfCustomers";
function CustomerPGMaster() {
    return (
        <div className="DPMaster">
            <div className="col-12">
                <div className='container'>
                    <div className="row">

                        <CustomerJoinChart></CustomerJoinChart>
                        <CustomerByDistrict></CustomerByDistrict>
                        <BestCustomers></BestCustomers>
                        <Customers></Customers>

                    </div>

                </div>
            </div>
        </div>

    );
}

export default CustomerPGMaster;