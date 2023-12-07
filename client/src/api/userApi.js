import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/v1/",
    prepareHeaders: (headers, { getState }) => {
      // Modify headers here if needed based on authentication state
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => "users",
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
    createUser: build.mutation({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation, useCreateUserMutation } = userApi;

export default userApi;
