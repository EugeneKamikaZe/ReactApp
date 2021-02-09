import { useContext } from 'react'
import {PokemonContext} from '../../../../context/pokemonContext'

import s from './style.module.css'
import PokemonCard from '../../../../components/PokemonCard'

const BoardPage = () => {
    const SelectedContext = useContext(PokemonContext)

    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                {
                    SelectedContext.pokemon.map(
                        ({ id, name, img, type, values }) => (
                            <PokemonCard
                                key = {id}
                                values = {values}
                                name = {name}
                                img = {img}
                                type = {type}
                                id = {id}
                                minimize
                                className={s.card}
                            />
                        )
                    )
                }
            </div>
            <div className={s.board}>
                <div className={s.boardPlate}>1</div>
                <div className={s.boardPlate}>2</div>
                <div className={s.boardPlate}>3</div>
                <div className={s.boardPlate}>4</div>
                <div className={s.boardPlate}>5</div>
                <div className={s.boardPlate}>6</div>
                <div className={s.boardPlate}>7</div>
                <div className={s.boardPlate}>8</div>
                <div className={s.boardPlate}>9</div>
            </div>
        </div>
    )
}

export default BoardPage