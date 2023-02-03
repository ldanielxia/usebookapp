const name = process.env.VUE_APP_TITLE || 'Book Store' 

module.exports = {
    devServer: {
        port: 8081, 
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, 
        // before: function (app) {
        // //   app.get('./config/mobile-app-config.json', function (req, res) {
        // //     window.appConfig = res;
        // //     console.log(res);
        // //   });
        // }
        disableHostCheck: true,
        proxy:{
           '/api':{
             target:'http://localhost:8080/api',
             changeOrigin:true,
             pathRewrite:{
               '^/api':''
             }
           }
        }
      },
      chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
          args[0].title = name
          return args
        })
      }
}