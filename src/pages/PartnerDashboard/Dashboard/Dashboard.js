import './Dashboard.css';
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../../routes/routes';
import { useEffect } from 'react';


function PartnerDashboard() {
    return (
        <div id='body-pdd' className='bodypartner'>
            <header className="header headerpartner" id="header">
                <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"></i> </div>

                <div className="header_img"> <img src={require('../../../assets/images/profile.jpg')} alt=""></img> </div>
            </header>
            <div className="l-navbar partnernav" id="nav-bar">
                <nav className="nav mainsidebarnav sidenavpartner">
                    <div> <div id='sidebar_logo' className="nav_logo sidenavlogo sidebarnav sidenavpartner"></div>
                        <div className="nav_list sidenavlist">
                            <NavLink to='/partnerportal/accountprogress' className="nav_link sidenavpartner sidebarnav" activeClassName="activepartner"> <i className='bx bxs-user-account nav_icon'></i> <span className="nav_name">Account Progress</span></NavLink>
                            <NavLink to='/partnerportal/myaccount' className="nav_link sidenavpartner sidebarnav" activeClassName="activepartner"> <i className='bx bxs-user-account nav_icon'></i> <span className="nav_name">My Account</span></NavLink>
                            <NavLink to='/adminportal/dashboard' className="nav_link sidenavpartner sidebarnav" activeClassName="activepartner"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </NavLink>
                            <NavLink to='/adminportal/partners' className="nav_link sidebarnav sidenavpartner" activeClassName="activepartner"> <i className='bx bx-building-house nav_icon'></i> <span className="nav_name">Partners</span> </NavLink>
                            <NavLink to="/adminportal/services" className="nav_link sidebarnav sidenavpartner" activeClassName="activepartner"> <i className='bx bxs-hand nav_icon'></i> <span className="nav_name">Services</span> </NavLink>
                            <NavLink to="/partnerportal/newlisting" className="nav_link sidebarnav sidenavpartner" activeClassName="activepartner"> <i className='bx bxs-bell bx-tada-hover nav_icon'></i> <span className="nav_name">Create Listing</span> </NavLink>
                            <NavLink to="/partnerportal/listings" className="nav_link sidebarnav sidenavpartner" activeClassName="activepartner"> <i className='bx bxs-hand nav_icon' style={{ fontSize: 15 }}></i> <span className="nav_name">Services Listings</span> </NavLink>
                        </div>
                    </div>
                    <a href="#" className="nav_link sidebarnav sidenavpartner"> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">SignOut</span> </a>
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

    );
}

export default PartnerDashboard;
