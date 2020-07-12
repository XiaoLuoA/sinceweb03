import {get, post} from '~/ajax/ajax_axios';
import {host} from '~/ajax/config';
export const getWXList = (openId) => {
    return get(host + '/list/findListByOpenId', {openId } );
}
