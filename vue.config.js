const path = require('path')
// const fs = require('fs')
module.exports = {
  /**
   * @publicPath 项目部署到服务器上的相对路径
   * @default /
   */
  publicPath: process.env.NODE_ENV === 'production'
    ? '/ctb-trade/'
    : '/',
  /**
   * @outputDir build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
   * @default dist
   */
  // outputDir: 'dist',
  /**
   * @assetsDir build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
   * @default /
   */
  assetsDir: 'static',
  /**
   * @indexPath 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
   * @default index.html
   */
  // indexPath: 'index.html',
  /**
   * @filenameHashing 默认在生成的静态资源文件名中包含hash以控制缓存
   * @default true
   */
  // filenameHashing: true,
  /**
   * @pages 默认在生成的静态资源文件名中包含hash以控制缓存
   * @default undefined
   */
  pages: {
    index: {
      // page 的入口
      entry: 'src/views/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    // 当使用只有入口的字符串格式时，模板会被推导为 `public/subpage.html`，并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js',
  },
  /**
   * @lintOnSave 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
   * @default true
   */
  lintOnSave: process.env.NODE_ENV !== 'production',
  /**
   * @runtimeCompiler 是否使用包含运行时编译器的 Vue 构建版本
   * @default false
   */
  // 是否使用包含运行时编译器的 Vue 构建版本
  // runtimeCompiler: false,
  /**
   * @transpileDependencies Babel 显式转译列表
   * @default []
   */
  // transpileDependencies: [],
  /**
   * @productionSourceMap 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
   * @default true
   */
  productionSourceMap: false,
  /**
   * @productionSourceMap 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
   * @default undefined
   */
  // crossorigin: '',
  /**
   * @integrity 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
   * @default false
   */
  // 
  // integrity: false,
  /**
   * @configureWebpack 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
   * @default undefined
   * @type @Object | @Function
   */
  configureWebpack: {},
  /**
   * @chainWebpack 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
   * @default undefined
   * @type @Function
   */
  chainWebpack: () => {
  },
  /**
   * @css css的处理
   */
  css: {
    // 当为true时，css文件名可省略 module 默认为 false
    modules: true,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    // 默认生产环境下是 true，开发环境下是 false
    // extract: false,
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    // 向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({ // 这里是配置项，详见官方文档
            rootValue: 75, // 换算的基数
            propWhiteList: []
          }),
        ]
      },
      css: {},
      sass: {},
      stylus: {},
    },
  },
  /**
   * @devServer 所有 webpack-dev-server 的选项都支持
   */
  devServer: {
    /* 端口号 */
    port: 8080,
    /* 将警告和lint错误显示在浏览器上 */
    overlay: process.env.NODE_ENV !== 'production'
      ? { warnings: false, errors: true }
      : false,
    /* 反向代理 */
    // proxy: {
    //   '/api': {
    //     target: '<url>',
    //     ws: true,
    //     changeOrigin: true
    //   },
    // },
    /* 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建 */
    // parallel: require('os').cpus().length > 1,
    /* 向 PWA 插件传递选项 */
    // pwa: {},

  },
  /**
   * @parallel 是否为 Babel 或 TypeScript 使用 thread-loader
   * @default require('os').cpus().length>1
   */
  // parallel: require('os').cpus().length > 1,
  /**
   * @pwa 向 PWA 插件传递选项
   * @type @Object
   */
  // pwa: {},
  /**
   * @pluginOptions 可以用来传递任何第三方插件选项
   * @type @Object
   */
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      'patterns': [
        path.resolve(__dirname, 'src/components/_style/mixin/theme.basic.styl'),
        path.resolve(__dirname, 'src/components/_style/mixin/theme.components.styl'),
        path.resolve(__dirname, 'src/components/_style/mixin/theme.util.styl'),
      ]
    },
  },
}

