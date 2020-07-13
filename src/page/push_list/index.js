import codes from '~/config/codeConfig';
import { getAllPushList } from '~/ajax/push_list';

import renderRedHtml from './module/template/redHtmlTemplate';
import renderGreenHtml from './module/template/greenHtmlTemplate';

import './index.less';

// const user = 'gdsflkghsdfoihgiosdfgdfgnghkm';
// import {getUser} from '~/ajax/user';

getAllPushList().then((data) => {
  if (data.code === codes.success){
    showAllPushList(data);
    return ;
  }
  console.log('error', data);
});
function showAllPushList(data){
  let htm = '';
  let htmlred = '';
  let htmlgreen = '';
  const pushList = data.data;
  for (let i in data.data) {
    const pushItem = pushList[i];
    if (pushItem.status == 0) {
      htmlred += renderRedHtml(pushItem);
    } else {
      htmlgreen += renderGreenHtml(pushItem)
  }

  }
  htm = htmlred + htmlgreen;
  document.getElementById('mui-content').innerHTML = htm;
}
  // getUser('123').then((data) => {
  //   if (data.code === codes.success){
  //     message.success('请求成功');
  //     showData(data);
  //     console.log(data);
  //     return ;
  //   }else {
  //     console.log('error', data);
  //   }
  // });
   
  
  // function showData(_data){
  //   let htm;
  //   htm=`
  //   <img class="mui-media-object mui-pull-left head-img" id="head-img" src="${_data.data.wxImage}">
  //                   <div class="mui-media-body">
  //                     <p id="wxName">${_data.data.wxName}<p>
  //                     <p id="wxAddress"class='mui-ellipsis'>${_data.data.wxAddress}</p>
  //                   </div>
  //   `
  //   document.getElementById("user_infor").innerHTML= htm;
  
  // }
