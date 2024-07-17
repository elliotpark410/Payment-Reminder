import axios from 'axios';

export const host = 'https://api.parkvocalstudiomanagement.com';
// export const host = 'http://localhost:3000';
export const website = 'https://parkvocalstudio.com/';
export const api = axios.create({
  baseURL: host,
  withCredentials: true
});
