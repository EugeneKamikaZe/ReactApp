import { useState, useEffect, useContext } from 'react'
import PokemonCard from '../../../../components/PokemonCard'
import Layout from '../../../../components/Layout'
import s from './style.module.css'

import {useHistory} from 'react-router-dom'
import {PokemonContext} from '../../../../context/pokemonContext'
import {useDispatch, useSelector} from 'react-redux'
import {getPokemonsAsync, selectPokemonsData} from '../../../../store/pokemons'

const StartPage = () => {
    const history = useHistory()
    const selectedPokemons = useContext(PokemonContext)
    const disabled = Object.keys(selectedPokemons.pokemons).length < 5
    const count = 5

    const dispatch = useDispatch()
    const pokemonsRedux = useSelector(selectPokemonsData)

    const [pokemons, setPokemon] = useState({})

    useEffect(() => {
        dispatch(getPokemonsAsync())
    }, [])

    useEffect(() => {
        setPokemon(pokemonsRedux)
    }, [pokemonsRedux])

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
            title="Chose your Pokemon's"
            colorBg="cornflowerblue"
        >
            <button className={s.addBtn} disabled={disabled} onClick={handleToBoard}>
                {
                    disabled ? `Chose ${count - Object.keys(selectedPokemons.pokemons).length} left` : 'Start'
                }
            </button>
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