import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from './../../store/store';

function UserDetailsScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSaveDetails = () => {
    if (email && username) {
      // Save details in localStorage (replace with API call later)
      dispatch(updateUserDetails({ email, username }));
      // Redirect to home page
      navigate('/');
    } else {
      alert('Please fill in all details.');
    }
  };

  return (
    <div className='authscreenmain'>
      <div className='authinnermain mt-3'>
        <div className='innercontent'>
          <h2>Enter Your Details</h2>
          <div className='authinputsform'>
            <div className='form-control'>
              <label>Email</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className='form-control'>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
            <button onClick={handleSaveDetails} className="btn btn-primary mt-3">Save and Continue</button>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default UserDetailsScreen;
