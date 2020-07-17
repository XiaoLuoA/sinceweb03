import { get, post } from '~/ajax/ajax_axios';
import { host } from '~/ajax/config';
export const getAllPushList = () => {
    return get(host + '/list/findAllWxList' );
}
export const sendWxList = (no) => {
    return get(host + '/list/modify', { no } );
}
