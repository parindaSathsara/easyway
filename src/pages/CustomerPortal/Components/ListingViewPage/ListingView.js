import CustomerNavBar from "../NavBar/NavBar";
import './ListingView.css'

import CustomerNavBarBreadCrumb from "../NavBarBreadCrumb/NavBarBreadCrumb";
import CustomerNavBarSecondary from "../NavBarSecondary/NavBarSecondary";
import { useHistory, useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { Markup } from 'interweave';
import FSPreLoader from "../../../FSPreLoader/FSPreLoader";
import NavigationHeader from "../NavigationHeader/NavigationHeader";
import NewListedServices from "../NewListedServices/NewListedServices";
import TopHeadingNav from "../TopHeadingNav/TopHeadingNav";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Snackbar from "../../../SnackBar/Snackbar";


const SnackbarType = {
    success: "success",
    fail: "fail",
  };

function ListingView() {

    const { id } = useParams()
    const [listingImages, setListingImages] = useState([])

    const [listing, setListing] = useState({})

    const [listingVariations, setListingVariations] = useState([])
    const [variationTitle, setVariationTitle] = useState([])
    const [listingPrice, setListingPrice] = useState()
    const [finalListingPrice, setFinalListingPrice] = useState()
    const [preloader, setPreLoader] = useState(true)
    const [variationId,setVariationId]=useState()

    const [quantity, setQuantity] = useState(1)


    const [listingType, setListingType] = useState()

    const snackbarRef = useRef(null);
    const snackbarRefErr = useRef(null);
  


    const incrementNumber = (e) => {
        var qty = quantity + 1
        var totPrice = qty * listingPrice
        setQuantity(qty)
        setFinalListingPrice(totPrice)
    }

    const decrementNumber = (e) => {

        if (quantity != 0 && quantity != 1) {
            var qty = quantity - 1
            var totPrice = qty * listingPrice
            setQuantity(qty)

            setFinalListingPrice(totPrice)
        }

    }



    const variationTypeOnChange = (e) => {
        console.log(e.target.value)

        var index = e.target.value

        setVariationId(listingVariations[index]['variationid'])
        setListingPrice(listingVariations[index]['variationprice'])
        setFinalListingPrice(listingVariations[index]['variationprice'])
        setQuantity(1)
    }



    useEffect(() => {
        import(`../../MasterPage/css/boostrap.css`)
        import(`../../MasterPage/css/ui.css`)
        import(`../../MasterPage/css/responsive.css`)

        setTimeout(
            () => setPreLoader(false),
            3000
        );

        const getListings = () => {
            axios.get(`/api/partners/getListingsImages/${id}`).then(res => {

                if (res.data.status === 200) {
                    setListingImages(res.data.listings);

                    console.log(res.data.listings[0]['listingimageurl']);
                }
            })

            axios.get(`/api/partners/getListingsByID/${id}`).then(res => {

                if (res.data.status === 200) {
                    setListing(res.data.listings[0]);

                    if (res.data.listingtype == "Variation") {
                        setListingType("Variation")
                        setListingVariations(res.data.listingvariations)
                        setVariationTitle(res.data.listingvariations[0]['variationtitle'])
                        setListingPrice(res.data.listings[0]['listingprice'])
                        setFinalListingPrice(res.data.listings[0]['listingprice'])
                    }
                    else {
                        setListingType("Fixed")
                        setListingPrice(res.data.listings[0]['listingprice'])
                        setFinalListingPrice(res.data.listings[0]['listingprice'])
                    }


                    console.log(res.data.listings[0]);
                }
            })
        }

        getListings();


    }, [id]);



    const onClick = (e) => {
        e.preventDefault();
        console.log(listing)
    }


    const onAddToCart = (e) => {
        confirmAlert({
            title: 'Add To Cart ?',
            message: 'Are you sure you want to add this listing to your cart?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {

                        const cartData = {
                            userid: localStorage.getItem("customerid"),
                            listingid: listing['listingid'],
                            listingtype: listing['listingtype']=="Variation"?variationId:listing['listingtype'],
                            quantity: quantity,
                            totalprice: finalListingPrice,
                            status: "NotPurchased"
                        }

                        console.log(cartData)

                        axios.post('api/customers/addToCart', cartData).then(res => {
                            if (res.data.status === 200) {
                                snackbarRef.current.show();
                            }
                            else {
                                snackbarRefErr.current.show();
                                console.log(res.data.validator_errors);
                            }
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => console.log("No")
                }
            ]
        })
    }



    return (
        <div>
            <div style={preloader == true ? { display: 'block' } : { display: 'none' }}>

                <FSPreLoader></FSPreLoader>

            </div>
            <TopHeadingNav></TopHeadingNav>
            <CustomerNavBar></CustomerNavBar>
            <CustomerNavBarBreadCrumb></CustomerNavBarBreadCrumb>

            <Snackbar
                ref={snackbarRef}
                message="Listing Added To Cart Successfully !"
                type={SnackbarType.success}
            />

            <Snackbar
                ref={snackbarRefErr}
                message="Listing Added To Cart Unsuccessfully !"
                type={SnackbarType.fail}
            />

            <section className="padding-y">
                <div className="container">
                    <div className="row">
                        <aside class="col-lg-5">
                            <article class="gallery-wrap">
                                <AliceCarousel autoPlay autoPlayInterval="3000">
                                    {listingImages.map((images) => (
                                        <img src={images['listingimageurl']} height='560' className="sliderimg" />
                                    ))}
                                </AliceCarousel>
                            </article>
                        </aside>
                        <main className="col-lg-7 listingDetails">
                            <article className="ps-lg-3">
                                <h4 className="text-dark">{listing['listingtitle']}</h4>
                                <h6 className="text-warning" style={{ fontWeight: 500 }}>{listing['servicename']}</h6>

                                <br></br>

                                <div className="row mb-4" >
                                    <div className="col-md-4 col-6 mb-2" style={listingType == "Fixed" ? { display: "none" } : { display: "block" }}>
                                        <label className="form-label">{variationTitle}</label>
                                        <select className="form-select" onChange={variationTypeOnChange}>
                                            <option selected disabled>Select Variation</option>
                                            {listingVariations.map((variations, index) => (
                                                <option value={index}>{variations['variationname']}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-4 col-6 mb-3">
                                        <label className="form-label d-block">Quantity</label>
                                        <div className="input-group input-spinner">
                                            <button className="btn btn-icon btn-light btnQty" type="button" onClick={decrementNumber}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="#999" viewBox="0 0 24 24">
                                                    <path d="M19 13H5v-2h14v2z" />
                                                </svg>
                                            </button>
                                            <input value={quantity} className="form-control text-center textQty" placeholder contentEditable={false} />
                                            <button className="btn btn-icon btn-light" type="button" onClick={incrementNumber}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="#999" viewBox="0 0 24 24">
                                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                <label className="form-label h5">Price</label>
                                <div className="mb-3">
                                    <span className="text-warning h3">LKR  </span>
                                    <var className="price h3">{finalListingPrice + "/="}</var>

                                </div>

                                <hr />
                                <button href="#" className="btn  btn-warning" onClick={onClick}> Order now </button>
                                <button href="#" className="btn  btn-primary" onClick={onAddToCart}> <i className="me-1 fa fa-shopping-basket" /> Add to cart </button>
                                <a href="#" className="btn  btn-light"> <i className="me-1 fa fa-heart" /> Save </a>
                            </article>
                        </main>
                    </div>
                </div>
            </section>


            <section className="padding-y border-top">

                <div className="container">
                    <article className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">About Service Provider</h5>
                            <figure className="itemside mb-4">
                                <div className="asideFrame">
                                    <img src={listing['profilepic']} className="img-sm img-thumbnail" />
                                </div>
                                <figcaption className="info">
                                    <h6 className="title mt-1" style={{ color: '#000f61' }}>{listing['partnername']}</h6>
                                    <p style={{ color: '#ff5e00' }}>{listing['district'] + " District"}</p>
                                    <p>{listing['servicename']}</p>
                                </figcaption>
                            </figure>

                            <p>
                                {listing['description']}
                            </p>
                            <div className="d-flex mb-2 col-12" style={{ paddingLeft: 0 }}>
                                <button className="btn w-20 btn-primary" type="button"> <i className="me-2 fa fa-phone" /> Contact</button>
                                <button className="btn w-20 btn-dark" type="button"> <i className="me-2 fa fa-comment-dots" /> Visit Store</button>
                            </div>
                        </div>
                    </article>



                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <header className="card-header">
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <li className="nav-item">
                                            <a href="#" data-bs-target="#tab_specs" data-bs-toggle="tab" className="nav-link active">Service Description</a>
                                        </li>
                                    </ul>
                                </header>
                                <div className="tab-content listingContent">
                                    <Markup content={listing['listingdescription']} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                </div>
            </section>


            <div className='contenteliments'>
                <div className='container-fluid footer'>
                    <img src={require('../../../../assets/images/logo.png')} className='footerLogo'></img>
                    <img src={require('../../../../assets/images/fbinsta.png')} className='footersocial'></img>
                </div>
            </div>

            <div>

            </div>

        </div>

    );
}


export default ListingView;