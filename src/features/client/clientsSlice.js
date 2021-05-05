import { 
    createAsyncThunk,
    createSlice,
    nanoid
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPotentialClients = createAsyncThunk(
    'clients/potential', 
    async ( ) => {
        return fetch(`https://jdfao4jhc3.execute-api.us-east-1.amazonaws.com/dev/v3/web/clients`)
            .then((res) => res.json( ));
    }
);

const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        potential: [],
        numOfPotential: null,
        status: 'idle',
        error: null,
        selected: null
    },
    reducers: {
    },
    extraReducers: {
        [fetchPotentialClients.pending]: (state, action) => {
            state.status = 'idle';
        },
        [fetchPotentialClients.fulfilled]: (state, { payload }) => {
            state.status = 'succeeded';
            state.potential = payload;
        },
        [fetchPotentialClients.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
});

export const selectAllClients = state => state.clients;

export default clientsSlice.reducer; 