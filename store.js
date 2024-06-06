import { configureStore, createSlice } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { dbApi } from './db';

// Create a journal slice within the same file
const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    entries: [],
  },
  reducers: {
    addEntry: (state, action) => {
      state.entries.push(action.payload);
    },
    deleteEntry: (state, action) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
  },
});

export const { addEntry, deleteEntry } = journalSlice.actions;

export const store = configureStore({
  reducer: {
    [dbApi.reducerPath]: dbApi.reducer,
    journal: journalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dbApi.middleware),
});

setupListeners(store.dispatch);
