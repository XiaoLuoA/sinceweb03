import codes from '~/config/codeConfig';
import {getAllPushList} from '~/ajax/push_list';
import './index.less';


//const user = 'gdsflkghsdfoihgiosdfgdfgnghkm';
//import {getUser} from '~/ajax/user';

getAllPushList().then((data) => {
    if (data.code === codes.success){
        showAllPushList(data);
        return ;
    }
    else {
        console.log('error', data);
    }
});
function showAllPushList(data){
    let htm='';
    let htmlred='';
    let htmlgreen='';
    const pushList=data.data;
    for(let i in data.data){
        if(pushList[i].status==0){
            htmlred= htmlred+
            `
            <ul class="mui-table-view mui-table-view-chevron">
                <li class="mui-table-view-cell mui-collapse">
                <a class="mui-navigate-right" >
                <button class="mui-pull-right mui-btn-red" style="float:right">
                  发货
                </button>
                    <img class="mui-media-object mui-pull-left imgBorder"
                    src="https://img03.sogoucdn.com/app/a/100200009/b3e8ffe1-0633-4b4f-98ce-fe4e4e8ea625.jpg">
                    <div class="mui-media-body">
                    <b>${pushList[i].bookName}</b>
                    <br>
                    <small>购买数量：${pushList[i].bookNum}</small><br>
                    <small>图书价格：${pushList[i].bookPrice}元</small>
                    <br>
                    <small>电话：</small>${pushList[i].phone}
                    <br>
                    <small>地址：${pushList[i].address}</small>
                    </div>
                </a>
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell">
                    <p class="" >
                        订单号：${pushList[i].no}
                    </p>
                    </li>
                </ul>
                </li>
            </ul>                         
        `
        }
    else{
           
        htmlgreen= htmlgreen+`
        <ul class="mui-table-view mui-table-view-chevron">
                <li class="mui-table-view-cell mui-collapse">
                <a href="javascript:;" class="mui-navigate-right" >
                    <img class="mui-media-object mui-pull-left imgBorder"
                    src="https://img03.sogoucdn.com/app/a/100200009/b3e8ffe1-0633-4b4f-98ce-fe4e4e8ea625.jpg">
                    <div class="mui-media-body">
                    <b>${pushList[i].bookName}</b> <span class=" mui-icon mui-icon-download mui-pull-right mui-badge-green"
                    style="font-size: 12px;padding: 5px;">已完成</span>
                    <br>
                    <small>购买数量：${pushList[i].bookNum}</small><br>
                    <small>图书价格：${pushList[i].bookPrice}元</small>
                    <br>
                    <small>电话：</small>${pushList[i].phone}
                    <br>
                    <small>地址：${pushList[i].address}</small>
                    </div>
                </a>
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell">
                    <p class="" >
                        订单号：${pushList[i].no}
                    </p>
                    </li>
                </ul>
                </li>
            </ul>
        `
    }
   
    }
    htm=htmlred+htmlgreen;
    document.getElementById('mui-content').innerHTML = htm;
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
