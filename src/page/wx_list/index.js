import './index.less';
import codes from '~/config/codeConfig';
import {getUser} from '~/ajax/user';
import {getWXList} from '~/ajax/wxlist';
const user = 'gdsflkghsdfoihgiosdfgdfgnghkm';

getWXList(user).then((data) => {
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
    let htm='';
	const wxList=data.data;
	let vxListStatus='待配送';
	let vxListStatusIcon='mui-icon-upload';
	let vxListStatusColor='mui-badge-red';
    for(let i in data.data){
     	if(wxList[i].status==1){
			 vxListStatus='已送达'
			 vxListStatusIcon='mui-icon-download'
			 vxListStatusColor='mui-badge-green'
		 }
        
    htm= htm+`
    <div class="mui-card">
    <div class="mui-card-content">
    <div class="">
    <ul class="mui-table-view" style="background-color:rgb(162, 162, 204,0.2);">
    <li class="mui-table-view-cell mui-media">
        <a href="javascript:;" class="">
            <img class="mui-media-object mui-pull-left imgBorder" src="https://img03.sogoucdn.com/app/a/100200009/b3e8ffe1-0633-4b4f-98ce-fe4e4e8ea625.jpg">
            <!--http://www.sinceweb.xin/Image/books/${wxList[i].bookImage}-->
            <div class="mui-media-body">
                <b>${wxList[i].bookName}</b> <span class=" mui-icon ${vxListStatusIcon} mui-pull-right ${vxListStatusColor}" style="font-size: 12px;padding: 5px;">${vxListStatus}</span>
                <br>
                <small>购买数量：${wxList[i].bookNum}</small><br>
                <small>图书价格：${wxList[i].bookPrice}元</small>
                <br><br>
                已支付：<b style="color:red; font-size:18px;">￥${wxList[i].total} </b>
            </div>
        </a>
    </li>
    </ul>
        </div>
</div>
</div>                            
    `
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
