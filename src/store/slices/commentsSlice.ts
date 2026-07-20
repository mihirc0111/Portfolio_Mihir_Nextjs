import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Comment } from "@/types";

interface CommentsState {
  comments: Comment[];
  totalComments: number;
  currentPage: number;
  pageSize: number;
  loading: boolean;
  submitting: boolean;
  submitSuccess: boolean;
  error: string | null;
  selectedComment: Comment | null;
}

const initialState: CommentsState = {
  comments: [],
  totalComments: 0,
  currentPage: 1,
  pageSize: 5,
  loading: false,
  submitting: false,
  submitSuccess: false,
  error: null,
  selectedComment: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchCommentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCommentsSuccess: (
      state,
      action: PayloadAction<{ comments: Comment[]; total: number }>
    ) => {
      state.comments = action.payload.comments;
      state.totalComments = action.payload.total;
      state.loading = false;
    },
    fetchCommentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    submitCommentStart: (state) => {
      state.submitting = true;
      state.submitSuccess = false;
      state.error = null;
    },
    submitCommentSuccess: (state) => {
      state.submitting = false;
      state.submitSuccess = true;
    },
    submitCommentFailure: (state, action: PayloadAction<string>) => {
      state.submitting = false;
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    selectComment: (state, action: PayloadAction<Comment | null>) => {
      state.selectedComment = action.payload;
    },
    resetSubmitStatus: (state) => {
      state.submitSuccess = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  submitCommentStart,
  submitCommentSuccess,
  submitCommentFailure,
  setPage,
  selectComment,
  resetSubmitStatus,
  clearError,
} = commentsSlice.actions;

export default commentsSlice.reducer;