const host = 'http://localhost:8081//';

export const toIndex = () => {
  window.location.href = host + 'page/wx_index/index.html';
};
export const toMemos = () => {
  window.location.href = host + 'page/wx_memos/index.html';
};
export const toUser = () => {
  window.location.href = host + 'page/wx_user/index.html';
};
