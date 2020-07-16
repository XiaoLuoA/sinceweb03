// 初始化底部边栏
import {
  indexUrl,
  memosUrl,
  userUrl,
} from '~/util/jumpTo';


// 固定元素直接跳转应该靠html实现

const links = [
  ['index', indexUrl],
  ['memos', memosUrl],
  ['mine', userUrl],
];
for (let link of links) {
  try {
    const [id, linkUrl] = link;
    // document.getElementById(id).onclick = jumpFun;
    document.getElementById(id).querySelector('a').setAttribute('href', linkUrl);
  } catch (e) {
    setTimeout(() => { throw e; }, 0);
  }
}
