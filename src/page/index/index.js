// public 样式 放在这里是为避免重复引用和版本更新
import './index.less';
import umbrella from 'umbrella-storage';
import {getUser, doLogin, getIndex, prePay} from '~/ajax';
import { debug1 } from '~/util/debug';
import codes from "~/config/codeConfig";
debug1('hello');
umbrella.setLocalStorage('app', { appId: '123' });
console.log('这是页面index heelo world');
console.log('从stroage中取出的内容', umbrella.getLocalStorage('app'));
let appId, timeStamp, wx_package,
  paySign, nonceStr;

// 此段代码是微信支付
//
prePay('4号楼','021564', '66', '18032659856').then((data) => {
  console.log('ret ', data);
  appId = data.appId;
  timeStamp = data.timeStamp;
  console.log('timestamp', timeStamp);
  nonceStr = data.nonceStr;
  wx_package = data.package;
  paySign = data.sign;
}).then((data) => {
  if (data.code === codes.success){
    message.success('请求成功');
    console.log(data);
    final();
    return ;
  }else {
    message.error(data.data);
    console.log('error', data);
  }
});


function onBridgeReady(){
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      'appId':appId, // 公众号名称，由商户传入
      'timeStamp':timeStamp, // 时间戳，自1970年以来的秒数
      'nonceStr':nonceStr, // 随机串
      'package':wx_package,
      'signType':'MD5', // 微信签名方式：
      'paySign':paySign // 微信签名
    },
    function(res){
      if(res.err_msg == 'get_brand_wcpay_request:ok' ){
        console.log('pay ok');
        // 使用以上方式判断前端返回,微信团队郑重提示：
        // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      }
    });
}

function final() {
  if (typeof WeixinJSBridge == 'undefined'){
    if( document.addEventListener ){
      console.log('document.addEventListener')
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if (document.attachEvent){
      console.log('document.attachEvent')
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  }else{
    onBridgeReady();
  }
}
