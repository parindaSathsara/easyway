import React, { useEffect, useState, useRef, Component } from 'react';
import { useHistory } from 'react-router-dom';
import './services.css';
import servicesvalidation from './servicesvalidation';
import axios from 'axios';
import { MDBDataTableV5 } from 'mdbreact';
import Snackbar from '../../../../../SnackBar/Snackbar';
import MaterialTable from "material-table";
import { alpha } from '@material-ui/core/styles';


const SnackbarType = {
    success: "success",
    fail: "fail",
};


function Services() {

    const history = useHistory();

    const snackbarRef = useRef(null);
    const snackbarRefErr = useRef(null);

    useEffect(() => {
        getServicesList();
    }, []);

    const getServicesList = () => {
        axios.get('/api/getservices').then(res => {

            if (res.data.status === 200) {
                setServicesList(res.data.services);
            }
            console.log("first");

        })
    }

    const [serviceslist, setServicesList] = useState([]); //Services List State

    const [services, setServices] = useState({
        serviceid:'',
        servicename: '',
        servicetype: '',
        servicedescription: '',
    }); // Services Add State

    const handleInput = (e) => {
        setServices({ ...services, [e.target.name]: e.target.value });
    }


    const updateService = async (e) => {
        axios.post('api/updateService', services).then(res => {

            if (res.data.status === 200) {
                console.log(res.data.message);
                getServicesList();

            }

            else {
                console.log("Error");
            }

        });
    }

    const deleteService = async(e)=>{
        console.log(services.serviceid);
        axios.post('api/deleteService',{'serviceid':services.serviceid}).then(res=>{
            if(res.data.status===200){
                console.log(res.data.services);
                getServicesList();
            }

            else {
                console.log("Error");
            }
        });
    }


    const addService = async (e) => {
        e.preventDefault();

        const dataset = {
            servicename: services.servicename,
            servicetype: services.servicetype,
            servicedescription: services.servicedescription
        }


        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/addService', dataset).then(res => {

                if (res.data.status === 200) {
                    console.log(res.data.message);
                    getServicesList();
                    snackbarRef.current.show();
                }

                else {
                    console.log(res.data.validator_errors);
                    snackbarRefErr.current.show();
                }

            });
        });
    }

    //Data Table
    const data = {
        columns: [
            {
                title: "Service Name",
                field: "servicename",
            },

            {
                title: "Service Type",
                field: "servicetype",
                lookup: {MainService:"Main Service",OtherService:"Other Service"}
            },
            {
                title: "Service Description",
                field: "servicedescription",
                
            },
        ],

        rows: serviceslist.map(servicesdata => {
            return {
                serviceid: servicesdata.serviceid,
                servicename: servicesdata.servicename,
                servicetype: servicesdata.servicetype,
                servicedescription: servicesdata.servicedescription,

            }
        }),
    };



    return (

        <div className="col-xl-12 mx-auto mt-4">
            <div className="col-md-12 containerbox">
                <Snackbar
                    ref={snackbarRef}
                    message="Service Added Successfully!"
                    type={SnackbarType.success}
                />
                <Snackbar
                    ref={snackbarRefErr}
                    message="Error While Adding Service. Please Try Again."
                    type={SnackbarType.fail}
                />

                <div className="containerbox-title">
                    <h5>
                        Add Service
                    </h5>
                </div>

                <form id="serviceAddForm" onSubmit={addService}>
                    <div className="form-group">
                        <label>Service Name</label>
                        <input type="text" className="form-control dashboardInputField" id="servicename" name="servicename" onChange={handleInput} value={services.servicename}></input>
                        <span className="error" id="serviceName"></span>
                    </div>

                    <div className="form-group">
                        <label>Service Type</label>
                        
                        <select className="form-control dashboardInputField" id="servicetype" name="servicetype" onChange={handleInput} value={services.servicetype}>
                            <option value={"MainService"}>Main Service</option>
                            <option value={"OtherService"}>Other Service</option>
                        </select>
                        <span className="error" id="serviceType"></span>
                    </div>

                    <div className="form-group">
                        <label>Service Description</label>
                        <textarea type="text" className="form-control dashboardInputField" id="servicedescription" name="servicedescription" onChange={handleInput} value={services.servicedescription}></textarea>
                        <span className="error" id="serviceDescription"></span>
                    </div>

                    <br></br>
                    <button type="submit" className="btn btn-primary">Add Service</button>
                </form>
            </div>

            <br></br>

            <div className="col-md-12 containerbox">
                <div className="containerbox-title">
                    <h5>
                        List of Services
                    </h5>
                </div>
                {/* <MDBDataTableV5 hover scrollX maxHeight='400px' data={data} getValueCheckBox={(val) => console.log(val)} searchTop searchBottom={false} /> */}
                <MaterialTable
                    title={""}
                    data={data.rows}
                    columns={data.columns}
                    editable={{

                        onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {

                            
                            services.serviceid=oldRow['serviceid'];
                            services.servicename=newRow['servicename'];
                            services.servicetype=newRow['servicetype'];
                            services.servicedescription=newRow['servicedescription'];

                            updateService();
                            setTimeout(() => resolve(), 500)
                        }),
                        onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                            services.serviceid=selectedRow['serviceid'];
                            deleteService();
                            setTimeout(() => resolve(), 500)
                        }),
                    }}
                    onSelectionChange={(selectedRows) => console.log(selectedRows)}
                    options={{
                        sorting: true, search: true,
                        
                        searchFieldAlignment: "left", searchAutoFocus: true, searchFieldVariant: "standard",
                        filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 5,
                        paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "both", exportButton: true,
                        exportAllData: true, exportFileName: "Services Data", addRowPosition: "first", actionsColumnIndex: -1, selection: true,
                        showSelectAllCheckbox: false, showTextRowsSelected: false, selectionProps: rowData => ({
                            disabled: rowData.serviceid == null,
                            // color:"primary"
                        }),
                        columnsButton: true,
                    }}
                />
            </div>
        </div>
    );
}

export default Services;