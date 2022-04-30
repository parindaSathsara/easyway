import React, { useEffect, useState, useRef, Component } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import './RiderAccount.css'
import axios from 'axios';
import MaterialTable from "material-table";
import { alpha } from '@material-ui/core/styles';
import { render } from '@testing-library/react';
import storage from '../../../../../../firebase-config';
import LoadingBar from "react-top-loading-bar";
import Snackbar from '../../../../../SnackBar/Snackbar';


const SnackbarType = {
    success: "success",
    fail: "fail",
};


function RiderAccount() {

    const snackbarRef = useRef(null);
    const snackbarRefErr = useRef(null);

    const [accountTracking, setAccountTracking] = useState([]);
    const [userImage, setUserImage] = useState([])
    const hiddenFileInput = React.useRef(null);
    const hiddenNICInput = React.useRef(null);
    const hiddenLicenseInput = React.useRef(null);

    const [userDocs, setUserDocs] = useState([])
    const [progress, setProgress] = useState(0)

    const [userData, setUserData] = useState({
        'riderid':'',
        'ridername':'',
        'ridervehicleno':'',
        'ridercontact':'',
        'riderdistrict':'',
        'ridernic':'',
        'rideremail':'',
        'profilepic':'',
        'riderlicense':'',
        'description':'',
        'riderusername':'',
        'riderpassword':'',
        'accountstatus':'',
        'riderstatus':'Available',
    })

    const handleClick = (e) => {

        if (e.target.name == "riderlicense") {
            hiddenLicenseInput.current.click();
        }
        else if (e.target.name == "ridernic") {
            hiddenNICInput.current.click();
        }
        else if (e.target.name == "profilepic") {
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
            ...userDocs, riderlicense: URL.createObjectURL(fileUploaded), riderlicensetoUpload: fileUploaded
        });
    };

    const handleNICChange = event => {
        const fileUploaded = event.target.files[0];
        console.log(URL.createObjectURL(fileUploaded))
        setUserDocs({
            ...userDocs, ridernic: URL.createObjectURL(fileUploaded), ridernicToUpload: fileUploaded
        });
    };

    const formOnSubmit = (e) => {
        e.preventDefault()

        const promises = [];


        if (userDocs['riderlicensetoUpload'] != null) {
            console.log("riderlicensetoUpload")
            const uploadBR = storage.ref(`ewRiderLC/${userDocs['riderlicensetoUpload'].name}`).put(userDocs['riderlicensetoUpload']);
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
                        .ref("ewRiderLC")
                        .child(userDocs['riderlicensetoUpload'].name)
                        .getDownloadURL()
                        .then((urls) => {

                            console.log(urls)

                            userData.riderlicense = urls
                            // setUploadPictures(uploadPicture=>[...uploadPicture, urls]);
                        });
                    setProgress(25)
                }
            );

        }

        if (userDocs['ridernicToUpload'] != null) {
            console.log("NICTOUpload")
            const uploadNIC = storage.ref(`ewNICCopies/${userDocs['ridernicToUpload'].name}`).put(userDocs['ridernicToUpload']);
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
                        .child(userDocs['ridernicToUpload'].name)
                        .getDownloadURL()
                        .then((urls) => {

                            console.log(urls)
                            userData.ridernic = urls
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

                if (userData.accountstatus == "AccountCreated" && userData.ridernic != null && userData.riderlicense != null) {
                    userData.accountstatus = "DocumentsSubmitted"
                }
                console.log(userData)

                axios.post('api/riders/riderUpdateProfile', userData).then(res => {
                    
                    if (res.data.status === 200) {
                        console.log("Done Updated")
                        setProgress(100)
                        snackbarRef.current.show();
                    }

                    else {
                        snackbarRefErr.current.show();
                        console.log(res.data.validator_errors);
                        console.log(res.data.status)
                    }

                });

            });



    }

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });

    }

    useEffect(() => {
        axios.get(`/api/riders/getRiders/${localStorage.getItem("RiderID")}`).then(res => {

            if (res.data.status === 200) {
                setUserData(res.data.rider[0]);

                setUserImage({ ...userImage, imageView: res.data.rider[0]['profilepic'] })
                setUserDocs({ ...userDocs, riderlicense: res.data.rider[0]['riderlicense'],ridernic: res.data.rider[0]['ridernic']})
                // setUserDocs({ ...userDocs, ridernic: res.data.rider[0]['ridernic']})
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
                    color="#00444b"
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
                                            <label className="form-label">Rider Name</label>
                                            <input className="form-control" type="text" name='ridername' onChange={handleInputChange} value={userData.ridername} placeholder="Your Username" />
                                        </div>
                                        <div className="col-lg-6 mb-3 accountUpdate">
                                            <label className="form-label">Vehicle Number</label>
                                            <input className="form-control" type="text" name='ridervehicleno' onChange={handleInputChange} value={userData.ridervehicleno} placeholder="Your Email" />
                                        </div>
                                        <div className="col-lg-6 mb-3 accountUpdate">
                                            <label className="form-label">Contact Number</label>
                                            <input className="form-control" type="text" name='ridercontact' onChange={handleInputChange} value={userData.ridercontact} placeholder="Business Name" />
                                        </div>
                                        <div className="col-lg-6 mb-3 accountUpdate">
                                            <label className="form-label">District</label>
                                            <select className="form-control" id="riderdistrict" onChange={handleInputChange} value={userData.riderdistrict} name='riderdistrict'>
                                                <option disabled selected>Your District</option>
                                                <option value="Galle" >Galle</option>
                                                <option value="Matara">Matara</option>
                                                <option value="Hambanthota">Hambanthota</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-6 mb-3 accountUpdate">
                                            <label className="form-label">Email</label>
                                            <input className="form-control" type="text" name='rideremail' onChange={handleInputChange} value={userData.rideremail} placeholder="Your Address" />
                                        </div>

                                        <div className="col-lg-6 mb-3 accountUpdate">
                                            <label className="form-label">Username</label>
                                            <input className="form-control" type="text" name='riderusername' onChange={handleInputChange} value={userData.riderusername} placeholder="Your Address" />
                                        </div>
                                        <div className="col-lg-12 mb-3 accountUpdate">
                                            <label className="form-label">Description</label>
                                            <textarea className="form-control" type="text" name='description' onChange={handleInputChange} value={userData.description} placeholder="Business Description" />
                                        </div>
                                        <div className="col-lg-6 col-md-6 mb-3 accountUpdate">
                                            <article className="box mb-3 bg-light partnerAccDiv">
                                                <button className="btn float-end btn-outline-dark btn-sm mb-3" name='ridernic' onClick={handleClick}>
                                                    <i className="fa fa-id-card" /> Upload</button>
                                                <p className="title mb-0">NIC Copy</p>

                                                <input
                                                    type="file"
                                                    name='ridernic'
                                                    ref={hiddenNICInput}
                                                    onChange={handleNICChange}
                                                    style={{ display: 'none' }}
                                                />
                                                {userDocs['ridernic'] == null ? <></> : <img className='rounded  mb-3' src={userDocs['ridernic']} style={{ height: 70 }}></img>}
                                                <small className="text-muted d-block" style={{ width: '70%' }}>
                                                    Attach the National Identity Card of the company owner here.</small>
                                            </article>
                                        </div>

                                        <div className="col-lg-6 col-md-6 mb-3 accountUpdate">
                                            <article className="box mb-3 bg-light partnerAccDiv">
                                                <button className="btn float-end btn-outline-danger btn-sm mb-3" name='riderlicense' onClick={handleClick}> <i className="fa fa-file-text" /> Upload</button>
                                                <p className="title mb-0">
                                                    License Copy</p>


                                                <input
                                                    type="file"
                                                    name='riderlicense'
                                                    ref={hiddenLicenseInput}
                                                    onChange={handleBRChange}
                                                    style={{ display: 'none' }}
                                                />
                                                {userDocs['riderlicense'] == null ? <></> : <img className='rounded  mb-3' src={userDocs['riderlicense']} style={{ height: 70 }}></img>}

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
                                            <button className="btn  btn-sm btn-light" name='profilepic' onClick={handleClick}>
                                                <i className="fa fa-camera" /> Upload
                                            </button>

                                            <input
                                                type="file"
                                                name='profilepic'
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

export default RiderAccount;
