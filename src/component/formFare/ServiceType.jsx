import React, { useState } from 'react';
import './CheckFare.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData, nextStep } from './../../store/formSlice'; // Import necessary actions

function ServiceType() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form.formData); // Access form data from Redux store
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedServiceType, setSelectedServiceType] = useState(formData.serviceType || '');

    const handleRadioChange = (e) => {
        setSelectedServiceType(e.target.value);
        dispatch(updateFormData({ serviceType: e.target.value })); // Update Redux store
    };

    const handleNext = () => {
        if (!selectedServiceType) {
            setErrorMessage('Please select a service type.');
            return;
        }
        setErrorMessage('');

        // Dispatch the next step based on the selected service type
        if (selectedServiceType === 'Business') {
            dispatch(nextStep('materialType')); // Navigate to the Material Type step
        } else if (selectedServiceType === 'Partial') {
            dispatch(nextStep('partialOption')); // Navigate to the Partial Option step
        }
    };

    return (
        <div className="step2Form innerformdiv">
            <h4>Choose service type</h4>
            <div className='radioservice'>
                <label>
                    <input
                        type="radio"
                        name="serviceType"
                        value="Business"
                        onChange={handleRadioChange}
                        checked={selectedServiceType === 'Business'}
                    />
                    <div className='labeltextcontent'>
                        <div className='textcontent'>
                            Business
                            <span>Industrial, Commercial or enterprise goods</span>
                        </div>
                    </div>
                </label>
            </div>
            <div className='radioservice'>
                <label>
                    <input
                        type="radio"
                        name="serviceType"
                        value="Partial"
                        onChange={handleRadioChange}
                        checked={selectedServiceType === 'Partial'}
                    />
                    <div className='labeltextcontent'>
                        <div className='textcontent'>
                            Partial
                            <span>Households or personal goods</span>
                        </div>
                    </div>
                </label>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div className='step-buttons'>
                <button className='btn btn-primary' type="button" onClick={handleNext}>
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    );
}

export default ServiceType;
