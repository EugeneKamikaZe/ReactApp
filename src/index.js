import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {SnackbarProvider} from 'notistack'

import App from './App'
import './index.css'

import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider
            maxSnack={4}
        >
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </SnackbarProvider>
    </Provider>
    , document.getElementById('root'))