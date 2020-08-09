import { get, post } from '~/ajax/ajax_axios';
import { host } from '~/ajax/config';

export const addMemos = (message) => {
  return post(host + '/memos/add', { message });
}

export const getMemos = () => {
  return get(host + '/memos/findAll', {})
}
