import { Component } from 'react'
import './Node.scss'

class Node extends Component {
    render() {
        const {
            column,
            row,
            isStart,
            isFinish,
            isBarrier,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            nodeRef
        } = this.props

        let nodeStatus = '';
        if (isStart) {
            nodeStatus = 'node__start'
        } if (isFinish) {
            nodeStatus = 'node__finish'
        } if (isBarrier) {
            nodeStatus = 'node__barrier'
        } 

    return (
        <div 
            id={`location row:${row} column:${column}`}
            className={`node ${nodeStatus}`}
            onMouseDown={() => onMouseDown(row, column)}
            onMouseEnter={() => onMouseEnter(row, column)}
            onMouseUp={() => onMouseUp(row, column)}
            ref={nodeRef }>
        </div>
    )
    }
}

export default Node