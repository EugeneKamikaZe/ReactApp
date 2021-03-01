import {useState} from 'react'
import PokemonCard from '../../../../../../components/PokemonCard'
import s from './style.module.css'
import cn from 'classnames'
import {useHistory} from 'react-router-dom'

const PlayerBoard = ({player, cards, onClickCard}) => {
    const [isSelected, setSelected] = useState(null)
    const [currentPlayer, setCurrent] = useState()
    const history = useHistory()

    return (
        <>
            {
                cards ? cards.map((item) => (
                    <div
                        className={cn(s.cardBoard, {
                            [s.selected]: isSelected === item.id
                        })}
                        onClick={() => {
                            // setCurrent()
                            // if (currentPlayer === player1) {
                            //     setSelected(item.id)
                            // }
                            // setSelected(item.id)
                            onClickCard && onClickCard({
                                ...item,
                                player
                            })
                        }}
                    >
                        <PokemonCard
                            key={item.id}
                            values={item.values}
                            name={item.name}
                            img={item.img}
                            type={item.type}
                            id={item.id}
                            minimize
                        />
                    </div>
                )) : history.push('/game')
            }
        </>
    )
}

export default PlayerBoard