import {Route, Switch, useRouteMatch} from 'react-router-dom'
import {useState} from 'react'
import {PokemonContext} from '../../context/pokemonContext'

const StartPage = require('./routes/Start')
const BoardPage = require('./routes/Board')
const FinishPage = require('./routes/Finish')

const GamePage = () => {
    const match = useRouteMatch('/game')
    const [pokemon, setPokemon] = useState([])

    const handleSelect = (val) => {
        setPokemon(val)
    }

    return (
        <PokemonContext.Provider value={{ pokemon, isSelect: handleSelect }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage}/>
                <Route path={`${match.path}/board`} component={BoardPage}/>
                <Route path={`${match.path}/finish`} component={FinishPage}/>
            </Switch>
        </PokemonContext.Provider>
    )
}

export default GamePage