import './Header.scss'
import { NavLink } from 'react-router-dom'


const Header = () => {
    return (
        <header className='header'>
            <NavLink to='/' className='header__title'>
                Pathfinding Visualizer
            </NavLink>
            <NavLink to='/about' className='header__link'>
                About
            </NavLink>
        </header>
    )
}

export default Header