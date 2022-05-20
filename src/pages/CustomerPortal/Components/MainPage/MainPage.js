import { useEffect, useState } from "react";
import FSPreLoader from "../../../FSPreLoader/FSPreLoader";
import BestPartners from "../BestPartners/BestPartners";
import CustomerNavBar from "../NavBar/NavBar";
import CustomerNavBarBreadCrumb from "../NavBarBreadCrumb/NavBarBreadCrumb";
import CustomerNavBarSecondary from "../NavBarSecondary/NavBarSecondary";
import NavigationHeader from "../NavigationHeader/NavigationHeader";
import NavigatorCus from "../Navigator/Navigator";
import NewListedServices from "../NewListedServices/NewListedServices";
import TopHeadingNav from "../TopHeadingNav/TopHeadingNav";
import './MainPage.css'
import FooterCustomer from '../Footer/Footer'

function CustomerMainPage() {

    const [preloader, setPreLoader] = useState(true)
    useEffect(() => {
        import(`../../MasterPage/css/boostrap.css`)
        import(`../../MasterPage/css/ui.css`)
        import(`../../MasterPage/css/responsive.css`)


        setTimeout(
            () => setPreLoader(false),
            3000
        );
    }, []);

    return (
        <>

            <div style={preloader == true ? { display: 'block' } : { display: 'none' }}>

                <FSPreLoader></FSPreLoader>

            </div>
            <TopHeadingNav></TopHeadingNav>
            <CustomerNavBar></CustomerNavBar>
            <NavigatorCus></NavigatorCus>
            <NavigationHeader></NavigationHeader>
            <BestPartners></BestPartners>

            <NewListedServices></NewListedServices>


            <section className="padding-y">
                <div className="container">
                    <article className="card p-3 p-lg-5">
                        <div className="row g-3">
                            <div className="col-lg-3 col-md-6">
                                <figure className="icontext">
                                    <div className="icon">
                                        <span className="icon-sm bg-warning-light text-warning rounded">
                                            <i className="fa fa-thumbs-up" />
                                        </span>
                                    </div>
                                    <figcaption className="text">
                                        <h6 className="customerMainContainerTitle">Reasonable prices</h6>
                                        <p className="customerMainContainerSubTitle">Unbeatable prices on all the services</p>
                                    </figcaption>
                                </figure>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <figure className="icontext">
                                    <div className="icon">
                                        <span className="icon-sm bg-warning-light text-warning rounded">
                                            <i className="fa fa-plane" />
                                        </span>
                                    </div>
                                    <figcaption className="text">
                                        <h6 className="customerMainContainerTitle">Down South Delivery</h6>
                                        <p className="customerMainContainerSubTitle">
                                            Leading delivery service in Down South</p>
                                    </figcaption>
                                </figure>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <figure className="icontext">
                                    <div className="icon">
                                        <span className="icon-sm bg-warning-light text-warning rounded">
                                            <i className="fa fa-star" />
                                        </span>
                                    </div>
                                    <figcaption className="text">
                                        <h6 className="customerMainContainerTitle">Best ratings</h6>
                                        <p className="customerMainContainerSubTitle">
                                            We have excellent customer ratings</p>
                                    </figcaption>
                                </figure>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <figure className="icontext">
                                    <div className="icon">
                                        <span className="icon-sm bg-warning-light text-warning rounded">
                                            <i className="fa fa-phone" />
                                        </span>
                                    </div>
                                    <figcaption className="text">
                                        <h6 className="customerMainContainerTitle">Help center</h6>
                                        <p className="customerMainContainerSubTitle">24 * 7 Calling service is available</p>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            <FooterCustomer></FooterCustomer>
        </>
    );
}

export default CustomerMainPage;