import './NewListedServices.css'
import { useEffect, useState } from 'react'
import axios from 'axios';

function NewListedServices() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        getListings();
    }, []);

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
            <section class="padding-top" style={{paddingTop:75}}>
                <div class="container">

                    <header class="section-heading">
                        <h4 class="section-title">Recent Listed Services</h4>
                    </header>

                    <div class="row">
                        {listings.map((listingsDet) => (
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <figure className="card card-product-grid">
                                    <a href="#" className="img-wrap listingImageView">
                                        <img className='imgListing' src={listingsDet['listingimageurl']} />
                                    </a>
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
                    </div>
                </div>
            </section>
        </>
    );
}


export default NewListedServices;