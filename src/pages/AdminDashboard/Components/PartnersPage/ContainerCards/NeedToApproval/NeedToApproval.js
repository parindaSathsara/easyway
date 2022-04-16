import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import './NeedToApproval.css';
import { Link } from 'react-router-dom';
import Snackbar from '../../../../../SnackBar/Snackbar';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const SnackbarType = {
  success: "success",
  fail: "fail",
};

function PartnersNeedToApproval() {

  const snackbarRef = useRef(null);
  const snackbarRefErr = useRef(null);

  const [partnersNeedToApproval, setPartnersNeedToApproval] = useState([])

  const [clickedID, setClickedID] = useState([])
  const [userData, setUserData] = useState({
    'serviceid': '',
    'partnername': '',
    'contactnumber': '',
    'address': '',
    'servicestarttime': '',
    'serviceendtime': '',
    'district': '',
    'profilepic': '',
    'username': '',
    'email': '',
    'nic': '',
    'brcopy': '',
    'servicestatus': '',
    'accountstatus': '',
  })


  const handleApproveButtonOnClick = (e) => {
    console.log(e.target.value)


    axios.get(`/api/partners/getPartners/${e.target.value}`).then(res => {

      if (res.data.status == 200) {
        setUserData(res.data.partners[0])
      }
      else {
        console.log("NoData")
      }
    })
  }


  const formSubmit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to approve this partner?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>{
            userData.accountstatus = 'DocumentsApproved'
            axios.post('api/partners/updateProfile', userData).then(res => {
              if (res.data.status === 200) {
                snackbarRef.current.show();
                getPartnersByStatus();
              }
              else {
                snackbarRefErr.current.show();
                console.log(res.data.validator_errors);
                console.log(res.data.status)
              }
            });
          }
        },
        {
          label: 'No',
          onClick: () => console.log("No")
        }
      ]
    })
  }

  const partnersData = {
    columns: [
      {
        title: 'Partner Name',
        field: 'partnername'
      },
      {
        title: 'Service',
        field: 'service'
      },
      {
        title: '',
        field: 'partnerid',
        render: partner =>
          <button className='btn btn-light text-dark' data-toggle="modal" data-target="#exampleModal" style={{ fontSize: 14 }} value={partner.partnerid} onClick={handleApproveButtonOnClick}>
            <i class="fa fa-file-text" aria-hidden="true" style={{ marginRight: 8 }}></i>Review</button>
      },

    ],


    rows: partnersNeedToApproval.map(partnerApproval => {
      return {
        partnerid: partnerApproval.partnerid,
        partnername: partnerApproval.partnername,
        service: partnerApproval.servicename
      }
    })
  }


  useEffect(() => {
    getPartnersByStatus();
  }, []);

  const getPartnersByStatus = () => {
    axios.get('/api/partners/getPartnersByStatus/DocumentsSubmitted').then(res => {

      if (res.data.status == 200) {
        setPartnersNeedToApproval(res.data.partners)
      }
      else {
        console.log("NoData")
      }
    })
  }



  return (
    <>
      <Snackbar
        ref={snackbarRef}
        message="Partner Approved !"
        type={SnackbarType.success}
      />

      <Snackbar
        ref={snackbarRefErr}
        message="Partner Approved Unsuccessfully !"
        type={SnackbarType.fail}
      />

      <div className="col-xl-6 mx-auto mt-5">
        <div className="col-md-12 containerbox">
          <div className="containerbox-title">
            <h5>
              Partners Need To Approval
            </h5>
          </div>
          <MaterialTable
            title={""}
            data={partnersData.rows}
            columns={partnersData.columns}
            options={{
              sorting: true, search: true,

              searchFieldAlignment: "left", searchAutoFocus: true, searchFieldVariant: "standard",
              paging: true, pageSizeOptions: [2, 5, 10], pageSize: 5,
              paginationType: "stepped", showFirstLastPageButtons: false, exportButton: true,
              exportAllData: true, exportFileName: "Partners Need To Approval Data", addRowPosition: "first", actionsColumnIndex: -1,
              showSelectAllCheckbox: false, showTextRowsSelected: false, selectionProps: rowData => ({
                disabled: rowData.serviceid == null,
                // color:"primary"
              }),
              columnsButton: true,
            }}
          />
        </div>
      </div>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title" id="exampleModalLongTitle">Review Partner Documents</h6>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <main className="col-lg-12">

                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row gx-8">
                        <div className="col-lg-12 m-01 mb-3">
                          <figure className="text-lg-center mt-3">
                            <div className='frame-square'>
                              <img className="img-lg mb-3 rounded" src={userData.profilepic == null ? "https://www.survivorsuk.org/wp-content/uploads/2017/01/no-image.jpg" : userData.profilepic} alt="User Photo" />
                            </div>
                          </figure>
                        </div>
                        <div className="col-lg-6 mb-3 accountUpdate">
                          <label className="form-label">User Name</label>
                          <input className="form-control" type="text" name='username' value={userData.username} placeholder="Your Username" disabled />
                        </div>
                        <div className="col-lg-6 mb-3 accountUpdate">
                          <label className="form-label">Email</label>
                          <input className="form-control" type="text" name='email' value={userData.email} placeholder="Your Email" disabled />
                        </div>
                        <div className="col-lg-6 mb-3 accountUpdate">
                          <label className="form-label">Company Name</label>
                          <input className="form-control" type="text" name='partnername' value={userData.partnername} placeholder="Business Name" disabled />
                        </div>

                        <div className="col-lg-6 mb-3 accountUpdate">
                          <label className="form-label">District</label>
                          <input className="form-control" type="text" name='district' value={userData.district} placeholder="District" disabled />
                        </div>
                        <div className="col-lg-6  mb-3 accountUpdate">
                          <label className="form-label">Contact Number</label>
                          <input className="form-control" type="text" name='contactnumber' value={userData.contactnumber} placeholder="Your Contact Number" disabled />
                        </div>
                        <div className="col-lg-6 mb-3 accountUpdate">
                          <label className="form-label">Address</label>
                          <input className="form-control" type="text" name='address' value={userData.address} placeholder="Your Address" disabled />
                        </div>
                        <div className="col-lg-6 mb-3 accountUpdate">
                          <label className="form-label">Service Start Time</label>
                          <input className="form-control" type="time" name='servicestarttime' value={userData.servicestarttime} placeholder={+1234567890} disabled />
                        </div>
                        <div className="col-lg-6 mb-3 accountUpdate">
                          <label className="form-label">Service End Time</label>
                          <input className="form-control" type="time" name='serviceendtime' value={userData.serviceendtime} placeholder="Type here" disabled />
                        </div>

                        <div className="col-lg-6 col-md-6 mb-3 accountUpdate">
                          <article className="box mb-3 bg-light partnerAccDiv">
                            <Link className="btn float-end btn-outline-dark btn-sm mb-3" name='nicCopy' to={{ pathname: userData.nic }} target='_blank'>
                              <i className="fa fa-id-card" /> View NIC</Link>
                            <p className="title mb-0">NIC Copy</p>
                            {userData.nic == null ? <></> : <img className='rounded  mb-3' src={userData.nic} style={{ height: 100 }}></img>}
                          </article>
                        </div>

                        <div className="col-lg-6 col-md-6 mb-3 accountUpdate">
                          <article className="box mb-3 bg-light partnerAccDiv">
                            <Link className="btn float-end btn-outline-danger btn-sm mb-3" name='nicCopy' to={{ pathname: userData.brcopy }} target='_blank'>
                              <i className="fa fa-id-card" /> View BR</Link>
                            <p className="title mb-0">
                              BR Copy</p>
                            {userData.brcopy == null ? <></> : <img className='rounded  mb-3' src={userData.brcopy} style={{ height: 100 }}></img>}
                          </article>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-dark" onClick={formSubmit}>Accept Documents</button>
            </div>
          </div>
        </div>
      </div>

    </>



  )

}

export default PartnersNeedToApproval;