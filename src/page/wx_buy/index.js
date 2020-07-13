import './index.less'
import  codes  from '~/config/codeConfig';
import { getUser } from '~/ajax/user';
import { getBook } from '~/ajax/book';
import { prePay } from '~/ajax/index';
function GetRequest() {
  let url = location.search; //获取url中”?”符后的字串
  let theRequest = new Object();
  if (url.indexOf('?') != -1) {
     let str = url.substr(1);
     let strs = str.split('&');
     for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split('=')[0]]=unescape(strs[i].split('=')[1]);
     }
  }
  return theRequest;
}

var Request = new Object();
Request = GetRequest();

console.log(Request['booknumb']);

getBook(Request['booknumb']).then((data) => {
  if (data.code === codes.success){
      console.log(data);
      showData(data);
      return ;
  } else {
      console.log('error', data);
  }
});
// bookads: 0
// bookclick: 2
// bookcount: 1
// bookimage1: "191544441.jpg"
// bookimage2: "191544442.null"
// bookimage3: "191544443.null"
// bookname: "java实战开发"
// booknumb: 19154444
// bookprice: 10
// bookpricing: 30
// bookpurprice: 5
// bookstatus: 1
// booktime: "1561023279057"
// bookuse: "八成"
// bookwriter: "名师讲坛"
// bookzan: 0
let theData = '';
function showData(data){
  let content = document.getElementById('bookContent');
  const book = data.data;
  theData = data.data;
  content.innerHTML = `
  <li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left"  style="min-width:20vw;height:20vw; " src="https://sincelibrary.oss-cn-shanghai.aliyuncs.com/since2.0/Image/books/${book.bookimage1}">
						<div class="mui-media-body">
							${book.bookname}
							<p class='mui-ellipsis'>使用程度:${book.bookuse}新</p>
							<p class='mui-ellipsis'>价格:<span id="price">${book.bookprice}</span>元</p>
							<p style="color:red; font-size:20px;" class="mui-pull-right"><small>￥</small><span id="total">${book.bookprice}</span> </p>
						</div>
					</a>
				</li>`
}

function changeInput(){
  const theTel = document.getElementById('tel').value;
  const theAddress = document.getElementById('address').value;
  const theCount = mui('#count').numbox().getValue();
  if(theTel.length > 10){
    prePay(theAddress, theData.booknumb, theCount , theTel).then((data) => {
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
  } else{
    mui.alert('请正确填写电话');
  }
}

let payBtn = document.getElementById('payBtn');

payBtn.addEventListener('click', changeInput);

let click = 1;
const addBtn = document.getElementById('addNum');
const delBtn = document.getElementById('delNum');

addBtn.addEventListener('click',function(){
  click++;
  let price = document.getElementById('price');
  let count = mui('#count').numbox().getValue();
  let total = document.getElementById('total');
  total.innerText = price.innerText * count;
  console.log(click);
});

delBtn.addEventListener('click',function(){
  click--;
  let price = document.getElementById('price');
  let count = mui('#count').numbox().getValue();
  let total = document.getElementById('total');
  total.innerText = price.innerText * count;
  console.log(click);
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

