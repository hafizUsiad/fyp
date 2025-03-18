import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from './sub component/navbar';
import Sidebar from './sub component/sidebar';
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
                    <Sidebar/>   
                    <TopBar/>
                    <div className="content-page">
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