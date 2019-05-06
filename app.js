require('./mongoose/connection')()
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// 跨域
const cors = require('koa2-cors');
// 路由routers
const login = require('./routes/login')
const register = require('./routes/register')

// token验证中间件
const { verifyToken } = require('./middleware/verify')

// 日志
const logs = require('./middleware/logs')


const cron = require('node-cron')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
// 处理跨域
app.use(cors())
app.use(logs())
app.use(logger())
app.use(require('koa-static')(__dirname + '/images'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(login.routes(), login.allowedMethods());
app.use(register.routes(), login.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
