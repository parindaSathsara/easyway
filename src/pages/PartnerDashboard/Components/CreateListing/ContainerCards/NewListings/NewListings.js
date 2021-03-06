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
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Markup } from 'interweave';


const SnackbarType = {
  success: "success",
  fail: "fail",
};


function NewListing() {

  const history = useHistory();
  const snackbarRef = useRef(null);
  const snackbarRefErr = useRef(null);

  const [tableData, setTableData] = useState([])

  const [pictures, setPictures] = useState([])
  const [uploadPicture, setUploadPictures] = useState([])
  const [loadingDt, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [htmlContent, setHTMLContent] = useState();


  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const updateTextDescription = async (state) => {
    await setEditorState(state);
    const data = convertToRaw(editorState.getCurrentContent());
  };


  const [addListing, setAddListing] = useState({
    partnerid:localStorage.getItem("PartnerID"),
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

    var editorContent = convertToRaw(editorState.getCurrentContent())

    const dataDescription = draftToHtml(editorContent)

    // console.log(dataDescription)


    const arr = []

    tableData.forEach(element => {
      arr.push(element['variationPrice'])
    });

    var minPrice = Math.min(...arr)
    var maxPrice = Math.max(...arr)

    var priceRange = minPrice + "-" + maxPrice

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
              setProgress(75)
              // setUploadPictures(uploadPicture=>[...uploadPicture, urls]);
            });
        }
      );
    })

    Promise.all(promises)
      .then(() => {


        const passingData = {
          partnerid:addListing.partnerid,
          listingtitle: addListing.listingtitle,
          listingpublishdate: addListing.listingpublishdate,
          listingendingdate: addListing.listingendingdate,
          listingprice: listingType == "Fixed" ? addListing.listingprice : priceRange,
          listingtype: listingType,
          variationtitle: addListing.variationtitle,
          listingvariations: tableData,
          listingimages: uploadPicture,
          listingdescription: dataDescription,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
          axios.post('api/addListing', passingData).then(res => {
            if (res.data.status === 200) {
              console.log(res.data.messageDescription)
              setHTMLContent(res.data.messageDescription)
              setProgress(100);
              snackbarRef.current.show();
              setLoading(false)
            }
            else {
              snackbarRefErr.current.show();
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

      <Snackbar
        ref={snackbarRefErr}
        message="Listing Created Unsuccessful !"
        type={SnackbarType.fail}
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


            <div className="form-group">
              <label>Listing Description</label>
              <Editor
                onEditorStateChange={updateTextDescription}
                editorState={editorState}
                wrapperClassName="wrapperListingDescription"
                toolbarClassName="toolbarListingDescription"
                editorClassName="editorListingDescription"
                toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                  inline: {
                    options: ['italic', 'bold'],
                    bold: { className: 'demo-option-custom' },
                    italic: { className: 'demo-option-custom' },
                    underline: { className: 'demo-option-custom' },
                    strikethrough: { className: 'demo-option-custom' },
                    monospace: { className: 'demo-option-custom' },
                    superscript: { className: 'demo-option-custom' },
                    subscript: { className: 'demo-option-custom' }
                  },

                }}
              />
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