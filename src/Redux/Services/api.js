import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl =
    "https://reqres.in/api/";

export const api = createApi({
    reducerPath: "authApi",
    tagTypes: ["users"],
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const state = getState();
            const token = state?.user?.details?.payload?.token;
            if (token) {
                headers.set("x-access-token", `${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // auth endpoints
        login: builder.mutation({
            query: (data) => {
                return {
                    url: `/login`,
                    method: "POST",
                    body: data,
                };
            },
        }),


        //private end points
        createAccount: builder.mutation({
            query: (data) => {
                return {
                    url: `/users`,
                    method: "POST",
                    body: data,
                };
            },
        }),

        getUserList: builder.query({
            query: (page) => {
                return {
                    url: `/users?${page}`,
                }
            },
            providesTags: ["users"]
        }),

        getCurrentUser: builder.query({
            query: () => {
                return {
                    url: `/users/2`,
                }
            },
        }),

        getSingleUser: builder.query({
            query: () => {
                return {
                    url: `/users/2`,
                }
            },
            providesTags: ["users"]
        }),

        updateUser: builder.mutation({
            query: (id, data) => {
                return {
                    url: `/users/${id}`,
                    method: "PUT",
                    body: data,
                };
            },
        }),

    }),
});

export const {
    useLoginMutation,
    useCreateAccountMutation,
    useGetUserListQuery,
    useGetSingleUserQuery,
    useUpdateUserMutation,
    useGetCurrentUserQuery
} = api;