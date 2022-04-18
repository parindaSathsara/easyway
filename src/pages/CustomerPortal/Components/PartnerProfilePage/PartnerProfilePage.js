import { useEffect, useState } from "react";
import CustomerNavBar from "../NavBar/NavBar";
import TopHeadingNav from "../TopHeadingNav/TopHeadingNav";
import CustomerNavBarBreadCrumb from "../NavBarBreadCrumb/NavBarBreadCrumb"
import { useHistory, useParams } from 'react-router-dom';
import axios from "axios";

function PartnerProfilePage() {

    const { id } = useParams()

    const[partnerData,setPartnerData]=useState([])

    
    useEffect(() => {
        import(`../../MasterPage/css/boostrap.css`)
        import(`../../MasterPage/css/ui.css`)
        import(`../../MasterPage/css/responsive.css`)


        axios.get(`/api/partners/getPartners/${id}`).then(res => {

            if (res.data.status === 200) {
                setPartnerData(res.data.partners[0]);

                console.log(res.data.partners)
            }
        })


    }, [id])

    return (
        <>
        <CustomerNavBar></CustomerNavBar>
        <CustomerNavBarBreadCrumb></CustomerNavBarBreadCrumb>
            <section class="padding-y">
                <div class="container">
                    <div className="card">
                        <header className="card-img-top overflow-hidden bg-cover" style={{ backgroundImage: 'url("../images/banners/bg-cafe.jpg")' }}>
                            <div className="card-body bg-dark-50">
                                <div className="d-lg-flex align-items-end">
                                    <div className="itemside mt-lg-5 flex-auto">
                                        <div className="aside">
                                            <img src="../images/brands/cafe-logo3.jpg" className="img-md rounded-3" width={96} height={96} />
                                        </div>
                                        <div className="info">
                                            <p className="text-white">Moscow city</p>
                                            <h3 className="text-white">McDonalds Moscow</h3>
                                            <p className="text-white-50">National food of Uzbekistan and European foods, luxury interior</p>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 mt-3">
                                        <span className="btn btn-sm btn-gray"> <i className="fa fa-truck" /> 15-20 min, $7</span>
                                        <span className="btn btn-sm btn-warning"> <i className="fa fa-star" /> 4.7 </span>
                                        <a className="btn btn-sm btn-outline-light" href="#"> More info </a>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <div className="row g-0">

                            <main className="col-lg-12">
                                <div className="content-body">
                                    <h5 className="card-title">Recommended</h5>
                                    <article className="row mb-3">
                                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12">
                                            <img className="rounded w-100 obj-cover mb-3" height={140} src="../images/items/food1.jpg" />
                                        </div>
                                        <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12">
                                            <a href="#" className="btn btn-outline-primary float-end"> Add this</a>
                                            <h6 className="title">Asian Beef Pilav</h6>
                                            <div className="price-wrap mb-2">
                                                <span className="price">$18.90</span>
                                            </div>
                                            <p className="text-muted" style={{ maxWidth: '600px' }}>Uzbek pilav cooked with chicken meat, carrot and other ingredients and some other descriptions Juicy, tender, succulent chicken</p>
                                        </div>
                                    </article>
                                    <article className="row mb-3">
                                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12">
                                            <img className="rounded w-100 obj-cover mb-3" height={140} src="../images/items/food2.jpg" />
                                        </div>
                                        <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12">
                                            <a href="#" className="btn btn-outline-primary float-end"> Add this</a>
                                            <h6 className="title">Chicken Pizza </h6>
                                            <div className="price-wrap mb-2">
                                                <span className="price">$7.90</span>
                                                <del className="text-muted"> $12.90</del>
                                                <span className="ms-2 text-danger"> 15% off </span>
                                            </div>
                                            <p className="text-muted" style={{ maxWidth: '600px' }}>Juicy, tender, succulent chicken strips. Served with a choice of house made dips chicken meat and rice, carrot and other ingredients</p>
                                        </div>
                                    </article>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}

export default PartnerProfilePage;