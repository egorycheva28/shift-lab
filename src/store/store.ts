import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from "redux-thunk";
import signingReducer from '../reducer/reducer';

let reducers = combineReducers({
    signin: signingReducer
});

let store = createStore(reducers, applyMiddleware(thunk));
export default store;