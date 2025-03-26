import { createContext, useState, useEffect } from "react"

export const Timers = createContext(null)

export const TimersProvider = ({children}) => {
    let defaultTimers = [
        {
            prName : "Default",
            id : 123456,
            selected : true,
            timers : [
                {
                    running: false,
                    duration: 50,
                    current: 0,
                    id: 123456,
                },
                {
                    running: false,
                    duration: 30,
                    current: 0,
                    id: 123461,
                },
                {
                    running: false,
                    duration: 100,
                    current: 0,
                    id: 457963,
                },
            ]    
        },
        {
            prName : "10 sec",
            id : 654321,
            selected : false,
            timers : [
                {
                    running: false,
                    duration: 100,
                    current: 0,
                    id: 654321,
                }
            ]    
        }
        
    ]

    /**
     * Get the timers if saved in local storage or default values 
     */
    const savedTimers = localStorage.getItem("timers")
        ? JSON.parse(localStorage.getItem("timers"))
        : defaultTimers

    let [timers, updateTimers] = useState(savedTimers)

    /**
     * Save the timers in local storage when they are updated
     */
    useEffect(() => {
        localStorage.setItem("timers", JSON.stringify(timers))
    }, [timers])

    return (
        <Timers.Provider value={{timers, updateTimers}}>
            {children}
        </Timers.Provider>
    )
}
