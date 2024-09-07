import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/formSlice';
import { resetForm } from '../../store/formSlice'; 

function OtpScreen({updateFormLastStep}) {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form.formData); 
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [otpDigits, setOtpDigits] = useState(['', '', '', '','','']);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        // Set formLastStep to false when OtpScreen is rendered
        updateFormLastStep(false);
    
        // Optional: If you need to reset it when leaving the screen
        return () => {
          updateFormLastStep(true);
        };
      }, [updateFormLastStep]);
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
        if (/^\d?$/.test(value)) { // Ensure only digits are entered
            const newOtpDigits = [...otpDigits];
            newOtpDigits[index] = value;
            setOtpDigits(newOtpDigits);
            dispatch(updateFormData({ otp: newOtpDigits.join('') }));
    
            // Auto-focus next input field
            if (value && index < 3) {
                setTimeout(() => document.getElementById(`otp-${index + 1}`).focus(), 0);
            }
        }
        if (value === '' && index > 0) {
            setTimeout(() => document.getElementById(`otp-${index - 1}`).focus(), 0);
        }
    };
    
    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text');
        if (/^\d{6}$/.test(paste)) { // Ensure only 4 digits are pasted
            const newOtpDigits = paste.split('');
            setOtpDigits(newOtpDigits);
            dispatch(updateFormData({ otp: paste }));
        }
    };

    const handleResendOtp = () => {
        setCanResend(false);
        setTimer(30);
        // Add the API call to resend OTP here
        console.log('Resending OTP...');
        // Simulate API call delay
        setTimeout(() => {
            console.log('OTP sent again.');
        }, 1000);
    };
    const mockApiCall = (data) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (data.otp === '1234') {
              resolve({ success: true, message: 'Form submitted successfully' });
            } else {
              reject({ success: false, message: 'Invalid OTP' });
            }
          }, 1000); // Simulate a delay of 1 second
        });
      };
      const submitForm = async () => {
        
        try {
          console.log('Form data to be submitted:', formData);
          const result = await mockApiCall(formData); // Simulate the API call
    
          if (result.success) {

            console.log('Form submission successful:', formData);
            // Reset form in Redux store
            dispatch(resetForm());
    
            // Show success popup
            setShowSuccessPopup(true);
            setTimeout(() => {
              setShowSuccessPopup(false);
            }, 1500);
          } else {
            console.error('Form submission failed:', result.message);
          }
        } catch (error) {
          console.error('Form submission error:', error.message);
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
                            maxLength="1"
                            onChange={handleOtpChange(index)}
                            onPaste={handlePaste}
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
                <button className='btn btn-primary w-100' type="button" onClick={submitForm}>
                    Submit
                </button>
            </div>
           
            
        </div>
    );
}

export default OtpScreen;
