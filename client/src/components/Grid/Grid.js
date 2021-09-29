import './Grid.scss'
import { Component, createRef } from 'react'
import Node from '../Node/Node'
import { dijkstra, getNodesInShortestPathOrder } from '../../algorithms/dijkstra'
import Options from '../Options/Options';
import { generateEllerMaze } from '../../algorithms/mazeGenerator';
import Results from '../Results/Results';

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

class Grid extends Component {
    state = {
        grid: [],
        mouseIsPressed: false,
        startIsMoving: false,
        finishIsMoving: false,
        searchedNodes: 0,
        path: 0
    }

    // searchedNodes = createRef();

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
        } else if (node.className.includes('node__finish')) {
            newGrid = getNewGridWithFinishToggled(this.state.grid, row, column);
            this.setState({grid: newGrid, mouseIsPressed: true, finishIsMoving: true });
        } else {
            newGrid = getNewGridWithWallToggled(this.state.grid, row, column);
            this.setState({grid: newGrid, mouseIsPressed: true});
        } 
    }
    
    handleMouseEnter = (row, column) => {
        if (!this.state.mouseIsPressed) return;
        if (this.state.startIsMoving) return;
        if (this.state.finishIsMoving) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, column);
        this.setState({grid: newGrid});
    }
    
    handleMouseUp = (row, column) => {
        let newGrid;
        //console.log(row, column)
        if (this.state.startIsMoving) {
            newGrid = getNewGridWithStartToggled(this.state.grid, row, column);
        } if (this.state.finishIsMoving) {
            newGrid = getNewGridWithFinishToggled(this.state.grid, row, column);
        }
        this.setState({mouseIsPressed: false, grid: newGrid || this.state.grid, startIsMoving: false, finishIsMoving: false});
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
                    //this.searchedNodes.current = `${visitedNodesInOrder} nodes searched.`
                    const node = visitedNodesInOrder[i];
                    if (i === 0) {
                        node.nodeRef.current.className = 'node node__visited node__start' 
                    } else if (i === (visitedNodesInOrder.length -1)) {
                        node.nodeRef.current.className = 'node node__visited node__finish'
                    } else {
                        node.nodeRef.current.className = 'node node__visited'
                    }
                   
                    //console.log(node)
                    //node[0] ? node.nodeRef.current.className = 'node node__visited node__start' :
                    //node.nodeRef.current.className = 'node node__visited'
                    }, 10 * i);
        }
    }
    
    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                
                node.nodeRef.current.className = 'node node__path node__start' 
                if (i) {
                    const previousNode = nodesInShortestPathOrder[i-1];
                    previousNode.nodeRef.current.className = 'node node__path'
                }
            }, 50 * i);
        }
    }
    
    visualizeDijkstra() {
        const {grid} = this.state
        //const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const startNode = findStart(grid)
        //const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const finishNode = findFinish(grid)
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
        this.setState({searchedNodes: visitedNodesInOrder.length, path: nodesInShortestPathOrder.length}, () => {
            this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
        })
    }

    generateMaze = () => {
        this.setState({grid: generateEllerMaze(this.state.grid)})
    } 

    clearGrid = () => {
        const grid = gridModel()
        this.setState({ grid }, () => {this.state.grid.forEach(row => 
            row.forEach(data => {
                if (data.isStart) {
                    data.nodeRef.current.className = 'node node__start'
                } else if (data.isFinish) {
                    data.nodeRef.current.className = 'node node__finish'
                } else data.nodeRef.current.className = 'node'}))})
        
    }

    searchedNodes = () => {
                              
    }


    render() {
        const { grid, mouseIsPressed, searchedNodes, path } = this.state
        console.log(grid)

        return (
            <main className='main'>
                <Options 
                    start={() => this.visualizeDijkstra()}
                    maze={this.generateMaze}
                    clearGrid={this.clearGrid}/>
                <div className='main__grid'>
                    { createGrid(grid, 
                        {mouseIsPressed, 
                        handleMouseDown: this.handleMouseDown,
                        handleMouseEnter: this.handleMouseEnter,
                        handleMouseUp: this.handleMouseUp}) }  
                </div>
                {grid && <Results searched={searchedNodes}
                            path={path}/>}
            </main>
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
    const newGrid = grid.slice()
    const node = newGrid[row][column]
    const newNode = {
        ...node,
        isBarrier: !node.isBarrier,
    };
    newGrid[row][column] = newNode
    return newGrid
}

const getNewGridWithStartToggled = (grid, row, column) => {
    const newGrid = grid.slice()
    const node = newGrid[row][column]
    const newNode = {
        ...node,
        isStart: !node.isStart,
    };
    newGrid[row][column] = newNode
    return newGrid
}

const getNewGridWithFinishToggled = (grid, row, column) => {
    const newGrid = grid.slice()
    const node = newGrid[row][column]
    const newNode = {
        ...node,
        isFinish: !node.isFinish,
    };
    newGrid[row][column] = newNode
    return newGrid
}

const findRef = (grid, row, column) => {
    return grid[row][column].nodeRef.current
}

const findStart = (grid) => {
    const rowIdx = grid.findIndex(row => row.some(data => data.isStart))
    return grid[rowIdx].find(data => data.isStart)
}

const findFinish = (grid) => {
    const rowIdx = grid.findIndex(row => row.some(data => data.isFinish))
    return grid[rowIdx].find(data => data.isFinish)
}
