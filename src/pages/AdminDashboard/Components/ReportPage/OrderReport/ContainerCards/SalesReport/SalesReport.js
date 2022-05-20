import React, { useEffect, useRef, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import MaterialTable from 'material-table';
import axios from 'axios';
import header from '../../../../../../../assets/images/header.jpg'
import footer from '../../../../../../../assets/images/footer.jpg'
import { PDFExport } from '@progress/kendo-react-pdf';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';


function SalesReportAdmin() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const [dates, setDates] = useState([]);
    const [totalSales, setTotalSales] = useState([]);

    const [ordersListAll, setAllOrders] = useState([]);

    const [ordersList, setOrders] = useState([]);
    const [ordersListLastMonth, setOrdersLastMonth] = useState([]);
    const [ordersToday, setOrdersToday] = useState([]);

    const [lastMonthTotSales, setLastMonthTotSales] = useState([]);
    const [todayTotSales, setTodayTotSales] = useState([]);

    const pdfExport = useRef(null);
    const pdfExport2 = useRef(null);
    const pdfExport3 = useRef(null);

    const handleExport = (e) => {
        pdfExport.current.save();
    }
    const handleExport2 = (e) => {
        pdfExport2.current.save();
    }
    const handleExport3 = (e) => {
        pdfExport3.current.save();
    }

    const getOrdersListAdmin = () => {
        axios.get(`/api/partners/getPartnerSales/${localStorage.getItem("PartnerID")}`).then(res => {

            if (res.data.status === 200) {
                setOrders(res.data.orders);

                res.data.orders.forEach(element => {
                    setDates(oldArray => [...oldArray, element.orderdate]);
                });
                res.data.orders.forEach(element => {
                    setTotalSales(oldArray => [...oldArray, element.totalprice]);
                });
            }
            console.log("first");

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
                        top: "1px"
                    }}
                >

                    <img src={header} width={"100%"}></img>

                </div>
                <div
                    style={{
                        position: "absolute",
                        bottom: "40px",
                        right: "40px"
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




    const getOrdersList = () => {
        axios.get("/api/administration/getOrdersAll/").then(res => {
            if (res.data.status === 200) {
                setAllOrders(res.data.orders)
                setOrdersLastMonth(res.data.ordersLastMonth)
                setOrdersToday(res.data.ordersToday)

            }
        })
    }

    useEffect(() => {
        getOrdersList();
        getOrdersListAdmin();
    }, []);


    const options = {
        responsive: true,
        plugins: {

            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Services Sales'
            },
        },
    };


    const labels = dates

    const dataChart = {
        labels,
        datasets: [
            {
                label: 'Sales',
                lineTension: 0.5,
                data: totalSales,
                borderColor: '#FFB600',
                backgroundColor: '#FFB600',
            },
        ],
    };


    const data = {
        columns: [
            {
                label: "Customer Name",
                field: "cusname",
            },
            {
                label: "Order Date",
                field: "orderdate",
            },


            {
                label: "Service Name",
                field: "servicename",
            },

            {
                label: "Sales",
                field: "sales",
            },
        ],

        rows: ordersListAll.map(ordersdata => {
            return {
                cusname: ordersdata.customername,
                servicename: ordersdata.servicename,
                orderdate: ordersdata.orderdate,
                sales: ordersdata.totalprice,
            }
        }),
    };




    const dataLastMonth = {
        columns: [
            {
                label: "Customer Name",
                field: "cusname",
            },
            {
                label: "Order Date",
                field: "orderdate",
            },


            {
                label: "Service Name",
                field: "servicename",
            },

            {
                label: "Sales",
                field: "sales",
            },
        ],

        rows: ordersListLastMonth.map(ordersdata => {
            return {
                cusname: ordersdata.customername,
                servicename: ordersdata.servicename,
                orderdate: ordersdata.orderdate,
                sales: ordersdata.totalprice,
            }
        }),
    };



    const dataToday = {
        columns: [
            {
                label: "Customer Name",
                field: "cusname",
            },
            {
                label: "Order Date",
                field: "orderdate",
            },


            {
                label: "Service Name",
                field: "servicename",
            },

            {
                label: "Sales",
                field: "sales",
            },
        ],

        rows: ordersToday.map(ordersdata => {
            return {
                cusname: ordersdata.customername,
                servicename: ordersdata.servicename,
                orderdate: ordersdata.orderdate,
                sales: ordersdata.totalprice,
            }
        }),
    };


    return (
        <>
            <div className="col-xl-12 mx-auto mt-5">
                <div className="col-md-12 containerbox">
                    <div className="containerbox-title">
                        <h5>
                            Sales (Last 12 Months)
                        </h5>
                    </div>
                    <div style={{ height: "500px", overflow: "scroll", overflowX: "hidden" }}>
                        <PDFExport scale={0.8} ref={pdfExport2} margin={{ top: "50mm", left: "10mm", right: "10mm", bottom: "30mm" }} paperSize={"A4"} pageTemplate={PageTemplate}>
                            <h6>
                                Sales (Last 12 Months)
                            </h6>
                            <MDBDataTableV5 hover paging={false} searchTop searchBottom={false} data={data} btn={false} info={true} />
                        </PDFExport>
                    </div>
                    <button onClick={handleExport2} className="btn btn-primary mt-4">Generate Report</button>

                </div>
            </div>

            <div className="col-xl-6 mx-auto mt-5">
                <div className="col-md-12 containerbox">
                    <div className="containerbox-title">
                        <h5>
                            Sales(Today)
                        </h5>
                    </div>
                    <div style={{ height: "500px", overflow: "scroll", overflowX: "hidden" }}>
                        <PDFExport scale={0.8} ref={pdfExport} margin={{ top: "50mm", left: "10mm", right: "10mm", bottom: "30mm" }} paperSize={"A4"} pageTemplate={PageTemplate}>

                            <h6>
                                Today Sales
                            </h6>
                            <MDBDataTableV5 hover paging={false} searchTop searchBottom={false} data={dataToday} btn={false} info={true} />
                        </PDFExport>
                    </div>
                    <button onClick={handleExport} className="btn btn-primary">Generate Report</button>

                </div>
            </div>

            <div className="col-xl-6 mx-auto mt-5">
                <div className="col-md-12 containerbox">
                    <div className="containerbox-title">
                        <h5>
                            Sales(Last 31 Days)
                        </h5>
                    </div>

                    <div style={{ height: "500px", overflow: "scroll", overflowX: "hidden" }}>
                        <PDFExport scale={0.8} ref={pdfExport3} margin={{ top: "50mm", left: "10mm", right: "10mm", bottom: "30mm" }} paperSize={"A4"} pageTemplate={PageTemplate}>
                            <div className="containerbox-title">
                                <h5>
                                    Sales Line Chart
                                </h5>
                            </div>
                            <Line options={options} data={dataChart} />

                            <br></br>

                            <h6>
                                Sales (Last 31 Months)
                            </h6>
                            <MDBDataTableV5 hover paging={false} searchTop searchBottom={false} data={dataLastMonth} btn={false} info={true} />
                        </PDFExport>
                    </div>
                    <button onClick={handleExport3} className="btn btn-primary mt-4">Generate Report</button>

                </div>
            </div>
        </>

    )

}

export default SalesReportAdmin;