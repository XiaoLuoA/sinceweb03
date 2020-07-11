const proxy = {
  // '/user': {
  //   target:"http://localhost:8080",
  //   changeOrigin: true,
  // } 
};

// 直接注释掉代理就不生效了
module.exports = { ...proxy };