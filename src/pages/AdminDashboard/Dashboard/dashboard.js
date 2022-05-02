import './dashboard.css'
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../../routes/routes';
import { useEffect } from 'react';

function Dashboard() {
    return (
        <div id='body-pdd' className='bodyclass'>
            <header className="header" id="header">
                <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"></i> </div>


                <div className="headerTgl row">

                    <div>
                        <i class="bx bxs-bell bx-tada-hover notificationButton" style={{ fontSize: 18 }} aria-hidden="true"></i>
                    </div>
                    <div>
                        <h6 class="notificationButton navUName">Parinda Sathsara</h6>
                    </div>
                    <div className="header_img">
                        <img src={require('../../../assets/images/profile.jpg')} alt=""></img>
                    </div>
                </div>



            </header>
            <div className="l-navbar" id="nav-bar">
                <nav className="nav mainsidebarnav">
                    <div> <div id='sidebar_logo' className="nav_logo sidenavlogo sidebarnav sidebarnavadmin"></div>
                        <div className="nav_list sidenavlist"> <Link to='/adminportal/dashboard' className="nav_link active sidebarnav"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </Link>
                            <Link to='/adminportal/partners' className="nav_link sidebarnav"> <i className='bx bx-building-house nav_icon'></i> <span className="nav_name">Partners</span> </Link>
                            <Link to="/adminportal/services" className="nav_link sidebarnav"> <i className='bx bxs-hand nav_icon'></i> <span className="nav_name">Services</span> </Link>
                            <Link to="/adminportal/customers" className="nav_link sidebarnav"> <i className='bx bxs-user-voice bx-tada-hover nav_icon'></i> <span className="nav_name">Customers</span> </Link>
                            <Link to="/adminportal/createlisting" className="nav_link sidebarnav"> <i className='bx bxs-bell-plus bx-tada-hover nav_icon'></i> <span className="nav_name">Create Listing</span> </Link>
                            <Link to="/adminportal/viewListings" className="nav_link sidebarnav"> <i className='bx bxs-bell bx-tada-hover nav_icon'></i> <span className="nav_name">Services Listings</span> </Link>
                            
                            <Link to="/adminportal/riders" className="nav_link sidebarnav"> <i className='bx bx-cycling nav_icon'></i> <span className="nav_name">Riders</span> </Link>
                            <Link to="/adminportal/riders" className="nav_link sidebarnav"> <i className='bx bx-money nav_icon'></i> <span className="nav_name">Sales</span> </Link>
                            <Link to="/adminportal/riders" className="nav_link sidebarnav"> <i className='bx bx-book-alt nav_icon'></i> <span className="nav_name">Reports</span> </Link>
                        </div>
                    </div> <a href="#" className="nav_link sidebarnav"> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">SignOut</span> </a>
                </nav>
            </div>

            <div className="height-100 bg-light">
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

export default Dashboard;
