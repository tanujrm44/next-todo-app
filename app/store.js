"use client";
import {configureStore  } from "@reduxjs/toolkit";
import todoReducer from "../slices/todoSlice";
import { apiSlice } from "../slices/apiSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    todo: todoReducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;