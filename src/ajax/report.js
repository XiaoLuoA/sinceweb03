import { get, post } from '~/ajax/ajax_axios';
import { host } from '~/ajax/config';
export const reportAdd = (sid, password, email) => {
  return get(host + '/report/add', { sid, password, email });
}
export const reportCompare = () => {
  return get(host + '/report/compare', {});
}
export const reportPay = (day) => {
  return get(host + '/report/pay', { day });
}
export const reportUpdate = () => {
  return get(host + '/report/update', {});
}
export const prePay1 = (day) => {
  return post(host + '/pay/unifiedOrder1',
    { day });
}
