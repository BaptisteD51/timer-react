import { createContext, useState } from "react"

export const Timers = createContext(null)

export const TimersProvider = ({children}) => {

    let [timers, updateTimers] = useState([
        {
            running: false,
            duration: 5,
            current: 0,
            id: 123456,
        },
        {
            running: false,
            duration: 3,
            current: 0,
            id: 123461,
        },
        {
            running: false,
            duration: 10,
            current: 0,
            id: 457963,
        },
    ])

    return (
        <Timers.Provider value={{timers, updateTimers}}>
            {children}
        </Timers.Provider>
    )
}
