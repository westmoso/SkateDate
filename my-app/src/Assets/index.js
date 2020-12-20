import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import {
  createLogger
} from 'redux-logger';
import {
  default as thunkMiddleware
} from 'redux-thunk';
import {
  composeWithDevTools
} from 'redux-devtools-extension';
import currentUser from './currentUser';
import currentLocation from './currentLocation';
import pets from './pets';
import matches from './matches';
import matchPets from './matchPets';
import form from './form';


const reducer = combineReducers({
  currentUser,
  currentLocation,
  pets,
  matches,
  matchPets,
  form
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({
    collapsed: true
  }),
));

const persistedState = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : {};

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined;
  }
  return reducer(state, action)
}

const store = createStore(rootReducer, persistedState, middleware);

store.subscribe(() => localStorage.setItem('store', JSON.stringify(store.getState())));


export * from './currentUser';
export * from './currentLocation';
export * from './pets';
export * from './matches';
export * from './matchPets';
export * from './form';
export default store;
