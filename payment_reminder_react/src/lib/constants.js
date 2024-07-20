import axios from 'axios';

let apiBaseUrl = 'http://localhost:3000';

if (process.env.NODE_ENV === 'production') {
  apiBaseUrl = process.env.REACT_APP_API_HOST
}

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true
});

// Adding a request interceptor to include the authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or wherever you store your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const website = 'https://parkvocalstudio.com/';

