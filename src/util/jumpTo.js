const host = 'http://localhost:8081//';

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
