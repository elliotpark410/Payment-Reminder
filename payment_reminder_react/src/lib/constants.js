import axios from 'axios';

// let host = 'http://localhost:3000';
const host = 'https://api.parkvocalstudiomanagement.com';

// if (process.env.NODE_ENV === 'production') {
//   host = process.env.REACT_APP_API_HOST
// }

export const api = axios.create({
  baseURL: host,
  withCredentials: true
});

export const website = 'https://parkvocalstudio.com/';

