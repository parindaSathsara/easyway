import DPMaster from "../pages/AdminDashboard/Components/DashboardPage/MasterPage/dpmaster";
import PartnerPGMaster from "../pages/AdminDashboard/Components/PartnersPage/MasterPage/partnermaster";
import ServiceMaster from "../pages/AdminDashboard/Components/ServicesPage/MasterPage/servicepartner";
import CreateListingMaster from "../pages/PartnerDashboard/Components/CreateListing/MasterPage/createlisting";
import ServicesListingsMaster from "../pages/PartnerDashboard/Components/ServicesListings/MasterPage/ServicesListings";
import AccountProgressMaster from "../pages/PartnerDashboard/Components/AccountProgress/MasterPage/AccountProgress";
import PartnerAccountMaster from "../pages/PartnerDashboard/Components/PartnerAccount/MasterPage/PartnerAccountMaster";
import CustomerMainPage from "../pages/CustomerPortal/Components/MainPage/MainPage";
import ServiceFilter from "../pages/CustomerPortal/Components/AllListings/ServiceFilter/ServiceFilter";
import PartnerMasterPage from "../pages/PartnerDashboard/Components/DashboardPage/MasterPage/PartnerMaster";
import RiderAccountProgressMaster from "../pages/RiderDashboard/Components/AccountProgress/MasterPage/AccountProgress";
import RiderAccountMaster from "../pages/RiderDashboard/Components/RiderAccount/MasterPage/RiderAccountMaster";
import RiderPGMaster from "../pages/AdminDashboard/Components/RiderPage/MasterPage/partnermaster";
import CustomerOrdersMaster from "../pages/RiderDashboard/Components/CustomerOrders/MasterPage/CustomerOrdersMaster";
import AdminCreateListing from "../pages/AdminDashboard/Components/CreateListing/MasterPage/CreateListingMaster";
import ServicesListingsMasterAdmin from "../pages/AdminDashboard/Components/ServicesListings/MasterPage/ServicesListings";
import CustomerPGMaster from "../pages/AdminDashboard/Components/CustomersPage/MasterPage/Customers";
import ReportPageMasterAdmin from "../pages/AdminDashboard/Components/ReportPage/OrderReport/MasterPage/OrderReportMaster";
const routes = [
    
    {path: '/adminportal/dashboard', exact:true, name:'Dashboard', component: DPMaster},
    {path: '/adminportal/partners', exact:true, name:'Dashboard', component: PartnerPGMaster},
    {path: '/adminportal/services', exact:true, name:'Dashboard', component: ServiceMaster},
    {path: '/adminportal/riders', exact:true, name:'Dashboard', component: RiderPGMaster},
    {path: '/adminportal/createlisting', exact:true, name:'Dashboard', component: AdminCreateListing},
    {path: '/adminportal/viewListings', exact:true, name:'Dashboard', component: ServicesListingsMasterAdmin},
    {path: '/adminportal/customers', exact:true, name:'Dashboard', component: CustomerPGMaster},
    {path: '/adminportal/reports', exact:true, name:'Dashboard', component: ReportPageMasterAdmin},

    {path: '/customerportal/allservices/:id', exact:true, name:'Dashboard', component: ServiceFilter},

    {path: '/riderportal/accountprogress', exact:true, name:'Dashboard', component: RiderAccountProgressMaster},
    {path: '/riderportal/myaccount', exact:true, name:'Dashboard', component: RiderAccountMaster},
    {path: '/riderportal/orders', exact:true, name:'Dashboard', component: CustomerOrdersMaster},


    {path: '/partnerportal/myaccount', exact:true, name:'Dashboard', component: PartnerAccountMaster},
    {path: '/partnerportal/dashboard', exact:true, name:'Dashboard', component: PartnerMasterPage},
    {path: '/partnerportal/newlisting', exact:true, name:'Dashboard', component: CreateListingMaster},
    {path: '/partnerportal/listings', exact:true, name:'Dashboard', component: ServicesListingsMaster},
    {path: '/partnerportal/accountprogress', exact:true, name:'Dashboard', component: AccountProgressMaster},
    
]

export default routes;