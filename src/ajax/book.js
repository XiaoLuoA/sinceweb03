import { get } from '~/ajax/ajax_axios';
import { host } from '~/ajax/config';
export const getBooks = () => {
  return get(host + '/book/findAll', {});
}
export const getBook = (id) => {
  return get(host + '/book/findBookById', { id });
}
export const buyBook = (bookNumb) => {
  return get(host + '/book/addClick', { bookNumb });
}
export const findBooksByName = (bookName) => {
  return get(host + '/book/findAllByBookName', { bookName });
}
