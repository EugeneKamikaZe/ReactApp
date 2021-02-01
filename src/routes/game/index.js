const GamePage = ({ onChangePage }) => {
    const handleClickButton = (page) => {
        console.log('<GamePage />')
        onChangePage && onChangePage(page)
    }
    return (
        <div>
            <button onClick={handleClickButton}>
                Click to Home
            </button>
        </div>
    )
}

export default GamePage