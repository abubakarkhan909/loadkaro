import axios from 'axios';

// Set the base URL for your API
const BASE_URL = 'https://api.loadkaro.com/api';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
});

// Shipper Registration
export const registerShipper = (data) => {
  return apiClient.post('/shipper/register', data);
};

// Driver Registration
export const registerDriver = (formData) => {
  return apiClient.post('/driver/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Login
export const loginUser = (data) => {
  return apiClient.post('/login', data);
};

// OTP
export const sendOtp = (mobile_number) => {
    return apiClient.post('/otp', { mobile_number });
};


// Function to handle OTP send and verify
export const handleOtp = async (mobile_number, code = null) => {
  try {
   
    const payload = { mobile_number: mobile_number };
  
    if (code) {
      payload.code = code;
    }
    console.log("payload before",payload)
    const response = await apiClient.post('/otp', payload);
   console.log("response after",response.data)
    return response.data; // Response can include status and any message
   
  } catch (error) {
    console.error('Error handling OTP:', error.response ? error.response.data : error.message);
    throw new Error('Error handling OTP: ' + (error.response ? error.response.data.message : error.message));
  }
};

// Verify OTP
export const verifyOtpCode = async (enteredOtp, sentOtp) => {
  try {
    const response = await apiClient.post('/verify-otp', { otp: enteredOtp, code: sentOtp });
    return response.data; // {status: true, user: {...}}
  } catch (error) {
    throw new Error('Error verifying OTP: ' + error.message);
  }
};

// Fetch user details
export const getUserDetails = (token) => {
    return apiClient.get('/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  };
  
  // Update user details
  export const updateUserDetails = (token, data) => {
    return apiClient.post('/profile/update', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  };

  //update User Profile
  export const updateUserProfile = async (token, profileData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/profile/update`,
        profileData,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
      throw error; // Rethrow the error for handling in the calling code
    }
  };
  