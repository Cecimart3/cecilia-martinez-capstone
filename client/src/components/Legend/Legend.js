import './Legend.scss'

const Legend = () => {
    return (
        <div className='legend'>
            <div className='legend__item'>
                <div className='legend__start'></div>
                <p>Start Node</p>
            </div>
            <div className='legend__item'>
                <div className='legend__search'></div>
                <p>Searched Node</p>
            </div>
            <div className='legend__item'>
                <div className='legend__barrier'></div>
                <p>Barrier</p>
            </div>
            <div className='legend__item'>
                <div className='legend__path'></div>
                <p>Path</p>
            </div>
            <div className='legend__item'>
                <div className='legend__end'></div>
                <p>End Node</p>
            </div>
        </div>
    )
}