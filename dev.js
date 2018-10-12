
const app = require('fastify')();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const Loadable = require('react-loadable');

const config = require('./webpack.config.js')
const compiler = webpack(config);
let serverRenderDev = require('./src/server').serverRenderDev

const path = require('path')
const chokidar = require('chokidar')
const watcher = chokidar.watch('./src')

watcher.on('ready', function() {
  watcher.on('all', function(event, filepath) {
    console.log('watcher', event, filepath);
    const dirPath = path.join(__dirname, 'src')
    Object.keys(require.cache).forEach(function(id) {
      if (id.indexOf(dirPath) >= 0) {
        delete require.cache[id];
      }
    })
    serverRenderDev = require('./src/server').serverRenderDev;
  })
})

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  quiet: true,
}))
app.use(webpackHotMiddleware(compiler, {
  log: false,
  heartbeat: 2000,
}))
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
