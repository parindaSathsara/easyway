import React from 'react';
import './registeredPartners.css'
import { MDBDataTableV5 } from 'mdbreact';

function RegisteredPartners() {
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'Partner Name',
        field: 'partnername',
        width: 200,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Partner Name',
        },
      },
      {
        label: 'Service',
        field: 'service',
        width: 200,
      },
      {
        label: 'Address',
        field: 'address',
        width: 200,
      },
      {
        label: 'District',
        field: 'district',
        width: 150,
      },
      {
        label: 'Contact Number',
        field: 'contactno',
        width: 200,
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'disabled',
        width: 300,
      },

      {
        label: 'Status',
        field: 'status',
        width: 120,
      },

      {
        label: 'Documents',
        field: 'docs',
        sort: 'disabled',
        width: 100,
      },
      {
        label: 'Edit',
        field: 'edit',
        sort: 'disabled',
        width: 100,
      },
    ],
    rows: [
      {
        partnername: 'KFC',
        service: 'Foods & Beverages',
        address: '10 Wakwella Rd, Galle 80000',
        district: 'Galle',
        contactno: '0912 233 247',
        email: 'kfc@gmail.com',
        status: <span class="badge badge-pill badge-primary">Pending</span>,
        docs: <button className='btn btn-primary'><i className='fa fa-download'></i></button>,
        edit: <button className='btn btn-warning'><i className='fa fa-edit'></i></button>
      },

      {
        partnername: 'Kottu Creed',
        service: 'Foods & Beverages',
        address: '249/F3 Mountplesent Estate, Hapugala, Wakwella',
        district: 'Galle',
        contactno: '09772897856',
        email: 'kottucreed@gmail.com',
        status: <span class="badge badge-pill badge-secondary">Approved</span>,
        docs: <button className='btn btn-primary'><i className='fa fa-download'></i></button>,
        edit: <button className='btn btn-warning'><i className='fa fa-edit'></i></button>

      },
      {
        partnername: 'INGCO Flagship Store',
        service: 'Supply Industrial Tools',
        address: 'No.64 Old Matara Rd, Galle',
        district: 'Galle',
        contactno: '0774443147',
        email: 'ingco@gmail.com',
        status: <span class="badge badge-pill badge-primary">Approved</span>,
        docs: <button className='btn btn-primary'><i className='fa fa-download'></i></button>,
        edit: <button className='btn btn-warning'><i className='fa fa-edit'></i></button>
      },
      {
        partnername: 'OORMO Stationary',
        service: 'Stationary',
        address: '149 Wakwella Rd, Galle 80000',
        district: 'Galle',
        contactno: '0774423147',
        email: 'oormo@gmail.com',
        status: <span class="badge badge-pill badge-secondary">Approved</span>,
        docs: <button className='btn btn-primary'><i className='fa fa-download'></i></button>,
        edit: <button className='btn btn-warning'><i className='fa fa-edit'></i></button>
      },
      {
        partnername: 'INGCO Flagship Store',
        service: 'Supply Industrial Tools',
        address: 'No.64 Old Matara Rd, Matara',
        district: 'Matara',
        contactno: '0774443147',
        email: 'ingcomatara@gmail.com',
        status: <span class="badge badge-pill badge-primary">Approved</span>,
        docs: <button className='btn btn-primary'><i className='fa fa-download'></i></button>,
        edit: <button className='btn btn-warning'><i className='fa fa-edit'></i></button>
      },

      {
        partnername: 'NJ Power',
        service: 'Supply Industrial Tools',
        address: 'No.23 Old Hambanthota Rd, Matara',
        district: 'Hambanthota',
        contactno: '0774213147',
        email: 'njpower@gmail.com',
        status: <span class="badge badge-pill badge-primary">Approved</span>,
        docs: <button className='btn btn-primary'><i className='fa fa-download'></i></button>,
        edit: <button className='btn btn-warning'><i className='fa fa-edit'></i></button>
      },



    ],
  });

  const widerData = {
    columns: [
      ...datatable.columns.map((col) => {
        return col;
      }),
    ],
    rows: [...datatable.rows],
  };

  return (
    <div className="col-xl-12 mx-auto mt-4">
      <div className="col-md-12 containerbox">
        <div className="containerbox-title">
          <h5>
            Registered Partners
          </h5>
        </div>
        <MDBDataTableV5 className='mdbdatatable' hover scrollX data={widerData} searchTop searchBottom={false} />
      </div>
    </div>
  );
}

export default RegisteredPartners;