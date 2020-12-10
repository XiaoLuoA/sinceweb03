import './index.less'
import codes from '~/config/codeConfig';
import { getBook } from '~/ajax/book';
import { prePay } from '~/ajax/index';
import { toIndex } from '~/util/jumpTo';

const booknumb = localStorage.getItem('booknumb');

getBook(booknumb).then((data) => {
  if (data.code === codes.success) {
    console.log(data);
    showData(data);
    return;
  } else {
      mui.alert('数据加载异常，请勿点击购买');
      console.log('error', data);
  }
  console.log('error', data);
});

let theData = '';
function showData(data) {
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
initNum();
function initNum() {
  const history_tel = localStorage.getItem('theTel');
  const history_school = localStorage.getItem('school');
  const history_address = localStorage.getItem('address');
  if (history_tel != null) {
    document.getElementById('tel').value = history_tel;
  }
  if (history_school != null) {
    document.getElementById('school').value = history_school;
  }
  if (history_address != null) {
    document.getElementById('address').value = history_address;
  }
}

let appId, timeStamp, wx_package,
  paySign, nonceStr;
 
function changeInput() {
  const theTel = document.getElementById('tel').value;
  const school = document.getElementById('school').value;
  let address = document.getElementById('address').value;
  localStorage.setItem('theTel', theTel);
  localStorage.setItem('school', school);
  localStorage.setItem('address', address);
  const theAddress = school + address;
  const theCount = mui('#count').numbox().getValue();
  if (theTel.length > 10) {
    prePay(theAddress, theData.booknumb, theCount, theTel).then((data) => {
      console.log('ret ', data);
      const reqs = data.data;
      console.log(reqs);
      appId = reqs.appId;
      timeStamp = reqs.timeStamp;
      console.log('timestamp', timeStamp);
      nonceStr = reqs.nonceStr;
      wx_package = reqs.package;
      paySign = reqs.sign;
    }).then((data) => {
        console.log(data);
        final();
        return;
    });
  } else {
    mui.alert('请正确填写电话');
  }
}

let payBtn = document.getElementById('payBtn');
payBtn.addEventListener('click', changeInput);

const addBtn = document.getElementById('addNum');
const delBtn = document.getElementById('delNum');
addBtn.addEventListener('click', listenNum);
delBtn.addEventListener('click', listenNum);
function listenNum() {
  let price = document.getElementById('price');
  let countElment = mui('#count').numbox();
  let count = countElment.getValue();
  if (count < 1) {
    mui.alert('数量不能小于1');
    countElment.setValue(1);
    return;
  } else if (count > 5) {
    mui.alert('一次最多只能买5本哦！');
    countElment.setValue(5);
    return;
  }
  let total = document.getElementById('total');
  total.innerText = price.innerText * count;
}


function onBridgeReady() {
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      'appId': appId, // 公众号名称，由商户传入
      'timeStamp': timeStamp, // 时间戳，自1970年以来的秒数
      'nonceStr': nonceStr, // 随机串
      'package': wx_package,
      'signType': 'MD5', // 微信签名方式：
      'paySign': paySign // 微信签名
    },
    function (res) {
      if (res.err_msg == 'get_brand_wcpay_request:ok' ) {
        console.log('pay ok');
        // 使用以上方式判断前端返回,微信团队郑重提示：
        // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        alert('购买成功');
          toIndex();
        
      }
    });
}

function final() {
  if (typeof WeixinJSBridge == 'undefined') {
    if (document.addEventListener) {
      console.log('document.addEventListener')
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
      console.log('document.attachEvent')
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    onBridgeReady();
  }
}

