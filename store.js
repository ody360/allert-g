import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware, combineReducers} from 'redux'
import auth from './reducers/auth'
import allergies from './reducers/allergies'
import profiles from './reducers/profiles'

const reducers = combineReducers({auth, allergies, profiles})

export default () => createStore(reducers, applyMiddleware(logger, thunk))
