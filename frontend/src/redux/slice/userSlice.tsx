// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetUser } from '../actions/user';

interface User {
  id: number;
  name: string;
  email :string;
  
}

interface UserState {
  users: User[];
  loading: false,
  error: string | null;
  singleUser :{},
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  singleUser :{},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(GetUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      });

  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
