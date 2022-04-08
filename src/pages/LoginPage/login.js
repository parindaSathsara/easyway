import './login.css';
import { Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Snackbar from '../SnackBar/Snackbar';

const SnackbarType = {
  success: "success",
  fail: "fail",
};



function Login() {

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

    const res = await axios.post('http://127.0.0.1:8000/api/login', formData);
    console.log("Test1");
    console.log(res.data);

    if (res.data.status === 200) {
      console.log(res.data.message);
      history.push('/adminportal/dashboard');
    }
    else {
      snackbarRefErr.current.show();

    }
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
          <div className="img-left-login d-none d-md-flex"></div>

          <div className="card-body clbody">
            <h4 className="title text-center mt-4">
              Login into account
            </h4>
            <form className="form-box px-3" onSubmit={loginSubmit}>
              <div className="form-input">
                <span><i className="fa fa-envelope-open-text"></i></span>
                <input type="email" name="email" onChange={handleInput} value={loginInput.email} placeholder="Email Address" tabindex="10" required></input>
              </div>
              <div className="form-input">
                <span><i className="fa fa-key"></i></span>
                <input type="password" name="password" onChange={handleInput} value={loginInput.password} placeholder="Password" required></input>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-block text-uppercase">
                  Login
                </button>
              </div>
              <hr className="my-4"></hr>

              <div className="text-center mb-2">
                Don't have an account? {' '}
                <Link to='/signup' className="register-link">
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

export default Login;
