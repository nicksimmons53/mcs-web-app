import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../features/client/clientsSlice';
import userReducer from '../features/user/userSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        clients: clientsReducer
    }
});