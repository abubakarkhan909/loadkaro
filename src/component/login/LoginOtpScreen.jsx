import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login as loginAction } from './../../store/store';
import { handleOtp } from '../../api/apiService';
import { Link, useNavigate } from 'react-router-dom';

function LoginOtpScreen({ onLogin, updateFormLastStep }) {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    //const [mobile_number, setMobile_number] = useState(''); 
    const [otpSent, setOtpSent] = useState(false);
    const mobile_number = localStorage.getItem('mobile_number');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleOtpChange = (index) => (e) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {
          const newOtpDigits = [...otpDigits];
          newOtpDigits[index] = value;
          setOtpDigits(newOtpDigits);
          // Auto-focus next input field
          if (value && index < 5) {
            setTimeout(() => document.getElementById(`otp-${index + 1}`).focus(), 0);
          }
        }
        if (value === '' && index > 0) {
          setTimeout(() => document.getElementById(`otp-${index - 1}`).focus(), 0);
        }
      };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text');
        if (/^\d{6}$/.test(paste)) {
            const newOtpDigits = paste.split('');
            setOtpDigits(newOtpDigits);
        }
    };

    const handleResendOtp = async () => {
        setCanResend(false);
        setTimer(30);
        try {
          await handleOtp(mobile_number); // Send OTP again

          console.log('OTP sent again.',Response);
        } catch (error) {
          console.error('Error resending OTP:', error.message);
        }
      };

    const submitForm = async () => {
        const otp = otpDigits.join('');
        try {
            const result = await handleOtp(mobile_number, otp);
            if (result.status) {
            setShowSuccessPopup(true);
            // Redirect or update application state upon success
            onLogin(); // or other login success handling
            } else {
            console.error('Invalid OTP or request failed');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error.message);
        }
    };
    const handleSendOtp = async () => {
        const code = otpDigits.join('');
      
        try {
        
          const result = await handleOtp(mobile_number,code);
          console.log("API response:", result); 
          if (result.status) {
            const token = result.token;
            const email = result.user.email; // Extract email from user object
            const username = result.user.name;
            if (!token) {
                throw new Error('Token not found in the response');
              }
            setOtpSent(true);
            setShowSuccessPopup(false); 
            console.log('OTP Match successfully.');
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_email', email);
            localStorage.setItem('user_username', username);
            dispatch(loginAction({ token, email, username }));
            navigate("/");
          } else {
            console.error('Failed to send OTP');
          }
        } catch (error) {
          console.error('Error sending OTP:', error.message);
        }
      };

    return (
        <div className="step6Form innerformdiv">
            <h4>Enter 6 digit OTP</h4>
            <div className='otp-inputs'>
            <p>Please enter 6 digit code sent to your phone number</p>
                <div className='otpinputs'>
                    {otpDigits.map((digit, index) => (
                        <div key={index} className='inputin'>
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                value={digit}
                                onChange={handleOtpChange(index)}
                                onPaste={handlePaste}
                                maxLength={1}
                                style={{ width: '40px', margin: '5px' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {canResend ? (
                <div className="resend-otp">
                    <button className='' type="button" onClick={handleResendOtp}>
                        Resend code
                    </button>
                </div>
            ) : (
                <div className="otp-timer">
                    <p>Resend code {timer}s</p>
                </div>
            )}
            <div className='bigbtn mt-3'>
                <button className='btn btn-primary w-100' type="button" onClick={handleSendOtp}>
                    Submit
                </button>
            </div>
            {showSuccessPopup && <div>OTP Verified Successfully!</div>}
           
        </div>
    );
}

export default LoginOtpScreen;
