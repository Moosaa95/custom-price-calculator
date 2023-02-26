import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl:"https://moosaa955.pythonanywhere.com/calculator"}),
    endpoints: builder => ({})
})