import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    accessToken: string | null;
    refreshToken: string | null;
    userId: string | null;
    roles: string[];
}

const initialUserState: UserState = {
    accessToken: null,
    refreshToken: null,
    userId: null,
    roles: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.accessToken = action.payload.accessToken;
            state.userId = action.payload.userId;
            state.roles = action.payload.roles;
        },
        clearUser(state) {
            state.accessToken = null;
            state.userId = null;
            state.roles = [];
        },
        logout(state) {
            localStorage.clear();
            state.accessToken = null;
            state.userId = null;
            state.roles = [];
        },
    },
});

export const { setUser, clearUser, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;