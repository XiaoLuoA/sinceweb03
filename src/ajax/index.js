import {
  get,
  post,
  ajax,
} from './ajax_axios';
import {host} from "~/ajax/config";

export const getIndex = (userName, password) => {
    return get('http://localhost:8081//page/index/index.html', { userName, password } );
}

export const doLogin = (userName, password) => {
  return post(host+'/login', { userName, password } );
}

export const prePay = (body,outTradeNo, totalFee, spbillCreateIp, notifyUrl, tradeType,signType= "MD5" ) => {
  return post(host+'/pay/unifiedOrder',
    {
      body,outTradeNo, totalFee, spbillCreateIp, notifyUrl, tradeType,signType
    });
}















