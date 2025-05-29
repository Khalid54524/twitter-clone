import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/",
});

// Set Authorization header for all requests
api.interceptors.request.use(
  (config) => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      config.headers.Authorization = `Bearer ${userId}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Redirect to login page if we get 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
