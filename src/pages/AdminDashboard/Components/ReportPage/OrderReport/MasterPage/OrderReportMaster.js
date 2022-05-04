
import CustomersReport from "../ContainerCards/CustomersReport/CustomersReport";
import OrderReport from "../ContainerCards/OrderReport/OrderReport";

function ReportPageMasterAdmin() {
    return (
        <div className="DPMaster">
            <div className="col-12">
                <div className='container'>
                    <div className="row">
                        <OrderReport></OrderReport>
                        <CustomersReport></CustomersReport>
                    </div>
                    
                </div>
            </div>
        </div>

    );
}

export default ReportPageMasterAdmin;