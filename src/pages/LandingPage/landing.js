import logoimg from '../../assets/images/logo.png';
import './landing.css';
import { Link } from 'react-router-dom';

function landing() {
  return (
    <div>
      <div className='container-fluid banner'>
        <div className='row'>
          <div className='col-md-12'>
            <nav className='navbar navbar-md' id="navbar-example2">
              <div className='navbar-brand'>
                <img src={logoimg} className='brandimage'></img>
              </div>
              <ul className='nav'>
                <li className='nav-item'>
                  <a className='nav-link' href='#about'>Home</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#services'>Service</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#partners'>Partners</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#contactus'>Contact</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href=''>Customer Portal</a>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link btn btn-warning' to='/login'>Login</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className='container-fluid pagecontent'>

        <div className='about' id="about">
          <h1>
            About <span className='secondLetter'>Easy Way</span>
          </h1>
          <p className='description'>
            Having started In December 2020, our company EasyWay has reached the hearts of people in Galle & Matara as one of the most reliable delivery services marking a new era in the field by filling up plenty of unfilled gaps thereby making us a top budding delivery company in Sri Lanka.
            Our services include delivering grocery items, medicines, stationery and foods having partnered with the top companies selling them within the Galle and Matara region. Furthermore, we care about any other delivery requirement of the customer as long as they are within the ethics and standards of the company. Our service is renowned for fast and safe deliveries and the customer feedbacks especially on social media bears ample testimony for the nature of our service.
            Apart from them, we are proud to announce that even as a budding up company, we have been able to aid the country to eradicate unemployment by providing a reasonable number of job opportunities to the deprived youth.
            As a company trying to improve day by day and showing promising results, it would be a humongous opportunity for us if you could extend your hands to partner with us to cater to your delivery requirements thereby leading it to a win-win situation.
          </p>
        </div>

        <div className='contenteliments services' id="services">
          <h1>
            Our <span className='secondLetter'>Services</span>
          </h1>

          <div className="padding">
            <div className="row container-fluid">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="owl-carousel">

                      <div className='item'>
                        <div className="card text-center" id='servicecard'>
                          <div className="card-body">
                            <div className="card-text cardicon">
                              <img src={require('../../assets/serviceicons/grocery.png')} className='cardimage'></img>
                            </div>
                            <h5 className="card-title servicename">GROCERY ITEMS DELIVERY SERVICE</h5>
                          </div>
                        </div>
                      </div>

                      <div className='item'>
                        <div className="card text-center" id='servicecard'>
                          <div className="card-body">
                            <div className="card-text cardicon">
                              <img src={require('../../assets/serviceicons/medicine.png')} className='cardimage'></img>
                            </div>
                            <h5 className="card-title servicename">MEDICINE DELIVERY SERVICE</h5>
                          </div>
                        </div>
                      </div>

                      <div className='item'>
                        <div className="card text-center" id='servicecard'>
                          <div className="card-body">
                            <div className="card-text cardicon">
                              <img src={require('../../assets/serviceicons/stationary.png')} className='cardimage'></img>
                            </div>
                            <h5 className="card-title servicename">STATIONARY ITEMS DELIVERY SERVICE</h5>
                          </div>
                        </div>
                      </div>

                      <div className='item'>
                        <div className="card text-center" id='servicecard'>
                          <div className="card-body">
                            <div className="card-text cardicon">
                              <img src={require('../../assets/serviceicons/food.png')} className='cardimage'></img>
                            </div>
                            <h5 className="card-title servicename">FOODS & BEVERAGES DELIVERY SERVICE</h5>
                          </div>
                        </div>
                      </div>


                      <div className='item'>
                        <div className="card text-center" id='servicecardyellow'>
                          <div className="card-body">
                            <div className="card-text cardicon">
                              <img src={require('../../assets/serviceicons/laundry.png')} className='cardimage'></img>
                            </div>
                            <h5 className="card-title servicename">PICKUP & DROP OFF LAUNDRY SERVICE</h5>
                          </div>
                        </div>
                      </div>


                      <div className='item'>
                        <div className="card text-center" id='servicecardyellow'>
                          <div className="card-body">
                            <div className="card-text cardicon">
                              <img src={require('../../assets/serviceicons/drunkndrive.png')} className='cardimage'></img>
                            </div>
                            <h5 className="card-title servicename">DRUNK & DRIVE <br></br> SERVICE</h5>
                          </div>
                        </div>
                      </div>

                      <div className='item'>
                        <div className="card text-center" id='servicecardyellow'>
                          <div className="card-body">
                            <div className="card-text cardicon">
                              <img src={require('../../assets/serviceicons/industrialtools.png')} className='cardimage'></img>
                            </div>
                            <h5 className="card-title servicename">SUPPLY ESSENTIAL INDUSTRIAL TOOLS</h5>
                          </div>
                        </div>
                      </div>

                      <div className='item'>
                        <div className="card text-center" id='servicecardyellow'>
                          <div className="card-body">
                            <div className="card-text cardicon">
                              <img src={require('../../assets/serviceicons/roadside.png')} className='cardimage'></img>
                            </div>
                            <h5 className="card-title servicename">ROADSIDE ASSISTANT SERVICE</h5>
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

        <div className='contenteliments partners' id="partners">
          <h1>
            Our <span className='secondLetter'>Partners</span>
          </h1>
          <div className="padding">
            <div className="row container-fluid">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="owl-carousel carousel">
                      <div className='item'>
                        <img className='imgPartner' src={require('../../assets/partners/burgerwings.png')}></img>
                      </div>

                      <div className='item'>
                        <img className='imgPartner' src={require('../../assets/partners/kfc.png')}></img>
                      </div>

                      <div className='item'>
                        <img className='imgPartner' src={require('../../assets/partners/devon.png')}></img>
                      </div>

                      <div className='item'>
                        <img className='imgPartner' src={require('../../assets/partners/ap.png')}></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className='contenteliments partners' id="contactus">
          <h1>
            Contact <span className='secondLetter'>Us</span>
          </h1>

          <p className='description'>
            We're happy to answer any questions you have or provide you with an estimate. Just send us a message in the form below with any questions you may have.
          </p>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <form className="mb-5" method="post" id="contactForm" name="contactForm">
                  <div className="row">

                    <div className="col-md-12 form-group">
                      <label htmlFor="name" className="col-form-label">Your Name</label>
                      <input type="text" className="form-control" name="name" id="name"></input>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 form-group">
                      <label htmlFor="name" className="col-form-label">Your Email</label>
                      <input type="text" className="form-control" name="name" id="name"></input>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 form-group">
                      <label htmlFor="email" className="col-form-label">Subject</label>
                      <input type="text" className="form-control" name="email" id="email"></input>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 form-group">
                      <label htmlFor="message" className="col-form-label">Message</label>
                      <textarea className="form-control" name="message" id="message" cols="30" rows="3"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <input type="submit" value="Send Message" className="btn btn-primary contactSubmit"></input>
                      <span className="submitting"></span>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-md-5">
                <img src={require('../../assets/images/contactside.png')} className='contactImage'></img>
              </div>

            </div>
          </div>

        </div>

      </div>

      <div className='contenteliments'>
        <div className='container-fluid footer'>
          <img src={logoimg} className='footerLogo'></img>
          <img src={require('../../assets/images/fbinsta.png')} className='footersocial'></img>
        </div>
      </div>

    </div>

  );
}

export default landing;
