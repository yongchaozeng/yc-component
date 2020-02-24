var config = require("./config");
const autoprefixer = require("autoprefixer");
module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  router: {
    middleware: "login"
  },
  head: {
    title: "中国儿童中心" || "",

    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "中国儿童中心" || ""
      },
      {
        name: "keywords",
        content: "中国儿童中心"
      }
    ],
    link: [{ rel: "icon", href: "/logo_favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "@white" },
  /*
   ** Global CSS
   */
  css: [
    { src: "swiper/dist/css/swiper.css" },
    {
      src: "assets/style/common.less",
      lang: "less"
    }
  ],
  env: {
    baseUrl: config[process.env.NODE_ENV]
      ? config[process.env.NODE_ENV].baseUrl
      : config.dev.baseUrl,
    loginUrl: config[process.env.NODE_ENV]
      ? config[process.env.NODE_ENV].loginUrl
      : config.dev.loginUrl,
    service: config[process.env.NODE_ENV]
      ? config[process.env.NODE_ENV].service
      : config.dev.service,
    clientBaseUrl: config[process.env.NODE_ENV]
      ? config[process.env.NODE_ENV].clientBaseUrl
      : config.dev.clientBaseUrl
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "@/plugins/bus", ssr: false },
    { src: "@/plugins/message", ssr: false },
    { src: "@/plugins/swiper", ssr: false },
    { src: "@/plugins/babel-polyfill", ssr: false },
    { src: "@/plugins/lazy-load", ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  // modules: ["@nuxtjs/eslint-module"],
  /*
   ** Build configuration
   */
  build: {
    postcss: [autoprefixer({ browsers: ["last 2 versions", "> 1%"] })],
    //cdn缓存
    publicPath: `//static.dragonest.com/china-children-center-registration/${process.env.NODE_ENV}/client/`,
    modules: ["@nuxtjs/style-resources"],
    styleResources: {
      less: "assets/style/base.less"
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev, isClient }) {}
  }
};
