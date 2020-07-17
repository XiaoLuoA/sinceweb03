import codes from '~/config/codeConfig';
import { getMemos, addMemos } from '~/ajax/memos';
import rendermsgTemplate from './module/template/msgTemplate';
import '~/module/initFooter';

getMemos().then((res) => {
  if (res.code === codes.success) {
    console.log(res);
    let allmessage = '';
    for (let i in res.data) {
      const msg = res.data[i];
      allmessage += rendermsgTemplate(msg);
    }
    document.getElementById('message').innerHTML = allmessage;
    return;
  }
  console.log('error', res);
});

let addBtn = document.getElementById('open');
addBtn.addEventListener('click', function (ev) {
  addNew();
  let addMes = document.getElementById('addMes');
  addMes.addEventListener('click', addMessage);
});


function addNew() {
  layer.open({
    type: 1
    , content: `
        <header class="mui-bar mui-bar-nav"><h1 class="mui-title">留言</h1></header>
            <br><br><div class="mui-input-row" style="margin: 10px">  
            <textarea id="textarea" rows="5" maxlength="50"  placeholder="我想说的话..." name="content" ></textarea>
           </div>
            <div style="text-align:center;">
            <button type="submit" id="addMes" class="mui-btn mui-btn-primary"  >确认</button>&nbsp;&nbsp;&nbsp;&nbsp;
           <button type="button" class="mui-btn mui-btn-danger" onclick="layer.closeAll()">取消</button></div>' `
    , anim: 'up'
    , style: 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
  });
}

function addMessage() {
  let objNew = localStorage.getItem('wx_user');
  console.log(objNew);
  let wx_user = JSON.parse(objNew);
  let textarea = document.getElementById('textarea');
  let message = textarea.value;
  let wx_name = wx_user.nickname;
  let wx_image = wx_user.headImgUrl;
  let wx_address = wx_user.province + wx_user.city;
  let opeAn_id = wx_user.openId;
  addMemos(wx_name, wx_image, wx_address, opeAn_id, message).then((data) => {
    if (data.code === codes.success) {
      layer.closeAll();
      mui.alert('留言成功！', '森思书屋', function () {
        location.reload;
      });
      return;
    } else {
      console.log('error', data);
    }

  });

}
