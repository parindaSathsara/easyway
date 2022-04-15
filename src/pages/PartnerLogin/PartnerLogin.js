
import { Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Snackbar from '../SnackBar/Snackbar';

const SnackbarType = {
  success: "success",
  fail: "fail",
};



function PartnerLogin() {

  const history = useHistory();
  const snackbarRefErr = useRef(null);


  const [loginInput, setLogin] = useState({
    email: '',
    password: ''
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value })
  }


  const loginSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: loginInput.email,
      password: loginInput.password
    }
    console.log("Test");

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('api/partners/login', formData).then(res => {

        if (res.data.status === 200) {
          console.log(res.data.message);
          localStorage.setItem("PartnerID",res.data.userdata['partnerid'])
          history.push('/partnerportal/dashboard');
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
          <div className="img-left-login partnerImgSide d-none d-md-flex"></div>

          <div className="card-body clbody">
            <h4 className="title text-center mt-4">
              Login into account
            </h4>
            <form className="form-box px-3" onSubmit={loginSubmit}>
              <div className="form-input partnerInput">
                <span className='faicon partnerfaicon'><i className="fa fa-envelope-open-text"></i></span>
                <input type="email" name="email" onChange={handleInput} value={loginInput.email} placeholder="Email Address" tabindex="10" required></input>
              </div>
              <div className="form-input partnerInput">
                <span className='faicon partnerfaicon'><i className="fa fa-key"></i></span>
                <input type="password" name="password" onChange={handleInput} value={loginInput.password} placeholder="Password" required></input>
              </div>
              <div className="mb-3 partnerSubmit">
                <button type="submit" className="btn btn-block text-uppercase">
                  Login
                </button>
              </div>
              <hr className="my-4"></hr>

              <div className="text-center mb-2">
                Don't have an account? {' '}
                <Link to='/ewpartnersignup' className="register-link partnerfaicon">
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

export default PartnerLogin;
