import Header from './components/Header/header'
import Layout from './components/Layout/layout'
import Footer from './components/Footer/footer'
import React from 'react'

//<>=<React.fragment>
const App = () => {
    const bg1 = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e4337cf5-3f3b-4436-b045-8aff91da2cac/bg1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210127T120312Z&X-Amz-Expires=86400&X-Amz-Signature=179f4fd59e44f78f619eac377f02fea9bbe01df19d308634912fff831b7821f2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22bg1.jpg%22'
    const bg2 = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3e62948f-bef9-4af8-b2f6-c0a97abc27a7/bg3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210127T120330Z&X-Amz-Expires=86400&X-Amz-Signature=3d619e4ce7fd8e417c663e1a952c331409845d3bb5e58ab4f2e211680a7dcfd0&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22bg3.jpg%22'
    const description1 = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi eius minus nesciunt nisi nostrum omnis, quo reiciendis! Commodi, numquam sunt.'
    const description2 = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur assumenda, commodi consequuntur distinctio doloribus ea eveniet, ex expedita fugit harum illo quos recusandae saepe voluptatibus! Illo omnis quaerat quasi?'
    return (
        <>
            <Header
                title="New title"
                descr="Description"
            />
            <Layout
                id="0"
                title="Layout title first"
                descr="Layout description"
                urlBg={bg1}
            />
            <Layout
                id={1}
                title="Layout title second"
                descr={description1}
                colorBg="antiquewhite"
            />
            <Layout
                id={2}
                title="Layout title firth"
                descr={description2}
                urlBg={bg2}
            />
            <Footer />
        </>
    )
}

export default App;
