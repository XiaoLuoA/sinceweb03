import './index.less'
import { codes }from '~/config/codeConfig'
import { getUser } from '~/ajax/user';
import { getBooks } from '~/ajax/book';
getUser('123').then((data) => {
  if (data.code === codes.success){
      return ;
  } else {
      console.log('error', data);
  }
});
getBooks().then((data) => {
  if (data.code === codes.success){
    return ;
  }else {
    console.log('error', data);
  }
});
function changInput(isPay){
  let tel = document.getElementById('tel').value;
  if(tel.length > 10){
    document.form.submit();
  } else{
    mui.alert('请正确填写电话');
  }
}
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