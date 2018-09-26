import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware, combineReducers} from 'redux'
import user from './reducers/auth'

const reducers = combineReducers({user})



export default () => createStore(reducers, applyMiddleware(logger, thunk))
