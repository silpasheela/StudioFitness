import axios from 'axios';
import { baseURL } from '../constants/endpoints';

export const instance = axios.create({
  baseURL: baseURL, 
});

export const uninterceptedApiInstance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage
    const { token } = JSON.parse(localStorage.getItem("user"));
    console.log(JSON.parse(localStorage.getItem("user")))
    console.log(token)
    if (token) {
      // Add the token to the request headers
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // You can handle successful responses here
    return response;
  },

  (error) => {
    // logout the user based on the token expiry
    if (error.response.status === 401 || (error.response.status === 400 && error.response.data.message === "Your account has been temporarily suspended!")) {
      window.location.href = "/";
      localStorage.removeItem("user");
    }
    // Handle other errors globally here
    return Promise.reject(error);
  }
);

