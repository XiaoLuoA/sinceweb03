// public 样式 放在这里是为避免重复引用和版本更新
import 'antd/dist/antd.css';
import './index.less';
import umbrella from 'umbrella-storage';
import message from 'antd/lib/message';
import { getBooks } from '~/ajax/book';
import { debug1 } from '~/util/debug';
import { get } from '~/ajax/ajax_axios';
import { toIndex } from '~/util/jumpTo';
import codes from '~/config/codeConfig';
debug1('hello');
getBooks().then((data) => {
    if (data.code === codes.success) {
        message.success('请求成功');
        // alert(data);
        showData(data);
        console.log(data);
        return;
    } else if (data.code === codes.BOOK_NOT_FIND) {
        mui.alert('森思书屋已打烊！');
    } else {
        console.log('error', data);
    }
}).finally(() => {});
function showData(data) {
    let HTM = '';
    for (let i in data.data) {
        if (data.data[i].bookstatus == 1) {
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
    document.getElementById('book').innerHTML = HTM;
}