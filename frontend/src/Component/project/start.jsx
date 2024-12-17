import React, { useState,useEffect,useCallback} from 'react';
import axios from 'axios';
import server from "../../serverconfig";
import { useNavigate } from 'react-router-dom';
import server_url from '../../serverconfig';
import ChatBox from './chat';

function Startproject({ projectId })
{
    const navigate = useNavigate();
 // Initialize the state for the switches
 const [switchState, setSwitchState] = useState({
    1: false,  // Fibonacci 1
    2: false,  // Fibonacci 2
    3: false,  // Fibonacci 3
    5: false,  // Fibonacci 5
    8: false,  // Fibonacci 8
    13: false, // Fibonacci 13
  });
  const [assigned_weights, setAssignedWeights] = useState([]); // Default to empty array

    var userdetail = sessionStorage.getItem("userdetail");
    if (userdetail) {
        // Parse the JSON string into a JavaScript object
        var parsedUserDetail = JSON.parse(userdetail);
      
        // Access the user_role property
        var userrole = parsedUserDetail.user_role;
        var userid = parsedUserDetail.userid;

    }
    const [project, setProject] = useState();
    const [owners, setOwners] = useState([]);  // State to store owners list
    const [projects, setProjects] = useState([]);
    const [inputss, setInputss] = useState([]);

    const [developers, setDevelopers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDevelopers, setSelectedDevelopers] = useState([]);
    const styles = {
        tableHeader: {
          padding: '5px',
          textAlign: 'left',
          border: '1px solid #ddd',
        },
        tableCell: {
          padding: '5px',
          textAlign: 'left',
        },
        editButton: {
          padding: '5px 10px',
          backgroundColor: '#ffa500',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '5px',
        },
        removeButton: {
          padding: '5px 10px',
          backgroundColor: '#ff0000',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        },
      };
    const [inputs, setInputs] = useState({
        EI: [],
        EO: [],
        EQ: [],
        ILF: [],
        EIF: [],
      });
      const [currentInput, setCurrentInput] = useState('');
      const [currentCategory, setCurrentCategory] = useState('EI'); // Default category
      const [editing, setEditing] = useState({ type: '', index: -1 });
      const [selectedOption, setSelectedOption] = useState('');
      const [selectedOption2, setSelectedOption2] = useState('not selected');
      var inputidd = 0;
      const selectedSwitches = Object.keys(switchState)
      .filter(key => switchState[key])  // Filter out unchecked switches
      .map(Number);  // Convert the keys back to numbers
    
      const handleInput = useCallback(() => {
        if (currentInput.trim() !== '') {
          setInputs((prevInputs) => {
            const updated = { ...prevInputs };
      
            if (editing.type && editing.index > -1) {
              // Update the existing entry for editing
              updated[editing.type][editing.index] = currentInput.trim();
            } else {
              // Add only if the input doesn't already exist in the current category
              if (!updated[currentCategory].includes(currentInput.trim())) {
                updated[currentCategory].push(currentInput.trim());
              }
            }
      
            return updated;
          });
      
          // Clear input and editing state
          setCurrentInput('');
          setEditing({ type: '', index: -1 });
        }
      }, [currentInput, currentCategory, editing]);
      
    
      const handleEdit = (type, index, value) => {
        setCurrentInput(value);
        setEditing({ type, index });
        setCurrentCategory(type);
      };
      const fetchInputs = async () => {
        try {
            const response = await axios.get(`${server_url}/api/project/1/getinputs?developer_id=${userid}`);

            setInputss(response.data.data);  // Assuming response.data.data contains the inputs
            setProject(response.data.projectdetail[0]);
            console.log(response.data.weights);
            if(response.data.weights)
            {
                setAssignedWeights(response.data.weights);
            }
            setLoading(false);
        } catch (err) {
            setError('Failed to load inputs');
            setLoading(false);
        }
    };
      const handleupdatestatus = async () => {
        try {
            var currentinputid = document.getElementById("inputid").value;
            await axios.post(`${server_url}/api/project/1/updateinputstatus`, { developer_id:userid ,input_id:currentinputid });
            alert('FP Complexity saved successfully!');
            fetchInputs();
        } 
        catch (error) {
            var currentinputid = document.getElementById("inputid").value;
            alert('FP Complexity not saved successfully!');
          console.error("All Good...!"+error);
        }
      };
    
      const handleRemove = (type, index) => {
        setInputs((prevInputs) => ({
          ...prevInputs,
          [type]: prevInputs[type].filter((_, i) => i !== index),
        }));
      };
    

   
  
    // Track if the data has been successfully saved
    const [isSaved, setIsSaved] = useState(false);
  
    // Handle the switch state change
    const handleSwitchChange = (e, number) => {
      setSwitchState({
        ...switchState,
        [number]: e.target.checked,
      });
    };
  
    // Send the data to the backend
    const handleSaveChanges = async () => {
      
      if (selectedSwitches.length === 0) {
        // If no switches are selected, do not proceed
        alert("Please select at least one Fibonacci number to proceed.");
        return;
      }
  
      try {
        await axios.post(`${server_url}/api/project/1/insertinput`, {inputs,selectedOption2,selectedOption,selectedSwitches});
        
        setIsSaved(true); // Mark as saved
        alert("Data sent successfully!");
      } catch (error) {
        console.error("Error sending data:", error);
        alert("Failed to send data");
      }
    };
  
    // Check if at least one switch is selected to enable "Save changes"
    const isFormValid = Object.values(switchState).some(isChecked => isChecked);

      const handleSaveInputs = async () => {
        try {
            await axios.post(`${server_url}/api/project/1/insertinput`, {inputs,selectedOption2,selectedOption});
            alert('FP Inputs saved successfully!');
            
        
       
        } catch (error) {
          alert('Error saving FP inputs');
          console.error(error);
        }
      };
    
      const renderHistoryTable = () => {
        const combinedHistory = Object.entries(inputs)
          .flatMap(([type, values]) =>
            values.map((value) => ({ type, value }))
          );
    
        return (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f4' }}>
                <th style={styles.tableHeader}>Category</th>
                <th style={styles.tableHeader}>Input Name</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {combinedHistory.map((entry, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={styles.tableCell}>{entry.type}</td>
                  <td style={styles.tableCell}>{entry.value}</td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => handleEdit(entry.type, inputs[entry.type].indexOf(entry.value), entry.value)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemove(entry.type, inputs[entry.type].indexOf(entry.value))}
                      style={styles.removeButton}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      };
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
              const response = await axios.get(`${server}/api/project/allprojects`);
              setProjects(response.data); // Set the response data to state
            } catch (error) {
              console.error('Error fetching projects:', error);
            }
          };
      
          fetchProjects();
        const fetchOwners = async () => {
            try {
              const response = await axios.get(`${server}/api/getowner`); // Update the URL as per your API
              setOwners(response.data); // Assuming the response is an array of owners
            } catch (error) {
              alert('Error fetching owners');
            }
          };
         

        fetchInputs();
          const fetchDevelopers = async () => {
            try {
              const response = await axios.get(`${server}/api/getdeveloper`);
              setDevelopers(response.data);  // Assuming the response is an array of developers
            } catch (error) {
              console.error('Error fetching developers:', error);
            }
          };
      
          fetchDevelopers();
      
          fetchOwners();
      }, [navigate,projectId]);
     
      // Handle checkbox change
  const handleCheckboxChange = (developerId) => {
    setSelectedDevelopers((prevSelected) => {
      if (prevSelected.includes(developerId)) {
        // If already selected, remove the developer from the selected list
        return prevSelected.filter(id => id !== developerId);
      } else {
        // Otherwise, add the developer to the selected list
        return [...prevSelected, developerId];
      }
    });
  };

  // Handle form submission
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${server_url}/api/project/assignteam`, {
        projectId,
        developerIds: selectedDevelopers
      });
      alert(res.data.msg);
    } catch (error) {
      alert('Error assigning team to project');
    }
  };
     
  return (
    <>
    <ChatBox />
    <div class="wrapper">
      
      <div class="iq-sidebar  sidebar-default ">
          <div class="iq-sidebar-logo d-flex align-items-center">
              <a href="../backend/index.html" class="header-logo">
                  <img src="../assets/images/logo.svg" alt="logo"/>
                  <h3 class="logo-title light-logo">Webkit</h3>
              </a>
              <div class="iq-menu-bt-sidebar ml-0">
                  <i class="las la-bars wrapper-menu"></i>
              </div>
          </div>
          <div class="data-scrollbar" data-scroll="1">
              <nav class="iq-sidebar-menu">
                  <ul id="iq-sidebar-toggle" class="iq-menu">
                      <li class="">
                          <a href="../backend/index.html" class="svg-icon">                        
                              <svg class="svg-icon" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                              </svg>
                              <span class="ml-4">Dashboards</span>
                          </a>
                      </li>
                      <li class="active">
                          <a href="../backend/page-project.html" class="svg-icon">                        
                              <svg class="svg-icon" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                  <rect x="6" y="14" width="12" height="8"></rect>
                              </svg>
                              <span class="ml-4">Projects</span>
                          </a>
                      </li>
                      <li class="">
                          <a href="../backend/page-task.html" class="svg-icon">                        
                              <svg class="svg-icon" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                              </svg>
                              <span class="ml-4">Task</span>
                          </a>
                      </li>
                      <li class="">
                          <a href="../backend/page-employee.html" class="svg-icon">                        
                              <svg class="svg-icon" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                              </svg>
                              <span class="ml-4">Employees</span>
                          </a>
                      </li>
                      <li class="">
                          <a href="../backend/page-desk.html" class="svg-icon">                        
                              <svg class="svg-icon" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
                              </svg>
                              <span class="ml-4">Desk</span>
                          </a>
                      </li>
                      <li class="">
                          <a href="../backend/page-calender.html" class="svg-icon">                        
                              <svg class="svg-icon" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                              <span class="ml-4">Calender</span>
                          </a>
                      </li>
                      <li class=" ">
                          <a href="#otherpage" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                              </svg>
                              <span class="ml-4">other page</span>                        
                              <i class="las la-angle-right iq-arrow-right arrow-active"></i>
                              <i class="las la-angle-down iq-arrow-right arrow-hover"></i>
                          </a>
                          <ul id="otherpage" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                  <li class=" ">
                                      <a href="#user" class="collapsed" data-toggle="collapse" aria-expanded="false">
                                          <svg class="svg-icon" id="p-dash10" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline>
                                          </svg>
                                          <span class="ml-4">User Details</span>
                                          <i class="las la-angle-right iq-arrow-right arrow-active"></i>
                                          <i class="las la-angle-down iq-arrow-right arrow-hover"></i>
                                      </a>
                                      <ul id="user" class="iq-submenu collapse" data-parent="#otherpage">
                                              <li class="">
                                                  <a href="../app/user-profile.html">
                                                      <i class="las la-minus"></i><span>User Profile</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../app/user-add.html">
                                                      <i class="las la-minus"></i><span>User Add</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../app/user-list.html">
                                                      <i class="las la-minus"></i><span>User List</span>
                                                  </a>
                                              </li>
                                      </ul>
                                  </li>
                                  <li class=" ">
                                      <a href="#ui" class="collapsed" data-toggle="collapse" aria-expanded="false">
                                         <svg class="svg-icon" id="p-dash11" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                          </svg>
                                          <span class="ml-4">UI Elements</span>
                                          <i class="las la-angle-right iq-arrow-right arrow-active"></i>
                                          <i class="las la-angle-down iq-arrow-right arrow-hover"></i>
                                      </a>
                                      <ul id="ui" class="iq-submenu collapse" data-parent="#otherpage">
                                              <li class="">
                                                  <a href="../backend/ui-avatars.html">
                                                      <i class="las la-minus"></i><span>Avatars</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-alerts.html">
                                                      <i class="las la-minus"></i><span>Alerts</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-badges.html">
                                                      <i class="las la-minus"></i><span>Badges</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-breadcrumb.html">
                                                      <i class="las la-minus"></i><span>Breadcrumb</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-buttons.html">
                                                      <i class="las la-minus"></i><span>Buttons</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-buttons-group.html">
                                                      <i class="las la-minus"></i><span>Buttons Group</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-boxshadow.html">
                                                      <i class="las la-minus"></i><span>Box Shadow</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-colors.html">
                                                      <i class="las la-minus"></i><span>Colors</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-cards.html">
                                                      <i class="las la-minus"></i><span>Cards</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-carousel.html">
                                                      <i class="las la-minus"></i><span>Carousel</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-grid.html">
                                                      <i class="las la-minus"></i><span>Grid</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-helper-classes.html">
                                                      <i class="las la-minus"></i><span>Helper classes</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-images.html">
                                                      <i class="las la-minus"></i><span>Images</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-list-group.html">
                                                      <i class="las la-minus"></i><span>list Group</span>
                                                  </a>
                                              </li>
                                              <li  class="">
                                                  <a href="../backend/ui-media-object.html">
                                                      <i class="las la-minus"></i><span>Media</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-modal.html">
                                                      <i class="las la-minus"></i><span>Modal</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-notifications.html">
                                                      <i class="las la-minus"></i><span>Notifications</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-pagination.html">
                                                      <i class="las la-minus"></i><span>Pagination</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-popovers.html">
                                                      <i class="las la-minus"></i><span>Popovers</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-progressbars.html">
                                                      <i class="las la-minus"></i><span>Progressbars</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-typography.html">
                                                      <i class="las la-minus"></i><span>Typography</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-tabs.html">
                                                      <i class="las la-minus"></i><span>Tabs</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-tooltips.html">
                                                      <i class="las la-minus"></i><span>Tooltips</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/ui-embed-video.html">
                                                      <i class="las la-minus"></i><span>Video</span>
                                                  </a>
                                              </li>
                                      </ul>
                                  </li>
                                  <li class=" ">
                                      <a href="#auth" class="collapsed" data-toggle="collapse" aria-expanded="false">
                                          <svg class="svg-icon" id="p-dash12" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
                                          </svg>
                                          <span class="ml-4">Authentication</span>
                                          <i class="las la-angle-right iq-arrow-right arrow-active"></i>
                                          <i class="las la-angle-down iq-arrow-right arrow-hover"></i>
                                      </a>
                                      <ul id="auth" class="iq-submenu collapse" data-parent="#otherpage">
                                              <li class="">
                                                  <a href="../backend/auth-sign-in.html">
                                                      <i class="las la-minus"></i><span>Login</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/auth-sign-up.html">
                                                      <i class="las la-minus"></i><span>Register</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/auth-recoverpw.html">
                                                      <i class="las la-minus"></i><span>Recover Password</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/auth-confirm-mail.html">
                                                      <i class="las la-minus"></i><span>Confirm Mail</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/auth-lock-screen.html">
                                                      <i class="las la-minus"></i><span>Lock Screen</span>
                                                  </a>
                                              </li>
                                      </ul>
                                  </li>
                                  <li class="">
                                      <a href="#form" class="collapsed svg-icon" data-toggle="collapse" aria-expanded="false">
                                          <svg class="svg-icon" id="p-dash13" width="20" height="20"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                          </svg>
                                          <span class="ml-4">Forms</span>
                                          <i class="las la-angle-right iq-arrow-right arrow-active"></i>
                                          <i class="las la-angle-down iq-arrow-right arrow-hover"></i>
                                      </a>
                                      <ul id="form" class="iq-submenu collapse" data-parent="#otherpage">
                                          <li class="">
                                              <a href="../backend/form-layout.html">
                                                  <i class="las la-minus"></i><span class="">Form Elements</span>
                                              </a>
                                          </li>
                                          <li class="">
                                              <a href="../backend/form-input-group.html" class="svg-icon">
                                                 <i class="las la-minus"></i><span class="">Form Input</span>
                                              </a>
                                          </li>
                                          <li class="">
                                              <a href="../backend/form-validation.html" class="svg-icon">
                                                  <i class="las la-minus"></i><span class="">Form Validation</span>
                                              </a>
                                          </li>
                                          <li class="">
                                              <a href="../backend/form-switch.html" class="svg-icon">
                                                  <i class="las la-minus"></i><span class="">Form Switch</span>
                                              </a>
                                          </li>
                                          <li class="">
                                              <a href="../backend/form-chechbox.html" class="svg-icon">
                                                  <i class="las la-minus"></i><span class="">Form Checkbox</span>
                                              </a>
                                          </li>
                                          <li class="">
                                              <a href="../backend/form-radio.html" class="svg-icon">
                                                  <i class="las la-minus"></i><span class="">Form Radio</span>
                                              </a>
                                          </li>
                                          <li class="">
                                              <a href="../backend/form-textarea.html" class="svg-icon">
                                                  <i class="las la-minus"></i><span class="">Form Textarea</span>
                                              </a>
                                          </li>
                                      </ul>
                                  </li>
                                  <li class=" ">
                                      <a href="#table" class="collapsed" data-toggle="collapse" aria-expanded="false">
                                          <svg class="svg-icon" id="p-dash14" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                              <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
                                          </svg>
                                          <span class="ml-4">Table</span>
                                          <i class="las la-angle-right iq-arrow-right arrow-active"></i>
                                          <i class="las la-angle-down iq-arrow-right arrow-hover"></i>
                                      </a>
                                      <ul id="table" class="iq-submenu collapse" data-parent="#otherpage">
                                              <li class="">
                                                  <a href="../backend/tables-basic.html">
                                                      <i class="las la-minus"></i><span>Basic Tables</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/table-data.html">
                                                      <i class="las la-minus"></i><span>Data Table</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/table-tree.html">
                                                      <i class="las la-minus"></i><span>Table Tree</span>
                                                  </a>
                                              </li>
                                      </ul>
                                  </li>
                                  <li class=" ">
                                      <a href="#pricing" class="collapsed" data-toggle="collapse" aria-expanded="false">
                                          <svg class="svg-icon" id="p-dash16" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                                          </svg>
                                          <span class="ml-4">Pricing</span>
                                          <i class="las la-angle-right iq-arrow-right arrow-active"></i>
                                          <i class="las la-angle-down iq-arrow-right arrow-hover"></i>
                                      </a>
                                      <ul id="pricing" class="iq-submenu collapse" data-parent="#otherpage">
                                              <li class="">
                                                  <a href="../backend/pricing.html">
                                                      <i class="las la-minus"></i><span>Pricing 1</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/pricing-2.html">
                                                      <i class="las la-minus"></i><span>Pricing 2</span>
                                                  </a>
                                              </li>
                                      </ul>
                                  </li>
                                  <li class="">
                                      <a href="../backend/timeline.html" class="svg-icon">
                                          <svg class="svg-icon" id="p-dash016" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                          <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                                          </svg>
                                          <span class="ml-4">Timeline</span>
                                      </a>
                                  </li>
                                  <li class="">
                                      <a href="../backend/pages-invoice.html" class="svg-icon">
                                          <svg class="svg-icon" id="p-dash07" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
                                          </svg>
                                          <span class="ml-4">Invoice</span>
                                      </a>
                                  </li>
                                  <li class=" ">
                                      <a href="#pages-error" class="collapsed" data-toggle="collapse" aria-expanded="false">
                                          <svg class="svg-icon" id="p-dash17" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
                                          </svg>
                                          <span class="ml-4">Error</span>
                                          <i class="las la-angle-right iq-arrow-right arrow-active"></i>
                                          <i class="las la-angle-down iq-arrow-right arrow-hover"></i>
                                      </a>
                                      <ul id="pages-error" class="iq-submenu collapse" data-parent="#otherpage">
                                              <li class="">
                                                  <a href="../backend/pages-error.html">
                                                      <i class="las la-minus"></i><span>Error 404</span>
                                                  </a>
                                              </li>
                                              <li class="">
                                                  <a href="../backend/pages-error-500.html">
                                                      <i class="las la-minus"></i><span>Error 500</span>
                                                  </a>
                                              </li>
                                      </ul>
                                  </li>
                                  <li class="">
                                          <a href="../backend/pages-blank-page.html">
                                              <svg class="svg-icon" id="p-dash18" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>
                                              </svg>
                                              <span class="ml-4">Blank Page</span>
                                          </a>
                                  </li>
                                  <li class="">
                                          <a href="../backend/pages-maintenance.html">
                                              <svg class="svg-icon" id="p-dash19" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                                              </svg>
                                              <span class="ml-4">Maintenance</span>
                                          </a>
                                  </li>
                          </ul>
                      </li>
                  </ul>
              </nav>
              <div id="sidebar-bottom" class="position-relative sidebar-bottom">
                  <div class="card border-none mb-0 shadow-none">
                      <div class="card-body p-0">
                          <div class="sidebarbottom-content">
                              <h5 class="mb-3">Task Performed</h5>
                              <div id="circle-progress-6" class="sidebar-circle circle-progress circle-progress-primary mb-4" data-min-value="0" data-max-value="100" data-value="55" data-type="percent"></div>
                              <div class="custom-control custom-radio mb-1">
                                  <input type="radio" id="customRadio6" name="customRadio-1" class="custom-control-input" checked=""/>
                                  <label class="custom-control-label" for="customRadio6">Performed task</label>
                              </div>
                              <div class="custom-control custom-radio">
                                  <input type="radio" id="customRadio7" name="customRadio-1" class="custom-control-input"/>
                                  <label class="custom-control-label" for="customRadio7">Incomplete Task</label>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="pt-5 pb-2"></div>
          </div>
      </div>      <div class="iq-top-navbar">
          <div class="iq-navbar-custom">
              <nav class="navbar navbar-expand-lg navbar-light p-0">
                  <div class="iq-navbar-logo d-flex align-items-center justify-content-between">
                      <i class="ri-menu-line wrapper-menu"></i>
                      <a href="../backend/index.html" class="header-logo">
                          <h4 class="logo-title text-uppercase">Webkit</h4>
      
                      </a>
                  </div>
                  <div class="navbar-breadcrumb">
                      <h5>Dashboard</h5>
                  </div>
                  <div class="d-flex align-items-center">
                      <button class="navbar-toggler" type="button" data-toggle="collapse"
                          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                          aria-label="Toggle navigation">
                          <i class="ri-menu-3-line"></i>
                      </button>
                      <div class="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul class="navbar-nav ml-auto navbar-list align-items-center">
                              <li>
                                  <div class="iq-search-bar device-search">
                                      <form action="#" class="searchbox">
                                          <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                                          <input type="text" class="text search-input" placeholder="Search here..."/>
                                      </form>
                                  </div>
                              </li>
                              <li class="nav-item nav-icon search-content">
                                  <a href="#" class="search-toggle rounded" id="dropdownSearch" data-toggle="dropdown"
                                      aria-haspopup="true" aria-expanded="false">
                                      <i class="ri-search-line"></i>
                                  </a>
                                  <div class="iq-search-bar iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownSearch">
                                      <form action="#" class="searchbox p-2">
                                          <div class="form-group mb-0 position-relative">
                                              <input type="text" class="text search-input font-size-12"
                                                  placeholder="type here to search..."/>
                                              <a href="#" class="search-link"><i class="las la-search"></i></a>
                                          </div>
                                      </form>
                                  </div>
                              </li>
                              <li class="nav-item nav-icon nav-item-icon dropdown">
                                  <a href="#" class="search-toggle dropdown-toggle" id="dropdownMenuButton2"
                                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                          stroke-linejoin="round" class="feather feather-mail">
                                          <path
                                              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                                          </path>
                                          <polyline points="22,6 12,13 2,6"></polyline>
                                      </svg>
                                      <span class="bg-primary"></span>
                                  </a>
                                  <div class="iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                      <div class="card shadow-none m-0">
                                          <div class="card-body p-0 ">
                                              <div class="cust-title p-3">
                                                  <div class="d-flex align-items-center justify-content-between">
                                                      <h5 class="mb-0">All Messages</h5>
                                                      <a class="badge badge-primary badge-card" href="#">3</a>
                                                  </div>
                                              </div>
                                              <div class="px-3 pt-0 pb-0 sub-card">
                                                  <a href="#" class="iq-sub-card">
                                                      <div class="media align-items-center cust-card py-3 border-bottom">
                                                          <div class="">
                                                              <img class="avatar-50 rounded-small"
                                                                  src="../assets/images/user/01.jpg" alt="01"/>
                                                          </div>
                                                          <div class="media-body ml-3">
                                                              <div class="d-flex align-items-center justify-content-between">
                                                                  <h6 class="mb-0">Emma Watson</h6>
                                                                  <small class="text-dark"><b>12 : 47 pm</b></small>
                                                              </div>
                                                              <small class="mb-0">Lorem ipsum dolor sit amet</small>
                                                          </div>
                                                      </div>
                                                  </a>
                                                  <a href="#" class="iq-sub-card">
                                                      <div class="media align-items-center cust-card py-3 border-bottom">
                                                          <div class="">
                                                              <img class="avatar-50 rounded-small"
                                                                  src="../assets/images/user/02.jpg" alt="02"/>
                                                          </div>
                                                          <div class="media-body ml-3">
                                                              <div class="d-flex align-items-center justify-content-between">
                                                                  <h6 class="mb-0">Ashlynn Franci</h6>
                                                                  <small class="text-dark"><b>11 : 30 pm</b></small>
                                                              </div>
                                                              <small class="mb-0">Lorem ipsum dolor sit amet</small>
                                                          </div>
                                                      </div>
                                                  </a>
                                                  <a href="#" class="iq-sub-card">
                                                      <div class="media align-items-center cust-card py-3">
                                                          <div class="">
                                                              <img class="avatar-50 rounded-small"
                                                                  src="../assets/images/user/03.jpg" alt="03"/>
                                                          </div>
                                                          <div class="media-body ml-3">
                                                              <div class="d-flex align-items-center justify-content-between">
                                                                  <h6 class="mb-0">Kianna Carder</h6>
                                                                  <small class="text-dark"><b>11 : 21 pm</b></small>
                                                              </div>
                                                              <small class="mb-0">Lorem ipsum dolor sit amet</small>
                                                          </div>
                                                      </div>
                                                  </a>
                                              </div>
                                              <a class="right-ic btn btn-primary btn-block position-relative p-2" href="#"
                                                  role="button">
                                                  View All
                                              </a>
                                          </div>
                                      </div>
                                  </div>
                              </li>
                              <li class="nav-item nav-icon nav-item-icon dropdown">
                                  <a href="#" class="search-toggle dropdown-toggle" id="dropdownMenuButton"
                                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                          stroke-linejoin="round" class="feather feather-bell">
                                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                      </svg>
                                      <span class="bg-primary "></span>
                                  </a>
                                  <div class="iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton">
                                      <div class="card shadow-none m-0">
                                          <div class="card-body p-0 ">
                                              <div class="cust-title p-3">
                                                  <div class="d-flex align-items-center justify-content-between">
                                                      <h5 class="mb-0">Notifications</h5>
                                                      <a class="badge badge-primary badge-card" href="#">3</a>
                                                  </div>
                                              </div>
                                              <div class="px-3 pt-0 pb-0 sub-card">
                                                  <a href="#" class="iq-sub-card">
                                                      <div class="media align-items-center cust-card py-3 border-bottom">
                                                          <div class="">
                                                              <img class="avatar-50 rounded-small"
                                                                  src="../assets/images/user/01.jpg" alt="01"/>
                                                          </div>
                                                          <div class="media-body ml-3">
                                                              <div class="d-flex align-items-center justify-content-between">
                                                                  <h6 class="mb-0">Emma Watson</h6>
                                                                  <small class="text-dark"><b>12 : 47 pm</b></small>
                                                              </div>
                                                              <small class="mb-0">Lorem ipsum dolor sit amet</small>
                                                          </div>
                                                      </div>
                                                  </a>
                                                  <a href="#" class="iq-sub-card">
                                                      <div class="media align-items-center cust-card py-3 border-bottom">
                                                          <div class="">
                                                              <img class="avatar-50 rounded-small"
                                                                  src="../assets/images/user/02.jpg" alt="02"/>
                                                          </div>
                                                          <div class="media-body ml-3">
                                                              <div class="d-flex align-items-center justify-content-between">
                                                                  <h6 class="mb-0">Ashlynn Franci</h6>
                                                                  <small class="text-dark"><b>11 : 30 pm</b></small>
                                                              </div>
                                                              <small class="mb-0">Lorem ipsum dolor sit amet</small>
                                                          </div>
                                                      </div>
                                                  </a>
                                                  <a href="#" class="iq-sub-card">
                                                      <div class="media align-items-center cust-card py-3">
                                                          <div class="">
                                                              <img class="avatar-50 rounded-small"
                                                                  src="../assets/images/user/03.jpg" alt="03"/>
                                                          </div>
                                                          <div class="media-body ml-3">
                                                              <div class="d-flex align-items-center justify-content-between">
                                                                  <h6 class="mb-0">Kianna Carder</h6>
                                                                  <small class="text-dark"><b>11 : 21 pm</b></small>
                                                              </div>
                                                              <small class="mb-0">Lorem ipsum dolor sit amet</small>
                                                          </div>
                                                      </div>
                                                  </a>
                                              </div>
                                              <a class="right-ic btn btn-primary btn-block position-relative p-2" href="#"
                                                  role="button">
                                                  View All
                                              </a>
                                          </div>
                                      </div>
                                  </div>
                              </li>
                              <li class="nav-item nav-icon dropdown caption-content">
                                  <a href="#" class="search-toggle dropdown-toggle  d-flex align-items-center" id="dropdownMenuButton4"
                                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <img src="../assets/images/user/1.jpg" class="img-fluid rounded-circle" alt="user"/>
                                      <div class="caption ml-3">
                                          <h6 class="mb-0 line-height">Savannah Nguyen<i class="las la-angle-down ml-2"></i></h6>
                                      </div>
                                  </a>                            
                                  <ul class="dropdown-menu dropdown-menu-right border-none" aria-labelledby="dropdownMenuButton">
                                      <li class="dropdown-item d-flex svg-icon">
                                          <svg class="svg-icon mr-0 text-primary" id="h-01-p" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                          <a href="../app/user-profile.html">My Profile</a>
                                      </li>
                                      <li class="dropdown-item d-flex svg-icon">
                                          <svg class="svg-icon mr-0 text-primary" id="h-02-p" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                          </svg>
                                          <a href="../app/user-profile-edit.html">Edit Profile</a>
                                      </li>
                                      <li class="dropdown-item d-flex svg-icon">
                                          <svg class="svg-icon mr-0 text-primary" id="h-03-p" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                          </svg>
                                          <a href="../app/user-account-setting.html">Account Settings</a>
                                      </li>
                                      <li class="dropdown-item d-flex svg-icon">
                                          <svg class="svg-icon mr-0 text-primary" id="h-04-p" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                          </svg>
                                          <a href="../app/user-privacy-setting.html">Privacy Settings</a>
                                      </li>
                                      <li class="dropdown-item  d-flex svg-icon border-top">
                                          <svg class="svg-icon mr-0 text-primary" id="h-05-p" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                          </svg>
                                          <a href="../backend/auth-sign-in.html">Logout</a>
                                      </li>
                                  </ul>
                              </li>
                          </ul>
                      </div>
                  </div>
              </nav>
          </div>
      </div>   
         <div class="content-page">
     <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
            <div class="card">
                  <div class="card-header d-flex justify-content-between">
                     <div class="header-title">
                        <h4 class="card-title">Project Id is :0001</h4>
                     </div>
                  </div>
                  <div class="card-body">
                     <ul class="nav nav-pills mb-3 nav-fill" id="pills-tab-1" role="tablist">
                        <li class="nav-item">
                           <a class="nav-link" id="pills-home-tab-fill" data-toggle="pill" href="#pills-home-fill" role="tab" aria-controls="pills-home" aria-selected="false">Team Assign</a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" id="pills-profile-tab-fill" data-toggle="pill" href="#pills-profile-fill" role="tab" aria-controls="pills-profile" aria-selected="false">Project Estimation</a>
                        </li>
                       
                     </ul>
                     <div class="tab-content" id="pills-tabContent-1">
                        <div class="tab-pane fade" id="pills-home-fill" role="tabpanel" aria-labelledby="pills-home-tab-fill">
                        <div class="card">
                  <div class="card-header d-flex justify-content-between">
                     <div class="header-title">
                        <h4 class="card-title">Assign Team</h4>
                     </div>
                  </div> 
                                      <form onSubmit={handleSubmit2}>

                  <div class="card-body">
                     <div class="table-responsive">

                        <table id="datatable" class="table data-table table-striped">
                           <thead>
                              <tr class="ligth">
                                 <th>ID</th>
                                 <th>Name</th>
                                 <th>Email</th>
                                 <th>Expertise</th>
                                 <th>Select</th>
                              </tr>
                           </thead>
                           <tbody>

                           {developers.map(developer => (
                              <tr key={developer.userid}
                              >
                                 <td>{`${developer.userid}`}</td>
                                 <td htmlFor={`${developer.name}`}>{developer.name}</td>
                                 <td>{`${developer.email}`}</td>
                                 <td>HMU</td>
                                 <td style={{ textAlign: "center" }}><input type='checkbox'
                                 value={developer.userid}
                                 id={`developer-${developer.userid}`}
                                 onChange={() => handleCheckboxChange(developer.userid)}
                                 /></td>
                              </tr>
                           ))}
                           </tbody>
                           <tfoot>
                              <tr>
                                 <th>ID</th>
                                 <th>Name</th>
                                 <th>Email</th>
                                 <th>Expertise</th>
                                 <th>Select</th>
                              </tr>
                           </tfoot>
                        </table>


                     </div>
                  </div>      <button type="submit" class="btn btn-primary">Assign Team</button>
             </form>

               </div>                             
                        </div>
                        <div class="tab-pane fade" id="pills-profile-fill" role="tabpanel" aria-labelledby="pills-profile-tab-fill">
                      
               
                     {/* <p>Stack your navigation by changing the flex item direction with the <code>.flex-column</code> utility.</p> */}
                        {/* <div class="col-sm-3">
                           <div class="nav flex-column nav-pills text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                              <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                              <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
                              <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
                              <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                           </div>
                        </div> */}
                        <div class="col-sm-12">
                           <div class="tab-content mt-0" id="v-pills-tabContent">
                           <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            {userrole === 1?(
                <div
  className="profile-tab-container"
 
>
  <h4
    style={{
      color: '#333',
      fontWeight: 'bold',
      marginBottom: '20px',
    }}
  >
    Select Estimation Technique and Method
  </h4>
  <div className="selection-row" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <label
      htmlFor="technique-select"
      style={{ fontSize: '16px', fontWeight: '500', color: '#555' }}
    >
      Technique:
    </label>
    <select
      id="technique-select"
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
      className="form-control"
      style={{
        width: '250px',
        height: '45px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        padding: '5px 10px',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <option value="" selected>Select The Technique</option>
      <option value="FP">Function Points (FP)</option>
      <option value="UC">Usecase (UC)</option>
      <option value="c1b">Cocomo 1 (Basic)</option>
      <option value="c1i">Cocomo 1 (Intermediate)</option>
      <option value="c1a">Cocomo 1 (Advanced)</option>
      <option value="c2">Cocomo 2 (Coco 2)</option>
      <option value="agile">Agile (Ag)</option>
    </select>
    <label
      htmlFor="method-select"
      style={{ fontSize: '16px', fontWeight: '500', color: '#555' }}
    >
      Method:
    </label>
    <select
      id="method-select"
      value={selectedOption2}
      onChange={(e) => setSelectedOption2(e.target.value)}
      className="form-control"
      style={{
        width: '250px',
        height: '45px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        padding: '5px 10px',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <option value="not selected">Select The Method</option>
      {selectedOption === 'FP' ? (

<option value="FP">Function Points (FP)</option>

      ):selectedOption === "UC" ?(
        <option value="UC">Usecase (UC)</option>

      ):selectedOption === "c1b"?(
        <option value="c1b">Cocomo 1 (Basic)</option>
      ):selectedOption === "c1i"?(
        <option value="c1i">Cocomo 1 (Intermediate)</option>
    ):selectedOption === "c1a"?(
        <option value="c1a">Cocomo 1 (Advanced)</option>
    ):selectedOption === "c2"?(
        <option value="c2">Cocomo 2 (Coco 2)</option>
    ):selectedOption === "agile"?(
        <option value="agile">Agile (Ag)</option>
    ):null}
      <option value="PP">Poker Planning (PP)</option>
      <option value="FC">Fibonacci Series (FC)</option>
    </select>
  </div>
  {/* <button
    onClick={() => console.log('Save Selection')}
    className="btn btn-primary"
    style={{
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: '#2196F3',
      border: 'none',
      borderRadius: '8px',
      color: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = '#1976D2')}
    onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
  >
    Save Selection
  </button> */}
</div>

//                 <div className="input-group-prepend">
//                 <select
// value={selectedOption}
// class="form-control col-3"
// onChange={(e) => setSelectedOption(e.target.value)}
// style = {{
//     marginLeft:"20px",
//     borderRadius:"5px"
// }}
// >
// <option value="">Select The Technique</option>
// <option value="FP">Function Points (FP)</option>
// <option value="UC">Usecase (UC)</option>
// <option value="c1b">Cocomo 1 (Basic)</option>
// <option value="c1i">Cocomo 1 (Intermediate)</option>
// <option value="c1a">Cocomo 1 (Advanced)</option>
// <option value="c2">Cocomo 2 (Coco 2)</option>
// <option value="agile">Agile (Ag)</option>

// </select>
// <p
// style = {{
//     marginTop:"10px",
//     marginLeft:"10px"
// }}
// >To</p>
// <select
// value={selectedOption2}
// class="form-control col-3"
// onChange={(e) => setSelectedOption2(e.target.value)}
// style = {{
//     marginLeft:"10px",
//     borderRadius:"5px"
// }}
// >
// <option value="">Select The Method</option>
// <option value="PP">Poker Planning (PP)</option>
// <option value="FC">Fibonaci Series (FC)</option>
// </select>
//                 </div>
            ):userrole === 3 ?(
                <>
                <div></div>
                <table class="table table-hover ">
                <thead>
                   <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Complexity</th>
              
                   </tr>
                </thead>
                <tbody>
                    {inputss.map((input) => (
                        <>
                        <p>Spell Number:{input.spell}</p>
                           <tr key={input.input_id}>
                            <td scope='row'>{input.input_id}</td>
                               <input hidden id="inputid" value={input.input_id}/>
                            <td>{input.input_name +" ("+input.input_category+")"}</td>
                            <td>
                                {/* Priority Dropdown */}
                                <select 
                                    value={input.complexity} 
                                    class="form-control"
                                    onChange={(e) => handleSelectChange(e, input.input_id, 'complexity')}
                                >
                                    <option disabled selected>Select Complexity</option>
                                    {project.method === "PP" && project.estimation_technique === "FP" ?(
                                        <> 
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        </>
                                 
                                    ):project.method === "FC" && project.estimation_technique === "FP"?(
                                        <>
                                        
                                       
{assigned_weights.map((item) => (
          <option key={item.weight_id} value={item.weight}>
            {item.weight} 
          </option>
        ))}
                                        </>
                                    ):null}
                                    
                                </select>
                            </td>
                            <td hidden>
                                {/* Status Dropdown */}
                                <select  
                                    value={input.det} 
                                    class="form-control"
                                    onChange={(e) => handleSelectChange(e, input.input_id, 'det')}
                                >
                                    <option disabled selected>Select DETS's</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </td>
                            <td hidden>
                                {/* Type Dropdown */}
                                <select hidden
                                    value={input.frt}      
                                    class="form-control"

                                    onChange={(e) => handleSelectChange(e, input.input_id, 'frt')}
                                >
                                    <option disabled selected>Select FRT's</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </td>
                        </tr>
                        </>
                     
                    ))}
                </tbody>
                
               
             </table>  
             <div
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures input is left, button is right
  }}
>
  <input value="" className="form-control col-2" />
  <button onClick={handleupdatestatus} className="btn btn-success">
    Mark as Done
  </button>
</div>
  
                      </>
            ):null }
            
           
            {selectedOption === 'FP' ? (
  // If "FP" is selected, show the Function Point Input Manager
  <div class='card-body' style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
    <h4
    style= 
    { {
         marginBottom:"10px",
     }}
    >Function Point Input Manager</h4>
    <div className="input-group-prepend">
      <select
        id="category"
        value={currentCategory}
        className="form-control col-3"
        style= 
       { {
            height:"45px",
            borderRadius:"5px"
        }}
        onChange={(e) => setCurrentCategory(e.target.value)}
      >
        <option value="EI">External Inputs (EI)</option>
        <option value="EO">External Outputs (EO)</option>
        <option value="EQ">External Inquiries (EQ)</option>
        <option value="ILF">Internal Logical Files (ILF)</option>
        <option value="EIF">External Interface Files (EIF)</option>
      </select>
      <input
        type="text"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        placeholder="Enter input value"
        style= 
        { {
            marginLeft:"10px",

             height:"45px",
             borderRadius:"5px"
         }}
        className="form-control col-3"
      />
      <button
        onClick={handleInput}
        style={{
            marginLeft:"10px",
          height:"43x",
          padding: '0px 20px',
          fontSize: '12px',
          cursor: 'pointer',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Add Input
      </button>
    </div>
    {renderHistoryTable()}
    <button
  {...(selectedOption2 === "FC"
    ? { "data-toggle": "modal", "data-target": "#exampleModalCenter" }
    : {})}
  onClick={selectedOption2 === "FC" ? undefined : handleSaveInputs} // Set onClick to undefined if "FC"
  style={{
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    marginTop: "20px",
  }}
>
  Save
</button>



  </div>

) : selectedOption === 'UC' ? (
  // Else if: specific UI for "OtherOption1"
  <div className='card-body' style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
    <h3>Usecase Selected</h3>
    <p>This is the UI for "Usecase".</p>
  </div>
) : selectedOption === 'c1b' ? (
  // Else if: specific UI for "OtherOption2"
  <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
    <h3>Cocomo Basic Selected</h3>
    <p>This is the UI for "Cocomo Basic". Customize as needed.</p>
  </div>
) : selectedOption === 'c1i' ? (
    // Else if: specific UI for "OtherOption2"
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h3>Cocomo 1 Intermediate Selected</h3>
      <p>This is the UI for "Cocomo 1 Intermediate". Customize as needed.</p>
    </div>
  ) : selectedOption === 'c1a' ? (
    // Else if: specific UI for "OtherOption2"
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h3>Cocomo 1 Advance Selected</h3>
      <p>This is the UI for "Cocomo 1 Advance". Customize as needed.</p>
    </div>
  ) : selectedOption === 'c2' ? (
    // Else if: specific UI for "OtherOption2"
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h3>Cocomo 2 Selected</h3>
      <p>This is the UI for "Cocomo2". Customize as needed.</p>
    </div>
  ) : selectedOption === 'agile' ? (
    // Else if: specific UI for "OtherOption2"
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h3>Agile Selected</h3>
      <p>This is the UI for "Agile". Customize as needed.</p>
    </div>
  ) :selectedOption === 'not selected' ? ( <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}><br></br>
    <h4 style={{ marginBottom: '10px' }}>Welcome to the Estimation Tool</h4>
    <p>
      Please select a technique from the dropdown menu to start the estimation process. 
      Each technique provides a unique approach for project estimation:
    </p>
    <ul>
      <li><b>Function Points (FP):</b> Analyze inputs, outputs, and files to estimate project size.</li>
      <li><b>Usecase (UC):</b> Calculate complexity based on use cases.</li>
      <li><b>Cocomo Models:</b> Estimate time and effort using various COCOMO techniques.</li>
      <li><b>Agile:</b> Use planning techniques like Poker Planning or Fibonacci Series.</li>
    </ul>
    <p>Choose a technique to proceed!</p>
  </div>
):null}
</div>
                            
                           </div>
                        </div>
                     </div>
                  </div>
                                  
                     
                     </div>
                  </div>
               </div>
            </div>
        </div>

    </div>
      </div>
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Select Fibonacci Numbers for Weight Assignment</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                      {Object.keys(switchState).map(number => (
                        <div className="custom-control custom-switch custom-switch-color custom-control-inline" key={number}>
                          <input 
                            type="checkbox"
                            className="custom-control-input bg-success"
                            id={`customSwitch${number}`}
                            checked={switchState[number]}
                            onChange={(e) => handleSwitchChange(e, number)}
                          />
                          <label className="custom-control-label" htmlFor={`customSwitch${number}`}>{number}</label>
                        </div>
                      ))}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal" disabled={isSaved}>Close</button>
                      <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={handleSaveChanges} 
                        disabled={!isFormValid} // Disable the button until at least one switch is selected
                      >
                        Save changes
                      </button>
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
  async function handleSelectChange(e, inputId, field) {
    const updatedValue = e.target.value;
  
    // Optimistically update the UI
    const updatedInputs = inputss.map(input => 
        input.input_id === inputId ? { ...input, [field]: updatedValue } : input
    );
    setInputs(updatedInputs);

    try {
        // Send the updated field to the server
        await axios.post(`${server_url}/api/project/1/updateinput`, { id: inputId, field, value: updatedValue,developer_id:userid  });
        const response =  await axios.get(`${server_url}/api/project/1/checkstatus?id=${inputId}`);
        console.log(response.data.devresponse);
        if (response.data.devresponse.some((value) => value === userid)) {
             alert("hello");              
        }
        
        console.log(`${field} updated successfully!`);
    } catch (err) {
        console.error('Error updating field:', err);
        alert(`Failed to save ${field}`);
    }
}
}

export default Startproject;