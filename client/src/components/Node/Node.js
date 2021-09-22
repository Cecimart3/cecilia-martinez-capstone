import { Component } from 'react'
import './Node.scss'

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

class Node extends Component {
    render() {
        const {
            column,
            row,
            isStart,
            isFinish,
            isBarrier
        } = this.props

    return (
        <div 
        id={`location = row:${row} column:${column}`}
        className={'node'}>
        </div>
    )
    }
}

export default Node