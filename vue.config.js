const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '',
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    // https:true,
    port: 8080,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  chainWebpack: config => {
      if (process.env.NODE_ENV === 'production') {
          config.mode = 'production';
          // 打包文件大小配置
          // config.performance = {
          //   maxEntrypointSize: 1024 * 100,
          //   maxAssetSize: 1024 * 500
          // }
      }
      config.optimization.splitChunks({
          chunks: 'all',
          minSize: 1024 * 3,
          minRemainingSize: 0,
          minChunks: 2,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
      })
  }

})

/*
asset size limit: The following asset(s) exceed the recommended size limit (244 KiB). This can impact web performance.
configureWebpack: config => {
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === 'production') {
        config.mode = 'production';
        // 打包文件大小配置
        config.performance = {
          maxEntrypointSize: 10000000,
          maxAssetSize: 30000000
        }
    }
},

*/