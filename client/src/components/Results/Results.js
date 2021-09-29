import './Results.scss'

const Results = ({ searched, path }) => {
    // const searchNodes = () => {
    //     return searched.reduce((rowSum, row) => 
    //         rowSum + row.reduce((columnSum, column) => columnSum + +column.isVisited, 0), 0)
    //     //searched.map(arr => arr.filter())
    // }

  
    return (
        <div className='results'>
            <p className='results__info'>{searched} nodes searched</p>
            <p className='results__info'>{path} nodes in the shortest path</p>
        </div>
    )
}

export default Results