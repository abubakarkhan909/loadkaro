import React, { useState } from 'react';
import './CheckFare.css';
import { IoIosLogIn } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData, nextStep } from './../../store/formSlice'; // Import actions from your formSlice
import { Link } from 'react-router-dom';

const cities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Quetta', 'Multan', 'Faisalabad','Gujranwala','Sialkot','Sheikhupura','Farooqabad','Qasur','jehlum','khebr pakthunkhaw','Laiya'
];

function CheckFare() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form.formData); // Access form data from Redux
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedOrderType, setSelectedOrderType] = useState(formData.orderType || '');
    const [filteredCities, setFilteredCities] = useState([]);
    const [activeInput, setActiveInput] = useState(''); // Track which input is active

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     dispatch(updateFormData({ [name]: value })); // Update form data in Redux
    // };

    const handlePlaceOrder = () => {
        if (!formData.pickupLocation || !formData.dropLocation || !formData.orderType) {
            setErrorMessage('All fields are required, and a valid city must be selected.');
            return;
        }
        if (!cities.includes(formData.pickupLocation) || !cities.includes(formData.dropLocation)) {
            setErrorMessage('Please select valid cities from the list.');
            return;
        }
        setErrorMessage('');
        dispatch(nextStep()); // Move to the next step in the form
    };

    const handleRadioChange = (orderType) => () => {
        setSelectedOrderType(orderType);
        dispatch(updateFormData({ orderType })); // Update form data in Redux
        setErrorMessage(''); // Clear error when radio button changes
    };

    const handleCityInputChange = (field) => (event) => {
        const value = event.target.value;
        const filtered = cities.filter((city) =>
            city.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredCities(filtered);
        setActiveInput(field); // Set the active input field
        dispatch(updateFormData({ [field]: value })); // Update form data in Redux
        setErrorMessage(''); // Clear error when user starts typing
    };

    const handleCitySelect = (city, field) => () => {
        dispatch(updateFormData({ [field]: city })); // Update form data in Redux
        setFilteredCities([]); // Hide the list after selection
        setActiveInput(''); // Clear active input
        setErrorMessage(''); // Clear error after valid city selection
    };

    const handleInputBlur = (field) => () => {
        setTimeout(() => setFilteredCities([]), 300); // Hide the list shortly after blur
    };

    return (
        <div className='checkfareForm'>
            <h4>Please provide the cities for pickup and delivery.</h4>
            <form>
                <div>
                    <label className={selectedOrderType === 'Full load' ? 'checked' : ''}>
                        <input
                            type="radio"
                            name="orderType"
                            value="Full load"
                            checked={selectedOrderType === 'Full load'}
                            onChange={handleRadioChange('Full load')}
                        />
                        Full load
                    </label>
                </div>
                <div className='locationBox'>
                    <input
                        type="text"
                        name="pickupLocation" // Add name attribute to match form data in Redux
                        value={formData.pickupLocation || ''} // Use formData from Redux
                        placeholder='Pickup city'
                        onChange={handleCityInputChange('pickupLocation')}
                        onBlur={handleInputBlur('pickupLocation')}
                        onFocus={() => setActiveInput('pickupLocation')} // Set active input on focus
                    />
                    {activeInput === 'pickupLocation' && filteredCities.length > 0 && (
                        <div className='cityList'>
                            <ul>
                                {filteredCities.map((city, index) => (
                                    <li key={index} onClick={handleCitySelect(city, 'pickupLocation')}>
                                       <div className="details">
                                            <span className="title">{city}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className='locationBox'>
                    <input
                        type="text"
                        name="dropLocation" // Add name attribute to match form data in Redux
                        value={formData.dropLocation || ''} // Use formData from Redux
                        placeholder='Drop city'
                        onChange={handleCityInputChange('dropLocation')}
                        onBlur={handleInputBlur('dropLocation')}
                        onFocus={() => setActiveInput('dropLocation')} // Set active input on focus
                    />
                    {activeInput === 'dropLocation' && filteredCities.length > 0 && (
                       <div className='cityList'>
                            <ul className=''>
                                {filteredCities.map((city, index) => (
                                    <li key={index} onClick={handleCitySelect(city, 'dropLocation')}>
                                        <div className="details">
                                            <span className="title">{city}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {errorMessage && <p style={{ color: 'red' , margin:'15px 0 0' }}>{errorMessage}</p>}
                <div className='btns'>
                    <button className='btn btn-primary' type="button" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                    {isLoggedIn && (
                    <Link className='btn btn-outline-primary' to='/loadboard'>
                        Load Board
                    </Link>
                    )}
                </div>
            </form>
        </div>
    );
}

export default CheckFare;
