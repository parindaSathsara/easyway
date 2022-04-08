import React from 'react';
import '../containercards.css'
import { MDBDataTableV5 } from 'mdbreact';

function RiderPerformance() {
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'Rider Name',
        field: 'ridername',
        width: 160,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Rider Name',
        },
      },
      {
        label: 'Job Count',
        field: 'jobcount',
        width: 120,
      },
      {
        label: 'District',
        field: 'district',
        width: 130,
      },
    ],
    rows: [
      {
        ridername: 'Parinda Sathsara',
        jobcount: '42',
        district: 'Galle',
      }, 
      {
        ridername: 'Waidya Sewwandi',
        jobcount: '56',
        district: 'Matara',
      }, 
      {
        ridername: 'Viraj Kavinda',
        jobcount: '32',
        district: 'Galle',
      }, 
      {
        ridername: 'Chathuna Samodya',
        jobcount: '21',
        district: 'Hambanthota',
      }, 

      {
        ridername: 'Yovin Paranawithana',
        jobcount: '32',
        district: 'Galle',
      }, 
      {
        ridername: 'Sanju Nimesha',
        jobcount: '37',
        district: 'Matara',
      }, 
      
    ],
  });



  return(
    <div className="col-xl-5 mx-auto mt-5">
    <div className="col-md-12 containerbox">
        <div className="containerbox-title">
            <h5>
                Rider Performance
            </h5>
        </div>
        <MDBDataTableV5 hover scrollX maxHeight='300px' data={datatable} searchTop searchBottom={false}/>
    </div>
  </div>
  )

}

export default RiderPerformance;