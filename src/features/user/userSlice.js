import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';

let data = {
    "firstName": "Nick",
    "lastName": "Simmons",
    "email": "nicks@mcsurfacesinc.com",
    "phone": "678-490-4449",
    "permissions": {
        "admin": true,
        "sales": {
            "clientApprovals": true
        }
    },
    "lastLogin" : "2021-04-07 10:51:44"
};

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        permissions: {
            admin: false,
            sales: {
                clientApprovals: false
            }
        },
        isFetching: false,
        isError: false,
        isSuccess: false
    },
    reducers: {

    }
});

export default userSlice.reducer;