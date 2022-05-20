import './RiderSignUp.css';
import { Link } from 'react-router-dom';
import React, { Component, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'react-notifications-component/dist/theme.css';
import signupValidation from './signupvalidation';
import Snackbar from '../SnackBar/Snackbar';
import { useHistory } from 'react-router-dom';

const SnackbarType = {
  success: "success",
  fail: "fail",
};

function RiderSignUp() {

  const history = useHistory();

  const snackbarRef = useRef(null);
  const snackbarRefErr = useRef(null);
  const [services, setServices] = useState([])


  useEffect(() => {

  }, []);



  const [registerUser, setRegister] = useState({
    rideremail: '',
    riderpassword: '',
    riderusername: '',
    riderdistrict: '',
    error_list:[],
  })

  const handleInput = (e) => {
    setRegister({ ...registerUser, [e.target.name]: e.target.value });
  }


  const saverider = async (e) => {
    e.preventDefault();

    const dataset = {
      riderusername: registerUser.riderusername,
      riderpassword: registerUser.riderpassword,
      rideremail: registerUser.rideremail,
      riderdistrict: registerUser.riderdistrict,
    };


    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('api/riderRegister', dataset).then(res => {

        if (res.data.status === 200) {

          snackbarRef.current.show();
          setTimeout(() => {
            history.push('/ewriderlogin');
          }, 3000);
        }
        else {
          console.log(res.data.validator_errors);
          setRegister({ ...registerUser, error_list: res.data.validator_errors });
          snackbarRefErr.current.show();
        }
      });
    });

    // var contact = registerUser.contact;
    // var username = registerUser.username;

    // var message = "Hello Dear " + username + ". Thank you for register to the Easy Way Admin Portal."
    //axios.post('https://app.notify.lk/api/v1/send?user_id=15060&api_key=wwVghBwtFySHwhyuVdLk&sender_id=NotifyDEMO&to=94' + contact + '&message=' + message);
  }

  return (
    <div className="container-fluid bgcontainer">

      <Snackbar
        ref={snackbarRef}
        message="Registration Successfully Please Login To The System!"
        type={SnackbarType.success}
      />
      <Snackbar
        ref={snackbarRefErr}
        message="Registration Error Plese Fill All The Fields & Try Again!"
        type={SnackbarType.fail}
      />


      <div className="row px-3">
        <div className="col-lg-10 col-xl-9 card cardcontent cardcontentsignup flex-row mx-auto px-0">
          <div className="img-left riderImgSide d-none d-md-flex"></div>

          <div className="card-body clbodysignup clBodySignupRider">
            <h4 className="title text-center mt-4">
              Welcome To Easy Way
            </h4>
            <form className="form-box px-3" id="signupform" onSubmit={saverider}>

              <div className="form-input riderInput">
                <span className='faicon riderfaicon'><i className="fa fa-envelope"></i></span>
                <input type="text" name="rideremail" id="rideremail" placeholder="Email" tabindex="10" onChange={handleInput} value={registerUser.rideremail}></input>
                <span className='spanerror'>{registerUser.error_list.email}</span>
              </div>

              <div className="form-input riderInput">
                <span className='faicon riderfaicon'><i className="fa fa-user"></i></span>
                <input type="text" name="riderusername" id="riderusername" placeholder="Employee Username" tabindex="10" onChange={handleInput} value={registerUser.riderusername}></input>
                <span className='spanerror'>{registerUser.error_list.username}</span>
              </div>

              <div className="form-input riderInput">
                <span className='faicon riderfaicon'><i className="fa fa-key"></i></span>
                <input type="password" name="riderpassword" id="riderpassword" placeholder="Password" onChange={handleInput} value={registerUser.riderpassword}></input>
                <span className='spanerror'>{registerUser.error_list.password}</span>
              </div>

              <div>
                <div className="form-input riderInput">
                  <span className='riderfaicon'><i className="fa fa-map-marker"></i></span>
                  <select className="form-control selectOpt riderSelect" id="riderdistrict" name='riderdistrict' onChange={handleInput} value={registerUser.riderdistrict}>
                    <option redonly selected>Your District</option>
                    <option value="Galle" >Galle</option>
                    <option value="Matara">Matara</option>
                    <option value="Hambanthota">Hambanthota</option>
                  </select>
                  <span className='spanerror'>{registerUser.error_list.district}</span>
                </div>
              </div>

              <div className="mb-3 riderSubmit">
                <button type="submit" className="btn btn-block text-uppercase">
                  Sign up
                </button>
              </div>
              <hr className="my-4"></hr>

              <div className="text-center mb-2" style={{ fontColor: 'black' }}>
                Already have an account?{' '}
                <Link to='/ewriderlogin' className="register-link riderfaicon">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default RiderSignUp;

