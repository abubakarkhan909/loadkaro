import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserDetails as updateUserDetailsAction } from '../../store/store';
import { getUserDetails, updateUserProfile } from '../../api/apiService';
import { Box, Typography, Button, Avatar, Grid, Switch } from '@mui/material';
import images from '../../images';
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
    notificationsPaused: false,
    role: '',  // Add role to formData
    company_name: '', // Add company name for shipper
  });
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!token) {
          throw new Error('No token found');
        }
        const response = await getUserDetails(token);
        setUser(response.data.user);
        setFormData(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error.response ? error.response.data : error.message);
      }
    };

    fetchUserDetails();
  }, [token]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleToggleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      notificationsPaused: e.target.checked
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!token) {
        throw new Error('No token found');
      }

      const profileData = {
        name: formData.name,
        mobile_number: formData.mobile_number,
        email: formData.email,
        address: formData.address,
        company_name: formData.company_name,
      };
      await updateUserProfile(token, profileData);
      dispatch(updateUserDetailsAction(profileData));
      setUser(profileData);

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user details:', error.response ? error.response.data : error.message);
    }
  };

  const inputStyles = (disabled) => ({
    width: '100%',
    padding: '13px',
    borderRadius: '6px',
    border: '1px solid var(--lightdark)',
    backgroundColor: disabled ? '#f5f5f5' : '#fff',
    cursor: disabled ? 'not-allowed' : 'auto',
    outline: 'none',
    color: disabled ? 'var(--dark)' : 'var(--dark)',
  });

  if (!user) {
    return (
      <div className='loadingdata'>
        <div id="loading-bar-spinner" className="spinner">
          <div className="spinner-icon"></div>
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <Box sx={{ maxWidth: '900px', margin: 'auto', padding: '24px', borderRadius: '16px', backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={images.testo} alt="User" sx={{ width: 80, height: 80, marginRight: '16px' }} />
            <Typography variant="h6">{formData.name}</Typography>
          </Box>
          {!isEditing && (
            <Button variant="contained" color="primary" onClick={handleEditClick} style={{ backgroundColor: 'var(--primary_color)', width: '110px' }}>
              Edit
            </Button>
          )}
        </Box>

        {/* Personal Information */}
        <Typography gutterBottom style={{ fontWeight: '600', fontSize: "20px" }}>Personal Information</Typography>
        <Grid container spacing={2} marginBottom={3}>
          <Grid item xs={12} sm={6} sx={{ marginTop: "5px" }}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              disabled={!isEditing}
              style={inputStyles(!isEditing)}
              placeholder="Full Name"
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: "5px" }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              disabled={!isEditing}
              style={inputStyles(!isEditing)}
              placeholder="Email"
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: "5px" }}>
            <label htmlFor="mobile_number">Phone Number</label>
            <input
              id="mobile_number"
              type="text"
              name="mobile_number"
              value={formData.mobile_number || ''}
              onChange={handleChange}
              disabled={!isEditing}
              style={inputStyles(!isEditing)}
              placeholder="Phone Number"
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: "5px" }}>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              disabled={!isEditing}
              style={inputStyles(!isEditing)}
              placeholder="Address"
            />
          </Grid>

          {/* Conditionally render the Company Name field if role is 'shipper' */}
          {formData.role === 'shipper' && (
          
            <Grid item xs={12} sm={6} sx={{ marginTop: "5px" }}>
              <label htmlFor="companyName">Company Name</label>
              <input
                id="companyName"
                type="text"
                name="companyName"
                value={formData.company_name || ''}
                onChange={handleChange}
                disabled={!isEditing}
                style={inputStyles(!isEditing)}
                placeholder="Company Name"
              />
            </Grid>
          )}
        </Grid>

        {/* Notification Settings */}
        <Typography
          gutterBottom
          style={{ fontWeight: '600', size: "20px" }}
        >
          {isEditing ? 'Pause Push Notifications' : 'Notifications are off'}
        </Typography>

        {isEditing && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">Pause Push Notifications</Typography>
            <Switch
              checked={formData.notificationsPaused}
              onChange={handleToggleChange}
              inputProps={{ 'aria-label': 'Pause Push Notifications' }}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: 'var(--primary_color)',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: 'var(--primary_color)',
                },
              }}
            />
          </Box>
        )}

        {/* Save Button */}
        {isEditing && (
          <Box sx={{ marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ backgroundColor: 'var(--primary_color)' }}>
              Save Setting
            </Button>
          </Box>
        )}
      </Box>

      {/* Change Password Section */}
      <Box sx={{ maxWidth: '900px', margin: 'auto', padding: '24px', borderRadius: '16px', backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '20px', marginBottom: '10px' }}>
        <Typography gutterBottom style={{ fontWeight: '600', fontSize: "20px" }}>Change Password</Typography>

        <Box sx={{ marginBottom: '24px' }}>
          <label htmlFor="currentPassword">Current Password</label>
          <input
            id="currentPassword"
            type="password"
            name="currentPassword"
            value={formData.currentPassword || ''}
            onChange={handleChange}
            style={inputStyles(false)}
            placeholder="Current Password"
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              value={formData.newPassword || ''}
              onChange={handleChange}
              style={inputStyles(false)}
              placeholder="New Password"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword || ''}
              onChange={handleChange}
              style={inputStyles(false)}
              placeholder="Confirm New Password"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Profile;
