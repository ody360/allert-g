import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware, combineReducers} from 'redux'
import auth from './reducers/auth'

const reducers = combineReducers({auth})



export default () => createStore(reducers, applyMiddleware(logger, thunk))
