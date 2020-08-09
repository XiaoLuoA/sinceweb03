import './index.less';
import codes from '~/config/codeConfig';
import { getWXList } from '~/ajax/wxlist';
import { itemOk, itemIng } from './module/template/wxTemplate'; 
import '~/module/initFooter';
const wx_user = localStorage.getItem('wx_user');
let user = JSON.parse(wx_user);
const wx_openId = user.openId;
console.log(wx_openId);
if (wx_openId.length < 10) {
  toError();
}

getWXList(wx_openId).then((data) => {
    if (data.code === codes.success) {
        console.log(data);
        showUserList(data);
        return;
    } else if (data.code === codes.LIST_OPENID_NOT_FOUND) {
        console.log('查找为空');
    } else {
        console.log('error', data);
    }
});

function showUserList(data) {
  let htm = '';
  const wxList = data.data;
  for (let i in wxList) {
    const wxItem = wxList[i];
    if (wxItem.status == 2) {
      htm += itemIng(wxItem);
    } else if (wxItem.status == 3) {
      htm += itemOk(wxItem);
    }
  }
  document.getElementById('muiDoctorCard').innerHTML = htm;
}
