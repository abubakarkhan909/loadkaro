import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './App.css'
import './index.css';
import Home from './component/home/Home';
import About from './component/about/About';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import images from './images';
import Login from './component/login/Login';
import LoginOtpScreen from './component/login/LoginOtpScreen';
import Signup from './component/signup/Signup';
import Loadboard from './component/loadboard/Loadboard';
import './Responsive.css'
import Profile from './component/profile/Profile';
import UserDetailsScreen from './component/UserDetailsScreen/UserDetailsScreen';
import { login, logout, setLoggedInViaOTP } from './store/store';
import LoadboardCard from './component/LoadboardCard/LoadBoardCard';
import PrivacyPolicy from './pages/privacyPolicy/PrivacyPolicy'


function AppContent() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const loggedInViaOTP = useSelector((state) => state.auth.loggedInViaOTP);
  const [showFooter, setShowFooter] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formLastStep, setFormLastStep] =useState(true);
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
  });
  const handleLogin = (method) => {
    dispatch(login());
    if (method === 'otp') {
      dispatch(setLoggedInViaOTP(true));
    } else {
      dispatch(setLoggedInViaOTP(false));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleFooterVisibility = (visible) => {
    setShowFooter(visible);
  };
  const footerData = {
    logoUrl: images.logo,
    sections: [
        {
        heading: 'Why choose us?',
        links: [
            { text: 'Why choose us', url: '#why-choose-us' },
            { text: 'How it works', url: '#how-it-works' },
        ],
        },
        {
        heading: 'Product',
        links: [
            { text: 'Full load (FLT)', url: '#' }
        ],
        },
        {
        heading: 'About',
        links: [
            { text: 'About us', url: '/about' },
            { text: 'Career', url: '#' },
            { text:'Contact us', url:'#'}
        ],
        },
        {
        heading: 'Address',
        links: [
            { text: 'Lahore,Tower B4 Unit #78, IT-Tower, Sector B-1, Gulberg, Lahore. 54000'},
        ],
        },
        {
        heading: 'Customer Service',
        links: [
            { text: 'Terms and conditions', url:'#'},
            { text: 'Privacy and policy', url:'/privacy-policy'},
            { text: 'Online payment terms', url:'#'},
        ],
        },
        {
        heading: 'Top Services',
        links: [
            { text: 'Logistics', url:'#'},
            { text: 'Transport service', url:'#'},
            { text: 'Freight service', url:'#'},
            { text: 'Full load booking', url:'#'}
        ],
        },
        {
        heading: 'Top Cities',
        links: [
            { text: 'Lahore', url:'#'},
            { text: 'Faisalabad', url:'#'},
            { text: 'Islamabad', url:'#'},
            { text: 'Karachi', url:'#'},
        ],
        },
    ],
    };
  // const handleFormDataChange = (field) => (e) => {
  //   const value = e.target ? e.target.value : e; 
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [field]: value,
     
  //   }));
   
  // };
  const updateFormLastStep = (value) => {
    setFormLastStep(value);
  };
 return(
  <>
  <Header
     pickupLocation={formData.pickupLocation}
     dropLocation={formData.dropLocation}
     currentStep={currentStep}
     prevStep={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
     nextStep={() => setCurrentStep((prev) => Math.min(prev + 1, 6))}
     isFirstStep={currentStep === 1}
     isLastStep={currentStep === 6}
     isLoggedIn={isLoggedIn}
     onLogout={handleLogout}
     formLastStep= {formLastStep}
  />
  <Routes>
    <Route path='/' element={
      <Home 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout} 
        onFooterVisibility={handleFooterVisibility} 
        currentStep={currentStep}
        updateFormLastStep={updateFormLastStep}
        setCurrentStep={setCurrentStep}
        />}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/login' element={<Login onLogin={handleLogin}  />}></Route>
    <Route path='/otp-login' element={<LoginOtpScreen onLogin={handleLogin}  updateFormLastStep={updateFormLastStep}/>}></Route>
    <Route path='/register' element={<Signup/>}></Route>
    <Route path='/loadboard' element={<LoadboardCard/>}></Route>
    <Route path='/dashboard' element={<Loadboard/>}></Route>
    <Route path='/profile' element={isLoggedIn ? <Profile/> : <Navigate to="/login" />}></Route>
    <Route path='/user-details' element={
          isLoggedIn && 
          loggedInViaOTP && 
          (!userDetails.email || !userDetails.username) ? 
            <UserDetailsScreen/> : 
            <Navigate to="/" />
        }></Route>
    <Route path='/privacy-policy' element={<PrivacyPolicy/>}></Route>
  </Routes>
  {showFooter && <Footer logoUrl={footerData.logoUrl} sections={footerData.sections} />}
  </>
 )
}
function App() {
 
  return (
   <>
    <Router>
      <AppContent/>
    </Router>
   
   </>
  )
}

export default App
