import React from 'react'
import './Footer.css'
import images from '../../images'
import { Link, useLocation } from 'react-router-dom';

function Footer({logoUrl,sections}) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname==='/otp-login' ;
  const isNoFooter = location.pathname==='/user-details'; 
  if (isAuthPage) {
    // Render a different footer for login or signup pages
    return (
      <footer className="auth-footer">
        <div className='container'>
          <div className='auth-footer-links'>
            <ul>
              <li>
                <div className="widget">
                  <h4 className="text-white text-white">Address</h4>
                  <address>Lahore,Tower B4 Unit #78, IT-Tower, Sector B-1, Gulberg, Lahore. 54000
                  </address>
                </div>
              </li>
              <li>
                <div className="widget">
                  <h4 className="text-white">Phone</h4>
                  <p>+923998827777</p>
                </div>
              </li>
              <li>
                  <div className="widget">
                    <h4 className="text-white">E-mail</h4>
                    <p><a href="mailto:support@loadkaro.com" className="text-white">support@loadkaro.com</a></p>
                </div>
              </li>
            </ul>
          </div>
          <div className='footer_bottom'>
            <p>
              ©2024 loadkaro logistics services Pvt. Ltd.
            </p>
            <div className='socials'>
              <a href="#">
                <img src={images.instaIcon}/>
              </a>
              <a href="#">
                <img src={images.iconsocial}/>
              </a>
              <a href="#">
                <img src={images.linkedinIcon}/>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  if (isNoFooter) {
    return(
      <></>
    )
  }
  return (
    <footer className="footer">
      <div className='container'>
        <div className='footer_links'> 
          <div className="footer-logo">
            <Link to="/">
              <img src={logoUrl} alt="Site Logo" />
            </Link>
          </div>
          <div className="footer-sections">
            {sections.map((section, index) => (
              <div key={index} className="footer-column">
                <h4>{section.heading}</h4>
                <div className='linklist'>
                  {section.links.map((link, i) => (
                    <div key={i}>
                      {link.url ? (
                        <Link to={link.url}>{link.text}</Link> // Only link
                      ) : (
                        <span>{link.text}</span> // Only text
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='footer_bottom'>
          <p>
            ©2024 loadkaro logistics services Pvt. Ltd.
          </p>
          <div className='socials'>
            <a href="#">
              <img src={images.instaIcon}/>
            </a>
            <a href="#">
              <img src={images.iconsocial}/>
            </a>
            <a href="#">
              <img src={images.linkedinIcon}/>
            </a>
          </div>
        </div>
      </div>
    </footer>
    
  )
}

export default Footer