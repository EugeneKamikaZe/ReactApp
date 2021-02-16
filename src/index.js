import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './index.css'

// import {createStore} from 'redux'
// import rootReducer from './store/counter'
// import {Provider} from 'react-redux'
//
// const store = new createStore(rootReducer)

ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    , document.getElementById('root'))