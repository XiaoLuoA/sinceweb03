import './index.less';
import codes from '~/config/codeConfig';
import { getMemos, addMemos } from '~/ajax/memos';

import rendermsgTemplate from './module/template/msgTemplate';

import '~/module/initFooter';

getMemos().then((res) => {
  let allmessage = '';
  for (let i in res.data) {
    const msg = res.data[i];
    allmessage = rendermsgTemplate(msg);
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
  let textarea = document.getElementById('textarea');
  let message = textarea.value;
  let wx_name = '永存的大大咧咧';
  let wx_image = 'https://img03.sogoucdn.com/app/a/100200009/b3e8ffe1-0633-4b4f-98ce-fe4e4e8ea625.jpg'
  let wx_address = '河南郑州';
  let opeAn_id = 'dwddasjadsahjdhsajda';
  addMemos(wx_name, wx_image, wx_address, opeAn_id, message).then((data) => {
    if (data.code === codes.success) {
      layer.closeAll();
      mui.alert('留言成功！', '森思书屋', location.reload );
      return;
    } else {
      console.log('error', data);
    }

  });

}
