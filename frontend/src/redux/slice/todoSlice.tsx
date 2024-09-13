import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 
import { getAllTodos, GetTodo } from '../actions/todo';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  todoList :any;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  todoList :{},
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getAllTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(GetTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(GetTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todoList = action.payload;
      });

  },
});

export const { addTodo, updateTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
