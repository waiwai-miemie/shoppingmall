module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗宽度，对应的是设计稿的宽度
      viewportHeight: 667, // 视窗高度，对应设计稿高度
      unitPrecision: 5, // 指定转化后保留的小数位数
      viewportUnit: 'vw', // 指定需要转化成的视窗单位，建议使用vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],
      // 指定不需要转化的类，它会去找包含tab-bar的类名，实际上是按正则表达式的方法查找的
      // 注意：这里排除的只是当前类名下的有px单位的设置，依然会改变当前类名下的子类名中设置的css样式的px单位
      minPixelValue: 1, // 小于或等于1px不用转化成视窗单位
      mediaQuery: false, // 不允许在媒体查询中转化px
      // exclude: [/TabBar/] // 排除包含TarBar的文件，不转化单位
    }
  }
}
