import React from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage/landing';
import Login from './pages/LoginPage/login'
import Signup from './pages/SignUp/signup'
import Dashboard from './pages/AdminDashboard/Dashboard/dashboard';
import PartnerDashboard from './pages/PartnerDashboard/Dashboard/Dashboard';
import axios from 'axios';

axios.defaults.baseURL="http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.headers.post['Accept']='application/json';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>     
            <Route exact path="/" component={LandingPage}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={Signup}></Route>

            <Route path="/adminportal" name="AdminPortal" render={(props) => <Dashboard {...props}/>}></Route>
            <Route path="/partnerportal" name="PartnerPortal" render={(props) => <PartnerDashboard {...props}/>}></Route>

        </Switch>

      </BrowserRouter>

    </div>
  );
}

export default App;
