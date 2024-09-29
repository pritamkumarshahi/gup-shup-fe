import { SHOW_SUCCESS, SHOW_ERROR, SHOW_INFO } from '../actions/actionTypes';

const initialState = {
  loader: false,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SUCCESS:
      return { ...state, message: action.payload };
    case SHOW_ERROR:
      return { ...state, message: action.payload };
    case SHOW_INFO:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default notificationReducer;
