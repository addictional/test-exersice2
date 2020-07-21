import {
    createStore,
    applyMiddleware,
    compose,
    Reducer,
  } from 'redux';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import {reducer as tableReducer} from './Recucer';
import ITable from '../Models/ITable';
import {IActions} from './Actions';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}



const reducer: Reducer<ITable, IActions> = tableReducer;


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk as ThunkMiddleware<ITable, IActions>),
    ),
);
export default store;