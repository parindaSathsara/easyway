import React from 'react';
import './registeredPartners.css'
import { MDBDataTableV5 } from 'mdbreact';
import { useEffect, useState, useRef, Component } from 'react';
import MaterialTable from "material-table";
import axios from 'axios';

function RegisteredPartners() {

  const [partnersData, setPartnersData] = useState([])


  const data = {
    columns: [

      {
        title: "Partner Name",
        field: "partnername",
      },

      {
        title: "Contact Number",
        field: "contactnumber",
      },
      {
        title: "District",
        field: "district",
        lookup: {Galle:"Galle",Matara:"Matara",Hambanthota:"Hambanthota"},
      },

      {
        title: "Account Status",
        field: "accountstatus",
        lookup: {DocumentsSubmitted:"Documents Submitted",DocumentsApproved:"Documents Approved",ReadyToSell:"Ready To Sell"},
        render: partner => 
          partner.accountstatus == 'DocumentsSubmitted' ?
            < span class="badge bg-warning " > Documents Submitted</span > :
            partner.accountstatus == 'DocumentsApproved' ? < span class="badge bg-secondary" > Documents Approved</span >:
            < span class="badge bg-primary text-light" > Account Ready </span >        
      },
    ],

    rows: partnersData.map(partner => {
      return {
        partnername: partner.partnername,
        contactnumber: partner.contactnumber,
        district: partner.district,
        accountstatus: partner.accountstatus,

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

export default RegisteredPartners;