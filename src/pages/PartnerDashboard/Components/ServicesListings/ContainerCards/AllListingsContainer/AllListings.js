import React, { useEffect, useState, useRef, Component } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import MaterialTable from "material-table";
import { alpha } from '@material-ui/core/styles';


function AllListings() {


    const data = {
        columns: [
            {
                title: "Service Name",
                field: "servicename",
            },

            {
                title: "Service Type",
                field: "servicetype",
                lookup: { MainService: "Main Service", OtherService: "Other Service" }
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


    return (
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
    );

}

export default ServiceMaster;
