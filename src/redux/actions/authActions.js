import axios from 'axios';

export const signup = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5001/api/auth/signup', userData);
    dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'SIGNUP_FAIL', payload: error.response.data });
  }
};

export const login = (userData, navigate) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5001/api/auth/login', userData);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('senderId', response.data.senderId);

    navigate('/chat');
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};
