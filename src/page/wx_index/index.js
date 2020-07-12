import { getBooks } from '~/ajax/book';
import { debug1 } from '~/util/debug';
import { get } from '~/ajax/ajax_axios';
import { toIndex, toMemos, toUser } from '~/util/jumpTo';
import codes from '~/config/codeConfig';
debug1('hello');
getBooks().then((data) => {
  if (data.code === codes.success) {
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
  let books = data.data;
  let countUtil = [];
  let j = 0;
  for (let i in books){
    if (books[i].bookstatus == 1) {
       countUtil[j] = i;
       j++;
    }
  }
  for (let i in countUtil){
    const l = countUtil.length
    let r = parseInt(Math.random() * l);
    let temple = countUtil[i];
    countUtil[i] = countUtil[r];
    countUtil[r] = temple;
  }
  for (let i in countUtil) {
      const num = countUtil[i];
    if (books[num].bookstatus == 1) {
      HTM = HTM +
        `<div class="mui-col-xs-6 mui-pull-left">
         <div class="mui-card" >
        <div class="mui-card-header mui-card-media" style="height:45vw;width:45vw;background-image:url(https://sincelibrary.oss-cn-shanghai.aliyuncs.com/since2.0/Image/books/${books[num].bookimage1})">
        </div>
        <div class="mui-card-content" >
          <p class="mui-ellipsis" style="color:#333; margin:8px;font-size:11px;"><b>${books[num].bookname}</b><br>${books[num].bookuse}新 | 开学送</p>
          <p style="color:red; margin:6px;font-size:16px;">
            ￥${books[num].bookprice} 
            <small  style="color:#999; font-size:6px;"> ${books[num].bookclick}人购买</small>
            <input class="mui-pull-right" type="submit" value="${books[num].booknumb}" onclick="addbuy(this.value)" style="background-repeat:no-repeat ;background-size:100% 100%;background-image:url(https://sincelibrary.oss-cn-shanghai.aliyuncs.com/%E8%B4%AD%E4%B9%B0.png);background-color:rgba(0,0,0,0);border:0px solid red;width:5vw;height:5vw; "/>
          </p>
         </div>
         </div>
      </div>`;
	  }

  }
  document.getElementById('book').innerHTML = HTM;
}
document.getElementById('index').addEventListener('click', toIndex)
document.getElementById('memos').addEventListener('click', toMemos);
document.getElementById('mine').addEventListener('click', toUser);
// TODO 事件委托 交给fjr
window.addbuy = function(booknumb){
	alert(booknumb);
}
