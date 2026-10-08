import axios from 'axios';
import type {AxiosInstance, AxiosRequestConfig} from 'axios';

import {BASE_URL, REQUEST_TIMEOUT} from '../const';
import {getToken} from './token';

function addTokenHeader(config: AxiosRequestConfig): AxiosRequestConfig {
  const token = getToken();

  if (token) {
    config.headers = {
      ...config.headers,
      'X-Token': token,
    };
  }

  return config;
}

function createApi(): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(addTokenHeader);

  return api;
}

export {createApi};
