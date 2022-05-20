
import CustomersReport from "../ContainerCards/CustomersReport/CustomersReport";
import PartnerReport from "../ContainerCards/OrderReport/PartnerReport";

import OrderReport from "../ContainerCards/OrderReport/PartnerReport";
import SalesReportAdmin from "../ContainerCards/SalesReport/SalesReport";

function ReportPageMasterAdmin() {
    return (
        <div className="DPMaster">
            <div className="col-12">
                <div className='container'>
                    <div className="row">
                        <PartnerReport></PartnerReport>
                        <CustomersReport></CustomersReport>
                        <SalesReportAdmin></SalesReportAdmin>
                    </div>
                    
                </div>
            </div>
        </div>

    );
}

export default ReportPageMasterAdmin;