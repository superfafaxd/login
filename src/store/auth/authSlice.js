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
        recaptcha: '',
        userVerifyEmail: false,
        provider: null
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.number = payload.number;
            //state. userVerifyEmail = payload. userVerifyEmail
            state.errorMessage = payload?.errorMessage;
            state.user = payload.user;
            state.userVerifyEmail = payload.emailVerified;
            state.provider = payload.provider;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated', //'checking', 'not-authenticated', 'authenticated'
                state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.number = null;
            state.errorMessage = null;
            state.user = {};
            state.userVerifyEmail = false
            state.provider = null
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
        },
        setRecaptcha: (state, { payload }) => {
            state.recaptcha = payload
        },
        onSetError: (state, { payload }) => {
            state.errorMessage = payload;
        },
        onResetError: (state) => {
            state.errorMessage = null
        },
        onUserVerifyEmail: (state, { payload}) =>{
            state.userVerifyEmail = payload
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    login,
    logout,
    checkingCredentials,
    setRecaptcha,
    onSetError,
    onResetError,
    onUserVerifyEmail
} = authSlice.actions;