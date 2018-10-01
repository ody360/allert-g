import React from 'react'
import store from './store'
import App from './App'
import { Provider } from 'react-redux'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native'

export default class allertg extends React.Component {
    render() {
        <Provider store={ store() }>
            <App />
        </Provider>
    }
}

