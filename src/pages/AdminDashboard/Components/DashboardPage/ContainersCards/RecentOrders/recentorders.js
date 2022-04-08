

import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

function RegisteredPartners() {
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'Service Name',
        field: 'servicename',
        width: 180,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Service Name',
        },
      },
      {
        label: 'Customer Name',
        field: 'customername',
        width: 200,
      },
      {
        label: 'Order Date',
        field: 'orderdate',
        width: 120,
      },
      {
        label: 'Order Time',
        field: 'ordertime',
        width: 150,
      },

    ],
    rows: [
      {
        servicename: 'Grocery Delivery',
        customername: 'Waidya Sewwandi',
        orderdate: '02/01/2022',
        ordertime: '01.10 PM',
      }, 

      {
        servicename: 'Laundry Service',
        customername: 'Parinda Sathsara',
        orderdate: '02/01/2022',
        ordertime: '08.17 PM',
      }, 

      {
        servicename: 'Medicine Delivery',
        customername: 'Viraj Kavinda',
        orderdate: '02/01/2022',
        ordertime: '10.17 PM',
      }, 

      {
        servicename: 'Grocery Delivery',
        customername: 'Chathuna Samodya',
        orderdate: '02/01/2022',
        ordertime: '11.17 PM',
      }, 

      {
        servicename: 'Stationary Delivery',
        customername: 'Sanju Nimesha',
        orderdate: '02/01/2022',
        ordertime: '12.17 PM',
      }, 

      {
        servicename: 'Medicine Delivery',
        customername: 'Dilishika Fernando',
        orderdate: '02/01/2022',
        ordertime: '12.17 PM',
      }, 

      {
        servicename: 'Stationary Delivery',
        customername: 'Sanju Nimesha',
        orderdate: '02/01/2022',
        ordertime: '12.17 PM',
      }, 
      {
        servicename: 'Stationary Delivery',
        customername: 'Sanju Nimesha',
        orderdate: '02/01/2022',
        ordertime: '12.17 PM',
      }, 
      {
        servicename: 'Stationary Delivery',
        customername: 'Sanju Nimesha',
        orderdate: '02/01/2022',
        ordertime: '12.17 PM',
      }, 

    ],
  });



  return(
    <div className="col-xl-7 mx-auto mt-5">
    <div className="col-md-12 containerbox">
        <div className="containerbox-title">
            <h5>
                Recent Orders
            </h5>
        </div>
        <MDBDataTableV5 hover scrollX maxHeight='300px' data={datatable} searchTop searchBottom={false}/>
    </div>
  </div>
  )

}

export default RegisteredPartners;