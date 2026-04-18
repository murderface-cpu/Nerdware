import { configureStore } from '@reduxjs/toolkit';
import testimonialReducer from './slices/testimonialSlice';
import blogReducer from './slices/Blogslice';
import portfolioReducer from './slices/portfolioSlice';
import authReducer from './slices/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    testimonials: testimonialReducer,
    blogs: blogReducer,
    portfolios: portfolioReducer,
  },
});