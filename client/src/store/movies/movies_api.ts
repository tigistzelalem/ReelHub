import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

const baseUrl = 'http://localhost:5000'

export const moviesApi = createApi({
    reducerPath: "movie",
    tagTypes: ["Movie"],
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,

    }),
    endpoints: (builder) => ({
        getMovie: builder.query<any, string>({
            query: (_id) => `/movies/getMovie/${_id}`,
            providesTags: ["Movie"]
        }),

        getAllMovies: builder.query<any, any>({
            query: () => '/movies/getMovies',
            providesTags: ["Movie"]
        }),

        getTopRated: builder.query<any, any>({
            query: () => '/rate/topRated',
            providesTags: ["Movie"]
        }),

        searchMovie: builder.query<any, {title: string}>({
            query: (body) => ({
                url: '/movies/search',
                method: 'POST',
                body,
            }),
            providesTags: (result, error, {title}) => [{ type: 'Movie', id: title }],

        }),

        streamMovie: builder.query<any, string>({
            query: (publicId) => `/movies/stream?publicId=${publicId}`,
            providesTags: ["Movie"]
        })
    })
})

export const {
    useGetMovieQuery,
    useGetTopRatedQuery,
    useStreamMovieQuery,
    useGetAllMoviesQuery,
    useSearchMovieQuery,
} = moviesApi