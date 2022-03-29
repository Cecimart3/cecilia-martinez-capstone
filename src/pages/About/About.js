import './About.scss'

const About = () => {
    return (
        <div className='about'>
            <h1 className='about__title'>About</h1>
            <div className='about__algorithms'>
                <h2 className='about__subtitle'>Pathfinding Algorithms</h2>
                <div className='about__algorithm'>
                    <h3 className='about__algorithm-title'>Dijkstra's</h3>
                    <p className='about__info'>This algorithm finds the shortest path from the start node to end node. Dijkstra came up with the idea while out shopping with his fiancé in Amsterdam. They sat down to have a coffee and rest. As he was wondering if he could recommence, he conceived the idea. He first implemented the idea while working on a transportation map in the Netherlands.</p>
                    <p className='about__info'>The algorithm assumes infinite distance from the start node. The start nodes distance is assigned a value of 0. The rest of the nodes are marked as unvisited. The algorithm begins by visiting each surrounding node and updating the distances away from the start node and removing them from the unvisited set until it reaches the destination, or end node. Then using these values the shortest distance form start to finish is used for the shortest path.</p>
                </div>
            </div>
            <div className='about__algorithms'>
                <h2 className='about__subtitle'>Maze Generating Algorithms</h2>
                <div className='about__algorithm'>
                    <h3 className='about__algorithm-title'>Eller's</h3>
                    <p className='about__info'>Eller’s algorithm makes it possible to make infinite, perfect mazes by going one row at a time. It is very fact, especially in comparison to the more popular recursive backtracking algorithms that use up more storage. </p>
                    <p className='about__info'>It starts by looking at the first row and then randomly connects adjacent nodes putting them in their own set. Then looks at the nodes below and randomly assigns those to the existing sets. Remaining nodes are assigned to their own sets. The algorithm only looks at one row at a time so once this is done, the previous row is discarded and the process repeats itself until the end of the graph is reached and no longer has to assign vertical connections.</p>
                </div>
            </div>
        </div>
    )
}

export default About