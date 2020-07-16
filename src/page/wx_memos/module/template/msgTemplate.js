export default (msg) => {
  let {
    wx_image,
    wx_name,
    message,
    wx_address,
    message_time,
  } = msg;

  return (
    `<div class="mui-card">
      <div class="mui-card-header mui-card-media">
        <img src="${wx_image}" />
        <div class="mui-media-body">
          <p>${wx_name}</p>
          <b>${message}</b>
          <p>${message_time}</p>
          <p>&nbsp;<span class="mui-icon mui-icon-location mui-pull-right" style="font-size: 15px;">${wx_address}</span><span class=""></span></p>
        </div>
      </div>
    </div>`
    );
};
