import axios from 'axios';

export const host = process.env.API_HOST;
export const website = 'https://parkvocalstudio.com/';
export const api = axios.create({
  baseURL: host,
  withCredentials: true
});
