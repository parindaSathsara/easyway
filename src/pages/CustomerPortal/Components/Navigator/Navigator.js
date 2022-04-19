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
                                <a className="nav-link ps-0" href="#">All Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Easy Way Partners</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Menu name</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="dropdown-toggle nav-link" href="#" data-bs-toggle="dropdown">
                                    Others
                                </a>
                                <ul className="dropdown-menu">
                                    <li> <a className="dropdown-item" href="#">Submenu one </a> </li>
                                    <li> <a className="dropdown-item" href="#">Submenu two</a> </li>
                                    <li> <a className="dropdown-item" href="#">Submenu three</a> </li>
                                </ul>
                            </li>
                        </ul>
                    </div> {/* collapse end.// */}
                </div> {/* container end.// */}
            </nav> {/* navbar end.// */}

        </>
    );
}


export default NavigatorCus;