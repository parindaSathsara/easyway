import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';

import { Link } from 'react-router-dom';
import Snackbar from '../../../../../SnackBar/Snackbar';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { getDistance } from 'geolib';

const SnackbarType = {
    success: "success",
    fail: "fail",
};

function AcceptedOrders() {

    const [ordersList, setOrders] = useState([]);
    const [orderData, setOrderData] = useState([]);

    const snackbarRef = useRef(null);
    const snackbarRefErr = useRef(null);

    const [pickupDetails, setPickupDetails] = useState({
        totaldistance: '',
        totalprice: ''
    })

    const [totalPayable, setTotalPayable] = useState(0.00)
    const [totalDistanceBetween, setTotalDistanceBetween] = useState(0.00)

    const getOrdersList = () => {
        axios.get(`/api/riders/getOrdersNotCollected/${localStorage.getItem("RiderID")}`).then(res => {

            if (res.data.status === 200) {
                setOrders(res.data.acceptedOrders);
                console.log(res.data.acceptedOrders)
            }
        })
    }

    useEffect(() => {
        getOrdersList();
    }, []);

    const handleApproveButtonOnClick = (e) => {
        console.log(e.target.value)

        axios.get(`/api/riders/getOrderByID/${e.target.value}`).then(res => {

            console.log("Order ID-" + e.target.value)

            if (res.data.status == 200) {
                setOrderData(res.data.acceptedOrders[0])
                console.log(res.data.acceptedOrders[0])


                var customerlatlan = res.data.acceptedOrders[0]['customerlatlan'].split(',')
                var partnerlatlan = res.data.acceptedOrders[0]['partnerlatlon'].split(',')

                var location = getDistance(
                    { latitude: customerlatlan[0], longitude: customerlatlan[1] },
                    { latitude: partnerlatlan[0], longitude: partnerlatlan[1] }
                );




                var finalDistance = Math.round(location / 1000)

                setTotalDistanceBetween(finalDistance);


                var finalDelivery;


                if (finalDistance <= 10) {
                    finalDelivery = finalDistance * 50
                    setPickupDetails({ ...pickupDetails, totalprice: finalDistance * 50 });
                }
                else if (finalDistance > 10 && finalDistance <= 30) {
                    finalDelivery = finalDistance * 30
                    setPickupDetails({ ...pickupDetails, totalprice: finalDistance * 30 });
                }
                else if (finalDistance > 30 && finalDistance < 60) {
                    finalDelivery = finalDistance * 20
                    setPickupDetails({ ...pickupDetails, totalprice: finalDistance * 20 });
                }


                if (res.data.acceptedOrders[0]["paymentoption"] == "CashOnDelivery") {

                    setTotalPayable(parseFloat(res.data.acceptedOrders[0]["totalprice"]) + parseFloat(finalDelivery))
                }
                else {
                    setTotalPayable(finalDelivery)
                }
            }
            else {
                console.log("NoData")
            }
        })
    }


    const onOrderCollect = (e) => {

        const orderDataToDB = {
            orderid: e.target.value,
            orderstatus: "RiderCollected"
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/deliveryjob/updateDeliveryStatus', orderDataToDB).then(res => {

                if (res.data.status === 200) {
                    snackbarRef.current.show();
                    getOrdersList();
                }
                else {
                    snackbarRefErr.current.show();
                    console.log(res.data.validator_errors)
                }
            });
        });

    }




    const data = {
        columns: [
            {
                title: "Customer Name",
                field: "cusname",
            },
            {
                title: "Contact Number",
                field: "contact",
            },
            {
                title: "Service Name",
                field: "servicename",
            },
            {
                title: '',
                field: 'orderid',
                render: order =>
                    <button className='btn btn-info text-light' data-toggle="modal" data-target="#riderJobAccept" style={{ fontSize: 14 }} value={order.orderid} onClick={handleApproveButtonOnClick}>
                        <i class="fa fa-hand-rock-o" aria-hidden="true" style={{ marginRight: 8 }}></i>Collect Order</button>
            },
        ],

        rows: ordersList.map(ordersdata => {
            return {
                orderid: ordersdata.orderid,
                cusname: ordersdata.customername,
                servicename: ordersdata.servicename,
                address: ordersdata.address,
                contact: ordersdata.contactnumber,
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

            <div className="col-xl-6 mx-auto mt-5">
                <div className="col-md-12 containerbox">
                    <div className="containerbox-title">
                        <h5>
                            Accepted Orders
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



            <div class="modal fade" id="riderJobAccept" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-md" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="exampleModalLongTitle">Collect Order</h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <main className="col-lg-12">

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="row gx-8">
                                                <div className="col-lg-12 m-01 mb-3">
                                                    <figure className="text-lg-center mt-3">
                                                        <div className='frame-square'>
                                                            <img className="img-lg mb-3 rounded" src={orderData["listingimageurl"] ? orderData["listingimageurl"] : "https://www.survivorsuk.org/wp-content/uploads/2017/01/no-image.jpg"} alt="User Photo" />
                                                        </div>

                                                        <h6 className='mt-3'>{orderData["listingtitle"] == null ? "" : orderData["listingtitle"]}</h6>
                                                    </figure>
                                                </div>
                                                <div className="col-lg-12 mb-4">
                                                    <label className="form-label">Partner Name</label>
                                                    <input className="form-control" type="text" name='ridername' value={orderData["partnername"]} disabled />
                                                </div>

                                                <div className="col-lg-12">
                                                    <label className="form-label">Partner Address</label>
                                                </div>
                                                <div className="input-group col-lg-12 mb-3">
                                                    <input type="text" className="form-control" value={orderData["partneraddress"]} aria-describedby="basic-addon2" />
                                                    <div className="input-group-append">
                                                        <Link type="button" class="btn btn-light" to={{ pathname: `http://www.google.com/maps/dir/${orderData["partnerlatlon"]}` }} target="_blank"><i class="fa fa-map appendBtn" aria-hidden="true"></i></Link>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <label className="form-label">Customer Address</label>
                                                </div>
                                                <div className="input-group col-lg-12 mb-3">
                                                    <input type="text" className="form-control" value={orderData["orderaddress"]} aria-describedby="basic-addon2" />
                                                    <div className="input-group-append">
                                                        <Link type="button" class="btn btn-light" to={{ pathname: `http://www.google.com/maps/dir/${orderData["customerlatlan"]}` }} target="_blank"><i class="fa fa-map appendBtn" aria-hidden="true"></i></Link>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <label className="form-label">Directions</label>
                                                </div>
                                                <div className="input-group col-lg-12 mb-3">
                                                    <input type="text" className="form-control" value={"Get Directions"} aria-describedby="basic-addon2" />
                                                    <div className="input-group-append">
                                                        <Link type="button" class="btn btn-light" to={{ pathname: `http://www.google.com/maps/dir/${orderData["partnerlatlon"]}/${orderData["customerlatlan"]}` }} target="_blank"><i class="fa fa-map appendBtn" aria-hidden="true"></i></Link>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 mb-3 accountUpdate">
                                                    <label className="form-label">Estimate Delivery Time</label>
                                                    <input className="form-control" type="text" name='estimatetime' value={orderData["estimatetime"]} />
                                                </div>
                                                <div className="col-lg-12 mb-3 accountUpdate">
                                                    <label className="form-label">Estimate Delivery Date</label>
                                                    <input className="form-control" type="text" name='estimatedate' value={orderData["estimatedate"]} />
                                                </div>


                                                <div className="col-lg-12 mb-3 accountUpdate">
                                                    <label className="form-label">Price</label>
                                                    <input className="form-control" type="text" name='price' value={"LKR " + orderData["totalprice"]} disabled />
                                                </div>

                                                <div className="col-lg-12 mb-3 accountUpdate">
                                                    <label className="form-label">Delivery Charge</label>
                                                    <input className="form-control" type="text" name='price' value={"LKR " + pickupDetails["totalprice"]} disabled />
                                                </div>
                                                <div className="col-lg-12 mb-3 accountUpdate">
                                                    <label className="form-label mr-2">Total Amount Payable:</label>
                                                    <label className="text-danger h5">{"LKR " + totalPayable + ".00"}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-dark" data-dismiss="modal" value={orderData['orderid']} onClick={onOrderCollect}>Collect Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default AcceptedOrders;