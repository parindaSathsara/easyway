import './Dashboard.css';
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../../routes/routes';
import { useEffect } from 'react';


function RiderDashboard() {
    return (
        <div id='body-pdd' className='bodyrider'>
            <header className="header headerrider" id="header">
                <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"></i> </div>

                <div className="headerTgl row">

                    <div>
                        <i class="bx bxs-bell bx-tada-hover notificationButton blueNavBtn" style={{ fontSize: 18 }} aria-hidden="true"></i>
                    </div>
                    <div>
                        <h6 class="notificationButton navUName blueNavBtn">Parinda Sathsara</h6>
                    </div>
                    <div className="header_img">
                        <img src={require('../../../assets/images/profile.jpg')} alt=""></img>
                    </div>
                </div>
            </header>
            <div className="l-navbar ridernav" id="nav-bar">
                <nav className="nav mainsidebarnav sidenavrider">
                    <div> <div id='sidebar_logo' className="nav_logo sidenavlogo sidebarnav sidenavrider"></div>
                        <div className="nav_list sidenavlist">
                            <NavLink to='/riderportal/accountprogress' className="nav_link sidenavrider sidebarnav" activeClassName="activerider"> <i className='bx bxs-user-detail nav_icon'></i> <span className="nav_name">Account Progress</span></NavLink>
                            <NavLink to='/riderportal/myaccount' className="nav_link sidenavrider sidebarnav" activeClassName="activerider"> <i className='bx bxs-user-account nav_icon'></i> <span className="nav_name">My Account</span></NavLink>
                            <NavLink to='/riderportal/dashboard' className="nav_link sidenavrider sidebarnav" activeClassName="activerider"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </NavLink>
                            <NavLink to="/riderportal/orders" className="nav_link sidebarnav sidenavrider" activeClassName="activerider"> <i className='bx bxs-network-chart bx-tada-hover nav_icon'></i> <span className="nav_name">Orders</span> </NavLink>
                            <NavLink to="/riderportal/listings1" className="nav_link sidebarnav sidenavrider" activeClassName="activerider"> <i className='bx bxs-book-alt nav_icon' style={{ fontSize: 15 }}></i> <span className="nav_name">Report</span> </NavLink>
                            <NavLink to="/riderportal/orders1" className="nav_link sidebarnav sidenavrider" activeClassName="activerider"> <i className='bx bx-line-chart bx-tada-hover nav_icon'></i> <span className="nav_name">Performance</span> </NavLink>

                        </div>
                    </div>
                    <a href="#" className="nav_link sidebarnav sidenavrider"> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">SignOut</span> </a>
                </nav>
            </div>

            <div className="height-100 bgrider">
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

export default RiderDashboard;
