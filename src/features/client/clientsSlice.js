import { 
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';

export const getPotentialClients = createAsyncThunk(
    'clients/potential', 
    async ( ) => {
        return fetch(`https://jdfao4jhc3.execute-api.us-east-1.amazonaws.com/dev/v3/web/clients`)
            .then((res) => res.json( ));
    }
);

export const getClientById = createAsyncThunk(
    'clients/selected',
    async (id) => {
        return fetch(`https://jdfao4jhc3.execute-api.us-east-1.amazonaws.com/dev/v3/web/clients/${id}`)
            .then((res) => res.json( ));
    }
);

export const getClientAddress = createAsyncThunk(
    'clients/selected/address',
    async (id) => {
        return fetch(`https://jdfao4jhc3.execute-api.us-east-1.amazonaws.com/dev/v3/web/clients/${id}/addresses`)
            .then((res) => res.json( ));
    }
);

export const getClientContacts = createAsyncThunk(
    'clients/contacts',
    async (id) => {
        return fetch(`https://jdfao4jhc3.execute-api.us-east-1.amazonaws.com/dev/v3/web/clients/${id}/contacts`)
            .then((res) => res.json( ));
    }
);

const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        potential: [],
        status: 'idle',
        error: null,
        selected: {
            basicInfo: null,
            addresses: [],
            contacts: []
        }

    },
    reducers: {
        clearSelected(state) {
            state.selected.basicInfo = null;
            state.selected.addresses = [ ];
            state.selected.clients = [ ];
        },
    },
    extraReducers: {
        [getPotentialClients.pending]: (state, action) => {
            state.status = 'idle';
        },
        [getPotentialClients.fulfilled]: (state, { payload }) => {
            state.status = 'succeeded';
            state.potential = payload;
        },
        [getPotentialClients.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
        [getClientById.pending]: (state, action) => {
            state.status = 'idle';
        },
        [getClientById.fulfilled]: (state, { payload }) => {
            state.status = 'succeeded';
            state.selected.basicInfo = payload[0];
        },
        [getClientById.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
        [getClientAddress.pending]: (state, action) => {
            state.status = 'idle';
        },
        [getClientAddress.fulfilled]: (state, { payload }) => {
            let formattedAddresses = [
                { 
                    id: 0, 
                    location: 'Corporate',
                    addrs1: payload[0].addrs1, 
                    addrs2: payload[0].addrs2,
                    city: payload[0].ctynme,
                    state: payload[0].state_,
                    zip: payload[0].zipcde
                },
                { 
                    id: 1, 
                    location: 'Billing',
                    addrs1: payload[1].bilad1, 
                    addrs2: payload[1].bilad2,
                    city: payload[1].bilcty,
                    state: payload[1].bilste,
                    zip: payload[1].bilzip
                },
                { 
                    id: 2, 
                    location: 'Shipping',
                    addrs1: payload[2].shpad1, 
                    addrs2: payload[2].shpad2,
                    city: payload[2].shpcty,
                    state: payload[2].shpste,
                    zip: payload[2].shpzip
                }
            ];
            
            state.status = 'succeeded';
            state.selected.addresses = formattedAddresses;
        },
        [getClientAddress.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
        [getClientContacts.pending]: (state, action) => {
            state.status = 'idle';
        },
        [getClientContacts.fulfilled]: (state, { payload }) => {
            state.status = 'succeeded';
            state.selected.contacts = payload;
        },
        [getClientContacts.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    }
});

export const selectAllClients = state => state.clients;

export const selectClient = state => state.clients.selected;

export const selectClientAddress = state => state.clients.selected.addresses;

export const selectClientContacts = state => state.clients.selected.contacts;

export const { clearSelected } = clientsSlice.actions;

export default clientsSlice.reducer; 