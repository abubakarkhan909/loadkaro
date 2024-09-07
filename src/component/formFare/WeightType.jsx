import React, { useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData, nextStep } from './../../store/formSlice'; // Import necessary actions
import './CheckFare.css';

function WeightType() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form.formData); // Access form data from Redux store
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (field) => (e) => {
        dispatch(updateFormData({ [field]: e.target.value })); // Update Redux store
    };

    const handlePlaceOrder = () => {
        if (!formData.weight || !formData.weightType) {
            setErrorMessage('Please fill all the fields');
            return;
        }

        setErrorMessage('');
        dispatch(nextStep()); // Navigate to the next step
    };

    return (
        <div className="step3Form innerformdiv">
            <h4>Enter total material weight</h4>
            <div className='inputswe'>
                <div className='inuputlabeli bglight'>
                    <label>Weight</label>
                    <input
                        type="number"
                        value={formData.weight || ''}
                        placeholder="Enter weight"
                        onChange={handleInputChange('weight')}
                    />
                </div>
                <div className='bglight selecti'>
                    <select 
                        value={formData.weightType || ''}
                        onChange={handleInputChange('weightType')}
                    >
                        <option value="" disabled>Type</option>
                        <option value="kg">Kg</option>
                        <option value="tonnes">Tonnes</option>
                    </select>
                </div>
                {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
            <div className='step-buttons'>  
                <button className='btn btn-primary' type="button" onClick={handlePlaceOrder}>
                    <IoIosArrowForward />
                </button>
            </div>  
        </div>
    );
}

export default WeightType;
