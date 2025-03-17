import React from "react";
import { frontend_url } from "../../serverconfig";

function sidebar()
{
    return(
        <div className="iq-sidebar  sidebar-default ">
        <div className="iq-sidebar-logo d-flex align-items-center">
          <a href="http://localhost:3000/" className="header-logo">
            <img src={`${frontend_url}/assets/images/logo2.png`} alt="logo" />
            <h3 className="logo-title light-logo">HAPEst</h3>
          </a>
          <div className="iq-menu-bt-sidebar ml-0">
            <i className="las la-bars wrapper-menu" />
          </div>
        </div>
        <div className="data-scrollbar" data-scroll={1}>
          <nav className="iq-sidebar-menu">
            <ul id="iq-sidebar-toggle" className="iq-menu">
              <li className="active">
                <a href="http://localhost:3000/" className="svg-icon">                        
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
                <a href="/employees" className="svg-icon">                        
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
      </div> 
    )
}

export default sidebar;