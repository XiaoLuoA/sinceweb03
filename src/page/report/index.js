import { reportCompare, reportUpdate, reportPay, prePay1 } from '~/ajax/report';
import { toReportLogin } from '~/util/jumpTo';
import codes from '~/config/codeConfig';
loadData();
function loadData() {
  reportCompare().then((data) => {
    if (data.code == codes.success) {
      showData(data.data);
    } else if (data.code == codes.USER_NOT_ENROLL) {
      toReportLogin();
    } else {
      console.log(data);
    };
  });
}
sid('start').addEventListener('click', () => {
  reportUpdate().then((data) => {
    if (data.code === codes.success) {
      alert('操作成功');
      location.reload();
    } else {
      alert('服务器异常');
    }
  });
});
let todate = 30;
let appId, timeStamp, wx_package,
  paySign, nonceStr;
sid('weui-picker-confirm').addEventListener('click', () => {
  if (sid('x11').checked) {
    todate = 15;
    console.log('续费15天');
    pay(15);
    
  } else if (sid('x12').checked) {
    todate = 30;
    console.log('续费30天');
    pay(30);
  }
});
function pay(day) {
  prePay1(day).then((data) => {
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
}
function showData(_data) {
  sid('sid').value = _data.sid;
  sid('email').value = _data.email;
  sid('day').value = _data.day;
  if (_data.status == 1) {
    sid('status').value = '已开启';
    sid('start').setAttribute('style', 'color:red');
    sid('start').innerHTML = '关闭';
  } else if (_data.status == 0) {
    sid('status').value = '已关闭';
    sid('start').setAttribute('style', '');
    sid('start').innerHTML = '开启';
  }
}
function sid(id) {
  return document.getElementById(id);
}
const sub1 = '提示';
const con1 = `
1.登录后账号密码均不可修改。<br>
2.使用中遇到问题请联系客服qq359891977
`;
const sub2 = '服务天数';
const con2 = `1.首次登录将免费赠送用户4天。<br>
2.如需增加服务时间请点击续费。<br>
3.支付遇到问题，请联系客服qq359891977<br>
4.邀请两名新用户试用即可免费续费15天，详情请在公众号回复【续费】<br>
`;
const sub3 = '邮箱填写';
const con3 = `1.邮箱用于接收上报结果
<br>
2.请正确填写您的邮箱
<br>
3.系统邮件会被部分邮箱屏蔽，如没有收到邮件，请留意垃圾箱`;
showDialog('showIOSDialog1', sub1, con1);
showDialog('showIOSDialog2', sub2, con2);
function showDialog(id, subject, content) {
  sid(id).addEventListener('click', function () {
    sid('iosDialog1').setAttribute('style', '');
    sid('subject').innerHTML = subject;
    sid('content').innerHTML = content;
  });
  sid('dialogClose').addEventListener('click', dialogClose);
}
function dialogClose() {
  sid('iosDialog1').setAttribute('style', 'display:none;');
}

sid('showTooltips').addEventListener('click', showMoney);
function showMoney() {
  sid('money').removeAttribute('hidden');
}
sid('closeMoney').addEventListener('click', closeMoney);
function closeMoney() {
  sid('money').setAttribute('hidden', '');
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
        reportPay(todate).then((data) => { 
          if (data.code === codes.success) {
            alert('操作成功');
            location.reload();
          } else {
            alert('服务器异常');
          }
        }); 
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

