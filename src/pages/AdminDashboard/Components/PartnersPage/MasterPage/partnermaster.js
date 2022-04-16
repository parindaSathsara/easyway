import RegisteredPartners from "../ContainerCards/RegisteredPartners/registeredPartners";
import PartnersNeedToApproval from "../ContainerCards/NeedToApproval/NeedToApproval";
import ApprovedPartners from "../ContainerCards/ApprovedPartners/ApprovedPartners";


function PartnerPGMaster() {
    return (

        <>
            <div className="DPMaster">

                <div className="col-12">
                    <div className='container'>
                        <div className="row">
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