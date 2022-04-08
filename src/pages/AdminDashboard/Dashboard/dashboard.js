import './dashboard.css'
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../../routes/routes';
import { useEffect } from 'react';

function Dashboard() {
    return (
        <div id='body-pdd' className='bodyclass'>
            <header className="header" id="header">
                <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"></i> </div>
                <div className="header_img"> <img src={require('../../../assets/images/profile.jpg')} alt=""></img> </div>
            </header>
            <div className="l-navbar" id="nav-bar">
                <nav className="nav mainsidebarnav">
                    <div> <div id='sidebar_logo' className="nav_logo sidenavlogo sidebarnav sidebarnavadmin"></div>
                        <div className="nav_list sidenavlist"> <Link to='/adminportal/dashboard' className="nav_link active sidebarnav"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </Link>
                            <Link to='/adminportal/partners' className="nav_link sidebarnav"> <i className='bx bx-building-house nav_icon'></i> <span className="nav_name">Partners</span> </Link>
                            <Link to="/adminportal/services" className="nav_link sidebarnav"> <i className='bx bxs-hand nav_icon'></i> <span className="nav_name">Services</span> </Link>
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
