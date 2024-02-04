import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth_slice";
import { authApi } from "./auth/auth_api";
import { moviesApi } from "./movies/movies_api";
export const store = configureStore({
    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer,
        [moviesApi.reducerPath]: moviesApi.reducer
        
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            authApi.middleware,
            moviesApi.middleware,
        
        )
    }
})