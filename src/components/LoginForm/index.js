import {useEffect, useState, useRef} from 'react'
import s from './style.module.css'
import cn from 'classnames'
import Input from './Input'

const LoginForm = ({onSubmit, isResetField = false}) => {
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [isLogin, setType] = useState(false)
    const [animation, setAnimation] = useState(false)

    const activeBtn = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit && onSubmit({
            email,
            password,
            type: isLogin ? 'login' : 'signup'
        })
    }

    const handleChange = (e) => {
        e.preventDefault()
        setAnimation(prevState => !prevState)
        setTimeout(() => setType(prevState => !prevState), 200)
    }

    useEffect(() => {
        setEmail('')
        setPass('')
        setType(true)
    }, [isResetField])

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Input
                    value={email}
                    label="Email"
                    type="text"
                    name="email"
                    onChange={(val) => {
                        setEmail(val.target.value)
                    }}
                />
            </div>
            <div>
                <Input
                    value={password}
                    label="Password"
                    type="password"
                    name="password"
                    onChange={(val) => {
                        setPass(val.target.value)
                    }}
                />
            </div>
            <div className={s.btnWrapper}>
                <button className={s.activeButton}>
                    <span className={cn(s.btnText, {[s.activeUp]: animation, [s.activeDown]: !animation})}
                          ref={activeBtn}>
                        {isLogin ? 'Login' : 'Register'}
                    </span>
                </button>
                <button onClick={handleChange} className={s.secondaryButton}>
                    <span className={cn(s.btnText, {[s.activeFadeIn]: animation, [s.activeFadeOut]: !animation})}>
                        {!isLogin ? 'Login' : 'Register'}
                    </span>
                </button>
            </div>
        </form>
    )
}

export default LoginForm