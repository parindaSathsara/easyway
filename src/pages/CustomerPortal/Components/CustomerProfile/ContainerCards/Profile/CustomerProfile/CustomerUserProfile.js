import { useEffect, useState, useRef } from "react";

import './CustomerUserProfile.css'
import axios from 'axios';
import storage from '../../../../../../../firebase-config';
import Snackbar from "../../../../../../SnackBar/Snackbar";
import LoadingBar from "react-top-loading-bar";
import { NavLink } from "react-router-dom";

const SnackbarType = {
    success: "success",
    fail: "fail",
};

function CustomerUserProfile() {

    const snackbarRef = useRef(null);
    const snackbarRefErr = useRef(null);

    const [progress, setProgress] = useState(0)
    const [userImage, setUserImage] = useState([])
    const hiddenFileInput = useRef(null)
    const [userData, setUserData] = useState({
        'customerid': localStorage.getItem("customerid"),
        'customername': '',
        'customeremail': '',
        'profilepic': '',
        'customerdistrict': '',
        'customerpassword': '',
        'customerusername': '',
        'customercontact': '',
        'customerhomeaddress': '',
    })


    const handleChange = (event) => {

        const fileUploaded = event.target.files[0];
        setUserImage({ ...userImage, imageView: URL.createObjectURL(fileUploaded), imageToUpload: fileUploaded })
    }


    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }




    const formOnSubmit = (e) => {

        const promises = [];

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
                            setProgress(50)
                        });
                }
            );
        }


        Promise.all(promises)
            .then(() => {
                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('api/customers/updateCustomer', userData).then(res => {

                        if (res.data.status === 200) {
                            snackbarRef.current.show();
                            console.log("Done Updated")
                            setProgress(100)

                        }

                        else {
                            snackbarRefErr.current.show();
                            console.log(res.data.validator_errors);
                            console.log(res.data.status)
                        }

                    });
                });

            });


    }


    const handleClick = (e) => {
        hiddenFileInput.current.click();
    }

    useEffect(() => {

        axios.get(`/api/customers/getCustomerByID/${localStorage.getItem("customerid")}`).then(res => {

            if (res.data.status === 200) {
                setUserData(res.data.customers[0]);
                setUserImage({ ...userImage, imageView: res.data.customers[0]['profilepic'] })
            }

        })

    }, []);
    return (
        <div>
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


                    <article className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="row gx-">
                                        <div className="col-lg-12 mb-5 accountUpdate">
                                            <label className="form-label">Name</label>
                                            <input className="form-control" type="text" name='customername' onChange={handleInputChange} value={userData.customername} placeholder="Your Name" />
                                        </div>
                                        <div className="col-lg-6 mb-5 accountUpdate">
                                            <label className="form-label">Contact</label>
                                            <input className="form-control" type="text" name='customercontact' onChange={handleInputChange} value={userData.customercontact} placeholder="Your Phone Number" />
                                        </div>
                                        <div className="col-lg-6 mb-5 accountUpdate">
                                            <label className="form-label">Email</label>
                                            <input className="form-control" type="text" name='customeremail' onChange={handleInputChange} value={userData.customeremail} placeholder="Your Email" />
                                        </div>
                                        <div className="col-lg-12 mb-5 accountUpdate">
                                            <label className="form-label">Customer Home Address</label>
                                            <input className="form-control" type="text" name='customerhomeaddress' onChange={handleInputChange} value={userData.customerhomeaddress} placeholder="Your Home Address" />
                                        </div>
                                        <div className="col-lg-12 mb-5 accountUpdate">
                                            <label className="form-label">District</label>
                                            <select className="form-control" id="customerdistrict" onChange={handleInputChange} value={userData.customerdistrict} name='customerdistrict'>
                                                <option disabled selected>Your District</option>
                                                <option value="Galle" >Galle</option>
                                                <option value="Matara">Matara</option>
                                                <option value="Hambanthota">Hambanthota</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-12 mb-5 accountUpdate">
                                            <label className="form-label">Username</label>
                                            <input className="form-control" type="text" name='customerusername' onChange={handleInputChange} value={userData.customerusername} placeholder="Your Username" />
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

                                        </figcaption>
                                    </figure>
                                </aside>

                            </div>
                            <br />
                            <button className="btn btn-primary" type="submit" onClick={formOnSubmit}>Update changes</button>
                        </div>
                    </article>


            </div>

    );
}


export default CustomerUserProfile;