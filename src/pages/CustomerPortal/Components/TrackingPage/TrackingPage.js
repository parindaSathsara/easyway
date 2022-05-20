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
import './TrackingPage.css'
import axios from "axios";
import { useParams } from "react-router-dom";

function TrackingPage() {

    const [preloader, setPreLoader] = useState(true)
    const [orderData, setOrderData] = useState([])
    const { id } = useParams()


    const [ordersList, setOrders] = useState([]);

    const [tracking, setTracking] = useState({
        RiderAccept: true,
        ProcessByPartner: false,
        RiderCollected: false,
        DeliverToCustomer: false
    })


    const getOrdersList = () => {
        axios.get(`/api/customers/getCustomerOrdersByID/${localStorage.getItem("customerid")}`).then(res => {

            if (res.data.status === 200) {
                setOrders(res.data.orders)
                console.log(res.data.orders)
            }

        })
    }


    const loadData = () => {
        axios.get(`/api/riders/getOrderByID/${id}`).then(res => {

            if (res.data.status == 200) {
                setOrderData(res.data.acceptedOrders[0])
                console.log(res.data.acceptedOrders[0])

                if (res.data.acceptedOrders[0]['orderstatus'] == "RiderAccept") {
                    setTracking({ ...tracking, RiderAccept: true, ProcessByPartner: false, RiderCollected: false, DeliverToCustomer: false });
                }
                else if (res.data.acceptedOrders[0]['orderstatus'] == "ProcessByPartner") {
                    setTracking({ ...tracking, RiderAccept: true, ProcessByPartner: true, RiderCollected: false, DeliverToCustomer: false });
                }
                else if (res.data.acceptedOrders[0]['orderstatus'] == "RiderCollected") {
                    setTracking({ ...tracking, RiderAccept: true, ProcessByPartner: true, RiderCollected: true, DeliverToCustomer: false });
                }
                else if (res.data.acceptedOrders[0]['orderstatus'] == "DeliverToCustomer") {
                    setTracking({ ...tracking, RiderAccept: true, ProcessByPartner: true, RiderCollected: true, DeliverToCustomer: true });
                }
            }
            else {
                console.log("NoData")
            }
        })

    }

    useEffect(() => {
        import(`../../MasterPage/css/boostrap.css`)
        import(`../../MasterPage/css/ui.css`)
        import(`../../MasterPage/css/responsive.css`)


        setTimeout(
            () => setPreLoader(false),
            3000
        );

        loadData()
        getOrdersList()
    }, [id]);




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
                    <article className="card p-3 p-lg-5 mb-4">
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


                    <div className="row">
                        <main className="col-lg-8 mb-4">

                            <article className="card">
                                <div className="card-body">
                                    <figure className="mt-4 mx-auto text-center" style={{ maxWidth: '600px' }}>
                                        <svg width="96px" height="96px" viewBox="0 0 96 96" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                <g id="round-check">
                                                    <circle id="Oval" fill="#D3FFD9" cx={48} cy={48} r={48} />
                                                    <circle id="Oval-Copy" fill="#87FF96" cx={48} cy={48} r={36} />

                                                    <polyline id="Line" stroke="#04B800" strokeWidth={4} strokeLinecap="round" points="34.188562 49.6867496 44 59.3734993 63.1968462 40.3594229" />
                                                </g>
                                            </g>
                                        </svg>
                                        <figcaption className="my-3">
                                            <h4>Track Your Order</h4>
                                        </figcaption>
                                    </figure>
                                    <ul className="steps-wrap mx-auto" style={{ maxWidth: '800px' }}>
                                        <li className="step active">
                                            <span className="icon">1</span>
                                            <span className="text">Order Placed</span>
                                        </li>

                                        <li className={tracking.RiderAccept == true ? "step active" : "step"}>
                                            <span className="icon">2</span>
                                            <span className="text">Accepted By Rider</span>
                                        </li>
                                        <li className={tracking.ProcessByPartner == true ? "step active" : "step"}>
                                            <span className="icon">3</span>
                                            <span className="text">Processing</span>
                                        </li>
                                        <li className={tracking.RiderCollected == true ? "step active" : "step"}>
                                            <span className="icon">4</span>
                                            <span className="text">Collect By Rider</span>
                                        </li>
                                        <li className={tracking.DeliverToCustomer == true ? "step active laststep" : "step"}>
                                            <span className="icon">5</span>
                                            <span className="text">Delivered</span>
                                        </li>
                                    </ul>
                                    <br />
                                </div>
                            </article>

                        </main>
                        <aside className="col-lg-4">

                            <article className="card">
                                <div className="card-body">
                                    <h5 className="card-title"> Details </h5>
                                    <figure className="itemside mb-3">
                                        <div className="aside">
                                            <span className="icon-sm text-primary bg-primary-light rounded"><i className="fa fa-map-signs" /></span>
                                        </div>
                                        <figcaption className="info lh-sm">
                                            <strong>Order ID: {"E0" + orderData["orderid"]}</strong> <br />
                                            <span className="text-muted">{orderData["orderdate"]}</span>
                                        </figcaption>
                                    </figure>
                                    <dl className="dlist-align">
                                        <dt>Rider Name :</dt>
                                        <dd>{orderData["ridername"]}</dd>
                                    </dl>
                                    <dl className="dlist-align mb-3">
                                        <dt>Rider Contact :</dt>
                                        <dd >{orderData["ridercontact"]}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                        <dt className="text-danger">Payable Amount :</dt>
                                        <dd className="text-danger">{"LKR " + orderData["totalPayable"]}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                        <dt className="text-success">Delivery Fee :</dt>
                                        <dd className="text-success">{"LKR " + orderData["deliverytotalprice"]}</dd>
                                    </dl>
                                </div>
                            </article>

                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TrackingPage;