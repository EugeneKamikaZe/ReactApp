import { useHistory } from 'react-router-dom'
import s from './style.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {plusAction, selectCount} from '../../store/counter'

const Header = ({ title, descr }) => {
    const history = useHistory()

    // const count = useSelector(selectCount)
    // const dispatch = useDispatch()
    // console.log('count', count)

    const handleClick = () => {
        history.push('/game')
        // dispatch(plusAction(1))
    }

    return (
        <header className={s.root}>
            <div className={s.forest}/>
            <div className={s.silhouette }/>
            <div className={s.moon}/>
            <div className={s.container}>
                {title && (<h1>{title}</h1>)}
                {descr && (<p>{descr}</p>)}
                <button className={s.start__btn} onClick={handleClick}>
                    Start Game
                </button>
            </div>
        </header>
    )
}

export default Header