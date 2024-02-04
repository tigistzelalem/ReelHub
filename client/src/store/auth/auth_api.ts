import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const baseUrl = 'http://localhost:5000';

export const authApi = createApi({
    reducerPath: "user",
    tagTypes: ["User"],
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    endpoints: (builder) => ({
        login: builder.mutation<any, any>({
            query: (user) => ({
                url: "/user/login",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["User"]
        }),

        register: builder.mutation<any, any>({
            query: (user) => ({
                url: "/user/register",
                method: "POST",
                body: user
                        
            }),
            invalidatesTags: ["User"]
        }),
    }),
    
});

export const {
    useRegisterMutation,
    useLoginMutation
} = authApi