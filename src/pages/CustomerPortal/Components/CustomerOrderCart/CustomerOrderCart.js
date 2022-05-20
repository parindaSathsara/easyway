import { useEffect, useState, useRef } from 'react';
import './CustomerOrderCart.css'
import axios from 'axios'
import CustomerNavBarBreadCrumb from '../NavBarBreadCrumb/NavBarBreadCrumb';
import NavigatorCus from '../Navigator/Navigator';
import NavigationHeader from '../NavigationHeader/NavigationHeader';
import CustomerNavBar from '../NavBar/NavBar';
import TopHeadingNav from '../TopHeadingNav/TopHeadingNav';
import moment from "moment";
import Snackbar from '../../../SnackBar/Snackbar';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import GooglePlacesAutoComplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { getDistance, getPreciseDistance } from 'geolib';
import FooterCustomer from '../Footer/Footer';


const SnackbarType = {
    success: "success",
    fail: "fail",
};


function CustomerOrderCart() {

    const { id } = useParams()
    const history = useHistory()


    const [cartListings, setCartListings] = useState([])
    const [cartVarListings, setCartVarListings] = useState([])
    const [totPrice, setTotPrice] = useState(0.00)

    const [discountPrice, setDiscountPrice] = useState(0.00)
    const [cartItemCount, setCartItemCount] = useState(0.00)

    const snackbarRef = useRef(null);
    const snackbarRefErr = useRef(null);

    const [orderData, setOrderData] = useState({
        customerid: localStorage.getItem("customerid"),
        orderstatus: 'OrderPlaced',
        remark: '',
        orderdate: moment().format("YYYY-MM-DD"),
        ordertime: moment().format("hh:mm:ss"),
        fullname: '',
        contactnumber: '',
        address: '',
        district: '',
        paymentoption: '',
        customerlatlon: '',
    })


    const [value, setValue] = useState(null);
    const [latlan, setLatLan] = useState(null);

    const [latlanst, setLatLanSt] = useState([])


    const getCart = () => {

        if (id == null) {
            axios.get(`/api/customers/getCarts/${localStorage.getItem("customerid")}`).then(res => {

                if (res.data.status === 200) {

                    setCartListings(res.data.fixedListings)
                    setCartVarListings(res.data.variationListings)
                    setTotPrice(res.data.cartprice)


                    console.log(res.data.variationListings)

                }

            })
        }
        else {
            console.log("NotNull")
            axios.get(`/api/customers/getCartsByID/${id}`).then(res => {

                if (res.data.status === 200) {

                    setCartListings(res.data.fixedListings)
                    setCartVarListings(res.data.variationListings)
                    setTotPrice(res.data.cartprice)


                    console.log(res.data.variationListings)

                }

            })
        }

    }

    const getCartCount = () => {
        axios.get(`/api/customers/getCartItemCount/${localStorage.getItem("customerid")}`).then(res => {

            if (res.data.status == 200) {
                setCartItemCount(res.data.cartCount)
            }
            else {
                console.log("NoData")
            }
        })
    }

    const handleInput = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = (e) => {

        e.preventDefault();
        geocodeByAddress(value['label'])
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                const passingData = {
                    customerid: orderData.customerid,
                    orderstatus: orderData.orderstatus,
                    remark: orderData.remark,
                    orderdate: orderData.orderdate,
                    ordertime: orderData.ordertime,
                    fullname: orderData.fullname,
                    contactnumber: orderData.contactnumber,
                    address: orderData.address,
                    district: orderData.district,
                    paymentoption: orderData.paymentoption,
                    listings: cartListings,
                    varListings: cartVarListings,
                    customerlatlan: lat + "," + lng
                }


                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('api/customers/placeOrder', passingData).then(res => {

                        if (res.data.status === 200) {
                            console.log(passingData)
                            console.log("Done Updated")
                            // setProgress(100)
                            snackbarRef.current.show();

                            setTimeout(() => {
                                history.push('/customerportal')
                            }, 3000);

                            getCart()
                        }

                        else {
                            snackbarRefErr.current.show();
                            console.log(res.data.validator_errors);
                            console.log(res.data.status)
                        }

                    });
                });
            }
            );

    }


    useEffect(() => {
        import(`../../MasterPage/css/boostrap.css`)
        import(`../../MasterPage/css/ui.css`)
        import(`../../MasterPage/css/responsive.css`)

        getCart()
        getCartCount()

    }, []);


    return (
        <>

            <Snackbar
                ref={snackbarRef}
                message="Order Added Successfully !"
                type={SnackbarType.success}
            />

            <Snackbar
                ref={snackbarRefErr}
                message="Order Added Unsuccessfully !"
                type={SnackbarType.fail}
            />
            <TopHeadingNav></TopHeadingNav>
            <CustomerNavBar cartItemCount={cartItemCount}></CustomerNavBar>
            <NavigatorCus></NavigatorCus>
            <section class="padding-y">
                <div class="container">
                    <div className="row">
                        <main className="col-lg-8">
                            <article className="card">
                                <div className="card-body">

                                    <h5 className="card-title mb-5">Contact Info</h5>
                                    <div className="row">
                                        <div className="col-8 mb-4">
                                            <label className="form-label">Deliver To</label>
                                            <input type="text" className="form-control" name='fullname' onChange={handleInput} />
                                        </div>

                                        <div className="col-lg-4 mb-4">
                                            <label className="form-label">Contact Number</label>
                                            <input type="text" className="form-control" name='contactnumber' onChange={handleInput} />
                                        </div>

                                    </div>
                                    <hr className="my-4" />
                                    <h5 className="card-title mb-5"> Shipping info </h5>

                                    <div className="row">
                                        <div className="col-sm-12 mb-4">
                                            <label className="form-label">Address</label>

                                            <input type="text" className="form-control" placeholder="Type Address Here" name='address' onChange={handleInput} />
                                        </div>

                                        <div className="col-sm-6 mb-4">
                                            <label className="form-label">Nearest Location</label>

                                            <GooglePlacesAutoComplete
                                                autocompletionRequest={{
                                                    componentRestrictions: {
                                                        country: ["lk"] //to set the specific country
                                                    }
                                                }}
                                                selectProps={{
                                                    value,
                                                    onChange: setValue,
                                                }}
                                            />
                                        </div>
                                        <div className="col-sm-6 mb-4">
                                            <label className="form-label">Distict*</label>
                                            <select className="form-select" id="district*" aria-label="District*" name='district' onChange={handleInput}>
                                                <option readonly selected>Select District</option>
                                                <option value={"Galle"}>Galle</option>
                                                <option value={"Matara"}>Matara</option>
                                                <option value={"Hambanthota"}>Hambanthota</option>
                                            </select>
                                        </div>

                                        <div className="col-sm-12 mb-4">
                                            <label className="form-label">Remarks</label>
                                            <input type="text" className="form-control" placeholder="Type Additional Informations" name='remark' onChange={handleInput} />
                                        </div>
                                    </div>


                                    <hr className="my-4" />
                                    <h5 className="card-title mb-5"> Payment info </h5>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="box box-check">
                                                <label className="form-check">
                                                    <input className="form-check-input" type="radio" name="paymentoption" value="CashOnDelivery" onChange={handleInput} />
                                                    <b className="border-oncheck" />
                                                    <span className="form-check-label">
                                                        Cash On Delivery<br />
                                                        <small className="text-muted">
                                                            Make cash payment after deliver</small>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-5">
                                            <div className="box box-check">
                                                <label className="form-check">
                                                    <input className="form-check-input" type="radio" name="paymentoption" value="OnlinePayment" onChange={handleInput} />
                                                    <b className="border-oncheck" />
                                                    <span className="form-check-label">
                                                        Online Payment<br />
                                                        <small className="text-muted">
                                                            Make payment using Visa or Master card </small>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </main>
                        <aside className="col-lg-4">

                            <article className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Summary</h5>
                                    <dl className="dlist-align">
                                        <dt>Price:</dt>
                                        <dd className="text-end text-dark h6"> {"LKR " + totPrice}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                        <dt>Discount:</dt>
                                        <dd className="text-end text-success"> - {"LKR " + discountPrice} </dd>
                                    </dl>

                                    <hr />
                                    <dl className="dlist-align">
                                        <dt>Total:</dt>
                                        <dd className="text-end text-dark h5">{"LKR " + totPrice} </dd>
                                    </dl>
                                    <div className="d-grid gap-2 my-3">
                                        {/* <NavLink to="#" className="btn btn-primary w-100"> Make Purchase </NavLink> */}
                                        <button className="btn btn-danger w-100" onClick={handleOnSubmit}>Make Payment</button>
                                        <button className="btn btn-light w-100" onClick={history.goBack}> Back to shop </button>
                                    </div>
                                    <hr />
                                    <h5 className="mb-4">Items in cart</h5>

                                    {cartVarListings.map((listings) => (
                                        <figure className="itemside align-items-center mb-4">
                                            <div className="aside">
                                                <b className="badge bg-dark rounded-pill">{listings.quantity}</b>
                                                <img src={listings.listingimageurl} className="img-sm rounded border" />
                                            </div>
                                            <figcaption className="info">
                                                <a href="#" className="title">{listings.listingtitle}</a>
                                                <div className="price text-muted">{listings.variationtitle + " : " + listings.variationname}</div>
                                                <div className="price text-muted">{"LKR " + listings.totalprice}</div>
                                            </figcaption>
                                        </figure>
                                    ))}

                                    {cartListings.map((listings) => (
                                        <figure className="itemside align-items-center mb-4">
                                            <div className="aside">
                                                <b className="badge bg-dark rounded-pill">{listings.quantity}</b>
                                                <img src={listings.listingimageurl} className="img-sm rounded border" />
                                            </div>
                                            <figcaption className="info">
                                                <a href="#" className="title">{listings.listingtitle}</a>
                                                <div className="price text-muted">{"LKR " + listings.totalprice}</div>
                                            </figcaption>
                                        </figure>
                                    ))}

                                </div>
                            </article>
                        </aside>
                    </div>

                    <br></br>
                </div>

            </section>

            <FooterCustomer></FooterCustomer>
        </>

    );

}


export default CustomerOrderCart;