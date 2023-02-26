import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl:"http://moosaa955.pythonanywhere.com/calculator"}),
    endpoints: builder => ({})
})