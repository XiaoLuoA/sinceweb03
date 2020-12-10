const selectEle = document.getElementById('selectEle');
let flag = true;
selectEle.addEventListener('click', submitSelect);
function submitSelect() {
  if (flag) {
    flag = false;
    selectEle.setAttribute('class', 'ui-btn-lg ui-btn-primary');
    selectEle.innerHTML = '提交修改';
    const dayEle = document.getElementById('days');
    dayEle.setAttribute('style', '');
    const statusEle = document.getElementById('status');
    statusEle.setAttribute('style', '');
  } else {
    falert('修改成功');
  }
}
function falert(data) {
  setTimeout(function () {
    document.getElementById('falert').innerHTML = data || '执行成功';
    document.getElementById('alert').setAttribute('class', 'ui-dialog show')
  }, 200);
  
}
function fclose() {
  setTimeout(function () {
    document.getElementById('alert').setAttribute('class', 'ui-dialog');
  }, 200); 
}
