
import { Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Snackbar from '../SnackBar/Snackbar';

const SnackbarType = {
  success: "success",
  fail: "fail",
};



function RiderLogin() {

  const history = useHistory();
  const snackbarRefErr = useRef(null);


  const [loginInput, setLogin] = useState({
    rideremail: '',
    riderpassword: ''
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value })
  }


  const loginSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      rideremail: loginInput.rideremail,
      riderpassword: loginInput.riderpassword
    }
    console.log("Test");

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('api/riders/login', formData).then(res => {

        if (res.data.status === 200) {
          console.log(res.data.message);
          localStorage.setItem("RiderID",res.data.userdata['riderid'])
          history.push('/riderportal/dashboard');
        }
        else {
          snackbarRefErr.current.show();
        }

      });
    });
  }

  return (
    <div className="container-fluid bgcontainerlogin">
      <Snackbar
        ref={snackbarRefErr}
        message="Invalid Credentials !"
        type={SnackbarType.fail}
      />

      <div className="row px-3">
        <div className="col-lg-10 col-xl-9 card cardcontent flex-row mx-auto px-0">
          <div className="img-left-login riderImgSide d-none d-md-flex"></div>

          <div className="card-body clbody">
            <h4 className="title text-center mt-4">
              Login into account
            </h4>
            <form className="form-box px-3" onSubmit={loginSubmit}>
              <div className="form-input riderInput">
                <span className='faicon riderfaicon'><i className="fa fa-envelope-open-text"></i></span>
                <input type="email" name="rideremail" onChange={handleInput} value={loginInput.rideremail} placeholder="Email Address" tabindex="10" required></input>
              </div>
              <div className="form-input riderInput">
                <span className='faicon riderfaicon'><i className="fa fa-key"></i></span>
                <input type="password" name="riderpassword" onChange={handleInput} value={loginInput.riderpassword} placeholder="Password" required></input>
              </div>
              <div className="mb-3 riderSubmit">
                <button type="submit" className="btn btn-block text-uppercase">
                  Login
                </button>
              </div>
              <hr className="my-4"></hr>

              <div className="text-center mb-2">
                Don't have an account? {' '}
                <Link to='/ewridersignup' className="register-link riderfaicon">
                  Register here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiderLogin;
