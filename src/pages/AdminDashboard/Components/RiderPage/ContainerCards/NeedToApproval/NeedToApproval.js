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

function RidersNeedToApproval() {

  const snackbarRef = useRef(null);
  const snackbarRefErr = useRef(null);

  const [ridersNeedToApproval, setridersNeedToApproval] = useState([])

  const [clickedID, setClickedID] = useState([])
  const [userData, setUserData] = useState({
    'riderid': '',
    'ridername': '',
    'ridervehicleno': '',
    'ridercontact': '',
    'riderdistrict': '',
    'ridernic': '',
    'rideremail': '',
    'profilepic': '',
    'riderlicense': '',
    'description': '',
    'riderusername': '',
    'riderpassword': '',
    'accountstatus': '',
    'riderstatus': '',
  })


  const handleApproveButtonOnClick = (e) => {
    console.log(e.target.value)


    axios.get(`/api/riders/getRiders/${e.target.value}`).then(res => {

      if (res.data.status == 200) {
        setUserData(res.data.rider[0])
      }
      else {
        console.log("NoData")
      }
    })
  }


  const formSubmit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to approve this rider?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            userData.accountstatus = 'DocumentsApproved'
            axios.post('api/riders/riderUpdateProfile', userData).then(res => {
              if (res.data.status === 200) {
                snackbarRef.current.show();
                getridersByStatus();
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

  const ridersData = {
    columns: [
      {
        title: 'Rider Name',
        field: 'ridername'
      },
      {
        title: 'Rider District',
        field: 'district'
      },
      {
        title: '',
        field: 'riderid',
        render: rider =>
          <button className='btn btn-light text-dark' data-toggle="modal" data-target="#exampleModal" style={{ fontSize: 14 }} value={rider.riderid} onClick={handleApproveButtonOnClick}>
            <i class="fa fa-file-text" aria-hidden="true" style={{ marginRight: 8 }}></i>Review</button>
      },

    ],


    rows: ridersNeedToApproval.map(riderApproval => {
      return {
        riderid: riderApproval.riderid,
        district: riderApproval.riderdistrict,
        ridername: riderApproval.ridername

      }
    })
  }


  useEffect(() => {
    getridersByStatus();
  }, []);

  const getridersByStatus = () => {
    axios.get('/api/riders/getRidersByStatus/DocumentsSubmitted').then(res => {

      if (res.data.status == 200) {
        setridersNeedToApproval(res.data.riders)
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
        message="Rider Approved !"
        type={SnackbarType.success}
      />

      <Snackbar
        ref={snackbarRefErr}
        message="Rider Approved Unsuccessfully !"
        type={SnackbarType.fail}
      />

      <div className="col-xl-6 mx-auto mt-5">
        <div className="col-md-12 containerbox">
          <div className="containerbox-title">
            <h5>
              Riders Need To Approval
            </h5>
          </div>
          <MaterialTable
            title={""}
            data={ridersData.rows}
            columns={ridersData.columns}
            options={{
              sorting: true, search: true,

              searchFieldAlignment: "left", searchAutoFocus: true, searchFieldVariant: "standard",
              paging: true, pageSizeOptions: [2, 5, 10], pageSize: 5,
              paginationType: "stepped", showFirstLastPageButtons: false, exportButton: true,
              exportAllData: true, exportFileName: "riders Need To Approval Data", addRowPosition: "first", actionsColumnIndex: -1,
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
              <h6 class="modal-title" id="exampleModalLongTitle">Review Rider Documents</h6>
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
                          <label className="form-label">Rider Name</label>
                          <input className="form-control" type="text" name='ridername'  value={userData.ridername} placeholder="Your Name" />
                        </div>
                        <div className="col-lg-6 mb-3 accountUpdate">
                          <label className="form-label">Vehicle Number</label>
                          <input className="form-control" type="text" name='ridervehicleno' value={userData.ridervehicleno} placeholder="Your Vehicle Number" />
                        </div>
                        <div className="col-lg-6 mb-3 accountUpdate">
                          <label className="form-label">Contact Number</label>
                          <input className="form-control" type="text" name='ridercontact' value={userData.ridercontact} placeholder="Contact Number" />
                        </div>
                        <div className="col-lg-6 mb-3 accountUpdate">
                          <label className="form-label">District</label>
                          <select className="form-control" id="riderdistrict" value={userData.riderdistrict} name='riderdistrict'>
                            <option disabled selected>Your District</option>
                            <option value="Galle" >Galle</option>
                            <option value="Matara">Matara</option>
                            <option value="Hambanthota">Hambanthota</option>
                          </select>
                        </div>
                        <div className="col-lg-6 mb-3 accountUpdate">
                          <label className="form-label">Email</label>
                          <input className="form-control" type="text" name='rideremail' value={userData.rideremail} placeholder="Your Email Address" />
                        </div>

                        <div className="col-lg-6 mb-3 accountUpdate">
                          <label className="form-label">Username</label>
                          <input className="form-control" type="text" name='riderusername' value={userData.riderusername} placeholder="Your Username" />
                        </div>
                        <div className="col-lg-12 mb-3 accountUpdate">
                          <label className="form-label">Description</label>
                          <textarea className="form-control" type="text" name='description' value={userData.description} placeholder="Rider Description" />
                        </div>

                        <div className="col-lg-6 col-md-6 mb-3 accountUpdate">
                          <article className="box mb-3 bg-light partnerAccDiv">
                            <Link className="btn float-end btn-outline-dark btn-sm mb-3" name='nicCopy' to={{ pathname: userData.ridernic }} target='_blank'>
                              <i className="fa fa-id-card" /> View NIC</Link>
                            <p className="title mb-0">NIC Copy</p>

                            {userData.ridernic == null ? <></> : <img className='rounded  mb-3' src={userData.ridernic} style={{ height: 70 }}></img>}
                          </article>
                        </div>

                        <div className="col-lg-6 col-md-6 mb-3 accountUpdate">
                          <article className="box mb-3 bg-light partnerAccDiv">
                            <Link className="btn float-end btn-outline-danger btn-sm mb-3" name='riderlicense' to={{ pathname: userData.riderlicense }} target='_blank'> <i className="fa fa-file-text" /> View License</Link>
                            <p className="title mb-0">
                              License Copy</p>

                            {userData.riderlicense == null ? <></> : <img className='rounded  mb-3' src={userData.riderlicense} style={{ height: 70 }}></img>}
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

export default RidersNeedToApproval;