import {
  reportCompare, reportAdd
} from '~/ajax/report';
import {
  toReport
} from '~/util/jumpTo';
import codes from '~/config/codeConfig';
loadData();
function loadData() {
  reportCompare().then((data) => {
    if (data.code == codes.success) {
      toReport();
    } else if (data.code == codes.USER_NOT_ENROLL) {
      console.log(data);
    };
  });
}

let weuiAgreeCheckbox = sid('weuiAgreeCheckbox');
weuiAgreeCheckbox.addEventListener('click', () => {
  if (weuiAgreeCheckbox.checked) {
    console.log('开启'); 
    sid('showTooltips').setAttribute('class', 'weui-btn weui-btn_primary');
  } else {
    sid('showTooltips').setAttribute('class', 'weui-btn weui-btn_primary weui-btn_disabled');
  }
});
sid('showTooltips').addEventListener('click', () => {
  if (weuiAgreeCheckbox.checked) {
    addUser();
  } else {
    alert('请先同意相关条款');
  } 
});
function addUser() {
  const stid = sid('sid').value;
  const password = sid('password').value;
  const email = sid('email').value;
  if (stid.length > 9 && stid.length < 25 && password.length < 16 && email.length > 5) {
    reportAdd(stid, password, email).then((data) => {
      if (data.code === codes.success) {
        toReport();
      } else if (data.code === codes.USER_ALREADY_EXIST) {
        alert('该用户已存在');
      }
    });
  } else {
    alert('数据格式有误');
  }
}

function sid(id) {
  return document.getElementById(id);
}
const sub1 = '登录提示';
const con1 = ` 1.教职工使用校园卡号、学生使用学号作为用户名，使用统一身份认证平台的密码；
<br><br>
 2.本科生原始密码是身份证号后八位；2019级研究生原始密码是身份证号后八位；2018及以前年级研究生原始密码是“111111”或“000000”。
<br>`;
const sub2 = '相关条款';
const con2 = `<b>服务声明</b><br><br>
1.系统仅在疫情较为稳定的时期开放。<br>
2.系统旨在为大家节约时间、方便生活。<br>
3.系统将为用户每日自动提交打卡信息。<br>
4.系统提交的健康信息均为用户自己填写。<br><br>
<b>隐私声明</b><br><br>
1.本系统用户信息仅作为健康上报所用。<br>
2.上报结束日期，用户信息将自动删除。`;
const sub3 = '邮箱填写';
const con3 = `1.邮箱用于接收上报结果
<br>
2.请正确填写您的邮箱
<br>
3.系统邮件会被部分邮箱屏蔽，如没有收到邮件，请留意垃圾箱`;
showDialog('showIOSDialog1', sub1, con1);
showDialog('Clause', sub2, con2);
showDialog('showIOSDialog2', sub3, con3);

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
