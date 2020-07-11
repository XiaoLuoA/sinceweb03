// public 样式 放在这里是为避免重复引用和版本更新
import 'antd/dist/antd.css';


import './index.less';
import umbrella from 'umbrella-storage';
import message from 'antd/lib/message';
import { getBooks } from '~/ajax/book';
import { debug1 } from '~/util/debug';
import { get } from '~/ajax/ajax_axios';
debug1('hello');
umbrella.setLocalStorage('app', { appId: '123' });
console.log('这是页面index heelo world');
console.log('从stroage中取出的内容', umbrella.getLocalStorage('app'));

message.success('假装这是一个持续的loading');


getBooks().then((data) => {
    if (data.code === "0"){
        message.success('请求成功');
        //alert(data);
        showData(data);
        console.log(data);
        return ;
    }else if(data.code=="404"){
        console.log(errMsg);
    }else{
        console.log("error!!!!!!!!!!!!!");
        message.error('大概是用户的错吧');
    }
}).finally(() => {
    message.success('假装这是请求结束 loading消失');
});
function showData(data){
    let HTM = "";
    
//     bookads: 1
// bookclick: 12
// bookcount: 1
// bookimage1: "103312621.jpg"
// bookimage2: "103312622.jpg"
// bookimage3: "103312623.jpg"
// bookname: "四级词汇"
// booknumb: 10331262
// bookprice: 5
// bookpricing: 20
// bookpurprice: 2
// bookstatus: 2
// booktime: "1529759206269"
// bookuse: "七成"
// bookwriter: "俞敏洪"
// bookzan: 0
    for(let i in data.data){
       if(data.data[i].bookstatus == 1){

       
        HTM = HTM +
            `<div class="mui-col-xs-6 mui-pull-left">
                 <div class="mui-card" >
                <div class="mui-card-header mui-card-media" style="height:45vw;width:45vw;background-image:url(https://sincelibrary.oss-cn-shanghai.aliyuncs.com/since2.0/Image/books/${data.data[i].bookimage1})">
                </div>
                <div class="mui-card-content" >
                    <p class="mui-ellipsis" style="color:#333; margin:8px;font-size:11px;"><b>${data.data[i].bookname}</b><br>${data.data[i].bookuse}新 | 开学送</p>
                    <p style="color:red; margin:6px;font-size:16px;">
                    ￥${data.data[i].bookprice} 
                    <small  style="color:#999; font-size:6px;"> ${data.data[i].bookclick}人购买</small>
                    
                    <input class="mui-pull-right" type="submit" value="" style="background-repeat:no-repeat ;background-size:100% 100%;background-image:url(https://sincelibrary.oss-cn-shanghai.aliyuncs.com/%E8%B4%AD%E4%B9%B0.png);background-color:rgba(0,0,0,0);border:0px solid red;width:5vw;height:5vw; "/>
                             </p>
                 </div>
                 </div>
            </div>`
        }
    }
    document.getElementById("book").innerHTML = HTM;
  
}

