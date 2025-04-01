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

    let [profiles, updateProfiles] = useState(savedTimers)

    /**
     * Save the timers in local storage when they are updated
     */
    useEffect(() => {
        localStorage.setItem("timers", JSON.stringify(profiles))
    }, [profiles])

    /**
     * Get the current profile
     */
    let currentProfile = profiles.find(timer => timer.selected)

    /**
     * Update the current profile
     */
    function updateCurrentProfile(profile){
        //Get all profiles
        let updatedProfiles = [...profiles]
        //Get the position of the profile to be updated
        let prPos = profiles.findIndex(pr => pr.id == profile.id )

        //In the case of an existing profile, replace the profile with the new value
        if(prPos >= 0){
            updatedProfiles[prPos] = profile
        }
        //If the profile is new, append at the end of the list
        else{
            updatedProfiles.push(profile)
        }

        updateProfiles(updatedProfiles)
    }


    return (
        <Timers.Provider value={{profiles, updateProfiles, currentProfile, updateCurrentProfile}}>
            {children}
        </Timers.Provider>
    )
}
