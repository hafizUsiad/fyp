import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {server} from "../serverconfig";
import TopBar from '../Component/sub component/navbar';
import Sidebar from '../Component/sub component/sidebar';
import { useNavigate } from 'react-router-dom';
function Employees()
{     
    const [user, setUser] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        userrole: "",
        profilePicture: null, // Store file separately
      });

    const [employess, setemployees] = useState([]); // Initialize developers first
    const navigate = useNavigate();
    var userdetail = sessionStorage.getItem("userdetail");
    if (userdetail) {
        // Parse the JSON string into a JavaScript object
        var parsedUserDetail = JSON.parse(userdetail);
      
        // Access the user_role property
        var userrole = parsedUserDetail.user_role;
        var userid = parsedUserDetail.userid;

    }
    const adduser = async (e) => {
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
    useEffect(() => {
   
        if (!sessionStorage.getItem("userdetail")) {
          navigate("/sign-in");
        }

        const fetchemployees = async () => {
          try {
            const response = await axios.get(`${server}/api/getdeveloper`);
            setemployees(response.data); 
          } catch (error) {
            console.error('Error fetching developers:', error);
          }
        };

        fetchemployees();
      
      }, [navigate]);
    return (
        <>
    <div class="wrapper">
    <Sidebar/>
    <TopBar/>      
    <div class="content-page">
     <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-wrap align-items-center justify-content-between breadcrumb-content">
                            <h5>Your Employees</h5>
                            <div class="d-flex align-items-center">                                
                                <div class="list-grid-toggle d-flex align-items-center mr-3">
                                    <div data-toggle-extra="tab" data-target-extra="#grid" class="active">
                                        <div class="grid-icon mr-3">
                                            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
                                            </svg>
                                        </div>
                                    </div>
                                    <div data-toggle-extra="tab" data-target-extra="#list">
                                        <div class="grid-icon">
                                            <svg  width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="pl-3 border-left btn-new">
                                    <a href="#" class="btn btn-primary" data-target="#new-user-modal" data-toggle="modal">New Contact</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="grid" class="item-content animate__animated animate__fadeIn active" data-toggle-extra="tab-content">
            <div class="row">
            {employess.map((employ) => (
                <div class="col-lg-4 col-md-6">
                    <div class="card-transparent card-block card-stretch card-height">
                        <div class="card-body text-center p-0">                            
                            <div class="item">
                                <div class="odr-img">
                                    <img src="../assets/images/user/unknown.jpg" class="img-fluid rounded-circle avatar-90 m-auto" alt="image"/>
                                </div>                        
                                <div class="odr-content rounded">                                          
                                    <h4 class="mb-2">{employ.name}</h4>
                                    <p class="mb-3">{employ.expertise}</p>
                                    <ul className="list-unstyled mb-3">
                                        <li className="bg-secondary-light rounded-circle iq-card-icon-small mr-4" title="Email">
                                            <i className="ri-mail-open-line m-0"></i>
                                        </li>
                                        <li className="bg-primary-light rounded-circle iq-card-icon-small mr-4" title="Chat">
                                            <i className="ri-chat-3-line m-0"></i>
                                        </li>
                                        <li className="bg-success-light rounded-circle iq-card-icon-small" title="Call">
                                            <i className="ri-phone-line m-0"></i>
                                        </li>
                                    </ul>                                   
                                    <div class="pt-3 border-top">
                                        <a href="#" class="btn btn-primary">Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
        <div id="list" class="item-content animate__animated animate__fadeIn" data-toggle-extra="tab-content">
            <div class="table-responsive rounded bg-white mb-4">
                <table class="table mb-0 table-borderless tbl-server-info">
                    <tbody>
                    {employess.map((employ) => (
                        <tr>
                            <td>
                                <div class="media align-items-center">
                                    <img src="../assets/images/user/01.jpg" class="img-fluid rounded-circle avatar-40" alt="image"/>
                                    <h5 class="ml-3">{employ.name}</h5>
                                </div>
                            </td>
                            <td>{employ.email}</td>
                            <td>
                                <div class="media align-items-center">
                                    <div class="bg-secondary-light rounded-circle iq-card-icon-small mr-3"><i class="ri-mail-open-line m-0"></i></div>
                                    <div class="bg-primary-light rounded-circle iq-card-icon-small mr-3"><i class="ri-chat-3-line m-0"></i></div>
                                    <div class="bg-success-light rounded-circle iq-card-icon-small"><i class="ri-phone-line m-0"></i></div>
                                </div>
                            </td>
                            <td>
                                <a href="#" class="btn btn-primary">Message</a>
                            </td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <a href="#" class="text-body"><i class="las la-pen mr-3"></i></a>
                                    <a href="#" class="text-body"><i class="las la-trash-alt mr-0"></i></a>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
   
    </div>
      </div>
    </div>
 
   
    <div class="modal fade bd-example-modal-lg" role="dialog" aria-modal="true" id="new-user-modal">
        <div class="modal-dialog  modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header d-block text-center pb-3 border-bttom">
                    <h3 class="modal-title" id="exampleModalCenterTitle02">New User</h3>
                </div>
                <div class="modal-body">
                <form onSubmit={adduser} enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group mb-3 custom-file-small">
                                <label for="exampleInputText01" class="h5">Upload Profile Picture</label>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="inputGroupFile02"
                                     onChange={(e) => setUser({ ...user, profilePicture: e.target.files[0] })} 
                                    />
                                    <label class="custom-file-label" for="inputGroupFile02">Choose file</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3">
                                <label for="exampleInputText2" class="h5">Full Name</label>
                                <input type="text" class="form-control" id="exampleInputText2" placeholder="Enter your full name"
                                 value={user.name} 
                                 onChange={(e) => setUser({ ...user, name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3">
                                <label for="exampleInputText04" class="h5">Phone Number</label>
                                <input type="text" class="form-control" id="exampleInputText04" placeholder="Enter phone number"
                                 value={user.phone} 
                                 onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3">
                                <label for="exampleInputText006" class="h5">Email</label>
                                <input type="text" class="form-control" id="exampleInputText006" placeholder="Enter your Email"
                                 value={user.email} 
                                 onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3">
                                <label for="exampleInputText006" class="h5">Password</label>
                                <input type="password" class="form-control" id="exampleInputText006" placeholder="Enter your Password"
                                 value={user.password} 
                                 onChange={(e) => setUser({ ...user, password: e.target.value })}
                                />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3">
                                <label for="exampleInputText2" class="h5">Role</label>
                                <select name="type" class="selectpicker form-control" data-style="py-0"
                                 onChange={(e) => setUser({ ...user, userrole: e.target.value })} > 
                                    <option>Role</option>
                                    <option disabled>Choose the User Role</option>
                                    <option value={2}>Product Owner/Customer</option>
                                    <option value={3}>Developer</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="d-flex flex-wrap align-items-ceter justify-content-center mt-2">
                                <button type="submit" class="btn btn-primary mr-3" >Save</button>
                                <div class="btn btn-primary" data-dismiss="modal">Cancel</div>
                            </div>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>   
   
    <footer class="iq-footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6">
                    <ul class="list-inline mb-0">
                        <li class="list-inline-item"><a href="../backend/privacy-policy.html">Privacy Policy</a></li>
                        <li class="list-inline-item"><a href="../backend/terms-of-service.html">Terms of Use</a></li>
                    </ul>
                </div>
                <div class="col-lg-6 text-right">
                    <span class="mr-1"><script>document.write(new Date().getFullYear())</script>©</span> <a href="#" class="">Webkit</a>.
                </div>
            </div>
        </div>
    </footer>
        </>
    )
}

export default Employees;