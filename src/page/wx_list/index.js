import './index.less'
import codes from '~/config/codeConfig'
import {getUser} from '~/ajax/user';
import {getWXList} from '~/ajax/wxlist';
import message from 'antd/lib/message';


const user = 'gdsflkghsdfoihgiosdfgdfgnghkm';

getWXList(user).then((data) => {
    if (data.code === codes.success){
        message.success('请求成功');
        showUserList(data);
        console.log(data);
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
    const wxList ='';
    for(let i in data.data){
    wxList=data.data[i]
    htm= htm+`
    <div class="mui-card">
    <div class="mui-card-content">
    <div class="">
    <ul class="mui-table-view" style="background-color:rgb(162, 162, 204,0.2);">
    <li class="mui-table-view-cell mui-media">
        <a href="javascript:;" class="">
            <img class="mui-media-object mui-pull-left imgBorder" src="https://img03.sogoucdn.com/app/a/100200009/b3e8ffe1-0633-4b4f-98ce-fe4e4e8ea625.jpg">
            <!--http://www.sinceweb.xin/Image/books/${wxList.bookImage}-->
            <div class="mui-media-body">
                <b>${wxList.bookName}</b> <span class=" mui-icon mui-icon-upload mui-pull-right mui-badge-red" style="font-size: 12px;padding: 5px;">待配送</span>
                <br>
                <small>购买数量：${wxList.bookNum}</small><br>
                <small>图书价格：${wxList.bookPrice}元</small>
                <br><br>
                已支付：<b style="color:red; font-size:18px;">￥${wxList.total} </b>
            </div>
        </a>
    </li>
    </ul>
        </div>
</div>
</div>                            
    `
    }
    document.getElementById('muiDoctorCard').innerHTML= htm;

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
