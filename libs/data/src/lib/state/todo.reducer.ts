import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { createTodo, deleteTodo, fetchTodo, getTodoById } from "./todo.thunks";
import { TodoModel } from "../models";

export const TODO_FEATURE_KEY = "todo";

/**
 * Describes the shape of the TodoState.
 */
export interface TodoState extends EntityState<TodoModel> {
  loadingStatus: "not loaded" | "loading" | "loaded" | "error";
  errors: string[] | null;
  selectedTodo: TodoModel | null;
}

/**
 * Create an entity adapter instance with the `TodoModel` type.
 */
export const todoAdapter = createEntityAdapter<TodoModel>({
  selectId: (user: TodoModel) => user?.id,
});

/**
 * Defines the initial state of the `Todo` feature slice.
 */
export const initialTodoState: TodoState = todoAdapter.getInitialState({
  loadingStatus: "not loaded",
  errors: null,
  selectedTodo: null,
});

/**
 * Creates a `todoSlice` using `createSlice` from Redux Toolkit.
 */
export const todoSlice = createSlice({
  name: TODO_FEATURE_KEY,
  initialState: initialTodoState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.fulfilled, (state, action) => {
        todoAdapter.setAll(state, action.payload);
        state.loadingStatus = "loaded";
      })
      .addCase(fetchTodo.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loadingStatus = "error";
        state.errors = action.payload as string[];
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        todoAdapter.removeOne(state, action.meta.arg);
        state.loadingStatus = "loaded";
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loadingStatus = "error";
        state.errors = action.payload as string[];
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        todoAdapter.addOne(state, action.payload);
        state.loadingStatus = "loaded";
      })
      .addCase(createTodo.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loadingStatus = "error";
        state.errors = action.payload as string[];
      })
      .addCase(getTodoById.fulfilled, (state, action) => {
        state.loadingStatus = "loaded";
        state.selectedTodo = action.payload;
      })
      .addCase(getTodoById.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(getTodoById.rejected, (state, action) => {
        state.loadingStatus = "error";
        state.errors = action.payload as string[];
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const todoReducer = todoSlice.reducer;
