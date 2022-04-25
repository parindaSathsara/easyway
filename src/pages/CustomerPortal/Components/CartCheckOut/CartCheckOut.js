import { useEffect, useState, useRef } from 'react';
import './CartCheckOut.css'
import axios from 'axios';
import CustomerNavBarBreadCrumb from "../NavBarBreadCrumb/NavBarBreadCrumb";
import TopHeadingNav from "../TopHeadingNav/TopHeadingNav";
import CustomerNavBar from "../NavBar/NavBar";
import Snackbar from "../../../SnackBar/Snackbar";
import { confirmAlert } from 'react-confirm-alert';
import { NavLink } from 'react-router-dom';

const SnackbarType = {
    success: "success",
    fail: "fail",
};



function ChartCheckOut() {

    const [cartListings, setCartListings] = useState([])
    const [cartVarListings, setCartVarListings] = useState([])
    const [totPrice, setTotPrice] = useState(0.00)
    const [discountPrice, setDiscountPrice] = useState(0.00)
    const [cartItemCount,setCartItemCount]=useState(0)

    const snackbarRef = useRef(null);

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

    const deleteCartItem = (id) => {
        console.log(id)

        confirmAlert({
            title: 'Delete Cart Item ?',
            message: 'Are you sure you want to delete this item from cart?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {

                        axios.post(`/api/customers/deleteCart/${id}`).then(res => {

                            if (res.data.status === 200) {
                                snackbarRef.current.show();
                                getCart()
                                getCartCount()
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

    useEffect(() => {
        import(`../../MasterPage/css/boostrap.css`)
        import(`../../MasterPage/css/ui.css`)
        import(`../../MasterPage/css/responsive.css`)

        getCart()
        getCartCount()

    }, [])



    return (
        <>
            <Snackbar
                ref={snackbarRef}
                message="Cart Item Deleted Successfully !"
                type={SnackbarType.success}
            />

            <TopHeadingNav></TopHeadingNav>
            <CustomerNavBar cartItemCount={cartItemCount}></CustomerNavBar>
            <CustomerNavBarBreadCrumb></CustomerNavBarBreadCrumb>
            <section class="padding-y">
                <div class="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title mb-4">Shopping cart</h5>

                                    {cartListings.map((listings) => (
                                        <div>
                                            <article className="row gy-3 mb-4">
                                                <div className="col-lg-6">

                                                    <figure className="itemside  me-lg-5">
                                                        <div className="aside"><img src={listings.listingimageurl} className="img-sm border rounded" /></div>
                                                        <figcaption className="info">
                                                            <a href="#" className="title mb-1 cartTitle">{listings.listingtitle}</a>
                                                            <p className="text-muted small">{listings.partnername}</p>
                                                        </figcaption>
                                                    </figure>
                                                </div>
                                                <div className="col-lg-2 col-sm-4 col-6">
                                                    <div className="price-wrap lh-sm" style={{ textAlign: "center" }}>
                                                        <var className="price h6">QTY</var><br />
                                                        <small className="text-muted">{listings.quantity}</small>
                                                    </div>
                                                </div>
                                                <div className="col-lg-2 col-sm-4 col-6">
                                                    <div className="price-wrap lh-sm">
                                                        <var className="price h6">{"LKR " + listings.totalprice}</var>  <br />
                                                        <small className="text-muted"> {listings.listingprice + "LKR/per unit"} </small>
                                                    </div>
                                                </div>
                                                <div className="col-lg col-sm-4">
                                                    <div className="float-lg-end">
                                                        <button onClick={() => deleteCartItem(listings.cartindex)} className="btn btn-light text-warning"> <i class="fa fa-trash" aria-hidden="true"></i></button>
                                                    </div>
                                                </div>
                                            </article>
                                            <hr></hr>
                                        </div>

                                    ))}


                                    {cartVarListings.map((varListings) => (
                                        <div>
                                            <article className="row gy-3 mb-4">
                                                <div className="col-lg-6">

                                                    <figure className="itemside  me-lg-5">
                                                        <div className="aside"><img src={varListings.listingimageurl} className="img-sm border rounded" /></div>
                                                        <figcaption className="info">
                                                            <a href="#" className="title mb-1 cartTitle">{varListings.listingtitle}</a>
                                                            <p className="text-muted small">{varListings.variationtitle + " - " + varListings.variationname}</p>
                                                            <p className="text-muted small">{varListings.partnername}</p>
                                                        </figcaption>
                                                    </figure>
                                                </div>
                                                <div className="col-lg-2 col-sm-4 col-6">
                                                    <div className="price-wrap lh-sm" style={{ textAlign: "center" }}>
                                                        <var className="price h6">QTY</var><br />
                                                        <small className="text-muted">{varListings.quantity}</small>
                                                    </div>
                                                </div>
                                                <div className="col-lg-2 col-sm-4 col-6">
                                                    <div className="price-wrap lh-sm">
                                                        <var className="price h6">{"LKR " + varListings.totalprice}</var>  <br />
                                                        <small className="text-muted"> {varListings.variationprice + "LKR/per unit"} </small>
                                                    </div>
                                                </div>
                                                <div className="col-lg col-sm-4">
                                                    <div className="float-lg-end">
                                                        <button onClick={() => deleteCartItem(varListings.cartindex)} className="btn btn-light text-warning"> <i class="fa fa-trash" aria-hidden="true"></i></button>
                                                    </div>
                                                </div>
                                            </article>
                                            <hr></hr>
                                        </div>

                                    ))}

                                </div>
                            </div>
                        </div>
                        <aside className="col-lg-4">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <form>
                                        <label className="form-label">Have coupon?</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name placeholder="Coupon code" />
                                            <button className="btn btn-primary">Apply</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
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
                                        <NavLink to="#" className="btn btn-primary w-100"> Make Purchase </NavLink>
                                        <a href="#" className="btn btn-light w-100"> Back to shop </a>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>

    );

}

export default ChartCheckOut;