import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        auth0UserInfo: null,
        user: null
    },
    reducers: {
        setAuth0User: function(state, { payload }) {
            state.auth0UserInfo = payload;
        }
    }
});

export const { setAuth0User } = userSlice.actions;

export default userSlice.reducer;