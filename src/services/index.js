import {filmsList} from './home.js';
import { filmDetail } from "./detail";
module.exports = async (request, restfulApi) => {
  switch (restfulApi) {
    case '/':
      return await filmsList(request);
    case '/detail/:id':
      return await filmDetail(request);
    case '/test':
      return {};
    default:
      break;
  }
}