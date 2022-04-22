import React from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage/landing';
import Login from './pages/LoginPage/login'
import Signup from './pages/SignUp/signup'
import Dashboard from './pages/AdminDashboard/Dashboard/dashboard';
import PartnerDashboard from './pages/PartnerDashboard/Dashboard/Dashboard';
import axios from 'axios';
import CustomerNavBar from './pages/CustomerPortal/Components/NavBar/NavBar';
import CustomerNavBarSecondary from './pages/CustomerPortal/Components/NavBarSecondary/NavBarSecondary';
import NavigatorCus from './pages/CustomerPortal/Components/Navigator/Navigator';
import ListingView from './pages/CustomerPortal/Components/ListingViewPage/ListingView';
import PartnerSignup from './pages/PartnerSignUp/PartnerSignup'
import PartnerLogin from './pages/PartnerLogin/PartnerLogin';
import CustomerMainPage from './pages/CustomerPortal/Components/MainPage/MainPage';
import PartnerProfilePage from './pages/CustomerPortal/Components/PartnerProfilePage/PartnerProfilePage';
import CustomerSignUp from './pages/CustomerPortal/Components/CustomerSignUp/CustomerSignUp';
import CustomerSignIn from './pages/CustomerPortal/Components/CustomerSignIn/CustomerSignIn';
import CustomerOrder from './pages/CustomerPortal/Components/CustomerOrder/CustomerOrder';

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
            <Route exact path="/ewpartnersignup" component={PartnerSignup}></Route>
            <Route exact path="/ewpartnerlogin" component={PartnerLogin}></Route>
            <Route exact path="/customersignup" component={CustomerSignUp}></Route>
            <Route exact path="/customerlogin" component={CustomerSignIn}></Route>
            <Route exact path="/customerorder" component={CustomerOrder}></Route>


            <Route exact path="/customerportal/partnerprofilepage/:id" component={PartnerProfilePage}></Route>
            <Route exact path="/customerportal" component={CustomerMainPage}></Route>
            <Route path="/adminportal" name="AdminPortal" render={(props) => <Dashboard {...props}/>}></Route>
            <Route path="/partnerportal" name="PartnerPortal" render={(props) => <PartnerDashboard {...props}/>}></Route>


            <Route exact path="/customerportal/listing/:id" component={ListingView}></Route>


        </Switch>

      </BrowserRouter>

    </div>
  );
}

export default App;
