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

interface ReplyCommentRequest {
  id: string;
  replyMessage: string;
}

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getComments: builder.query<CommentsResponse, { page?: number; pageSize?: number; status?: string; search?: string }>({
      query: ({ page = 1, pageSize = 5, status, search } = {}) => {
        const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
        if (status) params.set("status", status);
        if (search) params.set("search", search);
        return `comments?${params.toString()}`;
      },
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
    replyComment: builder.mutation<CreateCommentResponse, ReplyCommentRequest>({
      query: ({ id, replyMessage }) => ({
        url: `comments/reply/${id}`,
        method: "PATCH",
        body: { replyMessage },
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation, useDeleteCommentMutation, useReplyCommentMutation } = commentsApi;
