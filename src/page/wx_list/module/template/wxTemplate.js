export const itemIng = (wxItem) => {
    return `<div class="mui-card">
    <div class="mui-card-content">
      <div class="">
        <ul class="mui-table-view" style="background-color:rgb(162, 162, 204,0.2);">
          <li class="mui-table-view-cell mui-media">
            <a href="javascript:;" class="">
              <img class="mui-media-object mui-pull-left imgBorder" src="https://sincelibrary.oss-cn-shanghai.aliyuncs.com/since2.0/Image/books/${wxItem.bookImage}">
              <!--http://www.sinceweb.xin/Image/books/${wxItem.bookImage}-->
              <div class="mui-media-body">
                <b>${wxItem.bookName}</b> 
                <span class="mui-icon mui-icon-upload mui-pull-right mui-badge-red" style="font-size: 12px;padding: 5px;">待配送</span>
                <br>
                <small>购买数量：${wxItem.bookNum}</small><br>
                <small>图书价格：${wxItem.bookPrice}元</small>
                <br>
                <br>
                已支付：<b style="color:red; font-size:18px;">￥${wxItem.total} </b>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>`;
  };

export const itemOk = (wxItem) => {
 return `<div class="mui-card">
    <div class="mui-card-content">
      <div class="">
        <ul class="mui-table-view" style="background-color:rgb(162, 162, 204,0.2);">
          <li class="mui-table-view-cell mui-media">
            <a href="javascript:;" class="">
              <img class="mui-media-object mui-pull-left imgBorder" src="https://sincelibrary.oss-cn-shanghai.aliyuncs.com/since2.0/Image/books/${wxItem.bookImage}">
              <!--http://www.sinceweb.xin/Image/books/${wxItem.bookImage}-->
              <div class="mui-media-body">
                <b>${wxItem.bookName}</b> 
                <span class="mui-icon mui-icon-download mui-pull-right mui-badge-green" style="font-size: 12px;padding: 5px;">已完成</span>
                <br>
                <small>购买数量：${wxItem.bookNum}</small><br>
                <small>图书价格：${wxItem.bookPrice}元</small>
                <br>
                <br>
                已支付：<b style="color:red; font-size:18px;">￥${wxItem.total} </b>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>`;
}
