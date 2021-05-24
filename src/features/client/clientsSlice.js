import { 
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import { formatAddress, objectToArray, formatTinyInt, floatToCurrency } from 'helpers/dataFormatter';

export const getPotentialClients = createAsyncThunk(
    'clients/potential', 
    async ( ) => {
        return fetch(`https://jdfao4jhc3.execute-api.us-east-1.amazonaws.com/dev/v3/web/clients`)
            .then((res) => res.json( ));
    }
);

export const getClientById = createAsyncThunk(
    'clients/selected/basicInfo',
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
    'clients/selected/contacts',
    async (id) => {
        return fetch(`https://jdfao4jhc3.execute-api.us-east-1.amazonaws.com/dev/v3/web/clients/${id}/contacts`)
            .then((res) => res.json( ));
    }
);

export const getClientInfo = createAsyncThunk(
    'clients/selected/advancedInfo',
    async (id) => {
        return fetch(`https://jdfao4jhc3.execute-api.us-east-1.amazonaws.com/dev/v3/web/clients/${id}/advanced-info`)
            .then((res) => res.json( ));
    }
);

export const getClientPrograms = createAsyncThunk(
    'clients/selected/program',
    async (id) => {
        return fetch(`https://jdfao4jhc3.execute-api.us-east-1.amazonaws.com/dev/v3/web/clients/${id}/programs`)
            .then((res) => res.json( ));
    }
);

const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        potential: [],
        status: 'idle',
        error: null,
        clientStatus: {
            addresses: 'idle',
            contacts: 'idle',
            advancedInfo: 'idle',
            programs: 'idle'
        },
        selected: {
            id: null,
            advancedInfo: [],
            addresses: [],
            contacts: [],
            programs: []
        }
    },
    reducers: {
        setSelectedClientId(state, { payload }) {
            state.selected.id = payload;
        },
        resetState(state) {
            Object.assign(state, {
                potential: [],
                status: 'idle',
                error: null,
                clientStatus: {
                    addresses: 'idle',
                    contacts: 'idle',
                    advancedInfo: 'idle',
                    programs: 'idle'
                },
                selected: {
                    id: null,
                    advancedInfo: [],
                    addresses: [],
                    contacts: [],
                    programs: []
                }
            });
        }
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
            state.clientStatus.addresses = 'loading';
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
            
            state.clientStatus.addresses = 'succeeded';
            state.selected.addresses = formattedAddresses;
        },
        [getClientAddress.rejected]: (state, action) => {
            state.clientStatus.addresses = 'failed';
            state.error = action.error.message;
        },
        [getClientContacts.pending]: (state, action) => {
            state.clientStatus.contacts = 'loading';
        },
        [getClientContacts.fulfilled]: (state, { payload }) => {
            state.clientStatus.contacts = 'succeeded';
            state.selected.contacts = payload;
        },
        [getClientContacts.rejected]: (state, action) => {
            state.clientStatus.contacts = 'failed';
            state.error = action.error.message;
        },
        [getClientInfo.pending]: (state, action) => {
            state.clientStatus.advancedInfo = 'loading';
        },
        [getClientInfo.fulfilled]: (state, { payload }) => {   
            let clientInfo = payload[0]; 
            let address = formatAddress([clientInfo.invoice_addr, clientInfo.invoice_city, clientInfo.invoice_state, clientInfo.invoice_zip]);
            clientInfo = formatTinyInt(clientInfo);

            let formattedInfo = objectToArray(clientInfo);
            formattedInfo.splice(0, 2);
            formattedInfo.splice(4, 4, { invoice_addr: address });
            formattedInfo.splice(5, 0, { invoice_addr: address });

            state.clientStatus.advancedInfo = 'succeeded';
            state.selected.advancedInfo = formattedInfo;
        },
        [getClientInfo.rejected]: (state, action) => {
            state.clientStatus.advancedInfo = 'failed';
            state.error = action.error.message;
        },
        [getClientPrograms.pending]: (state, action) => {
            state.clientStatus.programs = 'loading';
        },
        [getClientPrograms.fulfilled]: (state, { payload }) => { 
            let formattedInfo = [ ];
            payload.map((program, index) => {
                if (program === null) {
                    formattedInfo.push([ ]);
                } else {
                    delete program.id;
                    delete program.client_id;
                    formatTinyInt(program);
                    formattedInfo.push(Object.entries(program).map(([k, v]) => ({ [k] : v })));
                }
            });

            state.clientStatus.programs = 'succeeded';
            state.selected.programs = formattedInfo;
        },
        [getClientPrograms.rejected]: (state, action) => {
            state.clientStatus.programs = 'failed';
            state.error = action.error.message;
        },
    }
});

export const selectAllClients = state => state.clients;

export const selectedClientId = state => state.clients.selected.id;

export const selectClientInfo = state => state.clients.selected.advancedInfo;

export const selectClientAddress = state => state.clients.selected.addresses;

export const selectClientContacts = state => state.clients.selected.contacts;

export const selectClientPrograms = state => state.clients.selected.programs;

export const { setSelectedClientId, resetState } = clientsSlice.actions;

export default clientsSlice.reducer; 