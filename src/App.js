import React from 'react'
import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom'
import  cn from 'classnames'

import HomePage from './routes/home'
import GamePage from './routes/game'
import MenuNavbar from './components/MenuHeader'
import Footer from './components/Footer'
import AboutPage from './routes/about'
import ContactPage from './routes/contact'

import {FirebaseContext} from './context/firebaseContext'

import s from './style.module.css'
import Firebase from './service/firebase'

const App = () => {
    const match = useRouteMatch('/')

    return (
        <FirebaseContext.Provider value={new Firebase()} >
            <Switch>
            <Route path="/404" render={() => (
                <h1>404 Page not Found</h1>
            )} />
            <Route>
                <>
                    <MenuNavbar bgActive={!match.isExact} />
                    <div className={cn(s.wrap, {
                        [s.isHomePage]: match.isExact
                    })}>
                        <Switch>
                            <Route path="/" exact component={HomePage} />
                            <Route path="/game" component={GamePage} />
                            <Route path="/about" component={AboutPage} />
                            <Route path="/contact" component={ContactPage} />

                            <Route render={() => (
                                <Redirect to="/404" />
                            )} />
                        </Switch>
                    </div>
                    <Footer />
                </>
            </Route>
        </Switch>
        </FirebaseContext.Provider>
    )
}

export default App