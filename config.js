// 这里存的是默认配置，使用该框架前，可以考虑把这里的配置拷贝出去，也可以只拷贝需要覆盖的配置。
const path = require('path')
module.exports = {

  /**
   * 项目名称，启动时，会以3D字体的形式在控制台打印
   * */
  name: 'skybase',

  /**
   * token 保存key值
   * */
  tokenName: 'skybase',

  /**
   * 入口文件的路径
   *
   * 由于不能知道require本应用的文件的路径，所以只能让外面定义这个根目录了
   * */
  rootDir: path.join(__dirname, '../../'),

  /**
   * 是否开启webServer，开启了才会监听端口
   * */
  isWebServer: true,

  /**
   * api定义所在目录
   *
   * 如果 isWebServer 为 true，此项必填
   *
   * 填写相对于项目入口文件的相对路径
   * */
  apiDir: './model/api',

  /**
   * 控制器所在目录
   *
   * 如果 isWebServer 为 true，此项必填
   *
   * 填写相对于项目入口文件的相对路径
   * */
  routerDir: './router',

  /**
   * 是否打印日志
   * */
  logger: true,

  /**
   * 控制器所在目录
   *
   * 如果 isWebServer 为 true，此项必填
   *
   * 填写相对于项目入口文件的相对路径
   * */
  middlewareDir: './middleware',

  /**
   * 静态服务的路径，如果为空，则不会启动静态服务
   *
   * 填写相对于项目入口文件的相对路径
   * */
  staticDir: './www',

  /**
   * 中间件
   * ps. 填写中间件的文件名（如果不填文件后缀，则认为是.js），自定义的中间件一定要放在项目根目录的 middleware 文件夹里，不然找不到。
   * ps. 中间件的加载顺序就是按照这个数组的顺序来的
   * ps. 如果自定义的中间件和框架自带的中间件重名，则优先使用自定义的
   * ps. koa2对中间件的使用是根据洋葱圈模型来设计的，写中间件之前，建议先看这篇文章了解洋葱圈模型 https://eggjs.org/zh-cn/intro/egg-and-koa.html
   * ps. 一定要在中间件中使用next，否则后续的中间件将不会执行
   *
   * 框架自带的中间件：
   * cors --- 跨域允许
   * bodyParse --- 解析body，可以解析各种方式的body，甚至可以接收文件
   * staticServer --- 静态文件服务器，一般是开发环境需要，生产环境的前端一般不会让后端代理
   * koaLogger --- 使用koa-logger，功能太少，现在已经不用它了，改用孔哥自制的
   * checkParam --- 检查参数，根据 /models/api/ 下的api定义来检查参数
   * output --- 记录api操作日志
   * apiRegister --- 注册api，要在以上两个之后注册，因为以上两个要记录api的执行时间。一般这个都放在数组最后，因为api不会再next后续的中间件了
   * */
  middlewares: [
    'sky-cors',
    'sky-body-parse',
    'sky-static-server',
    'sky-check-param',
    'sky-check-token',
    'sky-output',
    'sky-api-register'
  ],

  /**
   * 限制post来的数据，这个配置将在 sky/middleware/bodyParse.js 中使用
   */
  bodyParse: {
    multipart: !0,
    formLimit: '100mb', // 100M 文件上传限制
    jsonLimit: '2mb', // body中json格式大小限制
    textLimit: '2mb', //
    extendTypes: {
      custom: [
        'text/xml'
      ]
    }
  }
}
