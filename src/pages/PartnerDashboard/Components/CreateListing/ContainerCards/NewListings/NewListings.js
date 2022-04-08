import React from 'react';
import './NewListings.css'
import { useState, useRef } from 'react';
import ImageUpload from './ImageUploader';
import MaterialTable from "material-table";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import ImageUploader from "react-images-upload";
import firebase from "firebase";
import storage from '../../../../../../firebase-config';
import LoadingBar from "react-top-loading-bar";
import { render } from '@testing-library/react';
import axios from 'axios';
import Snackbar from '../../../../../SnackBar/Snackbar';
import { RotateSpinner } from "react-spinners-kit";
import { useHistory } from 'react-router-dom';

const SnackbarType = {
  success: "success",
  fail: "fail",
};


function NewListing() {

  const history = useHistory();
  const snackbarRef = useRef(null);

  const [tableData, setTableData] = useState([])

  const [pictures, setPictures] = useState([])
  const [uploadPicture, setUploadPictures] = useState([])
  const [loadingDt, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const [addListing, setAddListing] = useState({
    listingtitle: '',
    listingpublishdate: '',
    listingendingdate: '',
    listingprice: '',
    variationtitle: ''
    // listingvariations: [],
    // listingimages: []
  })

  const [listingType, setListingType] = useState()


  const onDrop = (pictureFiles, pictureDataURLs) => {
    setPictures(pictureFiles)
  }

  const handleInput = (e) => {
    setAddListing({ ...addListing, [e.target.name]: e.target.value });
  }




  const handleSubmit = (e) => {
    e.preventDefault();
    const promises = [];
    pictures.map((image) => {
      setLoading(true)
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      promises.push(uploadTask);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 50
          );

          setProgress(progress)
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {

              uploadPicture.push(urls)
              // setUploadPictures(uploadPicture=>[...uploadPicture, urls]);
            });
        }
      );
    })

    Promise.all(promises)
      .then(() => {

        const serviceListing = {
          listingtitle: addListing.listingtitle,
          listingpublishdate: addListing.listingpublishdate,
          listingendingdate: addListing.listingendingdate,
          listingprice: addListing.listingprice,
          listingtype: listingType,
        }


        axios.get('/sanctum/csrf-cookie').then(response => {
          axios.post('api/addListing', serviceListing).then(res => {
            if (res.data.status === 200) {
              setProgress(65);

              //------------------------Variation Adding Part------------------------------------
              const listingVariations = {
                listingid: res.data.listingid,
                variationtitle: addListing.variationtitle,
                listingvariations: tableData,
              }

              console.log(listingVariations)

              axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('api/addVariationListing', listingVariations).then(res => {
                  if (res.data.status === 200) {
                    console.log(res.data.message)
                    setProgress(85);
                  }
                });
              })


              
              //------------------------Images Adding Part------------------------------------
              const listingImages = {
                listingid: res.data.listingid,
                listingimages: uploadPicture,
              }

              console.log(listingImages)
              axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('api/addImagesListing', listingImages).then(result => {
                  if (result.data.status === 200) {
                    console.log(result.data.message)
                    setProgress(100);
                    snackbarRef.current.show();
                    setLoading(false)
                  }
                });
              })

            }

            else {

            }

          });
        });

      })
      .catch((err) => console.log(err));
  }


  const printUploadPictures = () => {
    // console.log(uploadPicture)
  }






  const onListingTypeChange = (value) => {

    if (value == "Fixed") {
      setListingType("Fixed");
    }

    else if (value == "Variation") {
      setListingType("Variation");
    }
    console.log(value);
  }

  const data = {
    columns: [
      {
        title: "Variation Name",
        field: "variationName",
      },

      {
        title: "Variation Price",
        field: "variationPrice",
      },

    ],

    // rows: serviceslist.map(servicesdata => {
    //   return {
    //     serviceid: servicesdata.serviceid,
    //     servicename: servicesdata.servicename,
    //     servicetype: servicesdata.servicetype,
    //     servicedescription: servicesdata.servicedescription,

    //   }
    // }),
  };

  return (
    <>

      <Snackbar
        ref={snackbarRef}
        message="Listing Created Successfully !"
        type={SnackbarType.success}
      />


      <div>
        <LoadingBar
          progress={progress}
          height={3}
          color="#7a5c40"
          shadow={false}
          loaderSpeed={2000}
        // onLoaderFinished={() => this.onLoaderFinished()}
        />
      </div>
      <div className="col-xl-12 mx-auto mt-5">

        <div className="col-md-12 containerbox">
          <div className="containerbox-title">
            <h5>
              New Listing
            </h5>
          </div>
          <form id="serviceAddForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Listing Title</label>
              <input type="text" className="form-control dashboardInputField" id="listingtitle" name="listingtitle" onChange={handleInput}></input>
              <span className="error" id="listingtitle"></span>
            </div>

            <div className="imageUploadContainer">
              <label>Listing Images</label>
              <ImageUploader
                withIcon={false}
                withPreview={true}
                buttonText="Choose images"
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}

              />
            </div>


            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Listing Publish Date</label>
                  <input type="date" className="form-control dashboardInputField" id="listingpublishdate" name="listingpublishdate" onChange={handleInput}></input>
                  <span className="error" id="listingTitle"></span>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Listing Ending Date</label>
                  <input type="date" className="form-control dashboardInputField" id="listingendingdate" name="listingendingdate" onChange={handleInput}></input>
                  <span className="error" id="listingTitle"></span>
                </div>
              </div>
            </div>

            <div className='SizedBoxClear'></div>

            <div>
              <label>Listing Type</label>
              <RadioGroup horizontal onChange={onListingTypeChange}>
                <RadioButton value="Fixed" pointColor="#7a5c40">
                  Fixed Price
                </RadioButton>
                <RadioButton value="Variation" pointColor="#7a5c40">
                  Variation Price
                </RadioButton>
              </RadioGroup>
            </div>


            <div className='SizedBoxClear'></div>


            {listingType == "Fixed" ?

              <div className="form-group">
                <label>Price</label>
                <input type="text" className="form-control dashboardInputField" id="listingprice" name="listingprice" onChange={handleInput}></input>
                <span className="error" id="listingprice"></span>
              </div>

              : listingType == "Variation" ?

                <div>
                  <div className='SizedBoxClear'></div>
                  <div className="form-group">
                    <input type="text" className="form-control dashboardInputField" id="variationtitle" name="variationtitle" placeholder='Variation Title' onChange={handleInput}></input>
                    <span className="error" id="listingTitle"></span>
                  </div>

                  <MaterialTable
                    title={""}
                    editable={{
                      onRowAdd: (newRow) => new Promise((resolve, reject) => {

                        setTableData([...tableData, newRow])
                        setTimeout(() => resolve(), 500)
                      }),

                      onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {



                        const index = tableData.findIndex(tableData => tableData === oldRow);

                        tableData[index].variationName = newRow.variationName;
                        tableData[index].variationPrice = newRow.variationPrice;

                        setTimeout(() => resolve(), 500)
                      }),

                      onRowDelete: (selectedRow) => new Promise((resolve, reject) => {

                        const index = tableData.findIndex(tableData => tableData === selectedRow);
                        setTableData(tableData => tableData.splice(index, 1));
                        console.log(index)
                        setTimeout(() => resolve(), 1000)
                      })


                    }}

                    data={tableData}
                    columns={data.columns}
                    onSelectionChange={(selectedRows) => console.log(selectedRows)}
                    options={{
                      paging: false,
                      columnsButton: false,
                      addRowPosition: "first", actionsColumnIndex: -1,
                      search: false,
                    }}
                  />
                </div>


                : null}


            <div className='SizedBoxClear'></div>
            <div className='bottomSubmissionRow'>

              <div className='row submissionrow'>
                <button type="submit" className="btn btn-warning partnerDashboardButton">List Now</button>

                <div className='rotateSpinner'>
                  <RotateSpinner
                    size={30}
                    color="#1d1c1b"
                    loading={loadingDt}
                  />
                </div>
              </div>


            </div>

          </form>
        </div>
      </div>
    </>
  )


}



export default NewListing;