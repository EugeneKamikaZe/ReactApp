import s from './style.module.css'

const Layout = ({ id, title, descr, urlBg, colorBg, children}) => {
    const sectionStyle = {}

    if (urlBg) {
        sectionStyle.backgroundImage = `url('${urlBg}')`
    } else if (colorBg) {
        sectionStyle.backgroundColor = colorBg
    }
    console.log(`url('${urlBg}')`)
    return (
        <section
            className={s.root}
            id={id}
            style={sectionStyle}>
            <div className={s.wrapper}>
                <article>
                    <div className={s.title}>
                        {title && (<h3>{title}</h3>)}
                        <span className={s.separator}/>
                    </div>
                    <div className="desc full">
                        {children}
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Layout