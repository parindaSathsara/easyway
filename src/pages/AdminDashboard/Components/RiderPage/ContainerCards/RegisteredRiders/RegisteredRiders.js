import React from 'react';
import './RegisteredRiders.css'
import { MDBDataTableV5 } from 'mdbreact';
import { useEffect, useState, useRef, Component } from 'react';
import MaterialTable from "material-table";
import axios from 'axios';

function RegisteredRiders() {

  const [ridersData, setRidersData] = useState([])


  const data = {
    columns: [

      {
        title: "Rider Name",
        field: "ridername",
      },

      {
        title: "Contact Number",
        field: "contactnumber",
      },
      {
        title: "District",
        field: "district",
        lookup: { Galle: "Galle", Matara: "Matara", Hambanthota: "Hambanthota" },
      },

      {
        title: "Account Status",
        field: "accountstatus",
        lookup: { DocumentsSubmitted: "Documents Submitted", DocumentsApproved: "Documents Approved", ReadyToRide: "Ready To Ride" },
        render: rider =>
          rider.accountstatus == 'DocumentsSubmitted' ?
            < span class="badge bg-warning " > Documents Submitted</span > :
            rider.accountstatus == 'DocumentsApproved' ? < span class="badge bg-secondary" > Documents Approved</span > :
              < span class="badge bg-primary text-light" > Account Ready </span >
      },
    ],

    rows: ridersData.map(rider => {
      return {
        ridername: rider.ridername,
        contactnumber: rider.ridercontact,
        district: rider.riderdistrict,
        accountstatus: rider.accountstatus,

      }
    }),
  };


  useEffect(() => {
    getRiders();
  }, []);

  const getRiders = () => {
    axios.get('/api/riders/getAllRiders').then(res => {

      if (res.data.status === 200) {
        setRidersData(res.data.rider);
      }

    })
  }

  return (
    <div className="col-xl-12 mx-auto mt-4">
      <div className="col-md-12 containerbox">
        <div className="containerbox-title">
          <h5>
            Registered Partners
          </h5>
        </div>
        <MaterialTable
          title={""}
          data={data.rows}
          columns={data.columns}
          options={{
            sorting: true, search: true,

            searchFieldAlignment: "left", searchAutoFocus: true, searchFieldVariant: "standard",
            filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 5,
            paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "both", exportButton: true,
            exportAllData: true, exportFileName: "Services Data", addRowPosition: "first", actionsColumnIndex: -1,
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

export default RegisteredRiders;