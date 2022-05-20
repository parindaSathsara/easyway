import './Dashboard.css';
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../../routes/routes';
import { useEffect, useState } from 'react';
import axios from 'axios';

function RiderDashboard() {


    const [userAccount, setUserAccount] = useState({
        username: '',
        userimage: '',
    })

    const [accountStatus, setAccountStatus] = useState()

    useEffect(() => {

        axios.get(`/api/riders/getRiders/${localStorage.getItem("RiderID")}`).then(res => {

            if (res.data.status === 200) {
                setAccountStatus(res.data.rider[0]['accountstatus'])
                setUserAccount({ ...userAccount, username: res.data.rider[0]['ridername'], userimage: res.data.rider[0]['profilepic'] });
            }
        })

    }, [])

    return (
        <div id='body-pdd' className='bodyrider'>
            <header className="header headerrider" id="header">
                <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"></i> </div>

                <div className="headerTgl row">

                    {/* <div>
                        <i class="bx bxs-bell bx-tada-hover notificationButton blueNavBtn" style={{ fontSize: 18 }} aria-hidden="true"></i>
                    </div> */}
                    <div>
                        <h6 class="notificationButton navUName blueNavBtn">{userAccount.username}</h6>
                    </div>
                    <div className="header_img">
                        <img src={userAccount.userimage} alt=""></img>
                    </div>
                </div>
            </header>
            <div className="l-navbar ridernav" id="nav-bar">
                <nav className="nav mainsidebarnav sidenavrider">
                    <div> <div id='sidebar_logo' className="nav_logo sidenavlogo sidebarnav sidenavrider"></div>
                        <div className="nav_list sidenavlist">

                            {accountStatus == "ReadyToRide" ? <>
                                <NavLink to='/riderportal/dashboard' className="nav_link sidenavrider sidebarnav" activeClassName="activerider"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </NavLink>
                                <NavLink to="/riderportal/orders" className="nav_link sidebarnav sidenavrider" activeClassName="activerider"> <i className='bx bxs-network-chart bx-tada-hover nav_icon'></i> <span className="nav_name">Orders</span> </NavLink>
                            </> : <>
                                <NavLink to='/riderportal/accountprogress' className="nav_link sidenavrider sidebarnav" activeClassName="activerider"> <i className='bx bxs-user-detail nav_icon'></i> <span className="nav_name">Account Progress</span></NavLink>
                            </>

                            }
                            <NavLink to='/riderportal/myaccount' className="nav_link sidenavrider sidebarnav" activeClassName="activerider"> <i className='bx bxs-user-account nav_icon'></i> <span className="nav_name">My Account</span></NavLink>


                        </div>
                    </div>
                    <NavLink to='/ewriderlogin' className="nav_link sidenavrider sidebarnav" activeClassName="activepartner"> <i className='bx bxs-log-out nav_icon'></i> <span className="nav_name">Sign Out</span></NavLink>
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
                    <Redirect from="/partnerportal/" to="/partnerportal/dashboard" />
                </Switch>
            </div>
        </div>

    );
}

export default RiderDashboard;
