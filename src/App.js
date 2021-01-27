import HeaderBlock from './components/HeaderBlock'
import React from 'react'

//<>=<React.fragment>
const App = () => {
    return (
        <>
            <HeaderBlock
                title="New title"
                descr="Description"
            />
            <HeaderBlock
                title="New title"
                hideBg
            />
        </>
    )
}

export default App;
