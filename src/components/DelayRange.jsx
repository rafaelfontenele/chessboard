import { useState, useEffect } from 'react';


export const DelayRange = ( {state, setState} ) => {
    const [currValue, setCurrValue] = useState(state.delay);

    useEffect( () => {
        setCurrValue( prev => state.delay)
    }, [state.delay])
    const changeDelay = () => {
        console.log(this.val)
        
        return
        setState( prev => {
            return {...prev,
            delay: value}
        })
    }
    
    return (
        <div className="delay-wrapper">
            Delay ({`${currValue}ms`})
        <input type="range" className='delay-range' min='0' max='2000' value={currValue} onChange={(e) => changeDelay() }/>
        </div>
    )
}