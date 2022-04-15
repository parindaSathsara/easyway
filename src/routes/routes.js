import DPMaster from "../pages/AdminDashboard/Components/DashboardPage/MasterPage/dpmaster";
import DPMasterPartner from "../pages/PartnerDashboard/Components/DashboardPage/MasterPage/DPMasterPartner";
import PartnerPGMaster from "../pages/AdminDashboard/Components/PartnersPage/MasterPage/partnermaster";
import ServiceMaster from "../pages/AdminDashboard/Components/ServicesPage/MasterPage/servicepartner";
import CreateListingMaster from "../pages/PartnerDashboard/Components/CreateListing/MasterPage/createlisting";
import ServicesListingsMaster from "../pages/PartnerDashboard/Components/ServicesListings/MasterPage/ServicesListings";
import AccountProgressMaster from "../pages/PartnerDashboard/Components/AccountProgress/MasterPage/AccountProgress";
import PartnerAccountMaster from "../pages/PartnerDashboard/Components/PartnerAccount/MasterPage/PartnerAccountMaster";
const routes = [
    
    {path: '/adminportal/dashboard', exact:true, name:'Dashboard', component: DPMaster},
    {path: '/adminportal/partners', exact:true, name:'Dashboard', component: PartnerPGMaster},
    {path: '/adminportal/services', exact:true, name:'Dashboard', component: ServiceMaster},

    {path: '/partnerportal/myaccount', exact:true, name:'Dashboard', component: PartnerAccountMaster},
    {path: '/partnerportal/dashboard', exact:true, name:'Dashboard', component: DPMasterPartner},
    {path: '/partnerportal/newlisting', exact:true, name:'Dashboard', component: CreateListingMaster},
    {path: '/partnerportal/listings', exact:true, name:'Dashboard', component: ServicesListingsMaster},
    {path: '/partnerportal/accountprogress', exact:true, name:'Dashboard', component: AccountProgressMaster},
]

export default routes;