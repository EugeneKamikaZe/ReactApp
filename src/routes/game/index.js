import {Route, Switch, useRouteMatch} from 'react-router-dom'
import React, {useEffect, useState} from 'react'

import StartPage from './routes/Start'
import BoardPage from './routes/Board'
import FinishPage from './routes/Finish'

import {PokemonContext} from '../../context/pokemonContext'

const GamePage = () => {
    const match = useRouteMatch('/game')
    const [selectedPokemons, setSelected] = useState({})
    const [playerSecondCards, setSecondPlayerPokemons] = useState({})

    const handleSelect = (key, pokemon) => {
        setSelected(prevState => {
            if (prevState[key]) {
                const copyState = {...prevState}
                delete copyState[key]

                return copyState
            }
            return {
                ...prevState,
                [key]: pokemon
            }
        })
    }

    useEffect(async () => {
        const pl2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player')
        const pl2Request = await pl2Response.json()

        setSecondPlayerPokemons(prevState => {
            prevState = pl2Request
            return prevState
        })
    }, [])

    return (
        <PokemonContext.Provider value={{pokemons: selectedPokemons, pokemons2: playerSecondCards, onSelected: handleSelect}}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage}/>
                <Route path={`${match.path}/board`} component={BoardPage}/>
                <Route path={`${match.path}/finish`} component={FinishPage}/>
            </Switch>
        </PokemonContext.Provider>
    )
}

export default GamePage