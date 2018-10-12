This is a demo for `React Server-Side Render`.
* [Fastify](https://www.fastify.io/), used for node.js web server ;
* [webpack-dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware) and [webpack-hot-middleware](https://www.npmjs.com/package/webpack-hot-middleware), hot reload pages when ssr development ;
* [chokidar](https://www.npmjs.com/package/chokidar), used for hot reload web server, without restart ;
* [react-loadable](https://www.npmjs.com/package/react-loadable), split bundles, also a good idea used when react ssr ;
# Example
[demo](https://ssr.codermi.com/)
# Usage
### Development
```
npm run dev
```
### Deployment
```
npm run babel
npm run start
```