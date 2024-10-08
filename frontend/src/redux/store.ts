
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import todoReducer from './slice/todoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
