/**
 * 0 关闭 
 * 2 waring
 * 2 error
 */


module.exports = {
  parserOptions: {
    'ecmaVersion': 7,
    'sourceType': 'module'
  },
  rules: {
    // 自定义的规则
    quotes: [2, 'single'], // 单引号
    // 'no-console': 0,
    'no-unreachable': 1, // 禁止不可达代码
    'no-multiple-empty-lines': 1, // 最多2连续空行
    'eol-last': 1, // 文件必须以空行结束
    'no-var': 1, // 不允许使用var
    'no-tabs': 1, // 不允许使用tab
    
    'rest-spread-spacing': [1, 'never'], // 扩展符前无空格
    'no-multi-spaces': 1, // 禁止多个空格
    'comma-spacing': [1, { before: false, after: true }], // 逗号后的空格

    'spaced-comment': 1, // 注释的空格
    'space-unary-ops': 1, // 一元操作符边的空格
    'space-infix-ops': 1, // 操作符的空格
  }
};
