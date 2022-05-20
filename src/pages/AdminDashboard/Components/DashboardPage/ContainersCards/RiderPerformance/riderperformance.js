

import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import MaterialTable from 'material-table';
import axios from 'axios';

function RiderPerformance() {

  const [ordersList, setOrders] = useState([
    {
      ridername:"Parinda Sathsara",
      jobcount:"2",
      district:"Galle",
    },
    {
      ridername:"Viraj Kavinda",
      jobcount:"1",
      district:"Galle",
    },
    {
      ridername:"Chinthaka Sampath",
      jobcount:"2",
      district:"Hambantota",
    }
  ]);



  const getOrdersList = () => {
    // axios.get('/api/administration/getRecentOrders').then(res => {

    //   if (res.data.status === 200) {
    //     setOrders(res.data.orders);
    //     console.log(res.data.orders)
    //   }
    //   console.log("first");

    // })
  }

  useEffect(() => {
    getOrdersList();
  }, []);

  




  const data = {
    columns: [
      {
        title: "Rider Name",
        field: "ridername",
      },
      {
        title: "Job Count",
        field: "jobcount",
      },

    ],

    rows: ordersList.map(ordersdata => {
      return {
        ridername: ordersdata.ridername,
        jobcount: ordersdata.jobcount,
      }
    }),
  };


  return (
    <div className="col-xl-5 mx-auto mt-5">
      <div className="col-md-12 containerbox">
        <div className="containerbox-title">
          <h5>
            Rider Performance
          </h5>
        </div>

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
  )

}

export default RiderPerformance;