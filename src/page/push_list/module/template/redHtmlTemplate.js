export default (pushItem) =>
  `<ul class="mui-table-view">
    <li class="mui-table-view-cell mui-collapse">
      <a class="mui-navigate-right" >
        <button class="mui-pull-right mui-btn-red" data-no="${pushItem.no}"  id="inerEvent" style="float:right">
          发货
        </button>
        <img
          class="mui-media-object mui-pull-left imgBorder"
          src="https://sincelibrary.oss-cn-shanghai.aliyuncs.com/since2.0/Image/books/${pushItem.bookImage}">
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
          订单号：${pushItem.no}<br>
          微信昵称: ${pushItem.wxName}<br>
          地址：${pushItem.address}<br>
          电话：<a href="tel:${pushItem.phone}">${pushItem.phone}
          </p>
        </li>
      </ul>
    </li>
  </ul>`;
