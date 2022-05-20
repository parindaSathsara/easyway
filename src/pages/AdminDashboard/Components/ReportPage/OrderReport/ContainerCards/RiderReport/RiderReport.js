import React, { useEffect, useState, useRef, Component } from 'react';

import './CustomersReport.css'
import axios from 'axios';
import MaterialTable from "material-table";
import { alpha } from '@material-ui/core/styles';
import { render } from '@testing-library/react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import Snackbar from '../../../../../../SnackBar/Snackbar';
import { PDFExport } from '@progress/kendo-react-pdf';
import header from '../../../../../../../assets/images/header.jpg'
import footer from '../../../../../../../assets/images/footer.jpg'

import { MDBDataTableV5 } from 'mdbreact';

const SnackbarType = {
    success: "success",
    fail: "fail",
};
function CustomersReport() {
    const snackbarRef = useRef(null);
    const snackbarRefActive = useRef(null);

    const pdfExport = useRef(null);

    const handleExport = (e) => {
        pdfExport.current.save();
    }


    const [partnersData, setPartnersData] = useState([])


    const data = {
        columns: [

            {
                label: "Rider Name",
                field: "partnername",
            },

            {
                label: "Contact Number",
                field: "contactnumber",
            },
            {
                label: "District",
                field: "district",
            },
            {
                label: "District",
                field: "district",
            },
        ],

        rows: partnersData.map(partner => {
            return {
                partnername: partner.partnername,
                contactnumber: partner.contactnumber,
                district: partner.district,

            }
        }),
    };


    useEffect(() => {
        getPartners();
    }, []);

    const getPartners = () => {
        axios.get('/api/partners/getAllPartners').then(res => {

            if (res.data.status === 200) {
                setPartnersData(res.data.partners);
            }

        })
    }


    const PageTemplate = (props) => {
        return (
            <>
                <div
                    style={{
                        position: "absolute",
                        left: "1px",
                        right: "1px",
                        top:"1px"
                    }}
                >

                    <img src={header} width={"100%"}></img>

                </div>
                <div
                    style={{
                        position: "absolute",
                        bottom: "40px",
                        right: "40px",
                    }}
                >

                    Page {props.pageNum} of {props.totalPages}
                </div>

                <div
                    style={{
                        position: "absolute",
                        bottom: "1px",
                        left: "1px",
                        right: "1px"
                    }}
                >
                    <img src={footer} width={"100%"}></img>

                </div>
            </>

        );
    };


    return (
        <>
            <Snackbar
                ref={snackbarRef}
                message="Listing Deleted Successfully !"
                type={SnackbarType.success}
            />

            <Snackbar
                ref={snackbarRefActive}
                message="Listing Activated Successfully !"
                type={SnackbarType.success}
            />
            <div className="col-xl-6 mx-auto mt-5">
                <div className="col-md-12 containerbox">
                    <div className="containerbox-title">
                        <h5>
                            Generate List of Customers Report
                        </h5>
                    </div>

                    <div style={{ height: "500px", overflow: "scroll", overflowX: "hidden" }}>
                        <PDFExport scale={0.8} ref={pdfExport} margin={{ top: "50mm", left: "10mm", right: "10mm", bottom: "30mm" }} paperSize={"A4"} pageTemplate={PageTemplate}>
                            <h6>
                                List of Customers
                            </h6>
                            <MDBDataTableV5 hover paging={false} searchTop searchBottom={false} data={data} btn={false} info={true} />
                        </PDFExport>
                    </div>
                    <button onClick={handleExport} className="btn btn-primary">Generate Report</button>
                </div>

            </div>
        </>


    );

}

export default CustomersReport;
