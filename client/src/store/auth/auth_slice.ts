import authResponse from "@/types/auth_response_type";
import { getCookie, removeCookie, setCookie } from "@/utils/cookie";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: getCookie("_id") || "",
    name: getCookie("name") || "",
    email: getCookie("email") || "",
    password: getCookie("password") || "",
    role: getCookie("role") || "",
    token: getCookie("token") || ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<authResponse>) {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.role = action.payload.role;
            state.token = action.payload.token;
            setCookie("_id", action.payload._id);
            setCookie("name", action.payload.name);
            setCookie("email", action.payload.email);
            setCookie("password", action.payload.password);
            setCookie("role", action.payload.role);
            setCookie("token", action.payload.token);


        },

        clearToken(state) {
            state.token = "";
            state._id = "";
            state.name = "";
            state.email = "";
            state.password = "";
            state.role = "";
            removeCookie("token");
            removeCookie("_id");
            removeCookie("name");
            removeCookie("email");
            removeCookie("password");
            removeCookie("role");

        }


    }

})

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;