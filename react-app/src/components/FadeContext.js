import React, { createContext, useState } from "react"
export const FadeContext = createContext();


export function FadeProvider(props) {
    const [fade, setFade] = useState({ boolean: false, type: 'F'});
    
    
    return (
        <FadeContext.Provider value={{ fade, setFade }}>
            {props.children}
        </FadeContext.Provider>
    )
}