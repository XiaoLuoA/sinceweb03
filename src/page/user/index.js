import './index.less'
import codes from "~/config/codeConfig"
import {getUser} from "~/ajax/user";
import message from 'antd/lib/message';
import {getBooks} from "~/ajax/book";

getUser('123').then((data) => {
    if (data.code === codes.success){
        message.success('请求成功');
        console.log(data);
        return ;
    }else {
        console.log("error", data);
    }
});


getBooks().then((data) => {
  if (data.code === codes.success){
    message.success('请求成功');
    console.log(data);
    return ;
  }else {
    console.log("error", data);
  }
});


