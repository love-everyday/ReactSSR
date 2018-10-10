import { createStore, applyMiddleware } from "redux";
import  ThunkMiddleware from "redux-thunk";
import reducers from './reducers';

export default function configureStore(preloadedState) {
  return createStore(
    reducers,
    preloadedState,
    applyMiddleware(ThunkMiddleware)
  )
}

