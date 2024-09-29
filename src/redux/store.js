import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import loaderReducer from './reducers/loaderReducer';
import notificationReducer from './reducers/notificationsReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
    notification: notificationReducer
  },
});

export default store;
