import './index.less'
import  codes  from '~/config/codeConfig';
import { getUser } from '~/ajax/user';
import { getBook } from '~/ajax/book';

function GetRequest() {
  let url = location.search; //获取url中”?”符后的字串
  let theRequest = new Object();
  if (url.indexOf('?') != -1) {
     let str = url.substr(1);
     let strs = str.split('&');
     for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split('=')[0]]=unescape(strs[i].split('=')[1]);
     }
  }
  return theRequest;
}

var Request = new Object();
Request = GetRequest();

console.log(Request['booknumb']);

getBook(Request['booknumb']).then((data) => {
  if (data.code === codes.success){
      console.log(data);
      showData(data);
      return ;
  } else {
      console.log('error', data);
  }
});
// bookads: 0
// bookclick: 2
// bookcount: 1
// bookimage1: "191544441.jpg"
// bookimage2: "191544442.null"
// bookimage3: "191544443.null"
// bookname: "java实战开发"
// booknumb: 19154444
// bookprice: 10
// bookpricing: 30
// bookpurprice: 5
// bookstatus: 1
// booktime: "1561023279057"
// bookuse: "八成"
// bookwriter: "名师讲坛"
// bookzan: 0
function showData(data){
  let content = document.getElementById('bookContent');
  const book = data.data;
  content.innerHTML = `
  <li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left"  style="min-width:20vw;height:20vw; " src="https://sincelibrary.oss-cn-shanghai.aliyuncs.com/since2.0/Image/books/${book.bookimage1}">
						<div class="mui-media-body">
							${book.bookname}
							<p class='mui-ellipsis'>使用程度:${book.bookuse}新</p>
							<p class='mui-ellipsis'>价格:<span id="price">${book.bookprice}</span>元</p>
							<p style="color:red; font-size:20px;" class="mui-pull-right"><small>￥</small><span id="total">${book.bookprice}</span> </p>
						</div>
					</a>
				</li>`
}

function changeInput(){
  let tel = document.getElementById('tel').value;
  if(tel.length > 10){
    //document.form.submit();
  } else{
    mui.alert('请正确填写电话');
  }
}

let payBtn = document.getElementById('payBtn');

payBtn.addEventListener('click', changeInput);

let click = 1;
const addBtn = document.getElementById('addNum');
const delBtn = document.getElementById('delNum');

addBtn.addEventListener('click',function(){
  click++;
  let price = document.getElementById('price');
  let count = mui('#count').numbox().getValue();
  let total = document.getElementById('total');
  total.innerText = price.innerText * count;
  console.log(click);
});

delBtn.addEventListener('click',function(){
  click--;
  let price = document.getElementById('price');
  let count = mui('#count').numbox().getValue();
  let total = document.getElementById('total');
  total.innerText = price.innerText * count;
  console.log(click);
});



