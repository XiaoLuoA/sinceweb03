import { getBooks, findBooksByName } from '~/ajax/book';
import { ajaxDebugger } from '~/util/debug';
import { delegate } from '~/util/elemnet';
import renderBookTemplate from './module/template/bookTemplate';
import codes from '~/config/codeConfig';
import '~/module/initFooter';
import { toBuy, toError } from '~/util/jumpTo';
import { wxLogin } from '~/ajax/user';

wxLogin().then((data) => {
  if (data.code === codes.success ) {
    const theUser = data.data;
    let objString = JSON.stringify(data.data);
    let user = localStorage.setItem('wx_user', objString);
    console.log(objString);
    let objNew = JSON.parse(user);
    console.log(objNew.nickname);
    const city = theUser.city;
    console.log(city);
    const province = theUser.province;
    const nickname = theUser.nickname;
    const headImgUrl = theUser.headImgUrl;
    const openId = theUser.openId;
  } else {
    toError();
  }
});

getBooks().then((data) => {
  if (data.code === codes.success) {
    renderBooks(data);
    console.log(data);
    return;
  } else if (data.code === codes.BOOK_NOT_FIND) {
    mui.alert('森思书屋已打烊！');
    return;
  }
  ajaxDebugger('error', data);
}).finally(() => {});

const bookListElement = document.getElementById('bookList');

function renderBooks(data) {
  let HTM = '';
  let books = data.data;
  const countUtil = [];
  let j = 0;
  for (let i in books) {
    if (books[i].bookstatus == 1) {
       countUtil[j] = i;
       j++;
    }
  }
  // 如果这个代码的目的是实现数组随机排序  建议封装为函数放入until
  for (let i in countUtil) {
    const l = countUtil.length
    let r = parseInt(Math.random() * l);
    let temple = countUtil[i];
    countUtil[i] = countUtil[r];
    countUtil[r] = temple;
  }
  for (let i in countUtil) {
    const num = countUtil[i];
    const book = books[num];
    if (book.bookstatus == 1) {
      HTM += renderBookTemplate(book);
    }
  }
  bookListElement.innerHTML = HTM;
}

// TODO 事件委托 交给fjr
// window.addbuy = function(booknumb) {
//   const value = event.delegateTarget.value;
//   alert(value);
// }

function addBuy(event) {
  const booknumb = event.delegateTarget.dataset.booknumb;
  console.log(booknumb);
  localStorage.setItem('booknumb', booknumb);
  toBuy();
}
const search = document.getElementById('search');
search.addEventListener('keydown', function (e) {
  const searchName = search.value;
  if (e.keyCode == 13) {
    console.log(searchName);
    
    findBooksByName(searchName).then((data) => {
      if (data.code === codes.success) {
        renderBooks(data);
        console.log(data);
        return;
      } else if (data.code === codes.BOOK_NOT_FIND) {
        mui.alert('搜索为空');
        return;
      }
      ajaxDebugger('error', data);
    }).finally(() => {});
  }
});
delegate(bookListElement, 'input.buy_btn', 'click', addBuy, false);

/**
 * 这是一个事件委托的样例
 */

// <div id="hello1">
// hello
// <div id="hello2">
//   world
//   <div id="hello3">
//     dk
//   </div>
// </div>
// </div>

// const aa = document.getElementById('hello1');
// delegate(aa, '#hello2', 'click', function(event) {
//   // 在这个函数中调用this 是委托的dom
//   // 要想找到点击的目标对象， 请使用event.delegateTarget
//   console.log(this, event.delegateTarget, '委托');
// }, false);
