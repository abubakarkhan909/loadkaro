import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData, nextStep } from '../../store/formSlice';

function WhatsappScreen() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form.formData);
    const [otpSent, setOtpSent] = useState(false);
    const [counter, setCounter] = useState(30);

    // Function to handle OTP sending
    const handleSendOtp = () => {
        if (!formData.whatsappNumber) {
            alert("Please enter your mobile number.");
            return;
        }

        // Simulate OTP sending
        setOtpSent(true);
        dispatch(nextStep()); // Move to the OTP input step
    };

    // Effect to handle countdown timer
    useEffect(() => {
        if (otpSent && counter > 0) {
            const timer = setTimeout(() => setCounter(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [otpSent, counter]);

    // Function to handle OTP resending
    const handleResendOtp = () => {
        if (counter === 0) {
            setCounter(30); // Reset counter to 30 seconds
            // Logic to resend OTP
            alert("OTP has been resent.");
        }
    };

    // Function to handle input change
    const handleInputChange = (e) => {
        dispatch(updateFormData({ whatsappNumber: e.target.value }));
    };

    return (
        <div className="step5Form innerformdiv">
            <h4>Enter your details</h4>
            <div className='inuputlabeli bglight w-100'>
                <input
                    className='h-100'
                    type="tel"
                    value={formData.whatsappNumber || ''} // Ensure value is defined
                    placeholder="Mobile Number"
                    onChange={handleInputChange}
                />
            </div>
            <div className='bigbtn mt-3'>
                <button 
                    className='btn btn-primary w-100' 
                    type="button" 
                    onClick={handleSendOtp}
                    disabled={otpSent} // Disable the button once OTP is sent
                >
                    {otpSent ? 'OTP Sent' : 'Get Price'}
                </button>
            </div>
            {otpSent && counter > 0 && (
                <p className="mt-3">Resend OTP in {counter} seconds</p>
            )}
            {otpSent && counter === 0 && (
                <button 
                    className='btn btn-outline-primary w-100 mt-2' 
                    type="button" 
                    onClick={handleResendOtp}
                >
                    Resend OTP
                </button>
            )}
        </div>
    );
}

export default WhatsappScreen;
