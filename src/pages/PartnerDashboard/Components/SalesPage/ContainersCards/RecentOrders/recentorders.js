

import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import MaterialTable from 'material-table';
import axios from 'axios';

function RecentOrders() {

  const [ordersList, setOrders] = useState([]);
  const [ordersListLastMonth, setOrdersLastMonth] = useState([]);
  const [ordersToday, setOrdersToday] = useState([]);

  const [lastMonthTotSales, setLastMonthTotSales] = useState([]);
  const [todayTotSales, setTodayTotSales] = useState([]);


  const getOrdersList = () => {
    axios.get(`/api/partners/getRecentOrdersPartners/${localStorage.getItem("PartnerID")}`).then(res => {

      if (res.data.status === 200) {
        setOrders(res.data.orders)
        setOrdersLastMonth(res.data.ordersLastMonth)
        setOrdersToday(res.data.ordersToday)
        setLastMonthTotSales(res.data.lastMonthTotSale)
        setTodayTotSales(res.data.todayTotSale)

        console.log(res.data.lastMonthTotSale[0]['lastMonthTotSales'])
      }
      console.log("first");

    })
  }

  useEffect(() => {
    getOrdersList();
  }, []);






  const data = {
    columns: [
      {
        title: "Customer Name",
        field: "cusname",
      },

      {
        title: "Listing Name",
        field: "listingname",
      },

      {
        title: "Sales",
        field: "sales",
      },
    ],

    rows: ordersList.map(ordersdata => {
      return {
        cusname: ordersdata.customername,
        listingname: ordersdata.listingtitle,
        orderdate: ordersdata.orderdate,
        ordertime: ordersdata.ordertime,
        sales: ordersdata.totalprice,
      }
    }),
  };




  const dataLastMonth = {
    columns: [
      {
        title: "Customer Name",
        field: "cusname",
      },

      {
        title: "Listing Name",
        field: "listingname",
      },

      {
        title: "Sales",
        field: "sales",
      },
    ],

    rows: ordersListLastMonth.map(ordersdata => {
      return {
        cusname: ordersdata.customername,
        listingname: ordersdata.listingtitle,
        orderdate: ordersdata.orderdate,
        ordertime: ordersdata.ordertime,
        sales: ordersdata.totalprice,
      }
    }),
  };



  const dataToday = {
    columns: [
      {
        title: "Customer Name",
        field: "cusname",
      },

      {
        title: "Listing Name",
        field: "listingname",
      },

      {
        title: "Sales",
        field: "sales",
      },
    ],

    rows: ordersToday.map(ordersdata => {
      return {
        cusname: ordersdata.customername,
        listingname: ordersdata.listingtitle,
        orderdate: ordersdata.orderdate,
        ordertime: ordersdata.ordertime,
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
              Sales(Recently)
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
              exportAllData: true, exportFileName: "Partner Recently Sales Data", addRowPosition: "first", actionsColumnIndex: -1, selection: false,
              showSelectAllCheckbox: false, showTextRowsSelected: false, selectionProps: rowData => ({
                disabled: rowData.serviceid == null,
                // color:"primary"
              }),
              columnsButton: true,
            }}
          />
        </div>
      </div>

      <div className="col-xl-6 mx-auto mt-5">
        <div className="col-md-12 containerbox">
          <div className="containerbox-title">
            <h5>
              Sales(Today)
            </h5>
            <h5>

            </h5>
          </div>

          <MaterialTable
            title={""}
            data={dataToday.rows}
            columns={dataToday.columns}
            options={{
              sorting: true, search: true,
              searchFieldAlignment: "left", searchAutoFocus: true, searchFieldVariant: "standard",
              filtering: false, paging: true, pageSizeOptions: [5, 10, 20, 25, 50, 100], pageSize: 5,
              paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "both", exportButton: true,
              exportAllData: true, exportFileName: "Partner Recently Sales Data", addRowPosition: "first", actionsColumnIndex: -1, selection: false,
              showSelectAllCheckbox: false, showTextRowsSelected: false, selectionProps: rowData => ({
                disabled: rowData.serviceid == null,
                // color:"primary"
              }),
              columnsButton: true,
            }}
          />
        </div>
      </div>

      <div className="col-xl-6 mx-auto mt-5">
        <div className="col-md-12 containerbox">
          <div className="containerbox-title">
            <h5>
              Sales(Last 31 Days)
            </h5>
          </div>

          <MaterialTable
            title={""}
            data={dataLastMonth.rows}
            columns={dataLastMonth.columns}
            options={{
              sorting: true, search: true,
              searchFieldAlignment: "left", searchAutoFocus: true, searchFieldVariant: "standard",
              filtering: false, paging: true, pageSizeOptions: [5, 10, 20, 25, 50, 100], pageSize: 5,
              paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "both", exportButton: true,
              exportAllData: true, exportFileName: "Partner Recently Sales Data", addRowPosition: "first", actionsColumnIndex: -1, selection: false,
              showSelectAllCheckbox: false, showTextRowsSelected: false, selectionProps: rowData => ({
                disabled: rowData.serviceid == null,
                // color:"primary"
              }),
              columnsButton: true,
            }}
          />
        </div>
      </div>
    </>

  )

}

export default RecentOrders;