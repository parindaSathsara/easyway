import RegisteredPartners from "../ContainerCards/RegisteredPartners/registeredPartners";
import BestPartners from "../ContainerCards/BestPartners/bestpartners";


function PartnerPGMaster() {
    return (
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
                        <BestPartners></BestPartners>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PartnerPGMaster;