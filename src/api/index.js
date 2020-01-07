import { get } from '@utils/http.js';

function getIndex (params) {
  return get('/path/to/index', params);
}

export { getIndex };