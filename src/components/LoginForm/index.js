import {useEffect, useState, useRef} from 'react'
import s from './style.module.css'
import cn from 'classnames'
import Input from './Input'

const LoginForm = ({onSubmit, isOpen}) => {
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [type, setType] = useState(false)
    const [animation, setAnimation] = useState(false)

    const activeBtn = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit && onSubmit({
            email,
            password,
            type
        })
    }

    const handleChange = (e) => {
        e.preventDefault()
        setAnimation(prevState => !prevState)
        setTimeout(() => setType(prevState => !prevState), 200)
    }

    useEffect(() => {
        if (!isOpen) {
            setEmail('')
            setPass('')
            setType(true)
        } else {
            setEmail('')
            setPass('')
        }
    }, [isOpen])

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
                    <span className={cn(s.btnText, {[s.activeUp]: animation, [s.activeDown]: !animation})} ref={activeBtn}>
                        {
                            type ? 'Login' : 'Register'
                        }
                    </span>
                </button>
                <button onClick={handleChange} className={s.secondaryButton}>
                    {!type ? 'Login' : 'Register'}
                </button>
            </div>
        </form>
    )
}

export default LoginForm