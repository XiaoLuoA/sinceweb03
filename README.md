### 10

本教程使用了 debug   开发环境下设置  localStorage.debug = 'worker:*'

使用了 umbrella-storage 请勿直接使用webStorage API

### 11

改进访问路径

webpack config 中新增reslove.alias  同时修改 /jsconfig.json 文件来支持vscode的自动提示

### 12

独立出多页面页面自动化配置

页面变更只需要在./config/pageConfig中做出响应更改即可


### 13

./src下创建了ajax文件夹 统一管理ajax请求，向外暴露出语义化命名的函数