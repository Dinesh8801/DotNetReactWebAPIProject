import { createSlice } from "@reduxjs/toolkit";
import API from '../../app/api';

const initialState = {
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    email: localStorage.getItem("email") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.email = action.payload.credentials.email;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;

export const registerUser = (userData) => async () => {
    try {
        const response = await API.post("/account/signup", userData);
        return response.data;
    } catch (error) {
        if  (error.status == 401) console.error("Registration failed, Info already Exists : Status - " + error.status);
        if  (error.status == 400) console.error("Registration failed, Validation Error : Status - " + error.status);
        return false;
    }
};

export const loginUser = (credentials) => async (dispatch) => {
    try {
        const response = await API.post("/account/login", credentials);
        const token = response.data;
        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("email", credentials.email);
            dispatch(loginSuccess({token, credentials}));
            return true;
        }
        return false;
    } catch (error) {
        console.error("Login failed, Invalid Username or Password : Status - " + error.status);
        console.error("Error response:", error.response);
        console.error("Error message:", error.message);

        return false;
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch(logout());
};