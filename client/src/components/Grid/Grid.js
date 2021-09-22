import './Grid.scss'
import { Component } from 'react'
import Node from '../Node/Node'

class Grid extends Component {
    state = {
        grid: []
    }

    componentDidMount() {
        const grid = createGrid()
        this.setState({ grid })
    }

    render() {
        const { grid } = this.state

        return (
            <div className='grid'>
                {grid}
            </div>
        )
    }
}

export default Grid

const createColumns = () => {
    const columns = Array(40).fill(null)
    return columns.map((column, index) => <Node key={`${index}`} className='column' />)
}

const createGrid= () => {
    const rows = Array(20).fill(null)
    const columns = createColumns()
    return rows.map((row, index) => <div key={`${index}`}>{columns}</div>)
}

