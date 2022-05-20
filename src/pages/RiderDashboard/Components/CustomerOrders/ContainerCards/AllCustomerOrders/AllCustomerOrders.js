import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import './AllCustomerOrders.css';
import { Link } from 'react-router-dom';
import Snackbar from '../../../../../SnackBar/Snackbar';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const SnackbarType = {
    success: "success",
    fail: "fail",
};

function AllCustomerOrders() {

    const [ordersList, setOrders] = useState([]);
    const [orderData, setOrderData] = useState([]);

    const snackbarRef = useRef(null);
    const snackbarRefErr = useRef(null);

    const [pickupDetails, setPickupDetails] = useState({
        estimatetime: '',
        estimatedate: '',
        totaldistance: '',
        totalprice: ''
    })

    const [totalPayable, setTotalPayable] = useState(0.00)
    const [totalDistanceBetween, setTotalDistanceBetween] = useState(0.00)

    const getOrdersList = () => {
        axios.get(`/api/riders/getAllRiderOrders/${localStorage.getItem("RiderID")}`).then(res => {

            if (res.data.status === 200) {
                setOrders(res.data.allOrders);
                console.log(res.data.allOrders)
            }
        })
    }

    useEffect(() => {
        getOrdersList();
    }, []);



    const inputOnChange = (e) => {
        setPickupDetails({ ...pickupDetails, [e.target.name]: e.target.value });
    }


    const data = {
        columns: [
            {
                title: "Customer Name",
                field: "cusname",
            },

            {
                title: "Total Price",
                field: "totalprice",
            },

            {
                title: "Status",
                field: "orderstatus",
                render: ordersdata =>
                    ordersdata.orderstatus == 'RiderAccept' ?
                        < span class="badge bg-warning " >Accepted</span > :
                        ordersdata.orderstatus == 'RiderCollected' ? <span class="badge bg-secondary" >Collected</span > :
                            ordersdata.orderstatus == 'OrderProcessing' ? < span class="badge bg-primary text-light" > Processing </span > :
                                < span class="badge bg-primary text-light" > Delivered </span >
            },

        ],

        rows: ordersList.map(ordersdata => {
            return {

                cusname: ordersdata.customername,
                orderstatus: ordersdata.orderstatus,
                totalprice: "LKR "+ordersdata.deliverytotalprice
            }
        }),
    };



    return (
        <>

            <Snackbar
                ref={snackbarRef}
                message="Delivery Job Added Successfully!"
                type={SnackbarType.success}
            />
            <Snackbar
                ref={snackbarRefErr}
                message="Delivery Job Added Unsuccessfully!"
                type={SnackbarType.fail}
            />

            <div className="col-xl-12 mx-auto mt-5">
                <div className="col-md-12 containerbox">
                    <div className="containerbox-title">
                        <h5>
                            All Orders
                        </h5>
                    </div>
                    {/* <MDBDataTableV5 hover scrollX maxHeight='400px' data={data} gtValueCheckBox={(val) => console.log(val)} searchTop searchBottom={false} /> */}
                    <div>
                        <MaterialTable
                            title={""}
                            data={data.rows}
                            columns={data.columns}
                            options={{
                                sorting: true, search: true,
                                searchFieldAlignment: "left", searchAutoFocus: true, searchFieldVariant: "standard",
                                filtering: false, paging: true, pageSizeOptions: [5, 10, 20, 25, 50, 100], pageSize: 5,
                                paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "both", exportButton: true,
                                exportAllData: true, exportFileName: "Services Data", addRowPosition: "first", actionsColumnIndex: -1, selection: false,
                                showSelectAllCheckbox: false, showTextRowsSelected: false, selectionProps: rowData => ({
                                    disabled: rowData.serviceid == null,
                                    // color:"primary"
                                }),
                                columnsButton: true,
                            }}
                        />
                    </div>

                </div>
            </div>
        </>

    );
}

export default AllCustomerOrders;