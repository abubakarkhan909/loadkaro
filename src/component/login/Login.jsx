import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from './../../store/store';
import { sendOtp, loginUser,handleOtp } from '../../api/apiService'; 
import images from '../../images';
import './Login.css'

function Login({ onLogin,updateFormLastStep }) {
  const [loginType, setLoginType] = useState('mobile_number');
  const [mobile_number, setMobile] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  // Mock data for success
  const mockResponse = {
    success: true,
    token: 'dummy-token-123456',
  };

  const handleLogin = async () => {
    try {
      if (loginType === 'mobile_number') {
        localStorage.setItem('mobile_number', mobile_number);
        const response = await handleOtp(mobile_number);
  
        console.log("mobile response",response.status);
        if (response.status) {
          console.log('OTP sent successfully!');
          navigate('/otp-login'); // Navigate to OTP verification screen
        } else {
          console.log('Failed to send OTP');
        }
      } else {
        // Email/Mobile and password login
        const response = await loginUser({ email, password });
        if (response.data.status) {
          console.log("success here")
          const token = response.data.token;
          console.log("success here token",token)
          localStorage.setItem('auth_token', token);

          // Dispatch login action to Redux
           dispatch(loginAction({ token, email }));
          // onLogin('email');
          navigate('/'); // Navigate to the home page
        } else {
          alert('Invalid email/mobile or password');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message || 'An error occurred'}`);
      } else {
        alert('An error occurred while logging in.');
      }
    }
  };


  return (
    <div className="login authscreenmain">
      <Link to='/' >
            <img src={images.logo} alt='logo'/>
       </Link>
       <h4>
        Find Truck and start a safe cargo
       </h4>
       <div className='authinnermain'> 
        <div className='tabsbtn'>
            <button className={loginType === 'mobile_number' ? "active" : ""} onClick={() => setLoginType('mobile_number')}>OTP</button>
            <button className= {loginType === 'email' ? "active" : ""} onClick={() => setLoginType('email')}>Email/Mobile</button>
        </div>
        <div className='innercontent'>
            <h2>Shipper Login</h2>
                {loginType === 'email' ? (
                    <div className='authinputsform'>
                        <label>
                            Email/Mobile 
                        </label>
                        <input
                            type="text"
                            placeholder="Email or Mobile"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className='btn btn-primary w-100 mt-3' onClick={handleLogin}>Login</button>
                    </div>
                    ):(
                        <div className='authinputsform'>
                        <input
                            type="text"
                            placeholder="Mobile Number"
                            value={mobile_number }
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        <button className='btn btn-primary w-100 mt-3' onClick={handleLogin}>Send OTP</button>
                        {error && <div>{error}</div>}
                        </div>
                    ) 
                }
                <p className='mt-3 text-center'>
                    Don’t have an account? <Link to="/register">Register</Link>
                </p>
        </div>
       </div>
      
      
    </div>
  );
}

export default Login;
