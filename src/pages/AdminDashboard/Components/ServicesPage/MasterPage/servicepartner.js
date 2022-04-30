import SalesServicesChart from "../ContainerCards/SalesChart/servicesperformance";
import ServiceChart from "../ContainerCards/ServiceChart/servicechart";
import Services from "../ContainerCards/ServicesAddList/services";

function ServiceMaster() {
    return (
        <div className="DPMaster">
            <div className="col-12">
                <div className='container'>
                    <div className="row">

                        <Services></Services>
                        <ServiceChart></ServiceChart>
                        <SalesServicesChart></SalesServicesChart>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default ServiceMaster;