import React, { useEffect, useState, useRef, Component } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import './Progress.css'
import axios from 'axios';
import MaterialTable from "material-table";
import { alpha } from '@material-ui/core/styles';
import { render } from '@testing-library/react';


function AccountProgress() {

    const [accountTracking, setAccountTracking] = useState([]);

    const [tracking, setTracking] = useState({
        accCreated: true,
        docSubmitted: false,
        docAccepted: false,
        sellingActivated: false
    })


    useEffect(() => {
        axios.get(`/api/partners/getPartners/${localStorage.getItem("PartnerID")}`).then(res => {
            if (res.data.status === 200) {
                console.log(res.data.partners)

                if (res.data.partners[0]['accountstatus'] == "AccountCreated") {
                    setTracking({ ...tracking, accCreated: true, docSubmitted: false, docAccepted: false, sellingActivated: false });
                }
                else if (res.data.partners[0]['accountstatus'] == "DocumentsSubmitted") {
                    setTracking({ ...tracking, accCreated: true, docSubmitted: true, docAccepted: false, sellingActivated: false });
                }
                else if (res.data.partners[0]['accountstatus'] == "DocumentsApproved") {
                    setTracking({ ...tracking, accCreated: true, docSubmitted: true, docAccepted: true, sellingActivated: false });
                }
                else if (res.data.partners[0]['accountstatus'] == "ReadyToSelll") {
                    setTracking({ ...tracking, accCreated: true, docSubmitted: true, docAccepted: true, sellingActivated: true });
                }

            }
        })
    }, []);



    return (
        <div className="col-xl-12 mx-auto mt-5">
            <div className="col-md-12 containerbox">
                <div className="containerbox-title">
                    <h5>
                        Account Progress
                    </h5>
                </div>
                {/* <MDBDataTableV5 hover scrollX maxHeight='400px' data={data} getValueCheckBox={(val) => console.log(val)} searchTop searchBottom={false} /> */}
                <div className="card-body trackingCardBody riderAccountTracking">
                    <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                        <div className={tracking.accCreated == true ? 'step completed' : 'step'}>
                            <div className="step-icon-wrap">
                                <div className="step-icon"><i className="fa fa-user"></i></div>
                            </div>
                            <h4 className="step-title">Account Created</h4>
                        </div>
                        <div className={tracking.docSubmitted == true ? 'step completed' : 'step'}>
                            <div className="step-icon-wrap">
                                <div className="step-icon"><i className="fa fa-file-text"></i></div>
                            </div>
                            <h4 className="step-title">Documents Submitted</h4>
                        </div>
                        <div className={tracking.docAccepted == true ? 'step completed' : 'step'}>
                            <div className="step-icon-wrap">
                                <div className="step-icon"><i className="fa fa-book"></i></div>
                            </div>
                            <h4 className="step-title">Documents Accepted</h4>
                        </div>
                        <div className={tracking.sellingActivated == true ? 'step completed' : 'step'}>
                            <div className="step-icon-wrap">
                                <div className="step-icon"><i className="fa fa-check"></i></div>
                            </div>
                            <h4 className="step-title">Ready To Ride</h4>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    );

}

export default AccountProgress;
