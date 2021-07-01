import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'features/user/userSlice';
import clientsReducer from 'features/client/clientsSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        clients: clientsReducer 
    }
});