// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const translations = {
  en: {
    welcome: "Welcome to React",
    toggleLanguage: "Toggle Language",
    exampleText: "This is an example text.",
    // Add more translations as needed
  },
  ur: {
    welcome: "ری ایکٹ میں خوش آمدید",
    toggleLanguage: "زبان تبدیل کریں",
    exampleText: "یہ ایک مثال کا متن ہے۔",
    // Add more translations as needed
  },
};

const languageSlice = createSlice({
  name: 'language',
  initialState: 'en',
  reducers: {
    toggleLanguage: (state) => (state === 'en' ? 'ur' : 'en'),
  },
});

export const { toggleLanguage } = languageSlice.actions;

const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
  },
});

export { store, translations };
