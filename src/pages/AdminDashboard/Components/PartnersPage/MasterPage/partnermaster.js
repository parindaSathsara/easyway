import RegisteredPartners from "../ContainerCards/RegisteredPartners/registeredPartners";
import PartnersNeedToApproval from "../ContainerCards/NeedToApproval/NeedToApproval";
import ApprovedPartners from "../ContainerCards/ApprovedPartners/ApprovedPartners";
import BestPartners from "../ContainerCards/BestPartners/BestPartners";
import PartnerSalesChart from "../ContainerCards/SalesChart/saleschart";
import PartnerByDistrict from "../ContainerCards/PartnersByDistrict/PartnersByDistrict";


function PartnerPGMaster() {
    return (

        <>
            <div className="DPMaster">

                <div className="col-12">
                    <div className='container'>
                        <div className="row">
                            <BestPartners></BestPartners>
                            <PartnerByDistrict></PartnerByDistrict>
                            <RegisteredPartners></RegisteredPartners>
                        </div>
                    </div>
                </div>

                <div className="col-xl-12 mt-3">
                    <div className='container'>
                        <div className="row">

                            <PartnersNeedToApproval></PartnersNeedToApproval>
                            <ApprovedPartners></ApprovedPartners>

                        </div>
                    </div>
                </div>
            </div>


        </>


    );
}

export default PartnerPGMaster;