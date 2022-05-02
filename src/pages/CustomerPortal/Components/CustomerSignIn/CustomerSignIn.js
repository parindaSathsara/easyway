import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import UserSignFooter from "../UserSignHeader/UserFooter";
import UserSignHeaders from "../UserSignHeader/UserSignHeader";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '../../../SnackBar/Snackbar'

const SnackbarType = {
    success: "success",
    fail: "fail",
};


function CustomerSignIn() {

    const history = useHistory();
    const snackbarRefErr = useRef(null);
    const [formData, setFormData] = useState({
        'customeremail': '',
        'customerpassword': '',
    })


    useEffect(() => {
        import(`../../MasterPage/css/boostrap.css`)
        import(`../../MasterPage/css/ui.css`)
        import(`../../MasterPage/css/responsive.css`)
    }, []);

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const loginSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        axios.post('api/customers/loginCustomer', formData).then(res => {
            
            if (res.data.status === 200) {
                // snackbarRef.current.show();
                history.push('/customerportal');
                localStorage.setItem("customerid",res.data.user['customerid'])
                localStorage.setItem("username",res.data.user['customername'])
                localStorage.setItem("userprofile",res.data.user['profilepic'])
            }

            else {
                snackbarRefErr.current.show();
                console.log(res.data.validator_errors);
                console.log(res.data.status)
            }

        });
    }

    return (

        <>
            <Snackbar
                ref={snackbarRefErr}
                message="Invalid Credentials !"
                type={SnackbarType.fail}
            />

            <UserSignHeaders></UserSignHeaders>
            <section className="padding-y" style={{ minHeight: '90vh' }}>
                <div className="card shadow mx-auto" style={{ maxWidth: '400px', marginTop: '40px' }}>
                    <div className="card-body">
                        <h4 className="card-title mb-4">Sign in</h4>
                        <form onSubmit={loginSubmit}>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input className="form-control" placeholder="Enter Your Email" onChange={handleOnChange} name="customeremail" type="text" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input className="form-control" placeholder="Enter Your Password" onChange={handleOnChange} name="customerpassword" type="password" />
                            </div>
                            <div className="mb-4">
                                <button type="submit" className="btn btn-primary w-100"> Login</button>
                            </div>
                        </form>
                        <hr />
                        <p className="text-center mb-2">Haven't account? <NavLink className="customerNavLink" to="customersignup">Signup</NavLink></p>
                    </div>
                </div>
            </section>

            <UserSignFooter></UserSignFooter>
        </>

    );
}


export default CustomerSignIn;