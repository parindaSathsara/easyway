import './Dashboard.css';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
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
                        <div className="nav_list sidenavlist"> <Link to='/adminportal/dashboard' className="nav_link activepartner sidebarnav"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </Link>
                            <Link to='/adminportal/partners' className="nav_link sidebarnav sidenavpartner"> <i className='bx bx-building-house nav_icon'></i> <span className="nav_name">Partners</span> </Link>
                            <Link to="/adminportal/services" className="nav_link sidebarnav sidenavpartner"> <i className='bx bxs-hand nav_icon'></i> <span className="nav_name">Services</span> </Link>
                            <Link to="/partnerportal/newlisting" className="nav_link sidebarnav sidenavpartner"> <i className='bx bxs-bell bx-tada-hover nav_icon'></i> <span className="nav_name">Create Listing</span> </Link>
                            <Link to="/partnerportal/listings" className="nav_link sidebarnav sidenavpartner"> <i className='fa fa-bullhorn nav_icon' style={{fontSize:15}}></i> <span className="nav_name">Services Listings</span> </Link>
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
