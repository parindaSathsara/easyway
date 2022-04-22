import { Block, LocalSee } from '@material-ui/icons';
import { useState } from 'react';
import logoimg from '../../../../assets/images/easywaymain.png';
import './NavBar.css'
function CustomerNavBar() {

    const [userLogged, setUserLogged] = useState(true)



    return (
        <>
            <header className="section-header">
                <section className="header-main bg-white">
                    <div className="container">
                        <div className="row gy-3 align-items-center">
                            <div className="col-lg-2 col-sm-4 col-4">
                                <a href="" className="navbar-brand">
                                    <img className="logo" src={logoimg} />
                                </a> {/* brand end.// */}
                            </div>
                            <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                                <div className="float-end">
                                    {userLogged == false ? <a href="#" className="btn btn-dark customerPortalNav">
                                        <i className="fa fa-user" />  <span className="ms-1 d-none d-sm-inline-block">Sign in</span>
                                    </a> :

                                        <div className="icontext me-4 ml-4">
                                            <img className="icon icon-xs rounded-circle iconBGIMG" src={localStorage.getItem("userprofile")} />
                                            <div class="dropdown show">
                                                <a class="text-xs dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {localStorage.getItem("username")}
                                                </a>
                                                <div class="dropdown-menu dropDownMenu" aria-labelledby="dropdownMenuLink">
                                                    <a class="dropdown-item" href="#">My Profile</a>
                                                    <a class="dropdown-item" href="#">My Orders</a>
                                                    <a class="dropdown-item" href="#">Signout</a>

                                                </div>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>
                            <div className="col-lg-5 col-md-12 col-12">
                                <form action="#" className>
                                    <div className="input-group">
                                        <input type="search" className="form-control" style={{ width: '55%' }} placeholder="Search" />
                                        <button className="btn btn-primary">
                                            <i className="fa fa-search" />
                                        </button>
                                    </div> {/* input-group end.// */}
                                </form>
                            </div> {/* col end.// */}
                        </div> {/* row end.// */}
                    </div> {/* container end.// */}
                </section> {/* header-main end.// */}

            </header> {/* section-header end.// */}

        </>

    );
}


export default CustomerNavBar;