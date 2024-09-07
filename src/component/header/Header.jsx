import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './../../store/store';
import { prevStep, nextStep,prevPartialStep } from '../../store/formSlice';
import "./Header.css";
import images from './../../images';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header({formLastStep }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentStep = useSelector((state) => state.form.currentStep);
  const partialStep = useSelector((state) => state.form.partialStep);
  const { pickupLocation, dropLocation } = useSelector((state) => state.form.formData);

  const [isNavbarVisible, setNavbarVisible] = useState(false);

  const isAuthPage = ['/login', '/register', '/otp-login', '/user-details'].includes(location.pathname);
  const navbarRef = useRef(null);

  const isFirstStep = currentStep === 1 && partialStep === 0;
  const isLastStep = currentStep === 6 && partialStep === 1;
  
  
  useEffect(() => {
    if (isNavbarVisible) {
      setNavbarVisible(false);
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        event.target.id !== 'toggle-btn' &&
        event.target.id !== 'cross-btn'
      ) {
        setNavbarVisible(false);
      }
    };

    if (isNavbarVisible) {
       //document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavbarVisible]);

  if (isAuthPage) {
    return null;
  }

  const handleToggleClick = () => {
    setNavbarVisible(true);
  };

  const handleCrossClick = () => {
    
    setTimeout(() => {
      setNavbarVisible(false);
    }, 10);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('auth_token');
    dispatch(logout());
    navigate('/');
  };

 
  const handleBack = () => {
    if (partialStep > 0) {
      if(partialStep > 0 && currentStep == 5){
        console.log("here 2");
        dispatch(prevStep());  
      } 
      else{
        dispatch(prevPartialStep());
      }
     
    } else if (currentStep > 1) {
      dispatch(prevStep());
    }
  };

 
  
  const handleClick = (event) => { 
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {!isFirstStep ? (
        <div className='stepperHeader'>
          <div className='inner'>
            <div className="prevbtn arrbtns">
              {!isFirstStep && formLastStep  &&  (
                <button onClick={handleBack}>
                  <IoIosArrowBack style={{ color: 'black', fontSize: '17px' }} />
                </button>
              )}
            </div>
            <div className='locate'>
              {pickupLocation}
              <span><img src={images.stepperarrow} alt="Step Arrow" /></span>
              {dropLocation}
            </div>
            <div className='nxtbtn arrbtns'>
             
               {/* {isLastStep && (
                <button onClick={() => dispatch(nextStep())}>
                  <IoIosArrowForward style={{ color: 'black', fontSize: '17px' }} />
                </button>
              )}  */}
            </div>
          </div>
        </div>
      ) : (
        <header className="header">
          <div className='inner'>
            <div className="logo">
              <Link to="/">
                <img src={images.logo} alt='logo' />
              </Link>
            </div>

            <div className="rightheader">
              <div className='accountbtn'>
              {isLoggedIn ? (
                <>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{
                    padding:'0',
                    minWidth:'unset'
                  }}
                >
                  <img src= {images.profileuser} alt='user' className='img-fluid usericon'></img>
                </Button>
                <Menu
                  id="Head_dropdownmenu"
                  className='Head_dropdownmenu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClose={handleClose}>
                    <Link to="/profile" onClick={() => {
    setAnchorEl(null);}}>Profile</Link>
                  </MenuItem>
                  <MenuItem onClose={handleClose}>
                    <Link to="/dashboard" onClick={() => {
    setAnchorEl(null);}}>Dashboard</Link>
                  </MenuItem>
                  <MenuItem className='logout text-danger' onClick={handleLogout} onClose={handleClose}>Logout</MenuItem>
                </Menu>
                </>
              ): (
                  <Link to="/login">Login</Link>
                )}
              </div>
              <div className='tooglebtn' onClick={handleToggleClick}>
                {!isNavbarVisible ? (
                    <button id="toggle-btn" onClick={handleToggleClick}>
                      <img src={images.togglebtn} alt='togglebtn' />
                    </button>
                  ) : (
                    <button id="cross-btn" onClick={handleCrossClick}>
                      <img src={images.crossIcon} alt='cross' />
                    </button>
                  )}
              </div>
              {isNavbarVisible && (
                <div className='togglenavbar' ref={navbarRef}>
                  <div className='container-sm'>
                    <ul>
                      <li>
                        <h2> <img src={images.truckIcon} alt="Product" /> Product</h2>
                        <ul>
                          <li>
                            <Link to="">
                              Full load (FLT)
                            </Link>
                          </li>
                          <li>
                            <Link to="">
                              Tracking
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h2> <img src={images.Subtract} alt="Why choose us?" /> Why choose us?</h2>
                        <ul>
                          <li>
                            <Link to="">
                              Why choose us
                            </Link>
                          </li>
                          <li>
                            <Link to="">
                              How it works
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h2> <img src={images.aboutIcon} alt="About" /> About</h2>
                        <ul>
                          <li>
                            <Link to="">
                              About us
                            </Link>
                          </li>
                          <li>
                            <Link to="">
                              Career
                            </Link>
                          </li>
                          <li>
                            <Link to="">
                              Contact us
                            </Link>
                          </li>
                        </ul>
                      </li>
                      {!isLoggedIn ? (
                        <li>
                          <Link to="/register?userType=driver">Driver Signup</Link>
                        </li>
                      ) : (
                       <>
                        <li>
                          <Link to="/loadboard">Load Board</Link>
                        </li>
                        <li>
                          <Link to="/profile">Profile</Link>
                        </li>
                       </>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
