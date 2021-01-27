import s from './style.module.css'

const HeaderBlock = ({ title, hideBg = false, descr }) => {
    const styleRoot = hideBg ? { backgroundImage: 'none'} : {}
    return (
        <div>
            <div>
                {
                    title && (<h1 className={s.header} style={styleRoot}>{title}</h1>)
                }
                {descr && <p className={s.paragraph}>{ descr }</p>}
            </div>
        </div>
    )
}

export default HeaderBlock