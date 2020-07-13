export default (pushItem) =>
`<ul class="mui-table-view mui-table-view-chevron">
  <li class="mui-table-view-cell mui-collapse">
  <a href="javascript:;" class="mui-navigate-right" >
    <img 
      class="mui-media-object mui-pull-left imgBorder"
      src="https://img03.sogoucdn.com/app/a/100200009/b3e8ffe1-0633-4b4f-98ce-fe4e4e8ea625.jpg">
    <div class="mui-media-body">
      <b>${pushList[i].bookName}</b>
      <span
        class="mui-icon mui-icon-download mui-pull-right mui-badge-green"
        style="font-size: 12px;padding: 5px;"
      >
      已完成
      </span>
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
</ul>`;
