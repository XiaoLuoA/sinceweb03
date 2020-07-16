import {get, post} from '~/ajax/ajax_axios';
import {host} from '~/ajax/config';


export const getUser = (openId) => {
  return get(host + '/user/findUserByOpenId', { open_id } );
}


export const addUser = (wx_name, wx_image, wx_address, open_id) => {
  return post(host + '/user/add', {wx_name, wx_image, wx_address, open_id})
}

export const wxLogin = () => {
  return post(host + '/user/login', {});
}