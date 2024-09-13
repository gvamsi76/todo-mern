
// import axios from 'axios';
// import { getToken } from '../utils';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:5003/api/',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${getToken()}`,
//   },
// });

// export default axiosInstance;

import axios from 'axios';

export const getToken = () => {
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
    console.log(token, "token");
    return token;
  }
  return null;
};

// Create the axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5003/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to dynamically include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
