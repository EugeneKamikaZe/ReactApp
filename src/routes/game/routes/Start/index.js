import { useState, useEffect, useContext } from 'react'
import PokemonCard from '../../../../components/PokemonCard'
import Layout from '../../../../components/Layout'
import s from './style.module.css'

import {FirebaseContext} from '../../../../context/firebaseContext'
import {PokemonContext} from '../../../../context/pokemonContext'

const newPOKEMON = {
    "abilities": [
        "hatchet",
        "evil-look ",
        "laugh"
    ],
    "stats": {
        "hp": 9000,
        "attack": 1000,
        "defense": 1000,
        "special-attack": 10,
        "special-defense": 10,
        "speed": 5
    },
    "type": "man",
    "img": "https://s.tcdn.co/41a/7fb/41a7fb1f-9bff-3ddb-90fb-be11903192e1/192/7.png",
    "name": "Jonny",
    "base_experience": 122,
    "height": 180,
    "id": 66,
    "values": {
        "top": "e",
        "right": "s",
        "bottom": "i",
        "left": "H"
    }
}

const StartPage = () => {
    const firebase = useContext(FirebaseContext)
    const [pokemons, setPokemon] = useState({})

    const getPokemons = async () => {
        const response = await firebase.getPokemonsOnce()
        setPokemon(response)
    }

    useEffect(() => {
        firebase.getPokemonSoket((pokemons) => {
            setPokemon(pokemons)
        })
    }, [])

    const onCardClick = (id) => {
        setPokemon(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]}
                if (pokemon.id === id && !pokemon.isSelected) {
                    pokemon.isSelected = true
                    // pokemon.active = !pokemon.active
                    pushToContext(item)
                }

                acc[item[0]] = pokemon
                // firebase.postPokemon(item[0], pokemon)
                return acc
            }, {})
        })
    }

    const pushToContext = (val) => {
        PokemonContext.pokemon.push(val)
        console.log(PokemonContext)
    }

    const handleAddPokemon = () => {
        const data = newPOKEMON
        firebase.addPokemon(data, async () => {
            await getPokemons()
        })
    }

    // const onAddBtnClick = () => {
    //     const newPostKey = database.ref().child('pokemons').push().key
    //
    //     let updates = {}
    //     updates[newPostKey + '/'] = newPOKEMON
    //
    //     database
    //         .ref('pokemons/')
    //         .update(updates)
    //         .then(() => {
    //             database.ref('pokemons').once('value', (snapshot) => {
    //                 setPokemon(snapshot.val())
    //             })
    //         })
    // }

    return (
        <Layout
            id={1}
            title="Pokemon Game"
            colorBg="cornflowerblue"
        >
            <button className={s.addBtn} onClick={handleAddPokemon}>Start Game</button>
            <div className={s.flex}>
                {
                    Object.entries(pokemons).map(([key, {name, img, id, type, values, active}]) => (
                        <PokemonCard
                            key = {key}
                            values = {values}
                            name = {name}
                            img = {img}
                            type = {type}
                            id = {id}
                            active={true}
                            onCardClick={onCardClick}
                        />
                    ))
                }
            </div>
        </Layout>
    )
}

export default StartPage