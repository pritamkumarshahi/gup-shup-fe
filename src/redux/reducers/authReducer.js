const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGNUP_SUCCESS':
        return { ...state, loading: false };
      case 'LOGIN_SUCCESS':
        return { ...state, token: action.payload.token, isAuthenticated: true, loading: false };
      case 'LOGIN_FAIL':
      case 'SIGNUP_FAIL':
        return { ...state, error: action.payload, loading: false };
      case 'LOGOUT':
        return { ...state, token: null, isAuthenticated: false };
      default:
        return state;
    }
  };
  
  export default authReducer;
  