import { useEffect, useState } from "react";
import FSPreLoader from "../../../../FSPreLoader/FSPreLoader";
import BestPartners from "../../BestPartners/BestPartners";
import CustomerNavBar from "../../NavBar/NavBar";
import CustomerNavBarBreadCrumb from "../../NavBarBreadCrumb/NavBarBreadCrumb";
import CustomerNavBarSecondary from "../../NavBarSecondary/NavBarSecondary";
import NavigationHeader from "../../NavigationHeader/NavigationHeader";
import NavigatorCus from "../../Navigator/Navigator";
import NewListedServices from "../../NewListedServices/NewListedServices";
import TopHeadingNav from "../../TopHeadingNav/TopHeadingNav";
import './AllListings.css'
import axios from 'axios'
import SquareListing from '../../SquareListing/SquareListing'
import ServiceFilter from "../ServiceFilter/ServiceFilter";
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../../../../routes/routes';

function AllListingsCusPortal() {

    const [preloader, setPreLoader] = useState(true)

    const [listings, setListings] = useState([]);
    useEffect(() => {
        import(`../../../MasterPage/css/boostrap.css`)
        import(`../../../MasterPage/css/ui.css`)
        import(`../../../MasterPage/css/responsive.css`)
        getListings();
        getServicesList();

        setTimeout(
            () => setPreLoader(false),
            3000
        );
    }, []);

    const [serviceslist, setServicesList] = useState([]);

    const getServicesList = () => {
        axios.get('/api/getservices').then(res => {

            if (res.data.status === 200) {
                setServicesList(res.data.services);
                // console.log(res.data.services);
            }


        })
    }

    const getListings = () => {
        axios.get('/api/partners/getListings').then(res => {

            if (res.data.status === 200) {
                setListings(res.data.listings);
                // console.log(res.data.listings);
            }
        })
    }

    return (
        <>
            <div style={preloader == true ? { display: 'block' } : { display: 'none' }}>

                <FSPreLoader></FSPreLoader>

            </div>
            <TopHeadingNav></TopHeadingNav>
            <CustomerNavBar></CustomerNavBar>
            <NavigatorCus></NavigatorCus>

            <section className="padding-y">
                <div className="container">
                    <div className="row">
                        <aside className="col-lg-3">
                            <button className="btn btn-outline-secondary mb-3 w-100  d-lg-none" data-toggle="collapse" href="#aside_filter" role="button" aria-expanded="false" aria-controls="aside_filter">Show filter</button>
                            {/* ===== Card for sidebar filter ===== */}
                            <div id="aside_filter" className="collapse card d-lg-block mb-5">
                                <article className="filter-group">
                                    <header className="card-header">
                                        <a className="chevDown" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                            <i className="icon-control fa fa-chevron-down" /> Services
                                        </a>
                                    </header>
                                    <div className="collapse show" id="collapseExample">
                                        <div className="card-body">
                                            <ul className="list-menu">
                                                {serviceslist.map((service) => (
                                                    <li ><NavLink to={`/customerportal/allservices/${service['serviceid']}`} className="chevDownSmall" activeClassName="activeChev" >{service['servicename']}</NavLink></li>
                                                ))}
                                            </ul>
                                        </div> 
                                    </div>
                                </article>

                            </div>

                        </aside> 
                        <main className="col-lg-9">

                            {/* ========= content items ========= */}
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
                            <hr />

                        </main> {/* col .// */}
                    </div> {/* row .// */}
                </div> {/* container .//  */}
            </section>
        </>
    );
}

export default AllListingsCusPortal;