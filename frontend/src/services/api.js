import axios from 'axios';

const API = axios.create({
  baseURL: 'https://refactored-yodel-4p97qx57r6pc5qxx-5001.app.github.dev/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;