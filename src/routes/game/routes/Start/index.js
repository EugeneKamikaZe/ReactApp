import { useState, useEffect, useContext } from 'react'
import PokemonCard from '../../../../components/PokemonCard'
import Layout from '../../../../components/Layout'
import s from './style.module.css'

import {FirebaseContext} from '../../../../context/firebaseContext'
import {useHistory} from 'react-router-dom'
import {PokemonContext} from '../../../../context/pokemonContext'

const StartPage = () => {
    const history = useHistory()
    const firebase = useContext(FirebaseContext)
    const selectedPokemons = useContext(PokemonContext)
    const [pokemons, setPokemon] = useState({})

    useEffect(() => {
        firebase.getPokemonSoket((pokemons) => {
            setPokemon(pokemons)
        })

        return () => firebase.offPokemonSoket()
    }, [])

    const handleToBoard = () => {
        history.push('/game/board')
    }

    const onCardClick = (key) => {
        const pokemon = {...pokemons[key]}
        selectedPokemons.onSelected(key, pokemon)

        setPokemon(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                selected: !prevState[key].selected
            }
        }))
    }

    return (
        <Layout
            id={1}
            title="Pokemon Game"
            colorBg="cornflowerblue"
        >
            <button className={s.addBtn} disabled={Object.keys(selectedPokemons.pokemons).length < 5} onClick={handleToBoard}>Start Game</button>
            <div className={s.flex}>
                {
                    Object.entries(pokemons).map(([key, {name, img, id, type, values, selected}]) => (
                        <PokemonCard
                            className={s.card}
                            key = {key}
                            values = {values}
                            name = {name}
                            img = {img}
                            type = {type}
                            id = {id}
                            isSelected={selected}
                            onCardClick={() => {
                                if (Object.keys(selectedPokemons.pokemons).length < 5 || selected) {
                                    onCardClick(key)
                                }
                            }}
                        />
                    ))
                }
            </div>
        </Layout>
    )
}

export default StartPage