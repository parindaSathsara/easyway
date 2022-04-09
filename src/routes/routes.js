import DPMaster from "../pages/AdminDashboard/Components/DashboardPage/MasterPage/dpmaster";
import DPMasterPartner from "../pages/PartnerDashboard/Components/DashboardPage/MasterPage/DPMasterPartner";
import PartnerPGMaster from "../pages/AdminDashboard/Components/PartnersPage/MasterPage/partnermaster";
import ServiceMaster from "../pages/AdminDashboard/Components/ServicesPage/MasterPage/servicepartner";
import CreateListingMaster from "../pages/PartnerDashboard/Components/CreateListing/MasterPage/createlisting";
const routes = [
    
    {path: '/adminportal/dashboard', exact:true, name:'Dashboard', component: DPMaster},
    {path: '/adminportal/partners', exact:true, name:'Dashboard', component: PartnerPGMaster},
    {path: '/adminportal/services', exact:true, name:'Dashboard', component: ServiceMaster},


    {path: '/partnerportal/dashboard', exact:true, name:'Dashboard', component: DPMasterPartner},
    {path: '/partnerportal/newlisting', exact:true, name:'Dashboard', component: CreateListingMaster},
    {path: '/partnerportal/listings', exact:true, name:'Dashboard', component: CreateListingMaster},
]

export default routes;