import {Route, Switch, useRouteMatch} from 'react-router-dom'
import {useState} from 'react'
import {PokemonContext} from '../../context/pokemonContext'

import StartPage from './routes/Start'
import BoardPage from './routes/Board'
import FinishPage from './routes/Finish'

const GamePage = () => {
    const match = useRouteMatch('/game')
    const [selectedPokemons, setSelected] = useState({})

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

    return (
        <PokemonContext.Provider value={{ pokemons: selectedPokemons, onSelected: handleSelect }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage}/>
                <Route path={`${match.path}/board`} component={BoardPage}/>
                <Route path={`${match.path}/finish`} component={FinishPage}/>
            </Switch>
        </PokemonContext.Provider>
    )
}

export default GamePage