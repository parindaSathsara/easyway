import { useEffect, useState } from "react";
import CustomerNavBar from "../NavBar/NavBar";
import TopHeadingNav from "../TopHeadingNav/TopHeadingNav";
import CustomerNavBarBreadCrumb from "../NavBarBreadCrumb/NavBarBreadCrumb"
import { NavLink, useHistory, useParams } from 'react-router-dom';
import axios from "axios";
import './PartnerProfilePage.css'

function PartnerProfilePage() {

    const { id } = useParams()

    const [partnerData, setPartnerData] = useState([])
    const [listingData, setListingData] = useState([])

    useEffect(() => {
        import(`../../MasterPage/css/boostrap.css`)
        import(`../../MasterPage/css/ui.css`)
        import(`../../MasterPage/css/responsive.css`)

        axios.get(`/api/partners/getListingsByPartnerID/${id}`).then(res => {
            if (res.data.status == 200) {
                setListingData(res.data.listings)
                console.log(res.data.listings[0])
            }
            else {
                console.log("NoData")
            }
        })

        axios.get(`/api/partners/getPartners/${id}`).then(res => {

            if (res.data.status == 200) {
                setPartnerData(res.data.partners[0])
                console.log(res.data.partners[0])
            }
            else {
                console.log("NoData")
            }
        })

    }, [id]);

    return (
        <>
            <CustomerNavBar></CustomerNavBar>
            <CustomerNavBarBreadCrumb></CustomerNavBarBreadCrumb>

            <section className="padding-y">
                <div className="container">
                    <div className="card">
                        <header className="card-img-top overflow-hidden bg-cover" style={{ backgroundImage: `url(${partnerData['profilepic']})` }}>
                            <div className="card-body bg-dark-50">
                                <div className="d-lg-flex align-items-end">
                                    <div className="itemside mt-lg-5 flex-auto">
                                        <div className="aside">
                                            <img src={partnerData['profilepic']} className="img-md rounded-3" width={96} height={96} />
                                        </div>
                                        <div className="info">
                                            <p className="text-white">{partnerData['district'] + ' District'}</p>
                                            <h3 className="text-white">{partnerData['partnername']}</h3>
                                            <p className="text-white-50">{partnerData['description']}</p>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 mt-3">
                                        <span className="btn btn-sm btn-success mr-3"> <i className="fa fa-clock mr-2" />{partnerData['servicestarttime'] + '-' + partnerData['serviceendtime']}</span>
                                        {partnerData['servicestatus'] == 'Closed' ? <span className="btn btn-sm btn-danger"><i className="fa fa-star mr-2" />{partnerData['servicestatus']}
                                        </span> : <span className="btn btn-sm btn-dark"><i className="fa fa-star mr-2" />{partnerData['servicestatus']}
                                        </span>}

                                    </div>
                                </div>
                            </div>
                        </header>


                        <div className="row g-0">
                            <main className="col-lg-12">
                                <div className="content-body">
                                    <h4 className="card-title">Recommended</h4>
                                    <article className="row mb-3">
                                        {listingData.map((listingsDet) => (
                                            <div className="col-lg-3 col-md-3 col-sm-3">
                                                <figure className="card card-product-grid">
                                                    <NavLink to={`/customerportal/${listingsDet.listingid}`} className="img-wrap listingImageView">
                                                        <img className='imgListing' src={listingsDet['listingimageurl']} />
                                                    </NavLink>
                                                    <figcaption className="info-wrap border-top">
                                                        <a href="#" className="title text-truncate listingTitleText">{listingsDet['listingtitle']}</a><br></br>
                                                        <label className="lblServiceName">{listingsDet['servicename']}</label>
                                                        <div className="price-wrap">
                                                            <span className="price" style={{ fontSize: 20, fontWeight: 600 }}>{"LKR " + listingsDet['listingprice']}</span>
                                                        </div>
                                                        <small className="text-muted">{listingsDet['partnername']}</small>

                                                    </figcaption>
                                                </figure>
                                            </div>
                                        ))}
                                    </article> {/* itemside .// */}
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