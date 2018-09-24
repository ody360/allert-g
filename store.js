import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'


const reducers = combineReducers({})
export default () => createStore(reducers, applyMiddleware(logger, thunk));
