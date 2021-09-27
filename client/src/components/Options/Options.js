import { generateEllerMaze } from '../../algorithms/mazeGenerator'
import './Options.scss'

const Options = ({ start, maze }) => {
    return (
        <div className='options'>
            <div> 
                <p>Algorithm:</p>
                <p>Dijkstra's</p> 
            </div>
            <button>
                Clear Board
            </button>
            <button onClick={maze}>
                Generate Maze
            </button>
            <button onClick={start}>
                Start
            </button>
        </div>
    )
}

export default Options