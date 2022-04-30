
import ApprovedRiders from "../ContainerCards/ApprovedRiders/ApprovedRiders";
import RidersNeedToApproval from "../ContainerCards/NeedToApproval/NeedToApproval";
import RegisteredRiders from "../ContainerCards/RegisteredRiders/RegisteredRiders";


function RiderPGMaster() {
    return (

        <>
            <div className="DPMaster">

                <div className="col-12">
                    <div className='container'>
                        <div className="row">
                            <RegisteredRiders></RegisteredRiders>
                        </div>
                    </div>
                </div>

                <div className="col-xl-12 mt-3">
                    <div className='container'>
                        <div className="row">
                            <RidersNeedToApproval></RidersNeedToApproval>
                            <ApprovedRiders></ApprovedRiders>
                            {/* <PartnersNeedToApproval></PartnersNeedToApproval>
                            <ApprovedPartners></ApprovedPartners> */}
                        </div>
                    </div>
                </div>
            </div>

            
        </>


    );
}

export default RiderPGMaster;