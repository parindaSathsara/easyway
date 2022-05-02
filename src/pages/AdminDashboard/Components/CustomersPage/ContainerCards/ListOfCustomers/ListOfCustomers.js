import React, { useEffect, useState, useRef, Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './ListOfCustomers.css'
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
function Customers() {


    const [customers, setCustomers] = useState([]); //Customer List State
    const [customersByDate, setCustomersByDate] = useState([]); //Customer List State

    const getCustomers = () => {
        axios.get(`/api/administration/getAllCustomers/`).then(res => {

            if (res.data.status === 200) {
                setCustomers(res.data.customers);
                console.log(res.data.customers);
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
                lookup: {Galle:"Galle",Matara:"Matara",Hambanthota:"Hambanthota"}
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
                            Registered Customers
                        </h5>
                    </div>

                    {/* <MDBDataTableV5 hover scrollX maxHeight='400px' data={data} getValueCheckBox={(val) => console.log(val)} searchTop searchBottom={false} /> */}
                    <MaterialTable
                        title={""}
                        data={data.rows}
                        columns={data.columns}
                        options={{
                            sorting: true, search: true,

                            searchFieldAlignment: "left", searchAutoFocus: true, searchFieldVariant: "standard",
                            filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 10,
                            paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "both", exportButton: true,
                            exportAllData: true, exportFileName: "Services Data", addRowPosition: "first", actionsColumnIndex: -1, 
                            columnsButton: true,
                        }}
                    />
                </div>

            </div>


        </>


    );

}

export default Customers;
