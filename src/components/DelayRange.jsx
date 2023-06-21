import { useState, useEffect } from 'react';


export const DelayRange = ( {state, setState} ) => {
    const [currValue, setCurrValue] = useState(state.delay);


    useEffect( () => {
        setCurrValue( prev => state.delay)
    }, [state])
    


    const changeDelay = (newValue) => {

        setState( prev => {
            return {...prev,
            delay: newValue}
        })
    }
    
    return (
        <div className="delay-wrapper">
            Delay ({`${currValue}ms`})
        <input type="range" className='delay-range' min='0' max='2000' step='200' value={currValue} onChange={e => changeDelay(e.target.value) }/>
        </div>
    )
}