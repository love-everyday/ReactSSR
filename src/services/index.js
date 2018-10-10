import {filmsList} from './home.js';
import { filmDetail } from "./detail";
module.exports = async (request, restfulApi) => {
  console.log(restfulApi);
  switch (restfulApi) {
    case '/':
      return await filmsList(request);
      case '/detail/:id':
      return await filmDetail(request)
    default:
      break;
  }
}