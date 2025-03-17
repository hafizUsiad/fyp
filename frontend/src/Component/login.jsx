import React, { useState } from 'react';
import axios from 'axios';
import {server} from "../serverconfig";
import { useNavigate } from 'react-router-dom';

function Login ()
{
   const [user, validateuser] = useState({ email: '', password: ''});
   const navigate = useNavigate();
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const res = await axios.post(`${server}/api/login`, user);
 
       if (res.status === 200) {
         // Store user data in sessionStorage
         sessionStorage.setItem('userdetail', JSON.stringify(res.data.userdata));
 
         // Show success message
         alert(res.data.msg);
 
         // Redirect to another page, e.g., dashboard
         navigate('/');
       }          
       } catch (error) {
       alert('Error logining user');
     }
   };
    return(
        <div>
    
      <div class="wrapper">
      <section class="login-content">
         <div class="container">
            <div class="row align-items-center justify-content-center height-self-center">
               <div class="col-lg-8">
                  <div class="card auth-card">
                     <div class="card-body p-0">
                        <div class="d-flex align-items-center auth-content">
                           <div class="col-lg-6 bg-primary content-left">
                              <div class="p-3">
                                 <h2 class="mb-2 text-white">Sign In</h2>
                                 <p>Login to stay connected.</p>
                                 <form onSubmit={handleSubmit}>
                                    <div class="row">
                                       <div class="col-lg-12">
                                          <div class="floating-label form-group">
                                             <input class="floating-input form-control" type="email" placeholder=" "
                                              value={user.email} 
                                              onChange={(e) => validateuser({ ...user, email: e.target.value })} 
                                             />
                                             <label>Email</label>
                                          </div>
                                       </div>
                                       <div class="col-lg-12">
                                          <div class="floating-label form-group">
                                             <input class="floating-input form-control" type="password" placeholder=" "
                                              value={user.password} 
                                              onChange={(e) => validateuser({ ...user, password: e.target.value })} 
                                             />
                                             <label>Password</label>
                                          </div>
                                       </div>
                                       <div class="col-lg-6">
                                          <div class="custom-control custom-checkbox mb-3">
                                             <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                                             <label class="custom-control-label control-label-1 text-white" for="customCheck1">Remember Me</label>
                                          </div>
                                       </div>
                                       <div class="col-lg-6">
                                          <a href="auth-recoverpw.html" class="text-white float-right">Forgot Password?</a>
                                       </div>
                                    </div>
                                    <button type="submit" class="btn btn-white">Sign In</button>
                                    <p class="mt-3">
                                       Create an Account <a href="/sign-up" class="text-white text-underline">Sign Up</a>
                                    </p>
                                 </form>
                              </div>
                           </div>
                           <div class="col-lg-6 content-right">
                              <img src="../assets/images/login/01.png" class="img-fluid image-right" alt=""/>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      </div>
    
        </div>
    )
}

export default Login;