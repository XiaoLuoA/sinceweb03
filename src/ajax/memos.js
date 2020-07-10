import {get, post} from "~/ajax/ajax_axios";
import {host} from "~/ajax/config";

export const addMemos = (wx_name, wx_image, wx_address, open_id, message) => {
  return post(host+'/memos/add',{wx_name, wx_image, wx_address, open_id, message})
}

export const getMemos = () => {
  return get(host+'/memos/findAll',{})
}