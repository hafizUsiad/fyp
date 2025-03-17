import React, { useState } from 'react';
import axios from 'axios';
import {server} from "../serverconfig";
import { useNavigate } from 'react-router-dom';

function Register() {

  const [user, setUser] = useState({ name: '', email: '', password: '',userrole: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${server}/api/register`, user);
      if (res.status === 200) {
        // Store user data in sessionStorage
        // Show success message
        alert(res.data.msg);

        // Redirect to another page, e.g., dashboard
        navigate('/sign-in');
      }      
    } catch (error) {
      alert('Error registering user');
    }
  };

    return (
        <div className="wrapper">
            <section className="login-content">
                <div className="container">
                    <div className="row align-items-center justify-content-center height-self-center">
                        <div className="col-lg-8">
                            <div className="card auth-card">
                                <div className="card-body p-0">
                                    <div className="d-flex align-items-center auth-content">
                                        <div className="col-lg-6 bg-primary content-left">
                                            <div className="p-3">
                                                <h2 className="mb-2 text-white">Sign Up</h2>
                                                <p>Create your Webkit account.</p>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="floating-label form-group">
                                                                <input className="floating-input form-control" type="text" placeholder=" " 
                                                                value={user.name} 
                                                                onChange={(e) => setUser({ ...user, name: e.target.value })} 
                                                                />
                                                                <label>Full Name</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="floating-label form-group">
                                                                <input className="floating-input form-control" type="text" placeholder=" " />
                                                                <label>Last Name</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="floating-label form-group">
                                                                <input className="floating-input form-control" type="email" placeholder=" " 
                                                                value={user.email} 
                                                                onChange={(e) => setUser({ ...user, email: e.target.value })} 
                                                                />
                                                                <label>Email</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="floating-label form-group">
                                                                <select className="floating-input form-control" type="text" placeholder=" " 
                                                                onChange={(e) => setUser({ ...user, password: e.target.value })} 
                                                                >
                                                                    <option disabled>Choose the User Role</option>
                                                                    <option value={2}>Product Owner/Customer</option>
                                                                    <option value={3}>Developer</option>

                                                                </select>
                                                                <label>Phone No.</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="floating-label form-group">
                                                                <input className="floating-input form-control" type="password" placeholder=" " 
                                                                value={user.password} 
                                                                onChange={(e) => setUser({ ...user, password: e.target.value })} 
                                                                />
                                                                <label>Password</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="floating-label form-group">
                                                                <input className="floating-input form-control" type="password" placeholder=" " />
                                                                <label>Confirm Password</label>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="col-lg-12">
                                                            <div className="custom-control custom-checkbox mb-3">
                                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                                <label className="custom-control-label text-white" htmlFor="customCheck1">
                                                                    I agree with the terms of use
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button type="submit" className="btn btn-white">Sign Up</button>
                                                    <p className="mt-3">
                                                        Already have an Account?{" "}
                                                        <a href="/sign-in" className="text-white text-underline">Sign In</a>
                                                    </p>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 content-right">
                                            <img src="../assets/images/login/01.png" className="img-fluid image-right" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Register;
