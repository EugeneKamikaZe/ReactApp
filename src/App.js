import Header from './components/Header/header'
import Layout from './components/Layout/layout'
import Footer from './components/Footer/footer'
import React from 'react'

import logoImg from './assets/logo.png'

//<>=<React.fragment>
const App = () => {
    const bg1 = ''
    const bg2 = ''
    return (
        <>
            <Header
                title="New title"
                descr="Description"
            />
            <Layout
                id="0"
                title="Layout title first"
                urlBg={bg1}
            >
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
            </Layout>
            <Layout
                id={1}
                title="Layout title second"
                colorBg="antiquewhite"
            >
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <img src={logoImg} alt="Logo"/>
            </Layout>
            <Layout
                id={2}
                title="Layout title firth"
                urlBg={bg2}
            >
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
            </Layout>
            <Footer />
        </>
    )
}

export default App
