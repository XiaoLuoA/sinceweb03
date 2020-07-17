import codes from '~/config/codeConfig';
import { getAllPushList } from '~/ajax/push_list';
import { sendWxList } from '~/ajax/push_list';
import { delegate } from '~/util/elemnet';
import renderRedHtml from './module/template/redHtmlTemplate';
import renderGreenHtml from './module/template/greenHtmlTemplate';

import './index.less';

// const user = 'gdsflkghsdfoihgiosdfgdfgnghkm';
// import {getUser} from '~/ajax/user';

getAllPushList().then((data) => {
  if (data.code === codes.success) {
    showAllPushList(data);
  } else {
    console.log('error', data);
    return;
  }
});

function showAllPushList(data) {
  let htm = '';
  let htmlred = '';
  let htmlgreen = '';
  const pushList = data.data;
  for (let i in data.data) {
    const pushItem = pushList[i];
    if (pushItem.status == 2) {
      htmlred += renderRedHtml(pushItem);
    } else {
      htmlgreen += renderGreenHtml(pushItem)
  }
  }
  htm = htmlred + htmlgreen;
  document.getElementById('mui-content').innerHTML = htm;
}


const attachEvent = document.getElementById('mui-content');
delegate(attachEvent, '#inerEvent', 'click', send, false);

function send(e) {
  console.log(e.delegateTarget);
  let no = e.delegateTarget.dataset.no;
  if (no == undefined ) {
    console.log('error');
    return;
  } else {
  console.log(no);
  sendWxList(no).then((data) => {
    if (data.code == 0) {
      location.reload();
    }
  }
 );
  }
}
