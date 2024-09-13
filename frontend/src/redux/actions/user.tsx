// import axiosInstance from "../../api/axiosInstance";
// import { AppDispatch } from "../store";

import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { authType } from "../types/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const signUp = async (payload: any) =>  {
//     try {
//       const response = await axiosInstance.post('/auth/register', payload);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

export const fetchUsers = () => {
    return axiosInstance.post('/auth/GetAll'); // Example endpoint
};


export const loginAuth = (data: any) => {
    return async (dispatch: any) => {
        return axiosInstance
            .post('auth/login', data)
            .then((response) => {
                if (response?.status === 200) {
                    const token = response?.data?.token;
                    localStorage.setItem('token', token);
                    console.log(localStorage.getItem("token"))
                    toast.success(response?.data?.message)
                    dispatch({
                        type: authType.LOGIN_SUCCESS,
                        payload: token,
                    });

                } else {
                      toast.error(response?.data?.message);
                }
                return response;
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };
};

export const signUpAuth = (data: any) => {
    return async (dispatch: any) => {
        return axiosInstance
            .post('auth/register', { ...data })
            .then((response) => {
                if (response?.status === 200) {
                      toast.success('Signed Up Successfully');
                } else {
                      toast.error(response?.data?.message);
                }
                return response;
            })
            .catch((err) => {
                dispatch({
                    type: authType.LOGIN_FAILURE,
                    payload: err.message,
                });
                // showToast("error" , data?.message)
            });
    };
};
export const GetUser = createAsyncThunk(
    'auth/get',
    async (data: any, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`auth/${data}`);
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
