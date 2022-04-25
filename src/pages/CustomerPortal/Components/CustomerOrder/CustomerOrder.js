import { useEffect, useState } from 'react';
import './CustomerOrder.css'
import axios from 'axios'
import CustomerNavBarBreadCrumb from '../NavBarBreadCrumb/NavBarBreadCrumb';
import NavigatorCus from '../Navigator/Navigator';
import NavigationHeader from '../NavigationHeader/NavigationHeader';
import CustomerNavBar from '../NavBar/NavBar';
import TopHeadingNav from '../TopHeadingNav/TopHeadingNav';


function CustomerOrder() {

    const [cartListings, setCartListings] = useState([])
    const [cartVarListings, setCartVarListings] = useState([])
    const [totPrice, setTotPrice] = useState(0.00)

    const [discountPrice, setDiscountPrice] = useState(0.00)
    const [cartItemCount, setCartItemCount] = useState(0.00)

    const [orderData, setOrderData] = useState({
        customerid: localStorage.getItem("customerid"),
        orderstatus: 'OrderPlaced',
        remark: '',
        orderdate: '',
        ordertime: '',
        fullname: '',
        contactnumber: '',
        address: '',
        district: '',
        city: '',
        paymentoption: ''
    })


    const getCart = () => {
        axios.get(`/api/customers/getCarts/${localStorage.getItem("customerid")}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data.fixedListings)
                setCartListings(res.data.fixedListings)
                setCartVarListings(res.data.variationListings)
                setTotPrice(res.data.cartprice)

            }

        })
    }

    const handleInput = (e) => {
        console.log(e.target.value)
    }


    const handleOnSubmit = (e) => {

        const passingData = {
            customerid: orderData.customerid,
            orderstatus: orderData.orderstatus,
            remark: orderData.remark,
            price: totPrice,
            orderdate: '',
            ordertime: '',
            fullname: '',
            contactnumber: '',
            address: '',
            district: '',
            city: '',
            paymentoption: '',
            listings: cartListings,
            varListings: cartVarListings,
        }


        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/customers/registerCustomer', orderData).then(res => {

                if (res.data.status === 200) {
                    // console.log(userData)
                    // console.log("Done Updated")
                    // setProgress(100)
                    // snackbarRef.current.show();
                }

                else {
                    // snackbarRefErr.current.show();
                    // console.log(res.data.validator_errors);
                    // console.log(res.data.status)
                }

            });
        });

    }


    useEffect(() => {
        import(`../../MasterPage/css/boostrap.css`)
        import(`../../MasterPage/css/ui.css`)
        import(`../../MasterPage/css/responsive.css`)

        getCart()

    }, []);


    return (
        <>
            <TopHeadingNav></TopHeadingNav>
            <CustomerNavBar></CustomerNavBar>
            <CustomerNavBarBreadCrumb></CustomerNavBarBreadCrumb>
            <section class="padding-y">
                <div class="container">
                    <div className="row">
                        <main className="col-lg-8">
                            <article className="card">
                                <div className="card-body">
                                    <form onSubmit={handleOnSubmit}>
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
                                                <label className="form-label">Distict*</label>
                                                <select className="form-select" id="district*" aria-label="District*" name='district' onChange={handleInput}>
                                                    <option disabled>Select City</option>
                                                    <option value={"Galle"}>Galle</option>
                                                    <option value={"Matara"}>Matara</option>
                                                    <option value={"Hambanthota"}>Hambanthota</option>
                                                </select>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <label className="form-label">City*</label>
                                                <select className="form-select" id="city*" aria-label="City*" name='city' onChange={handleInput}>
                                                    <option disabled>Select City</option>
                                                    <option value={"Galle"}>Galle</option>
                                                    <option value={"Wakwella"}>Wakwella</option>
                                                    <option value={"Kalegana"}>Kalegana</option>
                                                </select>
                                            </div>
                                            <div className="col-sm-12 mb-4">
                                                <label className="form-label">Remarks</label>
                                                <input type="text" className="form-control" placeholder="Type Additional Informations" name='remark' onChange={handleInput} />
                                            </div>
                                        </div>
                                        <label className="form-check mb-5">
                                            <input className="form-check-input" type="checkbox" defaultValue />
                                            <span className="form-check-label"> Save this address </span>
                                        </label>

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
                                        <button className="btn btn-primary">Continue</button>
                                        <button className="btn btn-light">Cancel </button>
                                    </form>
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
                                    <dl className="dlist-align">
                                        <dt>Delivery Fee:</dt>
                                        <dd className="text-end text-danger">+ LKR 0</dd>
                                    </dl>
                                    <hr />
                                    <dl className="dlist-align">
                                        <dt>Total:</dt>
                                        <dd className="text-end text-dark h5">{"LKR " + totPrice} </dd>
                                    </dl>
                                    <div className="d-grid gap-2 my-3">
                                        {/* <NavLink to="#" className="btn btn-primary w-100"> Make Purchase </NavLink> */}
                                        <a href="#" className="btn btn-light w-100"> Back to shop </a>
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
                </div>
            </section>
        </>

    );

}


export default CustomerOrder;