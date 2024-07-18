import axios from 'axios';

let apiBaseUrl = 'http://localhost:3000';

if (process.env.NODE_ENV === 'production') {
  apiBaseUrl = process.env.REACT_APP_API_HOST
}

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true
});

export const website = 'https://parkvocalstudio.com/';

