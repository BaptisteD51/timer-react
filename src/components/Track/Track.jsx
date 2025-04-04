import { useState, useEffect, useContext } from "react"
import { Timers } from "../../contexts/Timers"
import { FaPlay, FaPause } from "react-icons/fa"
import { RxReset } from "react-icons/rx"
import bipmp3 from "../../assets/audio/long_bip.mp3"
import sirenmp3 from "../../assets/audio/siren.mp3"
import Counter from "../Track/Counter"

function Track({isRunning, updateIsRunning}) {
    let { profiles, updateProfiles } = useContext(Timers)

    //Get the active profile
    let profile = profiles.find(timer => timer.selected)
    
    // Pause the timer
    let [pause, updatePause] = useState(false)

    // The sounds of the timer
    let bip = new Audio(bipmp3)
    let siren = new Audio(sirenmp3)

    // An interval fire every tenth of a sec
    useEffect(() => {
        let countDown = setInterval(() => {
            if (isRunning && !pause) {
                let prTimers = [...profile.timers]
                let runningTimerIndex = prTimers.findIndex(
                    (timer) => timer.running
                )
                // if the countdown is already started
                if (runningTimerIndex != -1) {
                    prTimers[runningTimerIndex].current++
                    // Go to the next timer if end of the duration
                    if (
                        prTimers[runningTimerIndex].current >=
                        prTimers[runningTimerIndex].duration
                    ) {
                        //if there is a timer after
                        if (runningTimerIndex < prTimers.length - 1) {
                            bip.play()
                            prTimers[runningTimerIndex].running = false
                            prTimers[runningTimerIndex + 1].running = true
                        }
                        // if it's the last timer
                        else {
                            siren.play()
                            prTimers = resetTimers(prTimers)
                            updateIsRunning(false)
                        }
                    }
                }
                // launch the count down
                else {
                    prTimers[0].running = true
                    prTimers[0].current += 1
                }

                // Update the profile, then all of the profiles 
                profile.timers = prTimers
                let updatedProfiles = [...profiles.filter(profile => !profile.selected)]
                updatedProfiles.push(profile)
                updateProfiles(updatedProfiles)
            }
        }, 100)

        return () => {
            clearInterval(countDown)
        }
    }, [profiles, isRunning, updateProfiles, pause])

    // Reset all timers and return timers
    function resetTimers(timers) {
        timers = timers.map((timer) => {
            timer.current = 0
            timer.running = false
            return timer
        })
        return timers
    }

    function resetAll() {
        //Get unselected profiles
        let updatedProfiles = [...profiles.filter(pr => pr.id != profile.id)]
        //Reset all timers to their starting values
        let updatedTimers = resetTimers([...profile.timers])
        profile.timers = updatedTimers
        updatedProfiles.push(profile)
        updateProfiles(updatedProfiles)
        // Reset the running and pause state
        updatePause(false)
        updateIsRunning(false)
    }

    //Display when the timer is launched
    
    return (
        <div className="max-w-lg">
            {pause ? (
                <button
                    onClick={() => {
                        updatePause(false)
                    }}
                    className="bg-white text-red-950 p-2 border-black border-2 rounded-full"
                >
                    <FaPlay />
                </button>
            ) : (
                <button
                    onClick={() => updatePause(true)}
                    className="bg-white text-red-950 p-2 border-black border-2 rounded-full"
                >
                    <FaPause />
                </button>
            )}
            <button
                onClick={resetAll}
                className="flex bg-white text-red-950 p-2 border-black border-2 rounded-full"
            >
                Reset
                <RxReset size={20} />
            </button>

            <div>
                {profile.timers.map((timer) => (
                    <Counter
                        key={timer.id}
                        duration={timer.duration}
                        current={timer.current}
                    ></Counter>
                ))}
            </div>
        </div>
    )
    
}

export default Track
