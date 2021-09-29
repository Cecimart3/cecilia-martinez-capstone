import './PathFindingVisualizer.scss'
import { Component } from 'react'
import Grid from '../../components/Grid/Grid'




class PathFindingVisualizer extends Component {
    
    render() {
        return (
            <div className='grid__container'>
                <Grid />
            </div>
        )
    }
}

export default PathFindingVisualizer
