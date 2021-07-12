import {
    createSlice
} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        auth0UserInfo: null,
        user: null
    },
    reducers: {
        setAuth0User: (state, { payload }) => {
            state.auth0UserInfo = payload;
        }
    }
});

export const selectAuth0UserInfo = state => state.user.auth0UserInfo;

export const { setAuth0User } = userSlice.actions;

export default userSlice.reducer;