import {useEffect, useState} from 'react'
import s from './style.module.css'
import Input from './Input'

const LoginForm = ({onSubmit, isOpen}) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit && onSubmit({
            email,
            pass
        })
        setEmail('')
        setPass('')
    }

    useEffect(() => {
        if (!isOpen) {
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
                    value={pass}
                    label="Password"
                    type="password"
                    name="password"
                    onChange={(val) => {
                        setPass(val.target.value)
                    }}
                />
            </div>
            <button className={s.login__button}>
                Login
            </button>
        </form>
    )
}

export default LoginForm