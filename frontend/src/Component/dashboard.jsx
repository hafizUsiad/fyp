import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard()
{
  const navigate = useNavigate();
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
  }, [navigate]);

    return(
      
                <div>
                  
                  {/* loader Start */}
                  {/* <div id="loading">
                    <div id="loading-center">
                    </div>
                  </div> */}
                  {/* loader END */}
                  {/* Wrapper Start */}
                  <div className="wrapper">
                    <div className="iq-sidebar  sidebar-default ">
                      <div className="iq-sidebar-logo d-flex align-items-center">
                        <a href="../backend/index.html" className="header-logo">
                          <img src="../assets/images/logo.svg" alt="logo" />
                          <h3 className="logo-title light-logo">Webkit</h3>
                        </a>
                        <div className="iq-menu-bt-sidebar ml-0">
                          <i className="las la-bars wrapper-menu" />
                        </div>
                      </div>
                      <div className="data-scrollbar" data-scroll={1}>
                        <nav className="iq-sidebar-menu">
                          <ul id="iq-sidebar-toggle" className="iq-menu">
                            <li className="active">
                              <a href="../backend/index.html" className="svg-icon">                        
                                <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                  <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                <span className="ml-4">Dashboards</span>
                              </a>
                            </li>
                            <li className>
                              <a href="/project" className="svg-icon">                        
                                <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="6 9 6 2 18 2 18 9" />
                                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                                  <rect x={6} y={14} width={12} height={8} />
                                </svg>
                                <span className="ml-4">Projects</span>
                              </a>
                            </li>
                            <li className>
                              <a href="../backend/page-task.html" className="svg-icon">                        
                                <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                  <rect x={8} y={2} width={8} height={4} rx={1} ry={1} />
                                </svg>
                                <span className="ml-4">Task</span>
                              </a>
                            </li>
                            <li className>
                              <a href="../backend/page-employee.html" className="svg-icon">                        
                                <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} />
                                </svg>
                                <span className="ml-4">Employees</span>
                              </a>
                            </li>
                            <li className>
                              <a href="../backend/page-desk.html" className="svg-icon">                        
                                <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1={12} y1="22.08" x2={12} y2={12} />
                                </svg>
                                <span className="ml-4">Desk</span>
                              </a>
                            </li>
                            <li className>
                              <a href="../backend/page-calender.html" className="svg-icon">                        
                                <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                  <rect x={3} y={4} width={18} height={18} rx={2} ry={2} /><line x1={16} y1={2} x2={16} y2={6} /><line x1={8} y1={2} x2={8} y2={6} /><line x1={3} y1={10} x2={21} y2={10} />
                                </svg>
                                <span className="ml-4">Calender</span>
                              </a>
                            </li>
                            <li className=" ">
                              <a href="#otherpage" className="collapsed" data-toggle="collapse" aria-expanded="false">
                                <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                </svg>
                                <span className="ml-4">other page</span>                        
                                <i className="las la-angle-right iq-arrow-right arrow-active" />
                                <i className="las la-angle-down iq-arrow-right arrow-hover" />
                              </a>
                              <ul id="otherpage" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li className=" ">
                                  <a href="#user" className="collapsed" data-toggle="collapse" aria-expanded="false">
                                    <svg className="svg-icon" id="p-dash10" width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy={7} r={4} /><polyline points="17 11 19 13 23 9" />
                                    </svg>
                                    <span className="ml-4">User Details</span>
                                    <i className="las la-angle-right iq-arrow-right arrow-active" />
                                    <i className="las la-angle-down iq-arrow-right arrow-hover" />
                                  </a>
                                  <ul id="user" className="iq-submenu collapse" data-parent="#otherpage">
                                    <li className>
                                      <a href="../app/user-profile.html">
                                        <i className="las la-minus" /><span>User Profile</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../app/user-add.html">
                                        <i className="las la-minus" /><span>User Add</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../app/user-list.html">
                                        <i className="las la-minus" /><span>User List</span>
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li className=" ">
                                  <a href="#ui" className="collapsed" data-toggle="collapse" aria-expanded="false">
                                    <svg className="svg-icon" id="p-dash11" width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                    </svg>
                                    <span className="ml-4">UI Elements</span>
                                    <i className="las la-angle-right iq-arrow-right arrow-active" />
                                    <i className="las la-angle-down iq-arrow-right arrow-hover" />
                                  </a>
                                  <ul id="ui" className="iq-submenu collapse" data-parent="#otherpage">
                                    <li className>
                                      <a href="../backend/ui-avatars.html">
                                        <i className="las la-minus" /><span>Avatars</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-alerts.html">
                                        <i className="las la-minus" /><span>Alerts</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-badges.html">
                                        <i className="las la-minus" /><span>Badges</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-breadcrumb.html">
                                        <i className="las la-minus" /><span>Breadcrumb</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-buttons.html">
                                        <i className="las la-minus" /><span>Buttons</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-buttons-group.html">
                                        <i className="las la-minus" /><span>Buttons Group</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-boxshadow.html">
                                        <i className="las la-minus" /><span>Box Shadow</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-colors.html">
                                        <i className="las la-minus" /><span>Colors</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-cards.html">
                                        <i className="las la-minus" /><span>Cards</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-carousel.html">
                                        <i className="las la-minus" /><span>Carousel</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-grid.html">
                                        <i className="las la-minus" /><span>Grid</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-helper-classes.html">
                                        <i className="las la-minus" /><span>Helper classes</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-images.html">
                                        <i className="las la-minus" /><span>Images</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-list-group.html">
                                        <i className="las la-minus" /><span>list Group</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-media-object.html">
                                        <i className="las la-minus" /><span>Media</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-modal.html">
                                        <i className="las la-minus" /><span>Modal</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-notifications.html">
                                        <i className="las la-minus" /><span>Notifications</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-pagination.html">
                                        <i className="las la-minus" /><span>Pagination</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-popovers.html">
                                        <i className="las la-minus" /><span>Popovers</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-progressbars.html">
                                        <i className="las la-minus" /><span>Progressbars</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-typography.html">
                                        <i className="las la-minus" /><span>Typography</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-tabs.html">
                                        <i className="las la-minus" /><span>Tabs</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-tooltips.html">
                                        <i className="las la-minus" /><span>Tooltips</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/ui-embed-video.html">
                                        <i className="las la-minus" /><span>Video</span>
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li className=" ">
                                  <a href="#auth" className="collapsed" data-toggle="collapse" aria-expanded="false">
                                    <svg className="svg-icon" id="p-dash12" width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1={16} y1={13} x2={8} y2={13} /><line x1={16} y1={17} x2={8} y2={17} /><polyline points="10 9 9 9 8 9" />
                                    </svg>
                                    <span className="ml-4">Authentication</span>
                                    <i className="las la-angle-right iq-arrow-right arrow-active" />
                                    <i className="las la-angle-down iq-arrow-right arrow-hover" />
                                  </a>
                                  <ul id="auth" className="iq-submenu collapse" data-parent="#otherpage">
                                    <li className>
                                      <a href="../backend/auth-sign-in.html">
                                        <i className="las la-minus" /><span>Login</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/auth-sign-up.html">
                                        <i className="las la-minus" /><span>Register</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/auth-recoverpw.html">
                                        <i className="las la-minus" /><span>Recover Password</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/auth-confirm-mail.html">
                                        <i className="las la-minus" /><span>Confirm Mail</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/auth-lock-screen.html">
                                        <i className="las la-minus" /><span>Lock Screen</span>
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li className>
                                  <a href="#form" className="collapsed svg-icon" data-toggle="collapse" aria-expanded="false">
                                    <svg className="svg-icon" id="p-dash13" width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x={8} y={2} width={8} height={4} rx={1} ry={1} />
                                    </svg>
                                    <span className="ml-4">Forms</span>
                                    <i className="las la-angle-right iq-arrow-right arrow-active" />
                                    <i className="las la-angle-down iq-arrow-right arrow-hover" />
                                  </a>
                                  <ul id="form" className="iq-submenu collapse" data-parent="#otherpage">
                                    <li className>
                                      <a href="../backend/form-layout.html">
                                        <i className="las la-minus" /><span className>Form Elements</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/form-input-group.html" className="svg-icon">
                                        <i className="las la-minus" /><span className>Form Input</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/form-validation.html" className="svg-icon">
                                        <i className="las la-minus" /><span className>Form Validation</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/form-switch.html" className="svg-icon">
                                        <i className="las la-minus" /><span className>Form Switch</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/form-chechbox.html" className="svg-icon">
                                        <i className="las la-minus" /><span className>Form Checkbox</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/form-radio.html" className="svg-icon">
                                        <i className="las la-minus" /><span className>Form Radio</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/form-textarea.html" className="svg-icon">
                                        <i className="las la-minus" /><span className>Form Textarea</span>
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li className=" ">
                                  <a href="#table" className="collapsed" data-toggle="collapse" aria-expanded="false">
                                    <svg className="svg-icon" id="p-dash14" width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                      <rect x={3} y={3} width={7} height={7} /><rect x={14} y={3} width={7} height={7} /><rect x={14} y={14} width={7} height={7} /><rect x={3} y={14} width={7} height={7} />
                                    </svg>
                                    <span className="ml-4">Table</span>
                                    <i className="las la-angle-right iq-arrow-right arrow-active" />
                                    <i className="las la-angle-down iq-arrow-right arrow-hover" />
                                  </a>
                                  <ul id="table" className="iq-submenu collapse" data-parent="#otherpage">
                                    <li className>
                                      <a href="../backend/tables-basic.html">
                                        <i className="las la-minus" /><span>Basic Tables</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/table-data.html">
                                        <i className="las la-minus" /><span>Data Table</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/table-tree.html">
                                        <i className="las la-minus" /><span>Table Tree</span>
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li className=" ">
                                  <a href="#pricing" className="collapsed" data-toggle="collapse" aria-expanded="false">
                                    <svg className="svg-icon" id="p-dash16" width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                      <ellipse cx={12} cy={5} rx={9} ry={3} /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                                    </svg>
                                    <span className="ml-4">Pricing</span>
                                    <i className="las la-angle-right iq-arrow-right arrow-active" />
                                    <i className="las la-angle-down iq-arrow-right arrow-hover" />
                                  </a>
                                  <ul id="pricing" className="iq-submenu collapse" data-parent="#otherpage">
                                    <li className>
                                      <a href="../backend/pricing.html">
                                        <i className="las la-minus" /><span>Pricing 1</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/pricing-2.html">
                                        <i className="las la-minus" /><span>Pricing 2</span>
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li className>
                                  <a href="../backend/timeline.html" className="svg-icon">
                                    <svg className="svg-icon" id="p-dash016" width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx={12} cy={12} r={10} /><polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    <span className="ml-4">Timeline</span>
                                  </a>
                                </li>
                                <li className>
                                  <a href="../backend/pages-invoice.html" className="svg-icon">
                                    <svg className="svg-icon" id="p-dash07" width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1={16} y1={13} x2={8} y2={13} /><line x1={16} y1={17} x2={8} y2={17} /><polyline points="10 9 9 9 8 9" />
                                    </svg>
                                    <span className="ml-4">Invoice</span>
                                  </a>
                                </li>
                                <li className=" ">
                                  <a href="#pages-error" className="collapsed" data-toggle="collapse" aria-expanded="false">
                                    <svg className="svg-icon" id="p-dash17" width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1={12} y1={9} x2={12} y2={13} /><line x1={12} y1={17} x2="12.01" y2={17} />
                                    </svg>
                                    <span className="ml-4">Error</span>
                                    <i className="las la-angle-right iq-arrow-right arrow-active" />
                                    <i className="las la-angle-down iq-arrow-right arrow-hover" />
                                  </a>
                                  <ul id="pages-error" className="iq-submenu collapse" data-parent="#otherpage">
                                    <li className>
                                      <a href="../backend/pages-error.html">
                                        <i className="las la-minus" /><span>Error 404</span>
                                      </a>
                                    </li>
                                    <li className>
                                      <a href="../backend/pages-error-500.html">
                                        <i className="las la-minus" /><span>Error 500</span>
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li className>
                                  <a href="../backend/pages-blank-page.html">
                                    <svg className="svg-icon" id="p-dash18" width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" />
                                    </svg>
                                    <span className="ml-4">Blank Page</span>
                                  </a>
                                </li>
                                <li className>
                                  <a href="../backend/pages-maintenance.html">
                                    <svg className="svg-icon" id="p-dash19" width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                    </svg>
                                    <span className="ml-4">Maintenance</span>
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </nav>
                        <div id="sidebar-bottom" className="position-relative sidebar-bottom">
                          <div className="card border-none mb-0 shadow-none">
                            <div className="card-body p-0">
                              <div className="sidebarbottom-content">
                                <h5 className="mb-3">Task Performed</h5>
                                <div id="circle-progress-6" className="sidebar-circle circle-progress circle-progress-primary mb-4" data-min-value={0} data-max-value={100} data-value={55} data-type="percent" />
                                <div className="custom-control custom-radio mb-1">
                                  <input type="radio" id="customRadio6" name="customRadio-1" className="custom-control-input" defaultChecked />
                                  <label className="custom-control-label" htmlFor="customRadio6">Performed task</label>
                                </div>
                                <div className="custom-control custom-radio">
                                  <input type="radio" id="customRadio7" name="customRadio-1" className="custom-control-input" />
                                  <label className="custom-control-label" htmlFor="customRadio7">Incomplete Task</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pt-5 pb-2" />
                      </div>
                    </div>      <div className="iq-top-navbar">
                      <div className="iq-navbar-custom">
                        <nav className="navbar navbar-expand-lg navbar-light p-0">
                          <div className="iq-navbar-logo d-flex align-items-center justify-content-between">
                            <i className="ri-menu-line wrapper-menu" />
                            <a href="../backend/index.html" className="header-logo">
                              <h4 className="logo-title text-uppercase">Webkit</h4>
                            </a>
                          </div>
                          <div className="navbar-breadcrumb">
                            <h5>Dashboard</h5>
                          </div>
                          <div className="d-flex align-items-center">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
                              <i className="ri-menu-3-line" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                              <ul className="navbar-nav ml-auto navbar-list align-items-center">
                                <li>
                                  <div className="iq-search-bar device-search">
                                    <form action="#" className="searchbox">
                                      <a className="search-link" href="/"><i className="ri-search-line" /></a>
                                      <input type="text" className="text search-input" placeholder="Search here..." />
                                    </form>
                                  </div>
                                </li>
                                <li className="nav-item nav-icon search-content">
                                  <a href="/" className="search-toggle rounded" id="dropdownSearch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="ri-search-line" />
                                  </a>
                                  <div className="iq-search-bar iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownSearch">
                                    <form action="#" className="searchbox p-2">
                                      <div className="form-group mb-0 position-relative">
                                        <input type="text" className="text search-input font-size-12" placeholder="type here to search..." />
                                        <a href="/" className="search-link"><i className="las la-search" /></a>
                                      </div>
                                    </form>
                                  </div>
                                </li>
                                <li className="nav-item nav-icon nav-item-icon dropdown">
                                  <a href="/" className="search-toggle dropdown-toggle" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail">
                                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                                      </path>
                                      <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                    <span className="bg-primary" />
                                  </a>
                                  <div className="iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                    <div className="card shadow-none m-0">
                                      <div className="card-body p-0 ">
                                        <div className="cust-title p-3">
                                          <div className="d-flex align-items-center justify-content-between">
                                            <h5 className="mb-0">All Messages</h5>
                                            <a className="badge badge-primary badge-card" href="/">3</a>
                                          </div>
                                        </div>
                                        <div className="px-3 pt-0 pb-0 sub-card">
                                          <a href="/" className="iq-sub-card">
                                            <div className="media align-items-center cust-card py-3 border-bottom">
                                              <div className>
                                                <img className="avatar-50 rounded-small" src="../assets/images/user/01.jpg" alt={"01"} />
                                              </div>
                                              <div className="media-body ml-3">
                                                <div className="d-flex align-items-center justify-content-between">
                                                  <h6 className="mb-0">Emma Watson</h6>
                                                  <small className="text-dark"><b>12 : 47 pm</b></small>
                                                </div>
                                                <small className="mb-0">Lorem ipsum dolor sit amet</small>
                                              </div>
                                            </div>
                                          </a>
                                          <a href="/" className="iq-sub-card">
                                            <div className="media align-items-center cust-card py-3 border-bottom">
                                              <div className>
                                                <img className="avatar-50 rounded-small" src="../assets/images/user/02.jpg" alt={"02"} />
                                              </div>
                                              <div className="media-body ml-3">
                                                <div className="d-flex align-items-center justify-content-between">
                                                  <h6 className="mb-0">Ashlynn Franci</h6>
                                                  <small className="text-dark"><b>11 : 30 pm</b></small>
                                                </div>
                                                <small className="mb-0">Lorem ipsum dolor sit amet</small>
                                              </div>
                                            </div>
                                          </a>
                                          <a href="/" className="iq-sub-card">
                                            <div className="media align-items-center cust-card py-3">
                                              <div className>
                                                <img className="avatar-50 rounded-small" src="../assets/images/user/03.jpg" alt={"03"} />
                                              </div>
                                              <div className="media-body ml-3">
                                                <div className="d-flex align-items-center justify-content-between">
                                                  <h6 className="mb-0">Kianna Carder</h6>
                                                  <small className="text-dark"><b>11 : 21 pm</b></small>
                                                </div>
                                                <small className="mb-0">Lorem ipsum dolor sit amet</small>
                                              </div>
                                            </div>
                                          </a>
                                        </div>
                                        <a className="right-ic btn btn-primary btn-block position-relative p-2" href="/" role="button">
                                          View All
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li className="nav-item nav-icon nav-item-icon dropdown">
                                  <a href="/" className="search-toggle dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell">
                                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                    </svg>
                                    <span className="bg-primary " />
                                  </a>
                                  <div className="iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <div className="card shadow-none m-0">
                                      <div className="card-body p-0 ">
                                        <div className="cust-title p-3">
                                          <div className="d-flex align-items-center justify-content-between">
                                            <h5 className="mb-0">Notifications</h5>
                                            <a className="badge badge-primary badge-card" href="/">3</a>
                                          </div>
                                        </div>
                                        <div className="px-3 pt-0 pb-0 sub-card">
                                          <a href="/" className="iq-sub-card">
                                            <div className="media align-items-center cust-card py-3 border-bottom">
                                              <div className>
                                                <img className="avatar-50 rounded-small" src="../assets/images/user/01.jpg" alt={"01"} />
                                              </div>
                                              <div className="media-body ml-3">
                                                <div className="d-flex align-items-center justify-content-between">
                                                  <h6 className="mb-0">Emma Watson</h6>
                                                  <small className="text-dark"><b>12 : 47 pm</b></small>
                                                </div>
                                                <small className="mb-0">Lorem ipsum dolor sit amet</small>
                                              </div>
                                            </div>
                                          </a>
                                          <a href="/" className="iq-sub-card">
                                            <div className="media align-items-center cust-card py-3 border-bottom">
                                              <div className>
                                                <img className="avatar-50 rounded-small" src="../assets/images/user/02.jpg" alt={"02"} />
                                              </div>
                                              <div className="media-body ml-3">
                                                <div className="d-flex align-items-center justify-content-between">
                                                  <h6 className="mb-0">Ashlynn Franci</h6>
                                                  <small className="text-dark"><b>11 : 30 pm</b></small>
                                                </div>
                                                <small className="mb-0">Lorem ipsum dolor sit amet</small>
                                              </div>
                                            </div>
                                          </a>
                                          <a href="/" className="iq-sub-card">
                                            <div className="media align-items-center cust-card py-3">
                                              <div className>
                                                <img className="avatar-50 rounded-small" src="../assets/images/user/03.jpg" alt={"03"} />
                                              </div>
                                              <div className="media-body ml-3">
                                                <div className="d-flex align-items-center justify-content-between">
                                                  <h6 className="mb-0">Kianna Carder</h6>
                                                  <small className="text-dark"><b>11 : 21 pm</b></small>
                                                </div>
                                                <small className="mb-0">Lorem ipsum dolor sit amet</small>
                                              </div>
                                            </div>
                                          </a>
                                        </div>
                                        <a className="right-ic btn btn-primary btn-block position-relative p-2" href="/" role="button">
                                          View All
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li className="nav-item nav-icon dropdown caption-content">
                                  <a href="/" className="search-toggle dropdown-toggle  d-flex align-items-center" id="dropdownMenuButton4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src="../assets/images/user/1.jpg" className="img-fluid rounded-circle" alt="user" />
                                    <div className="caption ml-3">
                                      <h6 className="mb-0 line-height">  {JSON.parse(sessionStorage.getItem("userdetail"))?.name}                                      <i className="las la-angle-down ml-2" /></h6>
                                    </div>
                                  </a>                            
                                  <ul className="dropdown-menu dropdown-menu-right border-none" aria-labelledby="dropdownMenuButton">
                                    <li className="dropdown-item d-flex svg-icon">
                                      <svg className="svg-icon mr-0 text-primary" id="h-01-p" width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <a href="../app/user-profile.html">My Profile</a>
                                    </li>
                                    <li className="dropdown-item d-flex svg-icon">
                                      <svg className="svg-icon mr-0 text-primary" id="h-02-p" width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                      </svg>
                                      <a href="../app/user-profile-edit.html">Edit Profile</a>
                                    </li>
                                    <li className="dropdown-item d-flex svg-icon">
                                      <svg className="svg-icon mr-0 text-primary" id="h-03-p" width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                      <a href="../app/user-account-setting.html">Account Settings</a>
                                    </li>
                                    <li className="dropdown-item d-flex svg-icon">
                                      <svg className="svg-icon mr-0 text-primary" id="h-04-p" width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                      </svg>
                                      <a href="../app/user-privacy-setting.html">Privacy Settings</a>
                                    </li>
                                    <li className="dropdown-item  d-flex svg-icon border-top">
                                      <svg className="svg-icon mr-0 text-primary" id="h-05-p" width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                      </svg>
                                      <a href="/logout">Logout</a>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </nav>
                      </div>
                    </div>      <div className="content-page">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-6 col-lg-3">
                            <div className="card card-block card-stretch card-height">
                              <div className="card-body">
                                <div className="top-block d-flex align-items-center justify-content-between">
                                  <h5>Investment</h5>
                                  <span className="badge badge-primary">Monthly</span>
                                </div>
                                <h3>$<span className="counter">35000</span></h3>
                                <div className="d-flex align-items-center justify-content-between mt-1">
                                  <p className="mb-0">Total Revenue</p>
                                  <span className="text-primary">65%</span>
                                </div>
                                <div className="iq-progress-bar bg-primary-light mt-2">
                                  <span className="bg-primary iq-progress progress-1" data-percent={65} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-3">
                            <div className="card card-block card-stretch card-height">
                              <div className="card-body">
                                <div className="top-block d-flex align-items-center justify-content-between">
                                  <h5>Sales</h5>
                                  <span className="badge badge-warning">Anual</span>
                                </div>
                                <h3>$<span className="counter">25100</span></h3>
                                <div className="d-flex align-items-center justify-content-between mt-1">
                                  <p className="mb-0">Total Revenue</p>
                                  <span className="text-warning">35%</span>
                                </div>
                                <div className="iq-progress-bar bg-warning-light mt-2">
                                  <span className="bg-warning iq-progress progress-1" data-percent={35} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-3">
                            <div className="card card-block card-stretch card-height">
                              <div className="card-body">
                                <div className="top-block d-flex align-items-center justify-content-between">
                                  <h5>Cost</h5>
                                  <span className="badge badge-success">Today</span>
                                </div>
                                <h3>$<span className="counter">33000</span></h3>
                                <div className="d-flex align-items-center justify-content-between mt-1">
                                  <p className="mb-0">Total Revenue</p>
                                  <span className="text-success">85%</span>
                                </div>
                                <div className="iq-progress-bar bg-success-light mt-2">
                                  <span className="bg-success iq-progress progress-1" data-percent={85} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-3">
                            <div className="card card-block card-stretch card-height">
                              <div className="card-body">
                                <div className="top-block d-flex align-items-center justify-content-between">
                                  <h5>Profit</h5>
                                  <span className="badge badge-info">Weekly</span>
                                </div>
                                <h3>$<span className="counter">2500</span></h3>
                                <div className="d-flex align-items-center justify-content-between mt-1">
                                  <p className="mb-0">Total Revenue</p>
                                  <span className="text-info">55%</span>
                                </div>
                                <div className="iq-progress-bar bg-info-light mt-2">
                                  <span className="bg-info iq-progress progress-1" data-percent={55} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-8">
                            <div className="card-transparent card-block card-stretch card-height">
                              <div className="card-body p-0">
                                <div className="card">
                                  <div className="card-header d-flex justify-content-between">
                                    <div className="header-title">
                                      <h4 className="card-title">Overview Progress</h4>
                                    </div>
                                  </div>
                                  <div className="card-body">
                                    <ul className="list-inline p-0 mb-0">
                                      <li className="mb-1">
                                        <div className="row">
                                          <div className="col-sm-3">
                                            <p className="mb-0">UX / UI Design</p>
                                          </div>
                                          <div className="col-sm-6">
                                            <div className="d-flex align-items-center justify-content-between">
                                              <div className="iq-progress-bar bg-secondary-light">
                                                <span className="bg-secondary iq-progress progress-1" data-percent={65} />
                                              </div>
                                              <span className="ml-3">65%</span>
                                            </div>                                                                
                                          </div>
                                          <div className="col-sm-3">
                                            <div className="iq-media-group text-sm-right">
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/05.jpg" alt="" />
                                              </a>
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/06.jpg" alt="" />
                                              </a>
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/07.jpg" alt="" />
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                      <li className="mb-1">
                                        <div className="d-flex align-items-center justify-content-between row">
                                          <div className="col-sm-3">
                                            <p className="mb-0">Development</p>
                                          </div>
                                          <div className="col-sm-6">
                                            <div className="d-flex align-items-center justify-content-between">
                                              <div className="iq-progress-bar bg-primary-light">
                                                <span className="bg-primary iq-progress progress-1" data-percent={59} />
                                              </div>
                                              <span className="ml-3">59%</span>
                                            </div>                                                                
                                          </div>
                                          <div className="col-sm-3">
                                            <div className="iq-media-group text-sm-right">
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/08.jpg" alt="" />
                                              </a>
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/09.jpg" alt="" />
                                              </a>
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/04.jpg" alt="" />
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="d-flex align-items-center justify-content-between row">
                                          <div className="col-sm-3">
                                            <p className="mb-0">Testing</p>
                                          </div>
                                          <div className="col-sm-6">
                                            <div className="d-flex align-items-center justify-content-between">
                                              <div className="iq-progress-bar bg-warning-light">
                                                <span className="bg-warning iq-progress progress-1" data-percent={78} />
                                              </div>
                                              <span className="ml-3">78%</span>
                                            </div>                                                                
                                          </div>
                                          <div className="col-sm-3">
                                            <div className="iq-media-group text-sm-right">
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/01.jpg" alt="" />
                                              </a>
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/02.jpg" alt="" />
                                              </a>
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/03.jpg" alt="" />
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="card">
                                      <div className="card-body">
                                        <div className="row">
                                          <div className="col-sm-8">
                                            <div className="row align-items-center">
                                              <div className="col-md-3">
                                                <div id="circle-progress-21" className="circle-progress-01 circle-progress circle-progress-primary" data-min-value={0} data-max-value={100} data-value={25} data-type="percent" />
                                              </div>
                                              <div className="col-md-9">
                                                <div className="mt-3 mt-md-0">
                                                  <h5 className="mb-1">Cloud Service Theme</h5>
                                                  <p className="mb-0">Exclusively for cloud-based/ Startup theme.</p>
                                                </div>                                                        
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-sm-4 text-sm-right mt-3 mt-sm-0">
                                            <div className="iq-media-group">
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/05.jpg" alt="" />
                                              </a>
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/06.jpg" alt="" />
                                              </a>
                                            </div>
                                            <a className="btn btn-white text-primary link-shadow mt-2">High</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-12">
                                    <div className="card">
                                      <div className="card-body">
                                        <div className="row">
                                          <div className="col-sm-8">
                                            <div className="row align-items-center">
                                              <div className="col-md-3">
                                                <div id="circle-progress-22" className="circle-progress-01 circle-progress circle-progress-secondary" data-min-value={0} data-max-value={100} data-value={30} data-type="percent" />
                                              </div>
                                              <div className="col-md-9">
                                                <div className="mt-3 mt-md-0">
                                                  <h5 className="mb-1">Automotive WordPress</h5>
                                                  <p className="mb-0">Dealership-based business WordPress theme.</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-sm-4 text-sm-right mt-3 mt-sm-0">
                                            <div className="iq-media-group">
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/07.jpg" alt="" />
                                              </a>
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/02.jpg" alt="" />
                                              </a>
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/04.jpg" alt="" />
                                              </a>                                                
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/08.jpg" alt="" />
                                              </a>
                                            </div>
                                            <a className="btn btn-white text-secondary link-shadow mt-2">Medium</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-12">
                                    <div className="card">
                                      <div className="card-body">
                                        <div className="row">
                                          <div className="col-sm-8">
                                            <div className="row align-items-center">
                                              <div className="col-md-3">
                                                <div id="circle-progress-23" className="circle-progress-01 circle-progress circle-progress-warning" data-min-value={0} data-max-value={100} data-value={15} data-type="percent" />
                                              </div>
                                              <div className="col-md-9">
                                                <div className="mt-3 mt-md-0">
                                                  <h5 className="mb-1">Online Education</h5>
                                                  <p className="mb-0">Remote students and teachers dashboard.</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-sm-4 text-sm-right mt-3 mt-sm-0">
                                            <div className="iq-media-group">
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/01.jpg" alt="" />
                                              </a>
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/02.jpg" alt="" />
                                              </a>
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/03.jpg" alt="" />
                                              </a>
                                            </div>
                                            <a className="btn btn-white text-warning link-shadow mt-2">Low</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-12">
                                    <div className="card mb-0">
                                      <div className="card-body">
                                        <div className="row">
                                          <div className="col-sm-8">
                                            <div className="row align-items-center">
                                              <div className="col-md-3">
                                                <div id="circle-progress-24" className="circle-progress-01 circle-progress circle-progress-success" data-min-value={0} data-max-value={100} data-value={40} data-type="percent" />
                                              </div>
                                              <div className="col-md-9">
                                                <div className="mt-3 mt-md-0">
                                                  <h5 className="mb-1">Blog/Magazine Theme</h5>
                                                  <p className="mb-0">Launch visually appealing Blog theme.</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-sm-4 text-sm-right mt-3 mt-sm-0">
                                            <div className="iq-media-group">
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/05.jpg" alt="" />
                                              </a>
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/06.jpg" alt="" />
                                              </a>
                                              <a href="/" className="iq-media">
                                                <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/07.jpg" alt="" />
                                              </a>
                                            </div>
                                            <a className="btn btn-white text-success  link-shadow mt-2">High</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4">
                            <div className="card card-block card-stretch card-height">
                              <div className="card-body">
                                <div className="card border-bottom pb-2 shadow-none">
                                  <div className="card-body text-center inln-date flet-datepickr">
                                    <input type="text" id="inline-date" className="date-input basicFlatpickr d-none" readOnly="readonly" />
                                  </div>
                                </div>
                                <div className="card card-list">
                                  <div className="card-body">
                                    <div className="d-flex align-items-center">
                                      <svg className="svg-icon text-secondary mr-3" width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                      </svg>
                                      <div className="pl-3 border-left">
                                        <h5 className="mb-1">Direct Development</h5>
                                        <p className="mb-0">Unveling the design system</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="card card-list">
                                  <div className="card-body">
                                    <div className="d-flex align-items-center">
                                      <svg className="svg-icon text-primary mr-3" width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                                        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                                      </svg>
                                      <div className="pl-3 border-left">
                                        <h5 className="mb-1">action point assigned</h5>
                                        <p className="mb-0">Unveling the design system</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="card card-list">
                                  <div className="card-body">
                                    <div className="d-flex align-items-center">
                                      <svg className="svg-icon text-warning mr-3" width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                      </svg>
                                      <div className="pl-3 border-left">
                                        <h5 className="mb-1">Private Notes</h5>
                                        <p className="mb-0">Unveling the design system</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="card card-list mb-0">
                                  <div className="card-body">
                                    <div className="d-flex align-items-center">
                                      <svg className="svg-icon text-success mr-3" width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                      </svg>
                                      <div className="pl-3 border-left">
                                        <h5 className="mb-1">Support Request</h5>
                                        <p className="mb-0">Unveling the design system</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="card-transparent mb-0">
                              <div className="card-header d-flex align-items-center justify-content-between p-0 pb-3">
                                <div className="header-title">
                                  <h4 className="card-title">Current Projects</h4>
                                </div>
                                <div className="card-header-toolbar d-flex align-items-center">
                                  <div id="top-project-slick-arrow" className="slick-aerrow-block">
                                  </div>
                                </div>
                              </div>
                              <div className="card-body p-0">
                                <ul className="list-unstyled row top-projects mb-0">
                                  <li className="col-lg-4">                                    
                                    <div className="card">
                                      <div className="card-body"> 
                                        <h5 className="mb-3">Hotel Management App UI Kit</h5>
                                        <p className="mb-3"><i className="las la-calendar-check mr-2" />02 / 02 / 2021</p>
                                        <div className="iq-progress-bar bg-secondary-light mb-4">
                                          <span className="bg-secondary iq-progress progress-1" data-percent={65} style={{transition: 'width 2s ease 0s', width: '65%'}} />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="iq-media-group">
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/01.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/02.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/03.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/04.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                          </div>
                                          <div>
                                            <a href="/" className="btn bg-secondary-light">Design</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="col-lg-4">
                                    <div className="card">
                                      <div className="card-body"> 
                                        <h5 className="mb-3">General Improvement in pages</h5>
                                        <p className="mb-3"><i className="las la-calendar-check mr-2" />02 / 02 / 2021</p>
                                        <div className="iq-progress-bar bg-info-light mb-4">
                                          <span className="bg-info iq-progress progress-1" data-percent={65} style={{transition: 'width 2s ease 0s', width: '65%'}} />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="iq-media-group">
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/05.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/06.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/07.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/08.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                          </div>
                                          <div>
                                            <a href="/" className="btn bg-info-light">Testing</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="col-lg-4">
                                    <div className="card">
                                      <div className="card-body"> 
                                        <h5 className="mb-3">Product list view changes</h5>
                                        <p className="mb-3"><i className="las la-calendar-check mr-2" />02 / 02 / 2021</p>
                                        <div className="iq-progress-bar bg-success-light mb-4">
                                          <span className="bg-success iq-progress progress-1" data-percent={65} style={{transition: 'width 2s ease 0s', width: '65%'}} />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="iq-media-group">
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/03.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/04.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/05.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/06.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                          </div>
                                          <div>
                                            <a href="/" className="btn bg-success-light">SEO</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="col-lg-4">
                                    <div className="card">
                                      <div className="card-body"> 
                                        <h5 className="mb-3">Add Multiple theme options</h5>
                                        <p className="mb-3"><i className="las la-calendar-check mr-2" />02 / 02 / 2021</p>
                                        <div className="iq-progress-bar bg-warning-light mb-4">
                                          <span className="bg-warning iq-progress progress-1" data-percent={65} style={{transition: 'width 2s ease 0s', width: '65%'}} />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="iq-media-group">
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/01.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/02.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/03.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/04.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                          </div>
                                          <div>
                                            <a href="/" className="btn bg-warning-light">Development</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="col-lg-4">
                                    <div className="card">
                                      <div className="card-body"> 
                                        <h5 className="mb-3">Admin Panel Customization</h5>
                                        <p className="mb-3"><i className="las la-calendar-check mr-2" />02 / 02 / 2021</p>
                                        <div className="iq-progress-bar bg-primary-light mb-4">
                                          <span className="bg-primary iq-progress progress-1" data-percent={65} />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="iq-media-group">
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/01.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/02.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/03.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/04.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                          </div>
                                          <div>
                                            <a href="/" className="btn bg-primary-light">Content</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Page end  */}
                      </div>
                    </div>
                  </div>
                  {/* Wrapper End*/}
                  {/* Modal list start */}
                  <div className="modal fade" role="dialog" aria-modal="true" id="new-project-modal">
                    <div className="modal-dialog  modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-header d-block text-center pb-3 border-bttom">
                          <h3 className="modal-title" id="exampleModalCenterTitle01">New Project</h3>
                        </div>
                        <div className="modal-body">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText01" className="h5">Project Name*</label>
                                <input type="text" className="form-control" id="exampleInputText01" placeholder="Project Name" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Categories *</label>
                                <select name="type" className="selectpicker form-control" data-style="py-0">
                                  <option>Category</option>
                                  <option>Android</option>
                                  <option>IOS</option>
                                  <option>Ui/Ux Design</option>
                                  <option>Development</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText004" className="h5">Due Dates*</label>
                                <input type="date" className="form-control" id="exampleInputText004" defaultValue />
                              </div>                        
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText07" className="h5">Assign Members*</label>
                                <input type="text" className="form-control" id="exampleInputText07" />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="d-flex flex-wrap align-items-ceter justify-content-center mt-2">
                                <div className="btn btn-primary mr-3" data-dismiss="modal">Save</div>
                                <div className="btn btn-primary" data-dismiss="modal">Cancel</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>    <div className="modal fade bd-example-modal-lg" role="dialog" aria-modal="true" id="new-task-modal">
                    <div className="modal-dialog  modal-dialog-centered modal-lg" role="document">
                      <div className="modal-content">
                        <div className="modal-header d-block text-center pb-3 border-bttom">
                          <h3 className="modal-title" id="exampleModalCenterTitle">New Task</h3>
                        </div>
                        <div className="modal-body">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText02" className="h5">Task Name</label>
                                <input type="text" className="form-control" id="exampleInputText02" placeholder="Enter task Name" />
                                <a href="/" className="task-edit text-body"><i className="ri-edit-box-line" /></a>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Assigned to</label>
                                <select name="type" className="selectpicker form-control" data-style="py-0">
                                  <option>Memebers</option>
                                  <option>Kianna Septimus</option>
                                  <option>Jaxson Herwitz</option>
                                  <option>Ryan Schleifer</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText05" className="h5">Due Dates*</label>
                                <input type="date" className="form-control" id="exampleInputText05" defaultValue />
                              </div>                        
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Category</label>
                                <select name="type" className="selectpicker form-control" data-style="py-0">
                                  <option>Design</option>
                                  <option>Android</option>
                                  <option>IOS</option>
                                  <option>Ui/Ux Design</option>
                                  <option>Development</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText040" className="h5">Description</label>
                                <textarea className="form-control" id="exampleInputText040" rows={2} defaultValue={""} />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText005" className="h5">Checklist</label>
                                <input type="text" className="form-control" id="exampleInputText005" placeholder="Add List" />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-0">
                                <label htmlFor="exampleInputText01" className="h5">Attachments</label>
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" id="inputGroupFile003" />
                                  <label className="custom-file-label" htmlFor="inputGroupFile003">Upload media</label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="d-flex flex-wrap align-items-ceter justify-content-center mt-4">
                                <div className="btn btn-primary mr-3" data-dismiss="modal">Save</div>
                                <div className="btn btn-primary" data-dismiss="modal">Cancel</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>    <div className="modal fade bd-example-modal-lg" role="dialog" aria-modal="true" id="new-user-modal">
                    <div className="modal-dialog  modal-dialog-centered modal-lg" role="document">
                      <div className="modal-content">
                        <div className="modal-header d-block text-center pb-3 border-bttom">
                          <h3 className="modal-title" id="exampleModalCenterTitle02">New User</h3>
                        </div>
                        <div className="modal-body">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group mb-3 custom-file-small">
                                <label htmlFor="exampleInputText01" className="h5">Upload Profile Picture</label>
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" id="inputGroupFile02" />
                                  <label className="custom-file-label" htmlFor="inputGroupFile02">Choose file</label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Full Name</label>
                                <input type="text" className="form-control" id="exampleInputText2" placeholder="Enter your full name" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText04" className="h5">Phone Number</label>
                                <input type="text" className="form-control" id="exampleInputText04" placeholder="Enter phone number" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText006" className="h5">Email</label>
                                <input type="text" className="form-control" id="exampleInputText006" placeholder="Enter your Email" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Type</label>
                                <select name="type" className="selectpicker form-control" data-style="py-0">
                                  <option>Type</option>
                                  <option>Trainee</option>
                                  <option>Employee</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Role</label>
                                <select name="type" className="selectpicker form-control" data-style="py-0">
                                  <option>Role</option>
                                  <option>Designer</option>
                                  <option>Developer</option>
                                  <option>Manager</option>
                                  <option>BDE</option>
                                  <option>SEO</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="d-flex flex-wrap align-items-ceter justify-content-center mt-2">
                                <div className="btn btn-primary mr-3" data-dismiss="modal">Save</div>
                                <div className="btn btn-primary" data-dismiss="modal">Cancel</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>    <div className="modal fade bd-example-modal-lg" role="dialog" aria-modal="true" id="new-create-modal">
                    <div className="modal-dialog  modal-dialog-centered modal-lg" role="document">
                      <div className="modal-content">
                        <div className="modal-header d-block text-center pb-3 border-bttom">
                          <h3 className="modal-title" id="exampleModalCenterTitle03">New Task</h3>
                        </div>
                        <div className="modal-body">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText03" className="h5">Task Name</label>
                                <input type="text" className="form-control" id="exampleInputText03" placeholder="Enter task Name" />
                                <a href="/" className="task-edit text-body"><i className="ri-edit-box-line" /></a>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Assigned to</label>
                                <select name="type" className="selectpicker form-control" data-style="py-0">
                                  <option>Memebers</option>
                                  <option>Kianna Septimus</option>
                                  <option>Jaxson Herwitz</option>
                                  <option>Ryan Schleifer</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Project Name</label>
                                <select name="type" className="selectpicker form-control" data-style="py-0">
                                  <option>Enter your project Name</option>
                                  <option>Ui/Ux Design</option>
                                  <option>Dashboard Templates</option>
                                  <option>Wordpress Themes</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText40" className="h5">Description</label>
                                <textarea className="form-control" id="exampleInputText40" rows={2} placeholder="Textarea" defaultValue={""} />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText8" className="h5">Checklist</label>
                                <input type="text" className="form-control" id="exampleInputText8" placeholder="Add List" />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-0">
                                <label htmlFor="exampleInputText01" className="h5">Attachments</label>
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" id="inputGroupFile01" />
                                  <label className="custom-file-label" htmlFor="inputGroupFile01">Upload media</label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="d-flex flex-wrap align-items-ceter justify-content-center mt-4">
                                <div className="btn btn-primary mr-3" data-dismiss="modal">Save</div>
                                <div className="btn btn-primary" data-dismiss="modal">Cancel</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <footer className="iq-footer">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-lg-6">
                          <ul className="list-inline mb-0">
                            <li className="list-inline-item"><a href="../backend/privacy-policy.html">Privacy Policy</a></li>
                            <li className="list-inline-item"><a href="../backend/terms-of-service.html">Terms of Use</a></li>
                          </ul>
                        </div>
                        <div className="col-lg-6 text-right">
                          <span className="mr-1">©</span> <a href="/" className>Webkit</a>.
                        </div>
                      </div>
                    </div>
                  </footer>
                </div>
            
    )
}

export default Dashboard;