import './signup.css';
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

function SignUp() {

  const history = useHistory();

  const snackbarRef = useRef(null);
  const snackbarRefErr = useRef(null);

  useEffect(() => {
  }, []);

  const [registerUser, setRegister] = useState({
    username: '',
    email: '',
    nic: '',
    contact: '',
    password: '',
    district: '',
    role: '',
    error_list: [],
  })

  const handleInput = (e) => {
    setRegister({ ...registerUser, [e.target.name]: e.target.value });
  }





  const saveEmployee = async (e) => {
    e.preventDefault();

    const dataset = {
      username: registerUser.username,
      email: registerUser.email,
      nic: registerUser.nic,
      contact: registerUser.contact,
      password: registerUser.password,
      district: registerUser.district,
      role: registerUser.role,
    };


    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('api/registerEmployee', dataset).then(res => {

        if (res.data.status === 200) {
          history.push('/login');
        }
        else {
          console.log(res.data.validator_errors);
          setRegister({ ...registerUser, error_list: res.data.validator_errors});
          snackbarRefErr.current.show();
        }
      });
    });



    var contact = registerUser.contact;
    var username = registerUser.username;

    var message = "Hello Dear " + username + ". Thank you for register to the Easy Way Admin Portal."
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
          <div className="img-left d-none d-md-flex"></div>

          <div className="card-body clbodysignup">
            <h4 className="title text-center mt-4">
              Register new account
            </h4>
            <form className="form-box px-3" id="signupform" onSubmit={saveEmployee}>

              <div className="form-input">
                <span className='faicon'><i className="fa fa-user"></i></span>
                <input type="text" name="username" id="username" placeholder="Employee Username" tabindex="10" onChange={handleInput} value={registerUser.username}></input>
                <span className='spanerror'>{registerUser.error_list.username}</span>
              </div>

              <div className="form-input">
                <span className='faicon'><i className="fa fa-envelope"></i></span>
                <input type="text" name="email" id="email" placeholder="Email Address" tabindex="10" onChange={handleInput} value={registerUser.email}></input>
                <span className='spanerror'>{registerUser.error_list.email}</span>
              </div>

              <div className="form-input">
                <span className='faicon'><i className="fa fa-address-card"></i></span>
                <input type="text" name="nic" id="nic" placeholder="Employee NIC" onChange={handleInput} value={registerUser.nic}></input>
                <span className='spanerror'>{registerUser.error_list.nic}</span>
              </div>

              <div className="form-input">
                <span className='faicon'><i className="fa fa-phone"></i></span>
                <input type="text" name="contact" id="contact" placeholder="Employee Contact" onChange={handleInput} value={registerUser.contact}></input>
                <span className='spanerror'>{registerUser.error_list.contact}</span>
              </div>

              <div className="form-input">
                <span className='faicon'><i className="fa fa-key"></i></span>
                <input type="password" name="password" id="password" placeholder="Employee Password" onChange={handleInput} value={registerUser.password}></input>
                <span className='spanerror'>{registerUser.error_list.password}</span>
              </div>

              <div className="form-input">
                <span><i className="fa fa-map-marker"></i></span>
                <select className="form-control selectOpt" id="district" name='district' onChange={handleInput} value={registerUser.district}>
                  <option selected disabled>Employee District</option>
                  <option value="Galle" >Galle</option>
                  <option value="Matara">Matara</option>
                  <option value="Hambanthota">Hambanthota</option>
                </select>
                <span className='spanerror'>{registerUser.error_list.district}</span>
              </div>

              <div className="form-input">
                <span><i className="fa fa-users"></i></span>
                <select className="form-control selectOpt" id="role" name='role' placeholder='Employee Role' onChange={handleInput} value={registerUser.role}>
                  <option selected disabled>Employee Role</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Finance Officer">Finance Officer</option>
                  <option value="HR Manager">HR Manager</option>
                  <option value="Cleark">Cleark</option>
                  <option value="Vehicle Officer">Vehicle Officer</option>
                </select>
                <span className='spanerror'>{registerUser.error_list.role}</span>
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-block text-uppercase">
                  Sign up
                </button>
              </div>
              <hr className="my-4"></hr>

              <div className="text-center mb-2">
                Already have an account?{' '}
                <Link to='/login' className="register-link">
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

export default SignUp;

