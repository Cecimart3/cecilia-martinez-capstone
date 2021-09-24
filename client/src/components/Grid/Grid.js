import './Grid.scss'
import { Component, createRef } from 'react'
import Node from '../Node/Node'
import { dijkstra, getNodesInShortestPathOrder } from '../../algorithms/dijkstra'

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

class Grid extends Component {
    state = {
        grid: [],
        mouseIsPressed: false,
        startIsMoving: false
    }

    componentDidMount() {
        const grid = gridModel();
        this.setState({ grid })
    }

    handleMouseDown = (row, column) => {
        const node = findRef(this.state.grid, row, column);
        let newGrid;
        if (node.className.includes('node__start')) {
            newGrid = getNewGridWithStartToggled(this.state.grid, row, column);
            this.setState({grid: newGrid, mouseIsPressed: true, startIsMoving: true });
        } else {
            newGrid = getNewGridWithWallToggled(this.state.grid, row, column);
            this.setState({grid: newGrid, mouseIsPressed: true});
        } 
    }
    
    handleMouseEnter = (row, column) => {
        if (!this.state.mouseIsPressed) return;
        if (this.state.startIsMoving) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, column);
        this.setState({grid: newGrid});
    }
    
    handleMouseUp = (row, column) => {
        let newGrid;
        console.log(row, column)
        if (this.state.startIsMoving) {
            newGrid = getNewGridWithStartToggled(this.state.grid, row, column);
        }
        this.setState({mouseIsPressed: false, grid: newGrid || this.state.grid, startIsMoving: false});
    }
    
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
                }
                setTimeout(() => {
                    const node = visitedNodesInOrder[i];
                    node.nodeRef.current.className = 'node node__visited'
                    }, 10 * i);
        }
    }
    
    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                node.nodeRef.current.className = 'node node__path'
            }, 50 * i);
        }
    }
    
    visualizeDijkstra() {
        const {grid} = this.state;
        //const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const startNode = findStart(grid)
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }


    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <>
              <button onClick={() => this.visualizeDijkstra()}>
                    start
                </button>
                <div className='grid'>
                    { createGrid(grid, 
                        {mouseIsPressed, 
                        handleMouseDown: this.handleMouseDown,
                        handleMouseEnter: this.handleMouseEnter,
                        handleMouseUp: this.handleMouseUp}) }
                    {/* {grid} */}
                </div>
            </>
        )
    }
}

export default Grid

const createColumns = (nodes, mouseHandlers) => {
    return nodes.map((node, index) => 
    <Node key={`${index}`} 
        row={node.row} 
        column={node.column}
        isStart={node.isStart} 
        isFinish={node.isFinish}
        distance={node.distance}
        isVisited={node.isVisited}
        isBarrier={node.isBarrier}
        previousNode={node.previousNode}
        mouseIsPressed={mouseHandlers.mouseIsPressed}
        onMouseDown={(row, column) => mouseHandlers.handleMouseDown(row, column)}
        onMouseEnter={(row, column) => mouseHandlers.handleMouseEnter(row, column)}
        onMouseUp={(row, column) => mouseHandlers.handleMouseUp(row, column)}
        nodeRef={node.nodeRef} />
    )
}

const createGrid = (gridModel, mouseHandlers) => {
    return gridModel.map((rowData, index) => <div key={`${index}`}>{createColumns(rowData, mouseHandlers)}</div>)
}

const createNode = (row, column) => {
    return {
        column,
        row,
        isStart: row === START_NODE_ROW && column === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && column === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isBarrier: false,
        previousNode: null,
        nodeRef: createRef()
    }
}

const gridModel = () => Array(20).fill(null).map((row, rowIdx) => 
        Array(40).fill(null).map((column, colIdx) => createNode(rowIdx, colIdx))    
)

const getNewGridWithWallToggled = (grid, row, column) => {
    const newGrid = grid.slice();
    const node = newGrid[row][column];
    const newNode = {
        ...node,
        isBarrier: !node.isBarrier,
    };
    newGrid[row][column] = newNode;
    return newGrid;
};

const getNewGridWithStartToggled = (grid, row, column) => {
    const newGrid = grid.slice();
    const node = newGrid[row][column];
    const newNode = {
        ...node,
        isStart: !node.isStart,
    };
    newGrid[row][column] = newNode;
    return newGrid;
};

const findRef = (grid, row, column) => {
    return grid[row][column].nodeRef.current
}

const findStart = (grid) => {
    const rowIdx = grid.findIndex(row => row.some(data => data.isStart))
    return grid[rowIdx].find(data => data.isStart)
}
