import './index.less';
import codes from '~/config/codeConfig';
import { getWXList } from '~/ajax/wxlist';
import renderWxTemplate from './module/template/wxTemplate'; 

const wx_user = localStorage.getItem('wx_user');
let user = JSON.parse(wx_user);
const wx_openId = user.openId;
console.log(wx_openId);
if(wx_openId.length<10)
{
  toError();
}

getWXList(wx_openId).then((data) => {
    if (data.code === codes.success){
        console.log(data);
        showUserList(data);
        return ;
    }else if(data.code === codes.LIST_OPENID_NOT_FOUND){
        console.log('查找为空');
    }
    else {
        console.log('error', data);
    }
});
function showUserList(data){
    let htm = '';
    const wxList = data.data;
    for (let i in wxList) {
        const wxItem = wxList[i];
        htm += renderWxTemplate(wxItem);
    }
    document.getElementById('muiDoctorCard').innerHTML = htm;
    }
    // getUser('123').then((data) => {
    //     if (data.code === codes.success){
    //         message.success('请求成功');
    //         showData(data);
    //         console.log(data);
    //         return ;
    //     }else {
    //         console.log('error', data);
    //     }
    // });
   
    
    // function showData(_data){
    //     let htm;
    //     htm=`
    //     <img class="mui-media-object mui-pull-left head-img" id="head-img" src="${_data.data.wxImage}">
    //                                     <div class="mui-media-body">
    //                                         <p id="wxName">${_data.data.wxName}<p>
    //                                         <p id="wxAddress"class='mui-ellipsis'>${_data.data.wxAddress}</p>
    //                                     </div>
    //     `
    //     document.getElementById("user_infor").innerHTML= htm;
    
    // }
