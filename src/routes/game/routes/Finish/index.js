import s from './style.module.css'
import {useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'

import PokemonCard from '../../../../components/PokemonCard'
import {FirebaseContext} from '../../../../context/firebaseContext'
import {PokemonContext} from '../../../../context/pokemonContext'

const FinishPage = () => {
    let {pokemons, pokemons2} = useContext(PokemonContext)
    const firebase = useContext(FirebaseContext)
    const [selectedPokemon, setSelected] = useState()
    const player2 = Object.assign({}, pokemons2.data)
    const history = useHistory()
    const ReturnToGame = () => {
        if (selectedPokemon) {
            firebase.addPokemon(selectedPokemon, () => history.push('/game'))
        } else {
            history.push('/game')
        }
    }

    if ((pokemons === undefined) || (pokemons2.data === undefined)) {
        history.push('/game')
    }

    const onCardClick = (key) => {
        const pokemon = {...player2[key]}

        setSelected(pokemon)
    }

    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                {
                    Object.entries(pokemons).map(([key, {name, img, id, type, values, selected}]) => (
                        <PokemonCard
                            className={s.card}
                            key={key}
                            values={values}
                            name={name}
                            img={img}
                            type={type}
                            id={id}
                            isSelected={selected}
                        />
                    ))
                }
            </div>
            <button className={s.endBtn} onClick={ReturnToGame}>END GAME</button>
            <div className={s.playerTwo}>
                {
                    Object.entries(player2).map(([key, {name, img, id, type, values, selected}]) => (
                        <PokemonCard
                            className={s.card}
                            key={key}
                            values={values}
                            name={name}
                            img={img}
                            type={type}
                            id={id}
                            isSelected={selected}
                            onCardClick={() => {
                                onCardClick(key)
                            }}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default FinishPage