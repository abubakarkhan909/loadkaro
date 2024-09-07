
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { registerShipper, registerDriver } from '../../api/apiService';
import "./Signup.css";
import images from './../../images';
import Tooltip from './../tooltip/Tooltip'

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse the query parameter
  const queryParams = new URLSearchParams(location.search);
  const initialUserType = queryParams.get('userType') || 'shipper'; // Default to 'shipper' if no query parameter is found

  const [userType, setUserType] = useState(initialUserType);
  const [companyName, setCompanyName] = useState('');
  const [yourName, setYourName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [truckNumber, setTruckNumber] = useState('');
  const [driverAddress, setDriverAddress] = useState('');
  const [addaName, setAddaName] = useState('');
  const [truckType, setTruckType] = useState('');
  const [cnicFrontImage, setCnicFrontImage] = useState(null);
  const [cnicBackImage, setCnicBackImage] = useState(null);
  const [drivingLicenseFrontImage, setDrivingLicenseFrontImage] = useState(null);
  const [drivingLicenseBackImage, setDrivingLicenseBackImage] = useState(null);
  const [addaProofImage, setAddaProofImage] = useState(null);
  const [houseUtilityBillImage, setHouseUtilityBillImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!yourName.trim()) {
      newErrors.yourName = 'Your name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Your Email is required';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10,15}$/.test(mobile)) {
      newErrors.mobile = 'Mobile number must be between 10 to 15 digits';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (userType === 'shipper') {
      if (!companyName.trim()) {
        newErrors.companyName = 'Company name is required';
      }
    } else if (userType === 'driver') {
      if (!driverAddress.trim()) {
        newErrors.driverAddress = 'Address is required';
      }
      if (!addaName.trim()) {
        newErrors.addaName = 'Adda name is required';
      }
      if(!addaProofImage.trim()){
        newErrors.addaProofImage= 'Adda proof required'
      }
      if (!truckType.trim()) {
        newErrors.truckType = 'Truck type is required';
      }
      if (!truckNumber.trim()) {
        newErrors.truckNumber = 'Truck number is required';
      }
      if (!cnicFrontImage) {
        newErrors.cnicFrontImage = 'CNIC Front image is required';
      }
      if (!cnicBackImage) {
        newErrors.cnicBackImage = 'CNIC Back image is required';
      }
      if (!drivingLicenseFrontImage) {
        newErrors.drivingLicenseFrontImage = 'Driving license front image is required';
      }
      if (!drivingLicenseBackImage) {
        newErrors.drivingLicenseBackImage = 'Driving license Back image is required';
      }
      if (!houseUtilityBillImage) {
        newErrors.houseUtilityBillImage = 'House utility bill image is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
   
    if (validateForm()) {
        setIsLoading(true);
        console.log("click me")
      try {
        if (userType === 'shipper') {
          const shipperData = {
            name: yourName,
            email,
            mobile_number: mobile,
            password,
            password_confirmation: confirmPassword,
            company_name: companyName,
          };

          const response = await registerShipper(shipperData);
          console.log('Shipper registration successful:', response.data);
          alert('Shipper registration successful!');
          navigate('/login');

        } else if (userType === 'driver') {
          const formData = new FormData();
          formData.append('name', yourName);
          formData.append('email', email);
          formData.append('mobile_number', mobile);
          formData.append('password', password);
          formData.append('password_confirmation', confirmPassword);
          formData.append('address', driverAddress);
          formData.append('adda', addaName);
          formData.append('adda_proof', addaProofImage);
          formData.append('truck_type', truckType);
          formData.append('truck_number', truckNumber);
          formData.append('cnic_front', cnicFrontImage);
          formData.append('cnic_back', cnicBackImage);
          formData.append('driving_licence_front', drivingLicenseFrontImage);
          formData.append('driving_licence_back', drivingLicenseBackImage);
          formData.append('utility_bill', houseUtilityBillImage);
          

          const response = await registerDriver(formData);
          console.log('Driver registration successful:', response.data);
          alert('Driver registration successful!');
          navigate('/login');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.error('Registration error:', error.response.data);
          alert(`Registration failed: ${error.response.data.message || 'Unknown error occurred'}`);
        } else {
          console.error('Registration error:', error);
          alert('An unexpected error occurred. Please try again later.');
        }
      }finally {
        setIsLoading(false);
      }
    }
  };

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
        setImage(URL.createObjectURL(file));
    }
};

  const handleImageRemove = (setImage) => {
    setImage(null);
  };

  return (
    <div className="signup authscreenmain">
      <Link to='/'>
        <img src={images.logo} alt='logo' />
      </Link>
      <h4>
        Find Truck and start a safe cargo
      </h4>
      <div className={`authinnermain ${userType === 'shipper' ? '' : 'container driversignup'}`}>
        <div className='innercontent'>
          <h2>{userType === 'shipper' ? 'Shipper Register' : 'Driver Register'}</h2>
          <div className="authinputsform">
            <div className="w-100 text-center">
              <label>
                Select User Type
              </label>
              <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                <option value="shipper">Shipper</option>
                <option value="driver">Driver</option>
              </select>
            </div>
            <div className={`form-control`}>
            <label>Your Name</label>
            <input
                type="text"
                placeholder="Your Name"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
            />
            {errors.yourName && <div className="error">{errors.yourName}</div>}
        </div>
        <div className={`form-control`}>
            <label>Email</label>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className={`form-control`}>
            <label>Mobile Number</label>
            <input
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />
            {errors.mobile && <div className="error">{errors.mobile}</div>}
        </div>
        <div className={`form-control`}>
            <label>Password</label>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div className={`form-control`}>
            <label>Confirm Password</label>
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
        </div>
        {userType === 'shipper' && (
            <div className={`form-control`}>
                <label>Company Name</label>
                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                {errors.companyName && <div className="error">{errors.companyName}</div>}
            </div>
        )}
        {userType === 'driver' && (
            <>
                <div className={`form-control`}>
                    <label>Address</label>
                    <input
                        type="text"
                        placeholder="Address"
                        value={driverAddress}
                        onChange={(e) => setDriverAddress(e.target.value)}
                    />
                    {errors.driverAddress && <div className="error">{errors.driverAddress}</div>}
                </div>
                <div className={`form-control`}>
                    <label>Adda working with</label>
                    <input
                        type="text"
                        placeholder="Adda Name"
                        value={addaName}
                        onChange={(e) => setAddaName(e.target.value)}
                    />
                    {errors.addaName && <div className="error">{errors.addaName}</div>}
                </div>
                <div className={`form-control`}>
                    <label>working with adda proof</label>
                    {addaProofImage ? (
                        <div className="image-preview">
                            <img src={addaProofImage} alt="Driving License Preview" />
                            <button className='btn btn-primary' onClick={() => handleImageRemove(setAddaProofImage)}>Remove</button>
                        </div>
                    ) : (
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setAddaProofImage)} />
                    )}
                    {errors.addaProofImage && <div className="error">{errors.addaProofImage}</div>}
                </div>
                <div className='formcontrol_Parent'>
                    <div className={`form-control`}>
                        <label>Truck Type</label>
                        <select
                            value={truckType}
                            onChange={(e) => setTruckType(e.target.value)}
                        >
                            <option value="">Select Truck Type</option>
                            <option value="small">Small Truck</option>
                            <option value="medium">Medium Truck</option>
                            <option value="large">Large Truck</option>
                        </select>
                        {errors.truckType && <div className="error">{errors.truckType}</div>}
                    </div>
                    <div className={`form-control`}>
                        <label>Truck number</label>
                        <input
                            type="text"
                            placeholder="e.g LEO-5117"
                            value={truckNumber}
                            onChange={(e) => setTruckNumber(e.target.value)}
                        />
                        {errors.truckNumber && <div className="error">{errors.truckNumber}</div>}
                    </div>
                </div>
                <div className={`form-control`}>
                    <label>House Utility Bill Image</label>
                    {houseUtilityBillImage ? (
                        <div className="image-preview">
                            <img src={houseUtilityBillImage} alt="House Utility Bill Preview" />
                            <button className='btn btn-primary' onClick={() => handleImageRemove(setHouseUtilityBillImage)}>Remove</button>
                        </div>
                    ) : (
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setHouseUtilityBillImage)} />
                    )}
                    {errors.houseUtilityBillImage && <div className="error">{errors.houseUtilityBillImage}</div>}
                </div>
               
                <div className={`form-control`}>
                    <label className='tooltipmain'>
                        CNIC Front Image
                       
                        <Tooltip 
                            heading="CNIC Details" 
                            image={images.frontcnic} // Replace with actual image URL
                            text="Enter your CNIC here. It is a national identification number."
                            listItems={[
                                "Make sure your documents are not blurry.",
                                "Documents should be valid for atleast 30 days",
                                "Should not be plastic coated.",
                                "Use a plain background."
                            ]}
                        >
                           
                        </Tooltip>
                    </label>
                    {cnicFrontImage ? (
                        <div className="image-preview">
                            <img src={cnicFrontImage} alt="CNIC Preview" />
                            <button className='btn btn-primary' onClick={() => handleImageRemove(setCnicFrontImage)}>Remove</button>
                        </div>
                    ) : (
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setCnicFrontImage)} />
                    )}
                    {errors.cnicFrontImage && <div className="error">{errors.cnicFrontImage}</div>}
                </div>
                <div className={`form-control`}>
                    <label className='tooltipmain'>CNIC Back Image
                    <Tooltip 
                            heading="CNIC Details" 
                            image={images.backcnic} // Replace with actual image URL
                            text="Enter your CNIC here. It is a national identification number."
                            listItems={[
                                "Make sure your documents are not blurry.",
                                "Documents should be valid for atleast 30 days",
                                "Should not be plastic coated.",
                                "Use a plain background."
                            ]}
                        >
                           
                        </Tooltip>
                    </label>
                    {cnicBackImage ? (
                        <div className="image-preview">
                            <img src={cnicBackImage} alt="CNIC Back Preview" />
                            <button className='btn btn-primary' onClick={() => handleImageRemove(setCnicBackImage)}>Remove</button>
                        </div>
                    ) : (
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setCnicBackImage)} />
                    )}
                    {errors.cnicBackImage && <div className="error">{errors.cnicBackImage}</div>}
                </div>
                <div className={`form-control`}>
                    <label className='tooltipmain'>Driving License Front Image
                    <Tooltip 
                            heading="License Details" 
                            image={images.frontlicience} // Replace with actual image URL
                            text="Enter your CNIC here. It is a national identification number."
                            listItems={[
                                "Make sure your documents are not blurry.",
                                "Documents should be valid for atleast 30 days",
                                "Should not be plastic coated.",
                                "Use a plain background."
                            ]}
                        >
                           
                        </Tooltip>
                    </label>
                    {drivingLicenseFrontImage ? (
                        <div className="image-preview">
                            <img src={drivingLicenseFrontImage} alt="Driving License Front Preview" />
                            <button className='btn btn-primary' onClick={() => handleImageRemove(setDrivingLicenseFrontImage)}>Remove</button>
                        </div>
                    ) : (
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setDrivingLicenseFrontImage)} />
                    )}
                    {errors.drivingLicenseFrontImage && <div className="error">{errors.drivingLicenseFrontImage}</div>}
                </div>
                <div className={`form-control`}>
                    <label className='tooltipmain'>Driving License Back Image
                    <Tooltip 
                            heading="License Details" 
                            image={images.backlicience} // Replace with actual image URL
                            text="Enter your CNIC here. It is a national identification number."
                            listItems={[
                                "Make sure your documents are not blurry.",
                                "Documents should be valid for atleast 30 days",
                                "Should not be plastic coated.",
                                "Use a plain background."
                            ]}
                        >
                           
                        </Tooltip>
                    </label>
                    {drivingLicenseBackImage ? (
                        <div className="image-preview">
                            <img src={drivingLicenseBackImage} alt="Driving License Back Preview" />
                            <button className='btn btn-primary' onClick={() => handleImageRemove(setDrivingLicenseBackImage)}>Remove</button>
                        </div>
                    ) : (
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setDrivingLicenseBackImage)} />
                    )}
                    {errors.drivingLicenseBackImage && <div className="error">{errors.drivingLicenseBackImage}</div>}
                </div>
             
            </>
        )}
            <button className="btn btn-primary w-100 mt-3" onClick={handleSignup}  disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</button>
          </div>
          <p className='mt-3 text-center'>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
