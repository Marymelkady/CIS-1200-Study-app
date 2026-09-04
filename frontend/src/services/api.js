import axios from 'axios';

const API = axios.create({
  baseURL: 'https://refactored-yodel-4p97qx57r6pc5qxx-5001.app.github.dev/api',
});

export default API;