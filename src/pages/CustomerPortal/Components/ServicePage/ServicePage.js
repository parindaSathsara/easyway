import { useEffect, useState } from "react";
import CustomerNavBar from "../NavBar/NavBar";
import TopHeadingNav from "../TopHeadingNav/TopHeadingNav";
import CustomerNavBarBreadCrumb from "../NavBarBreadCrumb/NavBarBreadCrumb"
import { NavLink, useHistory, useParams } from 'react-router-dom';
import axios from "axios";
import './ServicePage.css'
import SquareListing from "../SquareListing/SquareListing";
import FSPreLoader from "../../../FSPreLoader/FSPreLoader";
import NavigatorCus from "../Navigator/Navigator";

function ServicePageCustomer() {

    const { id } = useParams()

    const [partnerData, setPartnerData] = useState([])
    const [listingData, setListingData] = useState([])
    const [preloader, setPreLoader] = useState(true)
    useEffect(() => {
        import(`../../MasterPage/css/boostrap.css`)
        import(`../../MasterPage/css/ui.css`)
        import(`../../MasterPage/css/responsive.css`)

        axios.get(`/api/administration/getListingsByServiceID/${id}`).then(res => {
            if (res.data.status == 200) {
                setListingData(res.data.listings)
                console.log(res.data.listings[0])

            }
            else {
                console.log("NoData")
            }
        })

        axios.get(`/api/services/getServices/${id}`).then(res => {

            if (res.data.status == 200) {
                setPartnerData(res.data.service[0])
                console.log(res.data.service[0])
                setTimeout(
                    () => setPreLoader(false),
                    1500
                );
            }
            else {
                console.log("NoData")
            }
        })



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
                    <div className="card">

                        <div className="itemside mt-lg-5 flex-auto">

                            <div className="info">
                                <h4 className="text-dark ml-2">{partnerData['servicename']}</h4>
                                <h6 className="text-warning-50 ml-2">{partnerData['servicedescription']}</h6>
                            </div>
                        </div>


                        <div className="row g-0">
                            <main className="col-lg-12">
                                <div className="content-body">
                                    <article className="row mb-3">
                                        {listingData.map((listingsDet) => (
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

export default ServicePageCustomer;