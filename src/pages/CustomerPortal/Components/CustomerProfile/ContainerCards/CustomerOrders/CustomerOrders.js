import { useEffect, useState, useRef } from "react";
import './CustomerOrders.css'
import UserSignFooter from "../../../UserSignHeader/UserFooter";
import UserSignHeaders from "../../../UserSignHeader/UserSignHeader";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Snackbar from "../../../../../SnackBar/Snackbar";
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import routes from "../../../../../../routes/routes";

const SnackbarType = {
    success: "success",
    fail: "fail",
};


function CustomerOrders() {

    const history = useHistory();
    const snackbarRefErr = useRef(null);
    const [formData, setFormData] = useState({
        'customeremail': '',
        'customerpassword': '',
    })


    const [ordersList, setOrders] = useState([]);



    const getOrdersList = () => {
        axios.get(`/api/customers/getCustomerOrdersByID/${localStorage.getItem("customerid")}`).then(res => {

            if (res.data.status === 200) {
                setOrders(res.data.orders)
                console.log(res.data.orders)
            }

        })
    }

    useEffect(() => {
        getOrdersList()
    }, []);


    return (

        <>
            <Snackbar
                ref={snackbarRefErr}
                message="Invalid Credentials !"
                type={SnackbarType.fail}
            />

                {ordersList.map((order) => (

                    <article className="card mb-3">
                        <div className="card-body">
                            <header className="d-md-flex">
                                <div className="flex-grow-1">
                                    <h6 className="mb-0">
                                        Order ID {"E0" + order.orderid} <i className="dot mr-2" /><span className="text-danger">
                                            {order.orderstatus == 'ProcessByPartner' ? 'Processing' :
                                                order.orderstatus == 'RiderAccept' ? 'Rider Accepted' :
                                                    order.orderstatus == 'OrderPlaced' ? 'Order Placed By Me' :
                                                        order.orderstatus == 'DeliverToCustomer' ? 'Delivered' :
                                                            order.orderstatus == 'RiderCollected' ? 'Collected By Rider' : ''}

                                        </span>
                                    </h6>
                                    <span>Date: {order.orderdate}</span>
                                    <br></br>

                                </div>
                                <div>
                                    {order.orderstatus=="OrderPlaced"?<small className="text text-warning">Tracking Will Be Updated<br></br> After Rider Accepted</small>: <NavLink target={"_blank"} to={"/customerportal/ordertracking/"+order["orderid"]} className="btn btn-sm btn-primary">Track Orders</NavLink>}
                                    
                                   
                                </div>
                            </header>
                            <hr />
                            <div className="row">
                                <div className="col-md-4">
                                    <p className="mb-0 text-muted">Contact</p>
                                    <p className="m-0">
                                        {order.fullname} <br /> {order.orderContact} <br /> </p>
                                </div>
                                <div className="col-md-4 border-start">
                                    <p className="mb-0 text-muted">Shipping address</p>
                                    <p className="m-0">{order.district}<br />
                                        {order.orderaddress}</p>
                                </div>
                                <div className="col-md-4 border-start">
                                    <p className="mb-0 text-muted">Payment</p>
                                    <p className="m-0">
                                        <span className="text-success"> {order.paymentoption == "CashOnDelivery" ? "Cash On Delivery" : "Online Payment"} </span> <br />
                                        Delivery fee: {"LKR " + order.deliverytotalprice} <br />
                                        Cost: {"LKR " + order.totalprice}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <ul className="row">

                                <li className="col-lg-12 col-md-6">
                                    <figure className="itemside mb-3">
                                        <div className="aside">
                                            <img width={150} height={150} src={order.listingimageurl} className="img-md rounded border" />
                                        </div>
                                        <figcaption className="info">
                                            <NavLink to={`/customerportal/listing/${order.listingid}`} target="_blank" className="h5 mb-1 mt-2 listingtitlesecondary">{order.listingtitle}</NavLink><br></br>

                                            <strong> {order.quantity + " QTY"} = {"LKR " + order.totalprice} </strong><br></br>
                                            <small>{order.partnername}</small>
                                        </figcaption>
                                    </figure>
                                </li>
                            </ul>
                        </div>
                    </article>


                ))}


        </>

    );
}


export default CustomerOrders;