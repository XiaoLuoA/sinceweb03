
export default (book) => 
  `<div class="mui-col-xs-6 mui-pull-left">
    <div class="mui-card">
      <div 
        class="mui-card-header mui-card-media" 
        style="height:45vw;width:45vw;background-image:url(https://sincelibrary.oss-cn-shanghai.aliyuncs.com/since2.0/Image/books/${book.bookimage1})"
      >
      </div>
      <div class="mui-card-content" >
        <p class="mui-ellipsis" style="color:#333; margin:8px;font-size:11px;"><b>${book.bookname}</b><br>${book.bookuse}新 | 开学送</p>
        <p style="color:red; margin:6px;font-size:16px;">
          ￥${book.bookprice} 
          <small style="color:#999; font-size:6px;"> ${book.bookclick}人购买</small>
          <input
            class="mui-pull-right buy_btn" type="submit" 
            value="${book.booknumb}" 
            onclick="addbuy(this.value)" 
            style="background-repeat:no-repeat ;background-size:100% 100%;background-image:url(https://sincelibrary.oss-cn-shanghai.aliyuncs.com/%E8%B4%AD%E4%B9%B0.png);background-color:rgba(0,0,0,0);border:0px solid red;width:5vw;height:5vw;"
          />
        </p>
      </div>
    </div>
  </div>`;
