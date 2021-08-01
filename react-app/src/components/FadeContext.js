import React, { createContext, useState } from "react"
export const FadeContext = createContext();


export function FadeProvider(props) {
    const [fade, setFade] = useState({ boolean: false });
    
    
    return (
        <FadeContext.Provider value={{ fade, setFade }}>
            {props.children}
        </FadeContext.Provider>
    )
}