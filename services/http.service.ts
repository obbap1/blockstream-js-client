import * as axios from 'axios';
import { URLS } from '../enums';
import { isLive } from '../utils/env.utils';

export const callApi = axios.default.create({
  baseURL: isLive() ? URLS.production : URLS.development,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
