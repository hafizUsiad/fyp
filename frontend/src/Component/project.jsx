import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {server} from "../serverconfig";
import { useNavigate } from 'react-router-dom';
import TopBar from '../Component/sub component/navbar';
import Sidebar from '../Component/sub component/sidebar';

function Project()
{
    const navigate = useNavigate();
    
    const [project, setProject] = useState({ name: '', desc: '', owner: '' });
    const [owners, setOwners] = useState([]);  // State to store owners list
    const [projects, setProjects] = useState([]);
    var userdetail = sessionStorage.getItem("userdetail");
    if (userdetail) {
        // Parse the JSON string into a JavaScript object
        var parsedUserDetail = JSON.parse(userdetail);
      
        // Access the user_role property
        var userrole = parsedUserDetail.user_role;
        var userid = parsedUserDetail.userid;

    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `${process.env.PUBLIC_URL}/assets/js/app.js`;
        script.async = true;
        document.body.appendChild(script);
        // Check if userdetail exists in session storage
        if (!sessionStorage.getItem("userdetail")) {
          // Redirect to sign-in page if user is not logged in
          navigate("/sign-in");
        }
      
        const fetchProjects = async () => {
            try {
              const response = await axios.get(`${server}/api/project/allprojects`,{
                params: {
                  userrole,
                  userid,
                },
              });
              setProjects(response.data); // Set the response data to state
            } catch (error) {
              console.error('Error fetching projects:', error);
            }
          };

          
      
        const fetchOwners = async () => {
            try {
              const response = await axios.get(`${server}/api/getowner`); // Update the URL as per your API
              setOwners(response.data); // Assuming the response is an array of owners
            } catch (error) {
              alert('Error fetching owners');
            }
          };
      
          
         
                fetchProjects();
                fetchOwners();
            
      }, [navigate]);
     
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(`${server}/api/project/createproject`, project);
          alert(res.data.msg);
          navigate("/project");
        } catch (error) {
          alert('Error registering project');
        }
       
      };
    
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
                            <h5>Your Projects</h5>
                            <div class="d-flex flex-wrap align-items-center justify-content-between">
                                <div class="dropdown status-dropdown mr-3">
                                    <div class="dropdown-toggle" id="dropdownMenuButton03" data-toggle="dropdown">
                                    <div class="btn bg-body"><span class="h6">Status :</span> In Progress<i class="ri-arrow-down-s-line ml-2 mr-0"></i></div>
                                    </div>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton03">
                                        <a class="dropdown-item" href="#"><i class="ri-mic-line mr-2"></i>In Progress</a>
                                        <a class="dropdown-item" href="#"><i class="ri-attachment-line mr-2"></i>Priority</a>
                                        <a class="dropdown-item" href="#"><i class="ri-file-copy-line mr-2"></i>Category</a> 
                                    </div>
                                </div>
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
                                {userrole === 1 ? (
                                <div class="pl-3 border-left btn-new">
                                    <a href="#" class="btn btn-primary" data-target="#new-project-modal" data-toggle="modal">New Project</a>
                                </div>
                                ):null}
                                   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="grid" class="item-content animate__animated animate__fadeIn active" data-toggle-extra="tab-content">
        <div className="row">
  {projects.length > 0 ? (
    projects.map((project, index) => (
      <div className="col-lg-4 col-md-6" key={project.project_id}>
        <a href={`/project/start/${project.project_id}`}>
          <div className="card card-block card-stretch card-height">
            <div 
              className="card-body" 
              style={{
                backgroundImage: `url('DALL·E 2025-02-12 14.20.56 - A professional and modern background image representing project management and estimation. The design includes abstract charts, task boards, and workf.jpg')`, 
                backgroundSize: "cover", 
                backgroundPosition: "center", 
                backgroundRepeat: "no-repeat",
                borderRadius: "10px"
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div
                  id={`circle-progress-${index + 1}`}
                  className="circle-progress circle-progress-primary"
                  data-min-value="0"
                  data-max-value="100"
                  data-value={Math.floor(Math.random() * 100)}
                  data-type="percent"
                ></div>
                <i className="ri-star-fill m-0 text-warning"></i>
              </div>
              <h5 className="mb-1">{project.project_name}</h5>
              <p className="mb-3 text-dark">{project.project_description}</p>
              <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                <div className="iq-media-group">
                  {project.users && project.users.trim() ? (
                    project.users.split(',').map((user, index) => (
                      <a href="#" className="iq-media" key={index}>
                        <img
                          className="img-fluid avatar-40 rounded-circle"
                          src={user.trim()} // Assuming 'users' field contains image URLs as a comma-separated string
                          alt="User"
                        />
                      </a>
                    ))
                  ) : (
                    <a href={`/project/start/${project.project_id}`} className="iq-media">
                      Assign Team<i className="ri-user-add-line mr-0"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    ))
  ) : (
    <p>No projects found.</p>
  )}
</div>

        </div>
        <div id="list" class="item-content animate__animated animate__fadeIn" data-toggle-extra="tab-content">
        <div className="row">
  {projects.length > 0 ? (
    projects.map((project, index) => (
      <div className="col-lg-6" key={project.project_id}>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-8">
                <div className="d-flex align-items-center">
                  <div
                    id={`circle-progress-${index + 1}`}
                    className= "circle-progress circle-progress-primary"
                    data-min-value="0"
                    data-max-value="100"
                    data-value="25" // Replace this with dynamic progress value if available
                    data-type="percent"
                  ></div>
                  <div className="ml-3">
                    <h5 className="mb-1">{project.project_name}</h5>
                    <p className="mb-0">{project.project_description}</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 text-sm-right mt-3 mt-sm-0">
                <div className="iq-media-group">
                  {project.users &&
                    project.users.split(',').map((user, userIndex) => (
                      <a href="#" className="iq-media" key={userIndex}>
                        <img
                          className="img-fluid avatar-40 rounded-circle"
                          src={user.trim()} // Assuming 'users' contains image URLs
                          alt="User"
                        />
                      </a>
                    ))}
                </div>
                <a className="btn btn-white text-primary link-shadow">
                  {project.priority || 'Low'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>No projects found.</p>
  )}
</div>

        </div>
    </div>
      </div>
    </div>

    <div class="modal fade" role="dialog" aria-modal="true" id="new-project-modal">
        <div class="modal-dialog  modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header d-block text-center pb-3 border-bttom">
                    <h3 class="modal-title" id="exampleModalCenterTitle01">New Project</h3>
                </div>
                <form onSubmit={handleSubmit}>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group mb-3">
                                <label for="exampleInputText01" class="h5">Project Name*</label>
                                <input type="text" class="form-control" id="exampleInputText01" placeholder="Project Name"
                                 value={project.name} 
                                 onChange={(e) => setProject({ ...project, name: e.target.value })} 
                                />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3">
                                <label for="exampleInputText2" class="h5">Categories *</label>
                                <select name="type" class=" form-control" data-style="py-0">
                                    <option>Category</option>
                                    <option>Android</option>
                                    <option>IOS</option>
                                    <option>Ui/Ux Design</option>
                                    <option>Development</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3">
                                <label for="exampleInputText07" class="h5">Assign Owner*</label>
                                <select name="type" class=" form-control" data-style="py-0"
                                 value={project.owner} 
                                 onChange={(e) => setProject({ ...project, owner: e.target.value })}
                                >
                                    <option>Choose the Owner</option>
                                    {owners.length > 0 ? (
                                        owners.map((owner) => (
                                            <option key={owner.userid} value={owner.userid}>
                                            {owner.name}
                                            </option>
                                        ))
                                        ) : (
                                        <option disabled>Loading owners...</option>
                                     )}                                    
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-3">
                                <label for="exampleInputText07" class="h5">Project Description*</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
                                value={project.desc} 
                                 onChange={(e) => setProject({ ...project, desc: e.target.value })} 
                                 ></textarea>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="d-flex flex-wrap align-items-ceter justify-content-center mt-2">
                                <button type='submit' class="btn btn-primary mr-3" >Save</button>
                                <div class="btn btn-primary" data-dismiss="modal">Cancel</div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>    <div class="modal fade bd-example-modal-lg" role="dialog" aria-modal="true" id="new-task-modal">
        <div class="modal-dialog  modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header d-block text-center pb-3 border-bttom">
                    <h3 class="modal-title" id="exampleModalCenterTitle">New Task</h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group mb-3">
                                <label for="exampleInputText02" class="h5">Task Name</label>
                                <input type="text" class="form-control" id="exampleInputText02" placeholder="Enter task Name"/>
                                <a href="#" class="task-edit text-body"><i class="ri-edit-box-line"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="form-group mb-3">
                                <label for="exampleInputText2" class="h5">Assigned to</label>
                                <select name="type" class="selectpicker form-control" data-style="py-0">
                                    <option>Memebers</option>
                                    <option>Kianna Septimus</option>
                                    <option>Jaxson Herwitz</option>
                                    <option>Ryan Schleifer</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="form-group mb-3">
                                <label for="exampleInputText05" class="h5">Due Dates*</label>
                                <input type="date" class="form-control" id="exampleInputText05" value=""/>
                            </div>                        
                        </div>
                        <div class="col-lg-4">
                            <div class="form-group mb-3">
                                <label for="exampleInputText2" class="h5">Category</label>
                                <select name="type" class="selectpicker form-control" data-style="py-0">
                                    <option>Design</option>
                                    <option>Android</option>
                                    <option>IOS</option>
                                    <option>Ui/Ux Design</option>
                                    <option>Development</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-3">
                                <label for="exampleInputText040" class="h5">Description</label>
                                <textarea class="form-control" id="exampleInputText040" rows="2"></textarea>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-3">
                                <label for="exampleInputText005" class="h5">Checklist</label>
                                <input type="text" class="form-control" id="exampleInputText005" placeholder="Add List"/>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-0">
                                <label for="exampleInputText01" class="h5">Attachments</label>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="inputGroupFile003"/>
                                    <label class="custom-file-label" for="inputGroupFile003">Upload media</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="d-flex flex-wrap align-items-ceter justify-content-center mt-4">
                                <div class="btn btn-primary mr-3" data-dismiss="modal">Save</div>
                                <div class="btn btn-primary" data-dismiss="modal">Cancel</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    <div class="modal fade bd-example-modal-lg" role="dialog" aria-modal="true" id="new-user-modal">
        <div class="modal-dialog  modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header d-block text-center pb-3 border-bttom">
                    <h3 class="modal-title" id="exampleModalCenterTitle02">New User</h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group mb-3 custom-file-small">
                                <label for="exampleInputText01" class="h5">Upload Profile Picture</label>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="inputGroupFile02"/>
                                    <label class="custom-file-label" for="inputGroupFile02">Choose file</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3">
                                <label for="exampleInputText2" class="h5">Full Name</label>
                                <input type="text" class="form-control" id="exampleInputText2" placeholder="Enter your full name"/>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3">
                                <label for="exampleInputText04" class="h5">Phone Number</label>
                                <input type="text" class="form-control" id="exampleInputText04" placeholder="Enter phone number"/>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3">
                                <label for="exampleInputText006" class="h5">Email</label>
                                <input type="text" class="form-control" id="exampleInputText006" placeholder="Enter your Email"/>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3">
                                <label for="exampleInputText2" class="h5">Type</label>
                                <select name="type" class="selectpicker form-control" data-style="py-0">
                                    <option>Type</option>
                                    <option>Trainee</option>
                                    <option>Employee</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3">
                                <label for="exampleInputText2" class="h5">Role</label>
                                <select name="type" class="selectpicker form-control" data-style="py-0">
                                    <option>Role</option>
                                    <option>Designer</option>
                                    <option>Developer</option>
                                    <option>Manager</option>
                                    <option>BDE</option>
                                    <option>SEO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="d-flex flex-wrap align-items-ceter justify-content-center mt-2">
                                <div class="btn btn-primary mr-3" data-dismiss="modal">Save</div>
                                <div class="btn btn-primary" data-dismiss="modal">Cancel</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    <div class="modal fade bd-example-modal-lg" role="dialog" aria-modal="true" id="new-create-modal">
        <div class="modal-dialog  modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header d-block text-center pb-3 border-bttom">
                    <h3 class="modal-title" id="exampleModalCenterTitle03">New Task</h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group mb-3">
                                <label for="exampleInputText03" class="h5">Task Name</label>
                                <input type="text" class="form-control" id="exampleInputText03" placeholder="Enter task Name"/>
                                <a href="#" class="task-edit text-body"><i class="ri-edit-box-line"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3">
                                <label for="exampleInputText2" class="h5">Assigned to</label>
                                <select name="type" class="selectpicker form-control" data-style="py-0">
                                    <option>Memebers</option>
                                    <option>Kianna Septimus</option>
                                    <option>Jaxson Herwitz</option>
                                    <option>Ryan Schleifer</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3">
                                <label for="exampleInputText2" class="h5">Project Name</label>
                                <select name="type" class="selectpicker form-control" data-style="py-0">
                                    <option>Enter your project Name</option>
                                    <option>Ui/Ux Design</option>
                                    <option>Dashboard Templates</option>
                                    <option>Wordpress Themes</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-3">
                                <label for="exampleInputText40" class="h5">Description</label>
                                <textarea class="form-control" id="exampleInputText40" rows="2" placeholder="Textarea"></textarea>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-3">
                                <label for="exampleInputText8" class="h5">Checklist</label>
                                <input type="text" class="form-control" id="exampleInputText8" placeholder="Add List"/>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-0">
                                <label for="exampleInputText01" class="h5">Attachments</label>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="inputGroupFile01"/>
                                    <label class="custom-file-label" for="inputGroupFile01">Upload media</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="d-flex flex-wrap align-items-ceter justify-content-center mt-4">
                                <div class="btn btn-primary mr-3" data-dismiss="modal">Save</div>
                                <div class="btn btn-primary" data-dismiss="modal">Cancel</div>
                            </div>
                        </div>
                    </div>
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

export default Project;