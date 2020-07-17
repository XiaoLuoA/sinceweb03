import {
  get,
  post,
  ajax,
} from './ajax_axios';
import { host } from '~/ajax/config';

export const getIndex = (userName, password) => {
    return get(host + '/page/index/index.html', { userName, password } );
}

export const doLogin = (userName, password) => {
  return post(host + '/login', { userName, password } );
}

export const prePay = (addr, bookId, buyNum, tel) => {
  return post(host + '/pay/unifiedOrder',
    { addr, bookId, buyNum, tel });
}


