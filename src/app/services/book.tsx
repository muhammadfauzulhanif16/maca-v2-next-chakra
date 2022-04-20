import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

export type BookState = {
  id: string;
  title: string;
  author: string;
  published: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
};

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://maca-v2-server.herokuapp.com/",
  }),
  tagTypes: ["Book"],
  endpoints: ({ query, mutation }) => ({
    createBook: mutation({
      query: (data) => {
        return {
          url: "book",
          method: "post",
          data,
        };
      },
      invalidatesTags: ["Book"],
    }),

    readAllBooks: query<Array<BookState>, string>({
      query: (status) => ({
        url: `books?is_completed=${status}`,
        method: "get",
      }),
      providesTags: ["Book"],
    }),

    updateStatusBook: mutation({
      query: (id) => {
        return {
          url: `book/${id}`,
          method: "put",
        };
      },
      invalidatesTags: ["Book"],
    }),

    deleteBook: mutation({
      query: (id) => {
        return {
          url: `book/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useReadAllBooksQuery,
  useUpdateStatusBookMutation,
  useDeleteBookMutation,
} = bookApi;
