import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { todoType } from "../types/todo";
import { createAsyncThunk } from "@reduxjs/toolkit";



// export const CreateTodo = (data: any) => {
//     return async (dispatch: any) => {
//         return axiosInstance
//             .post('todo/Save', data)
//             .then((response) => {
//                 console.log(response, "resssss")
//                 if (response?.status === 200) {
//                     console.log(response, "inside co", response?.data?.token)
                  
//                     toast.success(response?.data?.message)
//                     dispatch({
//                         type: todoType.TODO_SUCCESS,
//                         data :response?.data
//                     });

//                 } else {
//                       toast.error(response?.data?.message);
//                 }
//                 return response;
//             })
//             .catch((err) => {
//                 // toast.error(err.message);
//             });
//     };
// };
export const CreateTodo = createAsyncThunk(
    'todos/get',
    async (data: any, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(`todo/Save`, data);
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          return response.data;
        } else {
          toast.error(response?.data?.message);
          return rejectWithValue(response?.data);
        }
      } catch (error: any) {
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  );
export const GetTodo = createAsyncThunk(
    'todos/get',
    async (data: any, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`todo/Get/${data}`);
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          return response.data;
        } else {
          toast.error(response?.data?.message);
          return rejectWithValue(response?.data);
        }
      } catch (error: any) {
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  );

export const UpdateTodo = createAsyncThunk(
    'todos/getUpdate',
    async (data: any, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post((`todo/update/${data}`));
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          return response.data;
        } else {
          toast.error(response?.data?.message);
          return rejectWithValue(response?.data);
        }
      } catch (error: any) {
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  );

export const getAllTodos = createAsyncThunk(
    'todos/getAll',
    async (data: any, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post('todo/GetAll', data);
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          return response.data;
        } else {
          toast.error(response?.data?.message);
          return rejectWithValue(response?.data);
        }
      } catch (error: any) {
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  );
export const deleteTodo = (data: any) => {
    return async (dispatch: any) => {
        return axiosInstance
            .delete(`todo/Delete/${data}`)
            .then((response) => {
                if (response?.status === 200) {
                      toast.success(response?.data?.message);
                } else {
                      toast.error(response?.data?.message);
                }
                return response;
            })
            .catch((err) => {
                dispatch({
                    type: todoType.TODO_FAILURE,
                    payload: err.message,
                });
            });
    };
};