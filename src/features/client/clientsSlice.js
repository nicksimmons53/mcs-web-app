import { 
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import { formatAddress, objectToArray, formatTinyInt } from 'helpers/dataFormatter';

require('dotenv').config( );

const sales_app_api_url = process.env.REACT_APP_SALES_APP_API_URL;

export const getPotentialClients = createAsyncThunk(
    'clients/potential', 
    async ( ) => {
        return axios.get(`${sales_app_api_url}/web/clients`)
            .then((res) => res.data );
    }
);

export const getClientById = createAsyncThunk(
    'clients/selected/basicInfo',
    async (id) => {
        return axios.get(`${sales_app_api_url}/web/clients/${id}`)
            .then((res) => res.data);
    }
);

export const getClientAddress = createAsyncThunk(
    'clients/selected/address',
    async (id) => {
        return axios.get(`${sales_app_api_url}/web/clients/${id}/addresses`)
            .then((res) => res.data);
    }
);

export const getClientContacts = createAsyncThunk(
    'clients/selected/contacts',
    async (id) => {
        return axios.get(`${sales_app_api_url}/web/clients/${id}/contacts`)
            .then((res) => res.data);
    }
);

export const getClientInfo = createAsyncThunk(
    'clients/selected/advancedInfo',
    async (id) => {
        return axios.get(`${sales_app_api_url}/web/clients/${id}/advanced-info`)
            .then((res) => res.data);
    }
);

export const getClientPrograms = createAsyncThunk(
    'clients/selected/program',
    async (id) => {
        return axios.get(`${sales_app_api_url}/web/clients/${id}/programs`)
            .then((res) => res.data);
    }
);

export const getClientParts = createAsyncThunk(
    'clients/selected/parts',
    async (id) => {
        return axios.get(`${sales_app_api_url}/web/clients/${id}/parts`)
            .then((res) => res.data);
    }
);

export const getClientFiles = createAsyncThunk(
    'clients/selected/files',
    async (clientName) => {
        return axios.get(`${sales_app_api_url}/list-files/${clientName}`)
            .then((res) => res.data);
    }
)

const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        potential: [],
        queued: [],
        approved: [],
        active: [],
        status: 'idle',
        error: null,
        clientStatus: {
            addresses: 'idle',
            contacts: 'idle',
            advancedInfo: 'idle',
            programs: 'idle',
            parts: 'idle',
            files: 'idle'
        },
        selected: {
            id: null,
            advancedInfo: [],
            addresses: [],
            contacts: [],
            programs: [],
            parts: [],
            files: []
        }
    },
    reducers: {
        setSelectedClientId(state, { payload }) {
            state.selected.id = payload;
        },
        resetState(state) {
            Object.assign(state, {
                potential: [],
                queued: [],
                approved: [],
                active: [],
                status: 'idle',
                error: null,
                clientStatus: {
                    addresses: 'idle',
                    contacts: 'idle',
                    advancedInfo: 'idle',
                    programs: 'idle',
                    parts: 'idle',
                    files: 'idle'
                },
                selected: {
                    id: null,
                    advancedInfo: [],
                    addresses: [],
                    contacts: [],
                    programs: [],
                    parts: [],
                    files: []
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
            state.potential = _.filter(payload, (client) => client.status === 0);
            state.queued = _.filter(payload, (client) => client.status === 1);
            state.approved = _.filter(payload, (client) => client.status === 2);
            state.active = _.filter(payload, (client) => client.status === 3);
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
            payload.forEach((program, index) => {
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
        [getClientParts.pending]: (state, action) => {
            state.clientStatus.parts = 'loading';
        },
        [getClientParts.fulfilled]: (state, { payload }) => { 
            let formattedInfo = [ ];
            formattedInfo.push(_.groupBy(payload[0], 'programTable'));
            formattedInfo.push(_.groupBy(payload[1], 'programTable'));
            formattedInfo.push(_.groupBy(payload[2], 'programTable'));
            formattedInfo.push(_.groupBy(payload[3], 'programTable'));
            formattedInfo.push(_.groupBy(payload[4], 'programTable'));

            state.clientStatus.parts = 'succeeded';
            state.selected.parts = formattedInfo;
        },
        [getClientParts.rejected]: (state, action) => {
            state.clientStatus.parts = 'failed';
            state.error = action.error.message;
        },
        [getClientFiles.pending]: (state, action) => {
            state.clientStatus.files = 'loading';
        },
        [getClientFiles.fulfilled]: (state, { payload }) => { 
            let formattedInfo = [];
            payload.file.Contents.forEach((file, index) => {
                file.id = index;
                file.name = file.Key.split('/')[1];
                file.type = file.name.split('.')[1];

                let date = new Date(file.LastModified);
                file.date = `${date.getMonth( )}/${date.getDate( )}/${date.getFullYear( )}`;
                file.time = `${date.getHours( )}:${date.getMinutes( )}`

                formattedInfo.push(file);
            });

            state.clientStatus.files = 'succeeded';
            state.selected.files = formattedInfo;
        },
        [getClientFiles.rejected]: (state, action) => {
            state.clientStatus.files = 'failed';
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

export const selectClientParts = state => state.clients.selected.parts;

export const selectClientFiles = state => state.clients.selected.files;

export const { setSelectedClientId, resetState } = clientsSlice.actions;

export default clientsSlice.reducer; 