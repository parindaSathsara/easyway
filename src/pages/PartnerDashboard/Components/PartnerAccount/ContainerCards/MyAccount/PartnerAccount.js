import React, { useEffect, useState, useRef, Component } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import './PartnerAccount.css'
import axios from 'axios';
import MaterialTable from "material-table";
import { alpha } from '@material-ui/core/styles';
import { render } from '@testing-library/react';
import storage from '../../../../../../firebase-config';
import LoadingBar from "react-top-loading-bar";
import Snackbar from '../../../../../SnackBar/Snackbar';
import GooglePlacesAutoComplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';


const SnackbarType = {
    success: "success",
    fail: "fail",
};


function PartnerAccount() {

    const snackbarRef = useRef(null);
    const snackbarRefErr = useRef(null);

    const [accountTracking, setAccountTracking] = useState([]);
    const [userImage, setUserImage] = useState([])
    const hiddenFileInput = React.useRef(null);
    const hiddenNICInput = React.useRef(null);
    const hiddenBRInput = React.useRef(null);

    const [userDocs, setUserDocs] = useState([])
    const [progress, setProgress] = useState(0)


    const [value, setValue] = useState(null);

    const [userData, setUserData] = useState({
        'partnerid': localStorage.getItem("PartnerID"),
        'serviceid': '',
        'partnername': '',
        'contactnumber': '',
        'address': '',
        'servicestarttime': '',
        'serviceendtime': '',
        'district': '',
        'profilepic': '',
        'username': '',
        'password': '',
        'email': '',
        'nic': '',
        'brcopy': '',
        'servicestatus': '',
        'accountstatus': '',
        'description': ''
    })

    const handleClick = (e) => {

        if (e.target.name == "brCopy") {
            hiddenBRInput.current.click();
        }
        else if (e.target.name == "nicCopy") {
            hiddenNICInput.current.click();
        }
        else if (e.target.name == "userImage") {
            hiddenFileInput.current.click();
        }

    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setUserImage({ ...userImage, imageView: URL.createObjectURL(fileUploaded), imageToUpload: fileUploaded })
    };


    const handleBRChange = event => {
        const fileUploaded = event.target.files[0];

        setUserDocs({
            ...userDocs, brCopy: URL.createObjectURL(fileUploaded), brToUpload: fileUploaded
        });
    };

    const handleNICChange = event => {
        const fileUploaded = event.target.files[0];
        console.log(URL.createObjectURL(fileUploaded))
        setUserDocs({
            ...userDocs, nicCopy: URL.createObjectURL(fileUploaded), nicToUpload: fileUploaded
        });
    };

    const formOnSubmit = (e) => {
        e.preventDefault()

        const promises = [];


        if (userDocs['brToUpload'] != null) {
            console.log("BRToUpload")
            const uploadBR = storage.ref(`ewBrCopies/${userDocs['brToUpload'].name}`).put(userDocs['brToUpload']);
            promises.push(uploadBR);

            uploadBR.on(
                "state_changed",
                (snapshot) => {

                },
                (error) => {
                    console.log(error);
                },


                async () => {
                    await storage
                        .ref("ewBrCopies")
                        .child(userDocs['brToUpload'].name)
                        .getDownloadURL()
                        .then((urls) => {

                            console.log(urls)

                            userData.brcopy = urls
                            // setUploadPictures(uploadPicture=>[...uploadPicture, urls]);
                        });
                    setProgress(25)
                }
            );

        }

        if (userDocs['nicToUpload'] != null) {
            console.log("NICTOUpload")
            const uploadNIC = storage.ref(`ewNICCopies/${userDocs['nicToUpload'].name}`).put(userDocs['nicToUpload']);
            promises.push(uploadNIC);

            uploadNIC.on(
                "state_changed",
                (snapshot) => {

                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    await storage
                        .ref("ewNICCopies")
                        .child(userDocs['nicToUpload'].name)
                        .getDownloadURL()
                        .then((urls) => {

                            console.log(urls)
                            userData.nic = urls
                            // setUploadPictures(uploadPicture=>[...uploadPicture, urls]);
                        });

                    setProgress(50)
                }
            );
        }
        if (userImage['imageToUpload'] != null) {
            console.log("ImageUserToUpload")
            const uploadUserImage = storage.ref(`ewNICCopies/${userImage['imageToUpload'].name}`).put(userImage['imageToUpload']);
            promises.push(uploadUserImage);


            uploadUserImage.on(
                "state_changed",
                (snapshot) => {

                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    await storage
                        .ref("ewNICCopies")
                        .child(userImage['imageToUpload'].name)
                        .getDownloadURL()
                        .then((urls) => {
                            console.log(urls)
                            userData.profilepic = urls
                            // setUploadPictures(uploadPicture=>[...uploadPicture, urls]);
                            setProgress(75)
                        });
                }
            );
        }

        Promise.all(promises)
            .then(() => {
                geocodeByAddress(value['label'])
                    .then(results => getLatLng(results[0]))
                    .then(({ lat, lng }) => {


                        // 'partnerid': localStorage.getItem("PartnerID"),
                        // 'serviceid': '',
                        // 'partnername': '',
                        // 'contactnumber': '',
                        // 'address': '',
                        // 'servicestarttime': '',
                        // 'serviceendtime': '',
                        // 'district': '',
                        // 'profilepic': '',
                        // 'username': '',
                        // 'email': '',
                        // 'nic': '',
                        // 'brcopy': '',
                        // 'servicestatus': '',
                        // 'accountstatus': '',
                        // 'description': ''

                        if (userData.accountstatus == "AccountCreated" && userData.nic != null && userData.brcopy != null) {
                            userData.accountstatus = "DocumentsSubmitted"
                        }

                        const userDataInfo = {
                            partnerid: userData.partnerid,
                            serviceid: userData.serviceid,
                            partnername: userData.partnername,
                            contactnumber: userData.contactnumber,
                            address: userData.address,
                            servicestarttime: userData.servicestarttime,
                            serviceendtime: userData.serviceendtime,
                            district: userData.district,
                            profilepic: userData.profilepic,
                            username: userData.username,
                            password: userData.password,
                            email: userData.email,
                            nic: userData.nic,
                            brcopy: userData.brcopy,
                            servicestatus: userData.servicestatus,
                            accountstatus: userData.accountstatus,
                            description: userData.description,
                            partnerlatlon: lat + "," + lng
                        }

                        console.log(userDataInfo)

                        axios.post('api/partners/updateProfile', userDataInfo).then(res => {

                            if (res.data.status === 200) {
                                console.log("Done Updated")
                                setProgress(100)
                                snackbarRef.current.show();
                                console.log(res.data.partner)
                            }

                            else {
                                snackbarRefErr.current.show();
                                console.log(res.data.validator_errors);
                                console.log(res.data.status)
                            }

                        });


                        axios.post('api/partners/updateProfile', userDataInfo).then(res => {

                            if (res.data.status === 200) {
                                console.log("Done Updated")
                                setProgress(100)
                                snackbarRef.current.show();
                                console.log(res.data.partner)
                            }

                            else {
                                snackbarRefErr.current.show();
                                console.log(res.data.validator_errors);
                                console.log(res.data.status)
                            }

                        });

                    });

            }
            );



    }

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });

    }

    useEffect(() => {
        axios.get(`/api/partners/getPartners/${localStorage.getItem("PartnerID")}`).then(res => {

            if (res.data.status === 200) {
                setUserData(res.data.partners[0]);
                setUserImage({ ...userImage, imageView: res.data.partners[0]['profilepic'] })
                setUserDocs({ ...userDocs, brCopy: res.data.partners[0]['brcopy'], nicCopy: res.data.partners[0]['nic'] })
                setValue(res.data.partners[0]['partnerlatlon'])
            }

        })
    }, []);



    return (
        <>

            <Snackbar
                ref={snackbarRef}
                message="Account Updated Successfully !"
                type={SnackbarType.success}
            />

            <Snackbar
                ref={snackbarRefErr}
                message="Account Updated Unsuccessfully !"
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
                            My Account
                        </h5>
                    </div>
                    {/* <MDBDataTableV5 hover scrollX maxHeight='400px' data={data} getValueCheckBox={(val) => console.log(val)} searchTop searchBottom={false} /> */}
                    <main className="col-lg-12">

                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="row gx-">
                                        <div className="col-lg-6 mb-3 accountUpdate">
                                            <label className="form-label">User Name</label>
                                            <input className="form-control" type="text" name='username' onChange={handleInputChange} value={userData.username} placeholder="Your Username" />
                                        </div>
                                        <div className="col-lg-6 mb-3 accountUpdate">
                                            <label className="form-label">Email</label>
                                            <input className="form-control" type="text" name='email' onChange={handleInputChange} value={userData.email} placeholder="Your Email" />
                                        </div>
                                        <div className="col-lg-6 mb-3 accountUpdate">
                                            <label className="form-label">Company Name</label>
                                            <input className="form-control" type="text" name='partnername' onChange={handleInputChange} value={userData.partnername} placeholder="Business Name" />
                                        </div>
                                        <div className="col-lg-6 mb-3 accountUpdate">
                                            <label className="form-label">District</label>
                                            <select className="form-control" id="district" onChange={handleInputChange} value={userData.district} name='district'>
                                                <option disabled selected>Your District</option>
                                                <option value="Galle" >Galle</option>
                                                <option value="Matara">Matara</option>
                                                <option value="Hambanthota">Hambanthota</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-12 mb-3 accountUpdate">
                                            <label className="form-label">Description</label>
                                            <textarea className="form-control" type="text" name='description' onChange={handleInputChange} value={userData.description} placeholder="Business Description" />
                                        </div>
                                        <div className="col-lg-6  mb-3 accountUpdate">
                                            <label className="form-label">Contact Number</label>
                                            <input className="form-control" type="text" name='contactnumber' onChange={handleInputChange} value={userData.contactnumber} placeholder="Your Contact Number" />
                                        </div>
                                        <div className="col-lg-6 mb-3 accountUpdate">
                                            <label className="form-label">Address</label>
                                            <input className="form-control" type="text" name='address' onChange={handleInputChange} value={userData.address} placeholder="Your Address" />
                                        </div>

                                        <div className="col-lg-12 mb-4">
                                            <label className="form-label">Nearest Location</label>

                                            <GooglePlacesAutoComplete
                                                autocompletionRequest={{
                                                    componentRestrictions: {
                                                        country: ["lk"] //to set the specific country
                                                    }
                                                }}
                                                selectProps={{
                                                    value,
                                                    onChange: setValue,
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-3 accountUpdate">
                                            <label className="form-label">Service Start Time</label>
                                            <input className="form-control" type="time" name='servicestarttime' onChange={handleInputChange} value={userData.servicestarttime} placeholder={+1234567890} />
                                        </div>
                                        <div className="col-lg-6 mb-3 accountUpdate">
                                            <label className="form-label">Service End Time</label>
                                            <input className="form-control" type="time" name='serviceendtime' onChange={handleInputChange} value={userData.serviceendtime} placeholder="Type here" />
                                        </div>

                                        <div className="col-lg-6 col-md-6 mb-3 accountUpdate">
                                            <article className="box mb-3 bg-light partnerAccDiv">
                                                <button className="btn float-end btn-outline-dark btn-sm mb-3" name='nicCopy' onClick={handleClick}>
                                                    <i className="fa fa-id-card" /> Upload</button>
                                                <p className="title mb-0">NIC Copy</p>

                                                <input
                                                    type="file"
                                                    name='nicCopy'
                                                    ref={hiddenNICInput}
                                                    onChange={handleNICChange}
                                                    style={{ display: 'none' }}
                                                />
                                                {userDocs['nicCopy'] == null ? <></> : <img className='rounded  mb-3' src={userDocs['nicCopy']} style={{ height: 70 }}></img>}
                                                <small className="text-muted d-block" style={{ width: '70%' }}>
                                                    Attach the National Identity Card of the company owner here.</small>
                                            </article>
                                        </div>

                                        <div className="col-lg-6 col-md-6 mb-3 accountUpdate">
                                            <article className="box mb-3 bg-light partnerAccDiv">
                                                <button className="btn float-end btn-outline-danger btn-sm mb-3" name='brCopy' onClick={handleClick}> <i className="fa fa-file-text" /> Upload</button>
                                                <p className="title mb-0">
                                                    BR Copy</p>


                                                <input
                                                    type="file"
                                                    name='brCopy'
                                                    ref={hiddenBRInput}
                                                    onChange={handleBRChange}
                                                    style={{ display: 'none' }}
                                                />
                                                {userDocs['brCopy'] == null ? <></> : <img className='rounded  mb-3' src={userDocs['brCopy']} style={{ height: 70 }}></img>}

                                                <small className="text-muted d-block" style={{ width: '70%' }}>
                                                    Attach a copy of the business registration form of the organization here
                                                </small>
                                            </article>
                                        </div>

                                    </div>
                                </div>
                                <aside className="col-lg-4">
                                    <figure className="text-lg-center mt-3">
                                        <div className='frame-square'>
                                            <img className="img-lg mb-3 rounded" src={userImage['imageView'] == null ? "https://www.survivorsuk.org/wp-content/uploads/2017/01/no-image.jpg" : userImage['imageView']} alt="User Photo" />
                                        </div>

                                        <br></br>

                                        <figcaption className='uploadButtonDiv'>
                                            <button className="btn  btn-sm btn-light" name='userImage' onClick={handleClick}>
                                                <i className="fa fa-camera" /> Upload
                                            </button>

                                            <input
                                                type="file"
                                                name='userImage'
                                                ref={hiddenFileInput}
                                                onChange={handleChange}
                                                style={{ display: 'none' }}
                                            />

                                            <a className="btn  btn-sm btn-outline-danger" href="#">
                                                <i className="fa fa-trash" />
                                            </a>
                                        </figcaption>
                                    </figure>
                                </aside>

                            </div>
                            <br />
                            <button className="btn btn-primary" type="submit" onClick={formOnSubmit}>Save changes</button>
                            <hr className="my-4" />
                            <div className="row">
                                <div className="col-md">
                                    <article className="box mb-3 bg-light partnerAccDiv">
                                        <a className="btn float-end btn-outline-warning btn-sm" href="#">Change</a>
                                        <p className="title mb-0">Password</p>
                                        <small className="text-muted d-block" style={{ width: '70%' }}>You can reset or change your
                                            password by clicking here</small>
                                    </article>
                                </div>
                                <div className="col-md">
                                    <article className="box mb-3 bg-light partnerAccDiv">
                                        <a className="btn float-end btn-outline-danger btn-sm" href="#">Deactivate</a>
                                        <p className="title mb-0">Remove account</p>
                                        <small className="text-muted d-block" style={{ width: '70%' }}>Once you delete your
                                            account, there is no going back.</small>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );

}

export default PartnerAccount;
