import './dashboard.css'
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../../routes/routes';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {

    // const [userAccount, setUserAccount] = useState()

    // useEffect(() => {

    //     axios.get(`/api/riders/getRiders/${localStorage.getItem("RiderID")}`).then(res => {

    //         if (res.data.status === 200) {
    //             setUserAccount(res.data.rider[0]['ridername']);
    //         }
    //     })

    // }, [])
    return (
        <div id='body-pdd' className='bodyclass'>
            <header className="header" id="header">
                <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"></i> </div>


                <div className="headerTgl row">

                    {/* <div>
                        <i class="bx bxs-bell bx-tada-hover notificationButton" style={{ fontSize: 18 }} aria-hidden="true"></i>
                    </div> */}
                    <div>
                        <h6 class="notificationButton navUName">Easy Way Administration</h6>
                    </div>
                    <div className="header_img">
                        <img src={'https://www.facebook.com/EasyWay2k/photos/a.100102718601935/207817437830462/'} alt=""></img>
                    </div>
                </div>



            </header>
            <div className="l-navbar" id="nav-bar">
                <nav className="nav mainsidebarnav">
                    <div> <div id='sidebar_logo' className="nav_logo sidenavlogo sidebarnav sidebarnavadmin"></div>
                        <div className="nav_list sidenavlist"> <NavLink to='/adminportal/dashboard' className="nav_link sidebarnav"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </NavLink>
                            <NavLink to='/adminportal/partners' className="nav_link sidebarnav"> <i className='bx bx-building-house nav_icon'></i> <span className="nav_name">Partners</span> </NavLink>
                            <NavLink to="/adminportal/services" className="nav_link sidebarnav"> <i className='bx bxs-hand nav_icon'></i> <span className="nav_name">Services</span> </NavLink>
                            <NavLink to="/adminportal/customers" className="nav_link sidebarnav"> <i className='bx bxs-user-voice bx-tada-hover nav_icon'></i> <span className="nav_name">Customers</span> </NavLink>

                            <NavLink to="/adminportal/riders" className="nav_link sidebarnav"> <i className='bx bx-cycling nav_icon'></i> <span className="nav_name">Riders</span> </NavLink>
                            <NavLink to="/adminportal/viewListings" className="nav_link sidebarnav"> <i className='bx bxs-bell bx-tada-hover nav_icon'></i> <span className="nav_name">Services Listings</span> </NavLink>
                            <NavLink to="/adminportal/reports" className="nav_link sidebarnav"> <i className='bx bx-book-alt nav_icon'></i> <span className="nav_name">Reports</span> </NavLink>
                        </div>
                    </div>  <NavLink to='/login' className="nav_link sidebarnav sidebarnav" activeClassName="activepartner"> <i className='bx bxs-log-out nav_icon'></i> <span className="nav_name">Sign Out</span></NavLink>
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
