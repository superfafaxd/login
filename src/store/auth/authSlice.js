import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',//'not-authenticated', //'checking',
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        number: null,
        errorMessage: null,
        user: {},
        recaptcha: ''
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.number = payload.number;
            state.errorMessage = payload?.errorMessage;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated', //'checking', 'not-authenticated', 'authenticated'
                state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.number = null;
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
        },
        setRecaptcha: (state, { payload }) => {
            state.recaptcha = payload
        },
        onSetError: (state, { payload }) => {
            state.errorMessage = payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials, setRecaptcha, onSetError } = authSlice.actions;