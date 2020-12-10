
import { host } from '~/ajax/config';
export const indexUrl = host + '/to/index';
export const toIndex = () => {
  window.location.href = IndexUrl;
};

export const memosUrl = host + '/to/memos';
export const toMemos = () => {
  window.location.href = memosUrl;
};

export const userUrl = host + '/to/user';
export const toUser = () => {
  window.location.href = userUrl;
};


export const buyUrl = host + '/to/buy';
export const toBuy = () => {
  window.location.href = buyUrl;
};

export const errorUrl = host + '/to/error';
export const toError = () => {
  window.location.href = errorUrl;
};

export const aboutUrl = host + '/to/about';
export const toAbout = () => {
  window.location.href = aboutUrl;
};

export const attentionUrl = host + '/to/attention';
export const toAttention = () => {
  window.location.href = attentionUrl;
};

export const cooperationUrl = host + '/to/cooperation';
export const toCooperation = () => {
  window.location.href = cooperationUrl;
};

export const reportUrl = host + '/to/report';
export const toReport = () => {
  window.location.href = reportUrl;
};

export const reportLoginUrl = host + '/to/reportLogin';
export const toReportLogin = () => {
  window.location.href = reportLoginUrl;
};
