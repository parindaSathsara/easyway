import './PartnerSignup.css';
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

function PartnerSignUp() {

  const history = useHistory();

  const snackbarRef = useRef(null);
  const snackbarRefErr = useRef(null);
  const [services, setServices] = useState([])


  useEffect(() => {

    axios.get(`/api/getservices`).then(res => {

      if (res.data.status === 200) {
        setServices(res.data.services);
      }

    })

  }, []);



  const [registerUser, setRegister] = useState({
    email: '',
    password: '',
    username: '',
    district: '',
    serviceid: '',
    error_list: [],
  })

  const handleInput = (e) => {
    setRegister({ ...registerUser, [e.target.name]: e.target.value });
  }


  const savePartner = async (e) => {
    e.preventDefault();

    const dataset = {
      username: registerUser.username,
      password: registerUser.password,
      email: registerUser.email,
      district: registerUser.district,
      serviceid: registerUser.serviceid
    };


    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('api/partnerRegister', dataset).then(res => {

        if (res.data.status === 200) {
          history.push('/login');
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
        message="Registration Successfully!"
        type={SnackbarType.success}
      />
      <Snackbar
        ref={snackbarRefErr}
        message="Registration Error Plese Try Again!"
        type={SnackbarType.fail}
      />


      <div className="row px-3">
        <div className="col-lg-10 col-xl-9 card cardcontent cardcontentsignup flex-row mx-auto px-0">
          <div className="img-left partnerImgSide d-none d-md-flex"></div>

          <div className="card-body clbodysignup">
            <h4 className="title text-center mt-4">
              Welcome To Easy Way
            </h4>
            <form className="form-box px-3" id="signupform" onSubmit={savePartner}>

              <div className="form-input partnerInput">
                <span className='faicon partnerfaicon'><i className="fa fa-envelope"></i></span>
                <input type="text" name="email" id="email" placeholder="Email" tabindex="10" onChange={handleInput} value={registerUser.email}></input>
                <span className='spanerror'>{registerUser.error_list.email}</span>
              </div>

              <div className="form-input partnerInput">
                <span className='faicon partnerfaicon'><i className="fa fa-user"></i></span>
                <input type="text" name="username" id="username" placeholder="Employee Username" tabindex="10" onChange={handleInput} value={registerUser.username}></input>
                <span className='spanerror'>{registerUser.error_list.username}</span>
              </div>

              <div className="form-input partnerInput">
                <span className='faicon partnerfaicon'><i className="fa fa-key"></i></span>
                <input type="password" name="password" id="password" placeholder="Password" onChange={handleInput} value={registerUser.password}></input>
                <span className='spanerror'>{registerUser.error_list.password}</span>
              </div>

              <div>
                <div className="form-input partnerInput">
                  <span className='partnerfaicon'><i className="fa fa-map-marker"></i></span>
                  <select className="form-control selectOpt partnerSelect" id="district" name='district' onChange={handleInput} value={registerUser.district}>
                    <option disabled selected>Your District</option>
                    <option value="Galle" >Galle</option>
                    <option value="Matara">Matara</option>
                    <option value="Hambanthota">Hambanthota</option>
                  </select>
                  <span className='spanerror'>{registerUser.error_list.district}</span>
                </div>
              </div>

              <div>
                <div className="form-input">
                  <span className='partnerfaicon'><i className="fa fa-bullhorn"></i></span>
                  <select className="form-control selectOpt partnerSelect" id="serviceid" name='serviceid' onChange={handleInput}>
                    <option selected disabled>Your Service</option>
                    {services.map((service) => (
                      <option value={service['serviceid']}>{service['servicename']}</option>
                    ))}
                  </select>
                  <span className='spanerror'>{registerUser.error_list.serviceid}</span>
                </div>
              </div>


              <div className="mb-3 partnerSubmit">
                <button type="submit" className="btn btn-block text-uppercase">
                  Sign up
                </button>
              </div>
              <hr className="my-4"></hr>

              <div className="text-center mb-2" style={{ fontColor: 'black' }}>
                Already have an account?{' '}
                <Link to='/ewpartnerlogin' className="register-link partnerfaicon">
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

export default PartnerSignUp;

