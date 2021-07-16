import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import _ from 'lodash';
import userAPI from 'api/userAPI';
import axios from 'axios';

const onestop_api_url = process.env.REACT_APP_ONESTOP_API_URL;

export const getUserInfo = createAsyncThunk(
    'user/info', 
    async (email) => {
        return axios.get(`${onestop_api_url}/users/${email}`)
            .then((res) => res.data);
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        info: null,
        status: 'idle'
    },
    reducers: {
        setAuth0User: (state, { payload }) => {
            state.info = payload;
        }
    },
    extraReducers: {
        [getUserInfo.pending]: (state, action) => {
            state.status = 'idle';
        },
        [getUserInfo.fulfilled]: (state, { payload }) => {
            state.status = 'succeeded';
            _.merge(state.info, payload.Item);
        },
        [getUserInfo.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    }
});

export const selectUserInfo = state => state.user.info;

export const selectAuth0UserInfo = state => state.user.auth0UserInfo;

export const { setAuth0User } = userSlice.actions;

export default userSlice.reducer;