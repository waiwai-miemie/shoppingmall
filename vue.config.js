// cli3及以上版本隐藏了配置信息，所以要修改的配置信息的时候新建一个文件vue.config.js，会自动合并到隐藏的配置信息当中
module.exports = {
  configureWebpack: {
    resolve: {
      // extensions:[] 设置扩展名，导入文件的时候可以省略不写，默认已经设置了js、json、vue
      // 配置别名，默认已经配置了src=@
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}