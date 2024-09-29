import axios from 'axios';
import { showSuccess, showError, showInfo } from './notificationActions';
import { showLoader, hideLoader } from './loaderActions';

export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(showLoader())
    const response = await axios.post('http://localhost:3000/api/auth/signup', userData);
    dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data });
    dispatch(showSuccess('Signup successful!'));
    hideLoader();
  } catch (error) {
    dispatch(hideLoader());
    dispatch({ type: 'SIGNUP_FAIL', payload: error.response.data });
    dispatch(showError(error.response.data.message));
  }
};

export const login = (userData, navigate) => async (dispatch) => {
  try {
    dispatch(showLoader())
    const response = await axios.post('http://localhost:3000/api/auth/login', userData);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('senderId', response.data.senderId);
    dispatch(showSuccess('Login successful!'))
    navigate('/chat');
    dispatch(hideLoader())
  } catch (error) {
    dispatch(hideLoader())
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
    dispatch(showError(error.response.data.error));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
  dispatch(showError('Logged out successfully!'));
};

export const requestPasswordReset = (emailData) => async (dispatch) => {
  try {
    dispatch(showLoader())
    await axios.post('http://localhost:3000/api/auth/forgot-password', emailData);
    dispatch({ type: 'PASSWORD_RESET_REQUEST_SUCCESS' });
    dispatch(hideLoader())
    dispatch(showSuccess('Email Sent successfully!'))
  } catch (error) {
    dispatch(hideLoader())
    dispatch({ type: 'PASSWORD_RESET_REQUEST_FAIL', payload: error.response.data.message });
    dispatch(showInfo(error.response.data.message))
  }
};

export const resetPassword = (passwordData, navigate) => async (dispatch) => {
  try {
    dispatch(showLoader())
    await axios.post(`http://localhost:3000/api/auth/password-reset/${passwordData.token}`, { password: passwordData.password });
    dispatch({ type: 'PASSWORD_RESET_SUCCESS' });
    dispatch(showSuccess('Password Reset successfully!'))
    navigate('/');
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    dispatch({ type: 'PASSWORD_RESET_FAIL', payload: error.message });
    dispatch(showInfo(error.response.data.message));
  }
};
