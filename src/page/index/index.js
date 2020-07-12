// public 样式 放在这里是为避免重复引用和版本更新
import 'antd/dist/antd.css';


import './index.less';
import umbrella from 'umbrella-storage';
import message from 'antd/lib/message';
import {getUser, doLogin, getIndex, prePay} from '~/ajax';
import { debug1 } from '~/util/debug';
debug1('hello');
umbrella.setLocalStorage('app', { appId: '123' });
console.log('这是页面index heelo world');
console.log('从stroage中取出的内容', umbrella.getLocalStorage('app'));

message.success('假装这是一个持续的loading');


doLogin('dgb','drb').then((data) => {
    if (data.code === "0"){
        message.success('请求成功');
        console.log(data);
        return ;
    }else if(data.code=="404"){
        console.log(errMsg);
    }else{
        console.log("error!!!!!!!!!!!!!");
        message.error('大概是用户的错吧');
    }
}).finally(() => {
    message.success('假装这是请求结束 loading消失');
});




let appId ,timeStamp,wx_package,
  paySign,nonceStr;

//此段代码是微信支付
prePay("since-book","123456","123",
  "123.23.56.84","http://wxtest.easy.echosite.cn/notify/order","JSAPI").then((data) => {
  console.log("ret ",data);
  appId = data.appId;
  timeStamp=data.timeStamp;
  console.log("timestamp  ",timeStamp);
  nonceStr=data.nonceStr;
  wx_package = data.package;
  paySign = data.sign;
}).then(final);


function onBridgeReady(){
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      "appId":appId,     //公众号名称，由商户传入
      "timeStamp":timeStamp,         //时间戳，自1970年以来的秒数
      "nonceStr":nonceStr, //随机串
      "package":wx_package,
      "signType":"MD5",         //微信签名方式：
      "paySign":paySign //微信签名
    },
    function(res){
      if(res.err_msg == "get_brand_wcpay_request:ok" ){
        console.log("pay ok");
        // 使用以上方式判断前端返回,微信团队郑重提示：
        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      }
    });
}

function final() {
  if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){
      console.log("document.addEventListener")
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if (document.attachEvent){
      console.log("document.attachEvent")
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  }else{
    onBridgeReady();
  }
}
