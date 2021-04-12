import { 
    createAsyncThunk, 
    createEntityAdapter,
    createSlice,
    createSelector
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchClients = createAsyncThunk(
    'clients/fetch',
    async(_, thunkAPI) => {
        const response = await axios.get(`https://jdfao4jhc3.execute-api.us-east-1.amazonaws.com/dev/v2/admin/queued`);

        return response.data;
    }
);

let data = [
    {
        "id": 0,
        "clientId": 70,
        "shtnme": "New Client",
        "clnnme": "New Client",
        "empnum": 9995,
        "mannum": 1010,
        "clntyp": 1,
        "status": 1,
        "completed": 0,
        "done": 0,
        "state": null,
        "recnum": 9995,
        "fstnme": "Nick",
        "lstnme": "Simmons",
        "e_mail": "nicksimmons53@yahoo.com",
        "cllphn": "678-490-4449",
        "usrnme": "test",
        "passwd": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        "sagePass": "password",
        "admin": 0,
        "address": [
            {
                "addrs1": "111 Street Dr",
                "addrs2": "",
                "ctynme": "Houston",
                "state_": "TX",
                "zipcde": "77380"
            },
            {
                "bilad1": "",
                "bilad2": "",
                "bilcty": "",
                "bilste": "",
                "bilzip": ""
            },
            {
                "shpad1": "",
                "shpad2": "",
                "shpcty": "",
                "shpste": "",
                "shpzip": ""
            }
        ],
        "contacts": [
            {
                "id": 91,
                "clientId": 70,
                "name": "Nicholas Simmons",
                "title": "Software Developer",
                "phone": "678-490-4449",
                "email": "nicksimmons53@yahoo.com"
            },
            {
                "id": 92,
                "clientId": 70,
                "name": "Barron Fisher",
                "title": "IT Administrator",
                "phone": "111-111-1111",
                "email": "barronf@mcsurfacesinc.com"
            }
        ],
        "advInfo": {
            "payment_freq": "Weekly",
            "autopay": 1,
            "invoice_submit": "Mail",
            "invoice_email": null,
            "invoice_addr": "450 Lockhaven Dr",
            "invoice_city": "Houston",
            "invoice_state": "TX",
            "invoice_zip": "77380",
            "payment_type": "Direct Deposit",
            "payment_portal": 1,
            "payment_url": "https://www.google.com",
            "po_required": 0,
            "invoice_req_pos": 0,
            "approvals_req": 0,
            "acc_cont_name": "Lisa Kallus",
            "acc_cont_phn": "222-222-2222",
            "acc_cont_ema": "lisak@mcsurfacesinc.com",
            "vendor_portal": "https://www.vendorportal.com",
            "vnd_portal_user": "user",
            "vnd_portal_pswd": "password",
            "job_release": "Email",
            "job_email": "job_release_email@gmail.com",
            "po_handling": 0,
            "po_hndl_email": null,
            "exp_start_date": "08-21-2021",
            "est_num_homes": 450
        }
    },
];

export const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        loading: 'idle',
        values: data,
        selected: null
    },
    reducers: { 
    },
});

export default clientsSlice.reducer; 