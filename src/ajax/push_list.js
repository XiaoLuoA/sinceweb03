import {get, post} from '~/ajax/ajax_axios';
import {host} from '~/ajax/config';
export const getAllPushList = () => {
    return get(host + '/list/findAllWxlist' );
}
