import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const host = process.env.API_HOST;
export const website = 'https://parkvocalstudio.com/';
export const api = axios.create({
  baseURL: host,
  withCredentials: true
});
