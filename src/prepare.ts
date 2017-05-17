declare var window: any;

/* Redux */
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore  } from 'redux';
const reduxLogger = require('redux-logger');

/* React Router */
import * as reactRouter from 'react-router';

/* Reducers */
import * as reducers from './reducers';

/* App configs */
import config from './config';

/* Combine Reducers */
const reducer = combineReducers({
  routing: routerReducer,
  ...reducers,
});

const logger = reduxLogger.createLogger({});

/* Initial the store */
function configureStore(initialState: any): any {
  // Initial the redux devtools for Chrome
  // https://github.com/zalmoxisus/redux-devtools-extension/
  const createdStore = createStore(reducer, initialState, compose(
    applyMiddleware(logger),
    window.devToolsExtension ? window.devToolsExtension() : (f: any) => f
  ));

  const { hot } = module as any;
  if (hot) {
    // Enable Webpack hot module replacement for reducers
    hot.accept('./reducers', () => {
      const titleReducer = require('./reducers/titles');
      const subreddits = require('./reducers/reducer_subreddits_search');
      const nextReducer = combineReducers({
        routing: routerReducer,
        titleReducer,
        subreddits,
      });
      createdStore.replaceReducer(nextReducer);
    });
  }

  return createdStore;
}

export const store = configureStore({});

/* Initial history */
let routerHistory: any;
if (config.historyBackend === 'browserHistory') {
  routerHistory = reactRouter.browserHistory;
} else {
  routerHistory = reactRouter.hashHistory;
}
export const history = syncHistoryWithStore(routerHistory, store);
