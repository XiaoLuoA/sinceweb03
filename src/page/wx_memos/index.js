import './index.less';
import codes from '~/config/codeConfig';
import { getMemos, addMemos } from '~/ajax/memos';
import { toIndex, toMemos, toUser } from '~/util/jumpTo';

getMemos().then((data) => {
  let allmessage = '';
  for (let i = data.data.length - 1; i >= 0; i--) {
    let one = data.data[i];
    let img = one.wx_image;
    let name = one.wx_name;
    let content = one.message;
    let address = one.wx_address;
    let time = one.message_time;
    let parent = document.getElementById('message');
    allmessage = allmessage +
    `
      <div class="mui-card">
        <div class="mui-card-header mui-card-media">
              <img src="${img}" />
              <div class="mui-media-body">
                 <p>${name}</p>
                <b>${content}</b>
                <p>${time}</p>
                <p>&nbsp;<span class="mui-icon mui-icon-location mui-pull-right" style="font-size: 15px;">${address}</span><span class=""></span></p>
              </div>
          </div>
        </div>
      `;
  }
  document.getElementById('message').innerHTML = allmessage;
  if (data.code === codes.success) {
    console.log(data);
    return;
  }
  console.log('error', data);
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
      mui.alert('留言成功！', '森思书屋', function(){
        location.reload });
      return;
    } else {
      console.log('error', data);
    }

  });


}
document.getElementById('index').addEventListener('click', toIndex);
document.getElementById('memos').addEventListener('click', toMemos);
document.getElementById('mine').addEventListener('click', toUser);
