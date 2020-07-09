import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import ApiMiddleware from '../ApiManager/ApiMiddleware'
import rootReducer from './Reducers/RootReducer'
const AppStore = createStore(
    rootReducer,
    applyMiddleware(thunk, ApiMiddleware)
);

export default AppStore



// import { createStore, applyMiddleware, compose } from 'redux';
// import ApiMiddleware from '../ApiManager/ApiMiddleware'
// import thunk from 'redux-thunk';

// import rootReducer from './Reducers/RootReducer';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 1000 })|| compose;
// export const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
// // export const store=createStore(rootReducer,compose(
//     applyMiddleware(thunk, ApiMiddleware)))

// export default store;
