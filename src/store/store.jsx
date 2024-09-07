
import { configureStore, createSlice } from '@reduxjs/toolkit';
import formReducer from './formSlice';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!localStorage.getItem('auth_token'),
    userDetails: {
      email: localStorage.getItem('user_email') || '',
      username: localStorage.getItem('user_username') || '',
    },
    loggedInViaOTP: false,
    token: localStorage.getItem('auth_token') || '', 
    
  },
  
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token; // Store token in state
      localStorage.setItem('auth_token', action.payload.token);
      localStorage.setItem('user_email', action.payload.email);
      localStorage.setItem('user_username', action.payload.username);
      state.userDetails.email = action.payload.email;
      state.userDetails.username = action.payload.username;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userDetails = { email: '', username: '' };
      state.loggedInViaOTP = false;
      localStorage.removeItem('auth_token'); // Remove token
      localStorage.removeItem('user_email'); // Remove email
      localStorage.removeItem('user_username'); // Remove username
    },
    updateUserDetails: (state, action) => {
      const { email, username } = action.payload;
      state.userDetails.email = email;
      state.userDetails.username = username;
      localStorage.setItem('user_email', email);
      localStorage.setItem('user_username', username);
      console.log("email",email);
      console.log("name",username);
    },
    setLoggedInViaOTP: (state, action) => {
      state.loggedInViaOTP = action.payload;
    },
  },
});

// Export the actions
export const { login, logout, updateUserDetails, setLoggedInViaOTP } = authSlice.actions;

// Create the store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    form: formReducer,
  },
});

// **Export the store correctly**
export default store;
