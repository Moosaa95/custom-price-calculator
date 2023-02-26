import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:8000/calculator"}),
    endpoints: builder => ({})
})