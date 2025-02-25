import axios from 'axios';
import { RootState } from './store';
import { store } from './store';
import { urlApi } from '../utils/urlRequests';

const axiosInstance = axios.create({
  baseURL: urlApi + "/api",
});

axiosInstance.interceptors.request.use((config) => {
  const state: RootState = store.getState();
  const token = state.user.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;