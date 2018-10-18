该项目的目的是为了研究`React Server-Side Render`。<br>
使用`SPA`单页面应用过程，发现有以下几个缺点：
* 首屏加载时间过长，受网络和设备性能的影响非常严重；
* 如果应用在微信用使用，还会出现`history`模式、`hash`模式和微信浏览器的兼容问题；
* 单页面应用可能无法满足产品的`SEO`需求；
为以后项目可能会需要`SSR`，开发该demo用于技术调研。<br>
### 技术选型：
* [Fastify](https://www.fastify.io/)： 由于`Express`和`Koa`的创始人 [tj](https://github.com/tj) 不再参与这两个开源项目开发，后续也没有组织接手，所以目前更新进度非常缓慢，而阿里的[Egg](https://github.com/eggjs/egg)也是不错的选择，上手容易，项目架构也非常好。而本人则采用`Fastify`，一个是主要开源作者两人都是大牛，二个是想看一下有哪些好的设计思想。
* [React](https://github.com/facebook/react)：选择`React`的目的则是，感觉`React`的设计初衷就是负责`View`，这对`SSR`会更加友善一点；使用单向数据流也能降低开发难度；
* [webpack-dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware) 、 [webpack-hot-middleware](https://www.npmjs.com/package/webpack-hot-middleware)：这是两个`webpack`工具，目的是在开发环境下，项目的代码热更新和浏览器热加载；
* [chokidar](https://www.npmjs.com/package/chokidar)：最开始使用的`nodemon`，来实现Server的自动重启；但发现`webpack-dev-middleware`和`nodemon`会发生兼容问题；如果修改`webpack`监听打包的文件，则只会触发`webpack-dev-middleware`，导致服务器`renderToString`渲染出来的`html`内容与客户端js重新生成的界面不一致；如果修改服务器端的代码，则只会触发`nodemon`，服务器自动重启，`webpack`会重新打包，相率降低；所以重新选择了`chokidar`来监听文件的修改，然后通过删除`require.cache`中对应的引用，从而实现不重启服务器，热更新服务器代码；
* [react-loadable](https://www.npmjs.com/package/react-loadable)：使用`react-loadable`的目的是，一是为了通过`dynamic import`来分割代码，并实现界面的懒加载；二是为了在`renderToString`后，获取到懒加载界面的`js`和`css`的bundles，然后添加到`html`内容中发送给浏览器，从而使界面加载显示更平滑；
# 在线实例
[demo](https://ssr.codermi.com/)
# 使用方法
### Development
```
npm run dev
```
### Deployment
```
npm run babel
npm run start
```