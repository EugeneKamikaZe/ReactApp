import s from './style.module.css'

const Input = ({value, type = 'text', label, name, onChange}) => {

    return (
        <div className={s.root}>
            <input
                type={type}
                className={s.input}
                name={name}
                required
                value={value}
                onChange={onChange}
            />
            <span className={s.highlight} />
            <span className={s.bar}/>
            <label className={s.label}>{label}</label>
        </div>
    )
}

export default Input