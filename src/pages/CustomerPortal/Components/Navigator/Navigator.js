import { NavLink } from 'react-router-dom';
import logoimg from '../../../../assets/images/easywaymain.png';
import CustomerNavBar from '../NavBar/NavBar';
import CustomerNavBarSecondary from '../NavBarSecondary/NavBarSecondary';
import './Navigator.css'
function NavigatorCus() {
    return (
        <>
            <nav className="navbar navbar-dark navbarCustomer navbar-expand-lg">
                <div className="container">
                    <button className="navbar-toggler border" type="button" data-bs-toggle="collapse" data-bs-target="#navbar_main" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbar_main">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to='/customerportal/' className="nav-link ps-0 mr-2" activeClassName='navLinkActiveServices'>Home Page</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/customerportal/allservices' className="nav-link ps-0 mr-2" activeClassName='navLinkActiveServices'>All Services</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/customerportal/customerprofile/userprofile' className="nav-link ps-0 mr-2" activeClassName='navLinkActiveServices'>Profile</NavLink>
                            </li>
                        </ul>
                    </div> {/* collapse end.// */}
                </div> {/* container end.// */}
            </nav> {/* navbar end.// */}

        </>
    );
}


export default NavigatorCus;