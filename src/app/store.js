import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../features/client/clientsSlice';

export default configureStore({
    reducer: {
        clients: clientsReducer 
    }
});