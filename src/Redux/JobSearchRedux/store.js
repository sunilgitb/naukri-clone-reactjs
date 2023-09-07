import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducerJobDes } from '../JobDescriptionRedux/reducerJobDes';
import { jobReducer } from './jobReducer';
import { recruiterReducer } from '../RecruiterRedux/reducer';

const rootReducer = combineReducers({
  job: jobReducer,
  jobId: reducerJobDes,
  recruiter: recruiterReducer,
});

const customMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

// Check if the Redux DevTools extension is installed
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(customMiddleware))
);
