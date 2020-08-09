export default (msg) => {
  let {
    wxImage,
    wxName,
    message,
    wxAddress,
    messageTime,
  } = msg;

  return (
    `<div class="mui-card">
      <div class="mui-card-header mui-card-media">
        <img src="${wxImage}" />
          <div class="mui-media-body">
            <b>${wxName}</b>
            <p>发表于 ${messageTime}</p>
          </div>
        </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">${message}</div>
      </div>
      <div class="mui-card-footer">
        <span class="mui-pull-left" style="font-size: 15px;color:red"></span>
        <span class="mui-icon mui-icon-location mui-pull-right" style="font-size: 15px;">${wxAddress}</span>
      </div>
    </div>`
    );
};
