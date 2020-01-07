const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const undevelopment = process.env.NODE_ENV !== 'development'

const assign = Object.assign

// 定义 Webpack 不打包资源列表
const externals = {
  vue: 'Vue',
  vuex: 'Vuex',
  axios: 'axios',
  vant: 'vant',
  'vue-router': 'VueRouter',
  'vue-i18n': 'VueI18n'
}

// 定义 CDN 资源
const CDNSources = {

  // 开发环境
  dev: {
    css: ['https://cdn.jsdelivr.net/npm/vant@2.2.13-beta.0/lib/index.css'],
    js: []
  },

  // 生产环境
  build: {
    css: ['https://cdn.jsdelivr.net/npm/vant@2.2.13-beta.0/lib/index.css'],
    js: [
      'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
      'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
      'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
      'https://cdn.bootcss.com/vue-i18n/8.14.1/vue-i18n.min.js',
      'https://cdn.bootcss.com/axios/0.19.0/axios.min.js',
      'https://cdn.jsdelivr.net/npm/vant@2.2.13-beta.0/lib/vant.min.js'
    ]
  }
}

const vueConf = {

  // 设置 eslint-loader 在每次保存时 lint 代码
  lintOnSave: true,

  // 生产环境禁用 source map 加速生产环境构建
  productionSourceMap: false
}

// 部署路径，默认根路径 `/`，若需部署在子路径，在指定环境配置中定义 BASE_URL
vueConf.publicPath = process.env.BASE_URL

vueConf.configureWebpack = config => {
  // 定义 HTML 文件 title
  config.name = process.env.NAME
  if (undevelopment) {
    // 指定 Webpack 不打包 模块，使用 CDN 代替
    assign(config, {
      externals: externals
    })

    // 压缩移除冗余调试代码
    config.plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log']
          }
        },
        sourceMap: false,
        parallel: true
      })
    )

    // 开启 Gzip 压缩
    const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
    config.plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8
      })
    )

    // 公共代码抽离
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: /node_modules/,
            name: 'vendor',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100
          },
          common: {
            chunks: 'all',
            test: /[\\/]src[\\/]js[\\/]/,
            name: 'common',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          },
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true
          },
          runtimeChunk: {
            name: 'manifest'
          }
        }
      }
    }
  }
}

function resolve (dir) {
  return path.join(__dirname, dir)
}

vueConf.chainWebpack = config => {
  // 设置 public/index.html 中的预留 CDN 占位
  config.plugin('html').tap(args => {
    args[0].CDN = CDNSources[undevelopment ? 'build' : 'dev'] || {}
    return args
  })

  // 图片压缩
  config.module
    .rule('images')
    .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    .use('image-webpack-loader')
    .loader('image-webpack-loader')
    .options({
      bypassOnDebug: true,
      disable: true,
      mozjpeg: {
        progressive: true,
        quality: 65
      },

      // optipng.enabled: false will disable optipng
      optipng: {
        enabled: false
      },
      pngquant: {
        quality: [0.65, 0.9],
        speed: 4
      },
      gifsicle: {
        interlaced: false
      },

      // the webp option will enable WEBP
      webp: {
        quality: 75
      }
    })
    .end()

  // 设置目录别名 alias
  config.resolve.alias
    .set('@', resolve('src'))
    .set('@components', resolve('src/components'))
    .set('@views', resolve('src/views'))
    .set('@assets', resolve('src/assets'))
    .set('@api', resolve('src/api'))
    .set('@store', resolve('src/store'))
    .set('@utils', resolve('src/utils'))
}

vueConf.css = {
  loaderOptions: {
    postcss: {

      // https://www.npmjs.com/package/postcss-pxtorem
      plugins: [
        require('postcss-pxtorem')({

          // 换算的基数
          rootValue: 37.5,

          // 忽略转换正则匹配项
          selectorBlackList: [/^.van.*$/gi],
          propList: ['*', '!font*']
        })
      ]
    },
    sass: {

      // 注意：在 sass-loader v7 中，这个选项名是 "data"
      prependData: `
        @import "@assets/style/mixin.scss";
        @import "@assets/style/variables.scss";
      `
    }
  }
}

vueConf.devServer = {

  // 设置代理，用来解决本地开发跨域问题，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  proxy: {
    [process.env.VUE_APP_BASE_API]: {
      target: process.env.VUE_APP_PROXY_SERVER,
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        ['^' + process.env.VUE_APP_BASE_API]: ''
      }
    }
  }
}

module.exports = vueConf
