import { combineReducers } from '@reduxjs/toolkit';
import { homeSlice } from './pages/Home/homeSlice';
import { authSlice } from './pages/SignIn/authSlice';

const rootReducer = combineReducers({
    home: homeSlice.reducer,
    user: authSlice.reducer,
});

export default rootReducer;