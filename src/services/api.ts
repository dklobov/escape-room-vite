import axios from 'axios';
import type {AxiosInstance} from 'axios';

import {BASE_URL, REQUEST_TIMEOUT} from '../const';

function createApi(): AxiosInstance {
  return axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });
}

export {createApi};
