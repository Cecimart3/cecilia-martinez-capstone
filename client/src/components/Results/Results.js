import './Results.scss'

const Results = ({ searched, path }) => {
    return (
        <div className='results'>
            <p className='results__info'>{searched} nodes searched</p>
            <p className='results__info'>{path} nodes in the shortest path</p>
        </div>
    )
}

export default Results