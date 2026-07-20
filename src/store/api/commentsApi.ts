import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Comment } from "@/types";

interface CommentsResponse {
  comments: Comment[];
  total: number;
}

interface CreateCommentRequest {
  name: string;
  email: string;
  message: string;
}

interface CreateCommentResponse {
  message: string;
  data: Comment[];
}

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getComments: builder.query<CommentsResponse, { page?: number; pageSize?: number }>({
      query: ({ page = 1, pageSize = 5 } = {}) =>
        `comments?page=${page}&pageSize=${pageSize}`,
      transformResponse: (response: Comment[]) => ({
        comments: response,
        total: response.length,
      }),
      providesTags: ["Comment"],
    }),
    createComment: builder.mutation<CreateCommentResponse, CreateCommentRequest>({
      query: (comment) => ({
        url: "comments",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation, useDeleteCommentMutation } = commentsApi;
