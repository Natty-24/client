import {  createApi, fetchbaseQuery } from "@reduxjs/toolkit/query";
import build from "next/dist/build";
import { buffer } from "stream/consumers";

export const api = createApi({
    baseQuery: fetchbaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath: "api",
    tagTypes: [],
    endpoints: (build) => ({}),
});

export const {} = api;