const host = 'http://wxtest.easy.echosite.cn/';

export const indexUrl = host + 'page/wx_index/index.html';
export const toIndex = () => {
  window.location.href = IndexUrl;
};

export const memosUrl = host + 'page/wx_memos/index.html';
export const toMemos = () => {
  window.location.href = memosUrl;
};

export const userUrl = host + 'page/wx_user/index.html';
export const toUser = () => {
  window.location.href = userUrl;
};

export const buyUrl = host + 'page/wx_buy/index.html';
export const toBuy = (booknumb) => {
  window.location.href = buyUrl + '?booknumb=' + booknumb;
};
