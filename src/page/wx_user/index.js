import './index.less'
import codes from '~/config/codeConfig'
import { getUser } from '~/ajax/user';
import message from 'antd/lib/message';
import '~/module/initFooter';
import { toIndex, toMemos, toUser, toError } from '~/util/jumpTo';

const wx_user = localStorage.getItem('wx_user');
let user = JSON.parse(wx_user);
const wx_openId = user.openId;

console.log(wx_openId);

getUser(wx_openId).then((data) => {
  if (data.code === codes.success) {
    message.success('请求成功');
    showData(data);
    console.log(data);
    return;
  } else if (data.code === codes.USER_NOT_FOUND) {
    console.log('没有查到这个用户');
  } else {
    console.log('error', data);
  }
});

function showData(_data) {
  const htm = `
    <img class="mui-media-object mui-pull-left head-img" id="head-img" src="${_data.data.wxImage}">
    <div class="mui-media-body">
      <p id="wxName">${_data.data.wxName}<p>
      <p id="wxAddress" class='mui-ellipsis'>${_data.data.wxAddress}</p>
    </div>`;
  document.getElementById('user_infor').innerHTML = htm;
}
