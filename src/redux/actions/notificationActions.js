import { SHOW_SUCCESS, SHOW_ERROR, SHOW_INFO } from './actionTypes';
import { toast } from 'react-toastify';

export const showSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
  });
  return { type: SHOW_SUCCESS, payload: message };
};

export const showError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
  });
  return { type: SHOW_ERROR, payload: message };
};

export const showInfo = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
  });
  return { type: SHOW_INFO, payload: message };
};

