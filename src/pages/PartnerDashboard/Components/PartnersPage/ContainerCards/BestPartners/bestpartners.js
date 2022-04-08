import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

function BestPartners() {

  
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'Partner Name',
        field: 'partner',
        width: 160,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Partner Name',
        },
      },
      {
        label: 'Order Count',
        field: 'ordercount',
        width: 150,
      },
      {
        label: 'District',
        field: 'district',
        width: 130,
      },
    ],
    rows: [
      {
        partner: 'Kottu Creed',
        ordercount: '42',
        district: 'Galle',
      }, 
      {
        partner: 'KFC',
        ordercount: '32',
        district: 'Matara',
      },       
      {
        partner: 'Keels',
        ordercount: '21',
        district: 'Galle',
      },       
      {
        partner: 'Cargills',
        ordercount: '39',
        district: 'Hambanthota',
      },       
      {
        partner: 'Asian Printers',
        ordercount: '42',
        district: 'Galle',
      }, 

      
    ],
  });



  return(
    <div className="col-xl-12 mx-auto mt-5">
    <div className="col-md-12 containerbox">
        <div className="containerbox-title">
            <h5>
                Best Partners
            </h5>
        </div>
        <MDBDataTableV5 hover scrollX maxHeight='300px' data={datatable} searchTop searchBottom={false}/>
    </div>
  </div>
  )

}

export default BestPartners;