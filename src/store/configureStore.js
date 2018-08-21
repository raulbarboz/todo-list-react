import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import todosReducer from '../reducers/todosReducer'
import thunk from 'redux-thunk';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default () => {
  // store creation
  const store = createStore(
    combineReducers({
      todos: todosReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}
