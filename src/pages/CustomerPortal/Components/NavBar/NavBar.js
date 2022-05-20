import { Block, LocalSee } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoimg from '../../../../assets/images/easywaymain.png';
import './NavBar.css'
import axios from 'axios'
function CustomerNavBar(props) {

    const [userLogged, setUserLogged] = useState(true)
    const [cartItemCount, setCartItemCount] = useState(0)

    useEffect(() => {


        axios.get(`/api/customers/getCartItemCount/${localStorage.getItem("customerid")}`).then(res => {

            if (res.data.status == 200) {
                setCartItemCount(res.data.cartCount)
            }
            else {
                console.log("NoData")
            }
        })

    }, [])




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


                                    {userLogged == false ? <NavLink to='/customerlogin' className="btn btn-dark customerPortalNav">
                                        <i className="fa fa-user" />  <span className="ms-1 d-none d-sm-inline-block">Sign in</span>
                                    </NavLink> :
                                        <>
                                            <NavLink to={"/customercart"} className="NavLinkCP" target={"_blank"}>
                                                <div className="icontext me-4 customerPortalNav">
                                                    <span className="icon icon-xs rounded-circle bg-dark">
                                                        <i className="fa fa-shopping-cart text-white" />
                                                        <span className="notify bg-warning">{props.cartItemCount == null ? cartItemCount : props.cartItemCount}</span>
                                                    </span>
                                                    <span class="ms-1 d-none d-sm-inline-block">Cart</span>
                                                </div>
                                            </NavLink>
                                            <div className="icontext me-4 ml-4">
                                                <img className="icon icon-xs rounded-circle iconBGIMG" src={localStorage.getItem("userprofile")} />
                                                <div class="dropdown show">
                                                    <a class="text-xs dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        {localStorage.getItem("username")}
                                                    </a>
                                                    <div class="dropdown-menu dropDownMenu" aria-labelledby="dropdownMenuLink">

                                                        <NavLink to='/customerportal/customerprofile/userprofile' className="dropdown-item">My Profile</NavLink>
                                                        <NavLink to='/customerportal/customerprofile/orders' className="dropdown-item">My Orders</NavLink>
                                                        <NavLink to='/customerlogin' className="dropdown-item">Sign Out</NavLink>

                                                    </div>
                                                </div>
                                            </div>
                                        </>


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