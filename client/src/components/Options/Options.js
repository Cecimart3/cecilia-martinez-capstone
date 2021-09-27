import './Options.scss'

const Options = ({ start, maze, clearGrid }) => {
    console.log(clearGrid)
    return (
        <div className='options'>
            <div className='options__item'> 
                <p>Algorithm:</p>
                <p>Dijkstra's</p> 
            </div>
            <button onClick={clearGrid} className='options__item'>
                Clear Grid
            </button>
            <button onClick={maze} className='options__item'>
                Generate Maze
            </button>
            <button onClick={start}className='options__item'>
                Start
            </button>
        </div>
    )
}

export default Options