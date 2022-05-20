import React, { useEffect, useState, useRef, Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { MDBDataTableV5 } from 'mdbreact';
import CustomerJoinChart from '../../../../CustomersPage/ContainerCards/CustomerJoinChart/CustomerJoinChart';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Scale, } from 'chart.js';
import { Bar } from 'react-chartjs-2';

const SnackbarType = {
    success: "success",
    fail: "fail",
};
function CustomersReport() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const snackbarRef = useRef(null);
    const snackbarRefActive = useRef(null);

    const pdfExport = useRef(null);

    const handleExport = (e) => {
        pdfExport.current.save();
    }

    const [customers, setCustomers] = useState([]); //Customer List State

    const getCustomers = () => {
        axios.get(`/api/administration/getAllCustomers/`).then(res => {

            if (res.data.status === 200) {
                setCustomers(res.data.customers);
                console.log(res.data.customers);
            }
        })
    }


    const [customersList, setCustomersList] = useState([]);
    const [dates, setDates] = useState([])

    const getCustomersChart = () => {
        axios.get(`/api/administration/getAllCustomers`).then(res => {

            if (res.data.status === 200) {
                res.data.customersByDate.forEach(element => {
                    setDates(oldArray => [...oldArray, element.joineddate]);
                });
                res.data.customersByDate.forEach(element => {
                    setCustomersList(oldArray => [...oldArray, element.CustomerCount]);
                });
            }

        })
    }

    const options = {
        responsive: true,
        plugins: {

            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Customers Daily Joining'
            },
        },
    };

    const labels = dates

    const dataCus = {
        labels,
        datasets: [
            {
                label: 'Customers',
                maxBarThickness: 50,
                data: customersList,
                borderColor: '#001D6E',
                backgroundColor: '#1E3163',
            },
        ],
    };





    const data = {
        columns: [

            {
                label: "Customer Name",
                field: "customername",
            },

            {
                label: "District",
                field: "customerdistrict",
            },
            {
                label: "Customer Contact",
                field: "customercontact",
            },
            {
                label: "Address",
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


    useEffect(() => {
        getCustomers()
        getCustomersChart()
    }, []);



    const PageTemplate = (props) => {
        return (
            <>
                <div
                    style={{
                        position: "absolute",
                        left: "1px",
                        right: "1px",
                        top: "1px"
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
                            <h6 className='mt-5'>
                                Customer Visiting Chart
                            </h6>
                            <Bar options={options} data={dataCus} />

                            <h6 className='mt-5'>
                                List of Customers
                            </h6>
                            <MDBDataTableV5 hover paging={false} searchTop searchBottom={false} data={data} btn={false} info={true} />
                        </PDFExport>
                    </div>
                    <button onClick={handleExport} className="btn btn-primary mt-4">Generate Report</button>
                </div>

            </div>
        </>


    );

}

export default CustomersReport;
