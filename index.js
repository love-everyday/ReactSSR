
const app = require('fastify')();
const fastifyStatic = require("fastify-static");
const path = require('path');
const {serverRender} = require('./views/server')
const Loadable = require('react-loadable');


//*
app.register(fastifyStatic, {
  root: path.join(__dirname, 'dist'),
  prefix: '/dist/',
})
//*/
app.get('/', function (req, replay) {
  console.log('listen /');
  
  serverRender(req, replay, '/')
})

app.get('/detail/:id', function (req, replay) {
  serverRender(req, replay, '/detail/:id')
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
