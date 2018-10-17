import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware, combineReducers} from 'redux'
import auth from './reducers/auth'
import allergies from './reducers/allergies'
import profiles from './reducers/profiles'
import party from './reducers/party'

const reducers = combineReducers({auth, allergies, profiles, party})

export default () => createStore(reducers, applyMiddleware(logger, thunk))
