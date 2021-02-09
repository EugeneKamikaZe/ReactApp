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
    const selected = useContext(PokemonContext)
    const [pokemons, setPokemon] = useState({})

    useEffect(() => {
        firebase.getPokemonSoket((pokemons) => {
            setPokemon(pokemons)
        })
    }, [])

    const handleToBoard = () => {
        history.push('/game/board')
    }

    const onCardClick = (id) => {
        setPokemon(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]}

                if (pokemon.id === id && !pokemon.isSelected) {
                    pokemon.isSelected = true
                    pushToContext(item[1])
                }

                acc[item[0]] = pokemon

                return acc
            }, {})
        })
    }

    const pushToContext = (val) => {
        selected.pokemon.push(val)
    }

    return (
        <Layout
            id={1}
            title="Pokemon Game"
            colorBg="cornflowerblue"
        >
            <button className={s.addBtn} disabled={selected.pokemon.length !== 5} onClick={handleToBoard}>Start Game</button>
            <div className={s.flex}>
                {
                    Object.entries(pokemons).map(([key, {name, img, id, type, values, isSelected}]) => (
                        <PokemonCard
                            key = {key}
                            values = {values}
                            name = {name}
                            img = {img}
                            type = {type}
                            id = {id}
                            isSelected={isSelected}
                            onCardClick={onCardClick}
                        />
                    ))
                }
            </div>
        </Layout>
    )
}

export default StartPage