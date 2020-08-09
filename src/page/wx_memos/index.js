import codes from '~/config/codeConfig';
import { getMemos, addMemos } from '~/ajax/memos';
import rendermsgTemplate from './module/template/msgTemplate';
import '~/module/initFooter';

getMemos().then((res) => {
  if (res.code === codes.success) {
    console.log(res);
    let allmessage = res.data;
    let allmess = '';
    for (let i = allmessage.length; i > 0; i-- ) {
      const msg = res.data[i - 1];
      allmess += rendermsgTemplate(msg);
    }
    document.getElementById('message').innerHTML = allmess;
    return;
  }
  console.log('error', res);
});

let addBtn = document.getElementById('open');
addBtn.addEventListener('click', function (ev) {
  const user = localStorage.getItem('wx_user');
  if (user == null) {
    mui.alert('你没有登录!');
    return;
  }
  addNew();
  let addMes = document.getElementById('addMes');
  addMes.addEventListener('click', addMessage);
});


function addNew() {
  layer.open({
    type: 1
    , content: `
        <header class="mui-bar mui-bar-nav"><h1 class="mui-title">留言</h1></header>
            <br><br><div class="mui-input-row" style="margin-top: 10px">  
            <textarea id="textarea" rows="5" maxlength="50"  placeholder="我想说的话..." name="content" ></textarea>
           </div>
            <div style="text-align:center;">
            <button type="submit" id="addMes" class="mui-btn mui-btn-primary" >确认</button>&nbsp;&nbsp;&nbsp;&nbsp;
           <button type="button" class="mui-btn mui-btn-danger" onclick="layer.closeAll()">取消</button></div>' `
    , anim: 'up'
    , style: 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
  });
}

function addMessage() {
  let textarea = document.getElementById('textarea');
  let message = textarea.value;
  if (message.length < 5) {
    layer.closeAll();
    mui.alert('留言不能低于5个字符！');
    return;
  }
  addMemos(message).then((data) => {
    if (data.code === codes.success) {
      layer.closeAll();
      mui.alert('留言成功！', '森思书屋', function () {
        location.reload(); 
      });
      return;
    } else {
      console.log('error', data);
    }
  });
}
