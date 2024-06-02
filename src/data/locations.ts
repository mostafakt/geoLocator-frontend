/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./middleware";
import {  ILocationResponse } from "../types/location";

export const locationApi = createApi({
  baseQuery: customFetchBase,
  reducerPath: "location",
  tagTypes: ["search"],
  endpoints: (builder) => ({
    //@ts-ignore
    getLocation: builder.mutation<ILocationResponse>({
      query: (request) => ({
        url: `geolocation/find`,
        body: request,
        method: "post",
      }),
    }),
  }),
});

export const { useGetLocationMutation } = locationApi;
