import React, { useEffect, useState, useRef, Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './BestCustomers.css'
import axios from 'axios';
import MaterialTable from "material-table";
import { alpha } from '@material-ui/core/styles';
import { render } from '@testing-library/react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import Snackbar from '../../../../../SnackBar/Snackbar';


const SnackbarType = {
    success: "success",
    fail: "fail",
};
function BestCustomers() {

    const [customers, setCustomers] = useState([]); //Customer List State
    const [customersByDate, setCustomersByDate] = useState([]); //Customer List State

    const getCustomers = () => {
        axios.get(`/api/administration/getAllCustomers/`).then(res => {

            if (res.data.status === 200) {
                setCustomers(res.data.bestCustomers);
                console.log(res.data.bestCustomers);
            }
        })
    }

    useEffect(() => {
        getCustomers()
    }, []);


    const data = {
        columns: [


            {
                title: "Customer Name",
                field: "customername",
            },

            {
                title: "Customer District",
                field: "customerdistrict",
                lookup: { Galle: "Galle", Matara: "Matara", Hambanthota: "Hambanthota" }
            },
            {
                title: "Customer Contact",
                field: "customercontact",
            },
            {
                title: "Customer Home Address",
                field: "customerhomeaddress",
            },


        ],

        rows: customers.map(customer => {
            return {

                customername: customer.customername,
                customerdistrict: customer.customerdistrict,
                customercontact: customer.customercontact,
                customerhomeaddress: customer.customerhomeaddress,
            }
        }),
    };


    return (
        <>

            <div className="col-xl-12 mx-auto mt-5">
                <div className="col-md-12 containerbox">
                    <div className="containerbox-title">
                        <h5>
                            Best Customers (This Week)
                        </h5>
                    </div>

                    {/* <MDBDataTableV5 hover scrollX maxHeight='400px' data={data} getValueCheckBox={(val) => console.log(val)} searchTop searchBottom={false} /> */}

                    <div class="row">
                        {customers.map((customer, index) => (
                            <div class="col-sm-6 mb-4">
                                <div className="card" style={{ borderRadius: '15px' }}>
                                    <div className="card-body p-4">
                                        <div className="d-flex text-black">
                                            <div className="flex-shrink-0">
                                                <img src={customer.profilepic} alt="Generic placeholder image" className="img-fluid" style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '10px' }} />
                                            </div>
                                            <div className="flex-grow-1 ms-3 ml-4">
                                                <h5 className="mb-1">{customer.customername} {index == 0 ? <i class="fa fa-star ml-2" style={{fontSize:18,color:'orange'}} aria-hidden="true"></i> : <></>}</h5>
                                                <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>{customer.customerdistrict}</p>
                                                <div className="d-flex justify-content-start rounded-3 p-2 mb-2">
                                                    <div>
                                                        <p className="small text-muted mb-1">Orders</p>
                                                        <p className="mb-0">{customer.OrdersCount}</p>
                                                    </div>
                                                    <div className="px-4">
                                                        <p className="small text-danger mb-1">Amount</p>
                                                        <p className="mb-0 text-danger">{"LKR " + customer.TotalPrice}</p>
                                                    </div>

                                                </div>
                                                <div className="d-flex pt-1">
                                                    <button type="button" className="btn btn-outline-dark me-1 flex-grow-1"><i class="fa fa-gift mr-2" aria-hidden="true"></i> Give Coupons</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}


                        

                    </div>
                </div>

            </div>


        </>


    );

}

export default BestCustomers;
