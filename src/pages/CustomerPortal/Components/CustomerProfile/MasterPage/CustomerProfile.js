import { useEffect, useState, useRef } from "react";

import UserSignFooter from "../../UserSignHeader/UserFooter";
import UserSignHeaders from "../../UserSignHeader/UserSignHeader";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Snackbar from "../../../../SnackBar/Snackbar";
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../../../../routes/routes'
import CustomerNavBar from "../../NavBar/NavBar";
import TopHeadingNav from "../../TopHeadingNav/TopHeadingNav";
import NavigatorCus from "../../Navigator/Navigator";
import FooterCustomer from "../../Footer/Footer";

const SnackbarType = {
    success: "success",
    fail: "fail",
};


function CustomerProfileMaster() {

    const history = useHistory();
    const snackbarRefErr = useRef(null);
    const [formData, setFormData] = useState({
        'customeremail': '',
        'customerpassword': '',
    })


    useEffect(() => {
        import(`../../../MasterPage/css/boostrap.css`)
        import(`../../../MasterPage/css/ui.css`)
        import(`../../../MasterPage/css/responsive.css`)
    }, []);


    return (

        <>
            <Snackbar
                ref={snackbarRefErr}
                message="Invalid Credentials !"
                type={SnackbarType.fail}
            />

            <TopHeadingNav></TopHeadingNav>
            <CustomerNavBar></CustomerNavBar>
            <NavigatorCus></NavigatorCus>

            <section className="padding-y">
                <div className="container">
                    <div className="row">
                        <aside className="col-lg-3 mb-4">
                            <div className="card p-3">
                                <nav className="nav flex-column nav-pills">
                                    <NavLink to='/customerportal/customerprofile/orders' className="chevDownSmall" activeClassName="activeChev" >Orders</NavLink>
                                    <NavLink to='/customerportal/customerprofile/userprofile' className="chevDownSmall" activeClassName="activeChev" >My Profile</NavLink>
                                </nav>
                            </div>
                        </aside>
                        <main className="col-lg-8">
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
                                <Redirect from="/customerportal" to="/customerportal/customerprofile" />
                            </Switch>
                        </main>
                    </div> {/* row.// */}
                </div> {/* container .//  */}
            </section>

            <FooterCustomer></FooterCustomer>
        </>

    );
}


export default CustomerProfileMaster;