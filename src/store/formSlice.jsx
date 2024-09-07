


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    pickupLocation: '',
    dropLocation: '',
    orderType: '',
    serviceType: '',
    weight: '',
    weightType: '',
    cargoType: [],
    fewpackedmaterial:[],
    housetype:'',
    pickupfloor:'',
    dropfloor:'',
    whatsappNumber: '',
    partialOption: '',
    partialmaterial: [],
    otp: '',
    selectedDate: '',
    selectedTime: '',
  },
  currentStep: 1,
  partialStep: 0, 
  error: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setDateTime: (state, action) => {
      state.formData.selectedDate = action.payload.selectedDate;
      state.formData.selectedTime = action.payload.selectedTime;
    },
    nextStep: (state) => {
      state.currentStep += 1;
      // state.partialStep = 0; 
    },
    prevStep: (state) => {
      state.currentStep -= 1;
      // state.partialStep = 0; 
    },
    nextPartialStep: (state) => {
      state.partialStep += 1;
    },
    prevPartialStep: (state) => {
      state.partialStep -= 1;
    },
    resetPartialStep: (state) => {
      state.partialStep = 0; 
    },
    resetForm: () => initialState,
    clearError: (state) => {
      state.error = '';
    },
    setError: (state, action) => { 
      state.error = action.payload;
    }, 
  },
});

export const { updateFormData, nextStep, prevStep, nextPartialStep, prevPartialStep, resetForm, resetPartialStep,setDateTime,setError, clearError } = formSlice.actions;
export default formSlice.reducer;
