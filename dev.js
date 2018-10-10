
const app = require('fastify')();
// const fastifyStatic = require("fastify-static");
// const path = require('path');
const {serverRenderDev} = require('./src/server')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const Loadable = require('react-loadable');

const config = require('./webpack.config.js')
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  quiet: true
}))
app.use(webpackHotMiddleware(compiler, {
  log: false,
  heartbeat: 2000,
}))
/*
app.register(fastifyStatic, {
  root: path.join(__dirname, 'assets'),
  prefix: '/assets/',
})
//*/
app.get('/', function (req, replay) {
  serverRenderDev(req, replay, '/')
})

app.get('/detail/:id', function (req, replay) {
  serverRenderDev(req, replay, '/detail/:id')
})

Loadable.preloadAll().then(() => {
  app.listen(3000, function (err, address) {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    app.log.info(`server listen on ${address}`)
  })
})
