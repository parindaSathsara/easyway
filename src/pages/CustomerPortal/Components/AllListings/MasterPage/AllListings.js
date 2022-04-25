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
import { NavLink } from "react-router-dom";

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
                console.log(res.data.services);
            }


        })
    }

    const getListings = () => {
        axios.get('/api/partners/getListings').then(res => {

            if (res.data.status === 200) {
                setListings(res.data.listings);
                console.log(res.data.listings);
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
            <CustomerNavBarBreadCrumb></CustomerNavBarBreadCrumb>

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
                                            <i className="icon-control fa fa-chevron-down" /> Related items
                                        </a>
                                    </header>
                                    <div className="collapse show" id="collapseExample">
                                        <div className="card-body">
                                            <ul className="list-menu">
                                                {serviceslist.map((service) => (
                                                    <li ><NavLink to={`/customerportal/servicepartner/${service.serviceid}`} className="chevDownSmall" activeClassName="active" >{service['servicename']}</NavLink></li>
                                                ))}
                                            </ul>
                                        </div> {/* card-body.// */}
                                    </div> {/* collapse.// */}
                                </article> {/* filter-group // */}


                            </div> {/* card.// */}
                            {/* ===== Card for sidebar filter .// ===== */}
                        </aside> {/* col .// */}
                        <main className="col-lg-9">
                            <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                                <strong className="d-block py-2">32 Items found </strong>
                                <div className="ms-auto">
                                    <select className="form-select d-inline-block w-auto">
                                        <option value={0}>Best match</option>
                                        <option value={1}>Recommended</option>
                                        <option value={2}>High rated</option>
                                        <option value={3}>Randomly</option>
                                    </select>
                                </div>
                            </header>
                            {/* ========= content items ========= */}
                            <div className="row">
                                {listings.map((listingsDet) => (

                                    <SquareListing
                                        listingid={listingsDet['listingid']}
                                        image={listingsDet['listingimageurl']}
                                        title={listingsDet['listingtitle']}
                                        servicename={listingsDet['servicename']}
                                        price={listingsDet['listingprice']}
                                        partnername={listingsDet['partnername']}
                                    >

                                    </SquareListing>

                                ))}
                            </div> {/* row end.// */}
                            <hr />
                            <footer className="d-flex mt-4">
                                <div>
                                    <a href="javascript: history.back()" className="btn btn-light"> « Go back</a>
                                </div>
                                <nav className="ms-3">
                                    <ul className="pagination">
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item active" aria-current="page">
                                            <span className="page-link">2</span>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </footer>
                            {/* ========= content items .// ========= */}
                        </main> {/* col .// */}
                    </div> {/* row .// */}
                </div> {/* container .//  */}
            </section>
        </>
    );
}

export default AllListingsCusPortal;