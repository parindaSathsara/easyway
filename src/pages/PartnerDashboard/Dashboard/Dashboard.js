import './Dashboard.css';
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../../routes/routes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FSPreLoader from '../../FSPreLoader/FSPreLoader'

function PartnerDashboard() {


    const [userAccount, setUserAccount] = useState({
        username: '',
        userimage: '',
    })
    const [accountStatus, setAccountStatus] = useState()
    const [preloader, setPreLoader] = useState(true)



    useEffect(() => {

        axios.get(`/api/partners/getPartners/${localStorage.getItem("PartnerID")}`).then(res => {

            if (res.data.status === 200) {
                setAccountStatus(res.data.partners[0]['accountstatus'])
                setUserAccount({ ...userAccount, username: res.data.partners[0]['partnername'], userimage: res.data.partners[0]['profilepic'] });
            }
        })

    }, [])


    return (
        <>

            <div id='body-pdd' className='bodypartner'>
                <header className="header headerpartner" id="header">
                    <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"></i> </div>

                    <div className="headerTgl row">
                        {/* 
                        <div>
                            <i class="bx bxs-bell bx-tada-hover notificationButton orangeNavBtn" style={{ fontSize: 18 }} aria-hidden="true"></i>
                        </div> */}
                        <div>
                            <h6 class="notificationButton navUName orangeNavBtn">{userAccount.username}</h6>
                        </div>
                        <div className="header_img">
                            <img src={userAccount.userimage} alt=""></img>
                        </div>
                    </div>
                </header>
                <div className="l-navbar partnernav" id="nav-bar">
                    <nav className="nav mainsidebarnav sidenavpartner">
                        <div> <div id='sidebar_logo' className="nav_logo sidenavlogo sidebarnav sidenavpartner"></div>
                            <div className="nav_list sidenavlist">

                                {
                                    accountStatus == "ReadyToSell" ?
                                        <>
                                            <NavLink to='/partnerportal/dashboard' className="nav_link sidenavpartner sidebarnav" activeClassName="activepartner"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </NavLink>
                                            <NavLink to="/partnerportal/orders" className="nav_link sidebarnav sidenavpartner" activeClassName="activepartner"> <i className='bx bxs-network-chart bx-tada-hover nav_icon'></i> <span className="nav_name">Orders</span> </NavLink>
                                            <NavLink to="/partnerportal/newlisting" className="nav_link sidebarnav sidenavpartner" activeClassName="activepartner"> <i className='bx bxs-bell bx-tada-hover nav_icon'></i> <span className="nav_name">Create Listing</span> </NavLink>
                                            <NavLink to="/partnerportal/listings" className="nav_link sidebarnav sidenavpartner" activeClassName="activepartner"> <i className='bx bxs-hand nav_icon' style={{ fontSize: 15 }}></i> <span className="nav_name">Services Listings</span> </NavLink>
                                            <NavLink to="/partnerportal/sales" className="nav_link sidebarnav sidenavpartner" activeClassName="activepartner"> <i className='bx bx-money nav_icon'></i> <span className="nav_name">Sales</span> </NavLink>
                                        </> : <NavLink to='/partnerportal/accountprogress' className="nav_link sidenavpartner sidebarnav" activeClassName="activepartner"> <i className='bx bxs-user-detail nav_icon'></i> <span className="nav_name">Account Progress</span></NavLink>

                                }
                                <NavLink to='/partnerportal/myaccount' className="nav_link sidenavpartner sidebarnav" activeClassName="activepartner"> <i className='bx bxs-user-account nav_icon'></i> <span className="nav_name">My Account</span></NavLink>

                            </div>
                        </div>
                        <NavLink to='/ewpartnerlogin' className="nav_link sidebarnav sidenavpartner" activeClassName="activepartner"> <i className='bx bxs-log-out nav_icon'></i> <span className="nav_name">Sign Out</span></NavLink>
                        
                    </nav>
                </div>

                <div className="height-100 bgpartner">
                    <Switch>
                        {routes.map((route, idx) => {
                            return (
                                route.component && (
                                    <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={(props) => (
                                        <route.component {...props}
                                        />
                                    )} />
                                )
                            )
                        })}
                        <Redirect from="/empmasterpage" to="/empmasterpage/dashboard" />
                    </Switch>
                </div>
            </div>
        </>


    );
}

export default PartnerDashboard;
