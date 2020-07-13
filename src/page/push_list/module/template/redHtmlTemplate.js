export default (pushItem) =>
  `<ul class="mui-table-view mui-table-view-chevron">
    <li class="mui-table-view-cell mui-collapse">
      <a class="mui-navigate-right" >
        <button class="mui-pull-right mui-btn-red" style="float:right">
          发货
        </button>
        <img
          class="mui-media-object mui-pull-left imgBorder"
          src="https://img03.sogoucdn.com/app/a/100200009/b3e8ffe1-0633-4b4f-98ce-fe4e4e8ea625.jpg">
        <div class="mui-media-body">
          <b>${pushItem.bookName}</b>
          <br>
          <small>购买数量：${pushItem.bookNum}</small><br>
          <small>图书价格：${pushItem.bookPrice}元</small>
          <br>
          <small>电话：</small>${pushItem.phone}
          <br>
          <small>地址：${pushItem.address}</small>
        </div>
      </a>
      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell">
          <p class="" >
          订单号：${pushItem.no}
          </p>
        </li>
      </ul>
    </li>
  </ul>`;
