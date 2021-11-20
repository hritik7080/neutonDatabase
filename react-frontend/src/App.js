import { ConfigureStore } from './store/reducers'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import axios from "axios"
import Routes from './Routes'

// Hritik change api address here
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

let store = ConfigureStore()

export class App extends Component {
  render() {
    return (
      <Provider store ={store}>
        <Routes />
      </Provider>
    )
  }
}

export default App;
